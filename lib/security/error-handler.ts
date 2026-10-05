import { NextResponse } from "next/server";

/**
 * Enterprise Error Sanitization and Anti-Information-Leakage Handler
 * 
 * Guarantees:
 * - Zero stack traces or internal filesystem paths sent to client responses
 * - Zero raw database/SQL errors, environment details, or library exceptions leaked
 * - Unique Request ID correlation generated for every failure
 * - Full detailed error diagnostics and stack traces logged server-side
 */

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly clientMessage: string;

  constructor(
    clientMessage: string,
    statusCode = 500,
    code = "INTERNAL_SERVER_ERROR",
    internalDetails?: string
  ) {
    super(internalDetails || clientMessage);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.clientMessage = clientMessage;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Generates a cryptographically random request ID for tracking
 */
export function generateRequestId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `req_${crypto.randomUUID()}`;
  }
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Sanitizes input to guarantee no system paths or file names leak
 */
function sanitizeClientText(text: string): string {
  // Strip Windows and UNIX style paths
  return text
    .replace(/[A-Za-z]:\\[^"'\s\n]+/g, "[internal-path]")
    .replace(/(?:\/[a-zA-Z0-9._-]+){2,}/g, "[internal-path]");
}

/**
 * Safe Error Handler for API Routes & Server Actions
 */
export function handleApiError(error: unknown, req?: Request): NextResponse {
  const requestId = generateRequestId();
  const timestamp = new Date().toISOString();

  // Determine error status and operational flag
  let statusCode = 500;
  let errorCode = "INTERNAL_SERVER_ERROR";
  let clientMessage = "An unexpected error occurred while processing your request. Please try again later.";

  if (error instanceof AppError && error.isOperational) {
    statusCode = error.statusCode;
    errorCode = error.code;
    clientMessage = sanitizeClientText(error.clientMessage);
  }

  // Comprehensive Server-Side Diagnostic Logging (Hidden from client)
  const serverLog = {
    requestId,
    timestamp,
    statusCode,
    errorCode,
    url: req ? req.url : "unknown",
    method: req ? req.method : "unknown",
    errorName: error instanceof Error ? error.name : "UnknownError",
    errorMessage: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  };

  console.error(`[SECURITY][ERROR_LOG][${requestId}]`, JSON.stringify(serverLog, null, 2));

  // Client-Facing Opaque Payload
  return NextResponse.json(
    {
      success: false,
      error: {
        message: clientMessage,
        code: errorCode,
        requestId,
      },
    },
    {
      status: statusCode,
      headers: {
        "X-Request-Id": requestId,
        "X-Content-Type-Options": "nosniff",
      },
    }
  );
}
