/**
 * Enterprise Rate Limiting Architecture for VANNIC Platform
 * 
 * Features:
 * - Differentiated tiers: Auth routes (strictest), Public routes (moderate), Authenticated routes (looser).
 * - Per-IP and Per-Account tracking for authentication routes.
 * - Exponential backoff calculation instead of binary hard lockouts for auth endpoints.
 * - 100% Configurable thresholds via environment variables with secure defaults.
 * - Standard HTTP headers (Retry-After, X-RateLimit-*).
 */

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  baseBackoffMs?: number;
  maxBackoffMs?: number;
  backoffFactor?: number;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: number; // Unix timestamp in seconds
  retryAfterSeconds?: number;
  backoffDelayMs?: number;
}

interface RequestRecord {
  timestamps: number[];
  failedAttempts: number;
  lastFailureTime: number;
  currentBackoffMs: number;
}

// In-memory sliding window store (can be swapped for Redis / Upstash in distributed setups)
const store = new Map<string, RequestRecord>();

// Periodic cleanup every 5 minutes to avoid memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      // Purge records older than 1 hour with no recent attempts
      if (record.timestamps.length === 0 || (now - Math.max(...record.timestamps, record.lastFailureTime)) > 3600000) {
        store.delete(key);
      }
    }
  }, 300000);
}

/**
 * Configurable thresholds loaded from environment variables with production-ready defaults
 */
export function getRateLimitConfigs(): {
  auth: Required<RateLimitConfig>;
  public: Required<RateLimitConfig>;
  authenticatedUser: Required<RateLimitConfig>;
} {
  return {
    auth: {
      windowMs: parseInt(process.env.RATE_LIMIT_AUTH_WINDOW_MS || "900000", 10), // 15 mins default
      maxRequests: parseInt(process.env.RATE_LIMIT_AUTH_MAX_ATTEMPTS || "5", 10), // 5 attempts default
      baseBackoffMs: parseInt(process.env.RATE_LIMIT_AUTH_BASE_BACKOFF_MS || "2000", 10), // 2 seconds initial
      maxBackoffMs: parseInt(process.env.RATE_LIMIT_AUTH_MAX_BACKOFF_MS || "300000", 10), // 5 mins max delay
      backoffFactor: parseFloat(process.env.RATE_LIMIT_AUTH_BACKOFF_FACTOR || "2"), // exponential factor 2x
    },
    public: {
      windowMs: parseInt(process.env.RATE_LIMIT_PUBLIC_WINDOW_MS || "60000", 10), // 1 min default
      maxRequests: parseInt(process.env.RATE_LIMIT_PUBLIC_MAX_REQUESTS || "30", 10), // 30 req/min default
      baseBackoffMs: 0,
      maxBackoffMs: 0,
      backoffFactor: 1,
    },
    authenticatedUser: {
      windowMs: parseInt(process.env.RATE_LIMIT_AUTH_USER_WINDOW_MS || "60000", 10), // 1 min default
      maxRequests: parseInt(process.env.RATE_LIMIT_AUTH_USER_MAX_REQUESTS || "120", 10), // 120 req/min default
      baseBackoffMs: 0,
      maxBackoffMs: 0,
      backoffFactor: 1,
    },
  };
}

/**
 * Extracts client IP from standard reverse proxy headers
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

/**
 * Standard Sliding Window Rate Limiter
 * Used for public and authenticated routes.
 */
export function checkRateLimit(key: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  let record = store.get(key);
  if (!record) {
    record = {
      timestamps: [],
      failedAttempts: 0,
      lastFailureTime: 0,
      currentBackoffMs: 0,
    };
    store.set(key, record);
  }

  // Filter out timestamps outside current window
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

  const resetTime = Math.ceil((now + config.windowMs) / 1000);

  if (record.timestamps.length >= config.maxRequests) {
    const oldestTimestamp = record.timestamps[0];
    const retryAfter = Math.max(1, Math.ceil((oldestTimestamp + config.windowMs - now) / 1000));
    return {
      allowed: false,
      limit: config.maxRequests,
      remaining: 0,
      resetTime,
      retryAfterSeconds: retryAfter,
    };
  }

  record.timestamps.push(now);

  return {
    allowed: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - record.timestamps.length,
    resetTime,
  };
}

/**
 * Advanced Authentication Rate Limiter
 * Combines Per-IP and Per-Account tracking with Exponential Backoff rather than hard lockouts.
 */
export function checkAuthRateLimit(
  ip: string,
  accountIdentifier?: string
): RateLimitResult {
  const configs = getRateLimitConfigs().auth;
  const now = Date.now();

  // Evaluate both per-IP key and per-account key
  const keysToCheck = [`auth:ip:${ip}`];
  if (accountIdentifier) {
    const normalizedAccount = accountIdentifier.toLowerCase().trim();
    keysToCheck.push(`auth:account:${normalizedAccount}`);
    keysToCheck.push(`auth:combo:${ip}:${normalizedAccount}`);
  }

  for (const key of keysToCheck) {
    let record = store.get(key);
    if (!record) {
      record = {
        timestamps: [],
        failedAttempts: 0,
        lastFailureTime: 0,
        currentBackoffMs: 0,
      };
      store.set(key, record);
    }

    // Check if currently under exponential backoff delay
    if (record.currentBackoffMs > 0 && record.lastFailureTime > 0) {
      const timeSinceLastFailure = now - record.lastFailureTime;
      if (timeSinceLastFailure < record.currentBackoffMs) {
        const retryAfterSeconds = Math.ceil(
          (record.currentBackoffMs - timeSinceLastFailure) / 1000
        );
        return {
          allowed: false,
          limit: configs.maxRequests,
          remaining: 0,
          resetTime: Math.ceil((now + record.currentBackoffMs) / 1000),
          retryAfterSeconds,
          backoffDelayMs: record.currentBackoffMs,
        };
      }
    }

    // Sliding window check
    record.timestamps = record.timestamps.filter((ts) => ts > now - configs.windowMs);

    if (record.timestamps.length >= configs.maxRequests) {
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((record.timestamps[0] + configs.windowMs - now) / 1000)
      );
      return {
        allowed: false,
        limit: configs.maxRequests,
        remaining: 0,
        resetTime: Math.ceil((now + configs.windowMs) / 1000),
        retryAfterSeconds,
      };
    }
  }

  // Record attempt
  for (const key of keysToCheck) {
    const record = store.get(key)!;
    record.timestamps.push(now);
  }

  const primaryRecord = store.get(keysToCheck[0])!;
  return {
    allowed: true,
    limit: configs.maxRequests,
    remaining: Math.max(0, configs.maxRequests - primaryRecord.timestamps.length),
    resetTime: Math.ceil((now + configs.windowMs) / 1000),
  };
}

/**
 * Register failed authentication attempt to trigger or advance exponential backoff
 */
export function recordAuthFailure(ip: string, accountIdentifier?: string): void {
  const configs = getRateLimitConfigs().auth;
  const now = Date.now();

  const keys = [`auth:ip:${ip}`];
  if (accountIdentifier) {
    const normalized = accountIdentifier.toLowerCase().trim();
    keys.push(`auth:account:${normalized}`);
    keys.push(`auth:combo:${ip}:${normalized}`);
  }

  for (const key of keys) {
    let record = store.get(key);
    if (!record) {
      record = {
        timestamps: [now],
        failedAttempts: 1,
        lastFailureTime: now,
        currentBackoffMs: configs.baseBackoffMs,
      };
      store.set(key, record);
    } else {
      record.failedAttempts += 1;
      record.lastFailureTime = now;

      // Calculate exponential backoff: base * factor^(failures - 1) up to max
      const exponent = Math.max(0, record.failedAttempts - 1);
      const calculatedBackoff = configs.baseBackoffMs * Math.pow(configs.backoffFactor, exponent);
      record.currentBackoffMs = Math.min(calculatedBackoff, configs.maxBackoffMs);
    }
  }
}

/**
 * Reset failure backoff counter upon successful authentication
 */
export function recordAuthSuccess(ip: string, accountIdentifier?: string): void {
  const keys = [`auth:ip:${ip}`];
  if (accountIdentifier) {
    const normalized = accountIdentifier.toLowerCase().trim();
    keys.push(`auth:account:${normalized}`);
    keys.push(`auth:combo:${ip}:${normalized}`);
  }

  for (const key of keys) {
    const record = store.get(key);
    if (record) {
      record.failedAttempts = 0;
      record.currentBackoffMs = 0;
    }
  }
}
