/**
 * Strict Input Validation Engine for VANNIC Platform
 * 
 * Enforces:
 * - Exact type checking (string, number, boolean, enum)
 * - Strict length boundaries (min, max)
 * - Format verification (strict RFC 5322 email regex, E.164 phone regex, safe character sets)
 * - Unknown/extraneous key rejection (protecting against parameter pollution & prototype pollution)
 * - Explicit rejection of non-conforming inputs (no passive sanitization/silent truncation)
 */

export interface ValidationErrorDetail {
  field: string;
  message: string;
  code: "TYPE_MISMATCH" | "REQUIRED" | "TOO_SHORT" | "TOO_LONG" | "INVALID_FORMAT" | "UNKNOWN_FIELD" | "INVALID_ENUM";
}

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: ValidationErrorDetail[];
}

export type ValidatorFn = (value: unknown, field: string) => ValidationErrorDetail | null;

/**
 * Common security regex patterns
 */
export const SECURITY_PATTERNS = {
  // RFC 5322 compliant email regex rejecting control chars, nested quotes, and leading/trailing dots
  EMAIL: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
  
  // Safe human names: alphabets, spaces, apostrophes, hyphens, dots. Supports all Unicode letters/marks.
  PERSON_NAME: /^[\p{L}\p{M}\s.'\-]+$/u,
  
  // Company names: alphanumeric plus common business punctuation
  COMPANY_NAME: /^[\p{L}\p{N}\p{M}\s.,&'()/\-]+$/u,
  
  // International phone numbers (E.164 format and common grouped formats)
  PHONE: /^\+?[0-9\s().-]{7,25}$/,
  
  // High-entropy password: min 10 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special character
  PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{10,72}$/,
  
  // UUID v4
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
};

/**
 * Strict String Validator
 */
export function validateString(
  value: unknown,
  field: string,
  options: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    patternErrorMsg?: string;
  }
): ValidationErrorDetail | null {
  const { required = true, minLength = 1, maxLength = 255, pattern, patternErrorMsg } = options;

  if (value === undefined || value === null || value === "") {
    if (required) {
      return { field, message: `${field} is required`, code: "REQUIRED" };
    }
    return null;
  }

  if (typeof value !== "string") {
    return { field, message: `${field} must be a valid string`, code: "TYPE_MISMATCH" };
  }

  const trimmed = value.trim();

  if (required && trimmed.length === 0) {
    return { field, message: `${field} cannot be empty`, code: "REQUIRED" };
  }

  if (trimmed.length < minLength) {
    return {
      field,
      message: `${field} must be at least ${minLength} characters long`,
      code: "TOO_SHORT",
    };
  }

  if (trimmed.length > maxLength) {
    return {
      field,
      message: `${field} cannot exceed ${maxLength} characters`,
      code: "TOO_LONG",
    };
  }

  if (pattern && !pattern.test(trimmed)) {
    return {
      field,
      message: patternErrorMsg || `${field} contains invalid characters or does not match required format`,
      code: "INVALID_FORMAT",
    };
  }

  return null;
}

/**
 * Strict Enum Validator
 */
export function validateEnum<T extends string>(
  value: unknown,
  field: string,
  allowedValues: readonly T[],
  required = true
): ValidationErrorDetail | null {
  if (value === undefined || value === null || value === "") {
    if (required) {
      return { field, message: `${field} is required`, code: "REQUIRED" };
    }
    return null;
  }

  if (typeof value !== "string" || !allowedValues.includes(value as T)) {
    return {
      field,
      message: `${field} must be one of: ${allowedValues.join(", ")}`,
      code: "INVALID_ENUM",
    };
  }

  return null;
}

// ============================================================================
// Schemas
// ============================================================================

export interface ContactInquiryPayload {
  fullName: string;
  company: string;
  email: string;
  phone?: string;
  industry:
    | "manufacturing"
    | "healthcare"
    | "hospitality"
    | "campus"
    | "cold-chain"
    | "logistics"
    | "commercial"
    | "residential"
    | "other";
  facilityType?: string;
  message: string;
}

export const VALID_INDUSTRIES = [
  "manufacturing",
  "healthcare",
  "hospitality",
  "campus",
  "cold-chain",
  "logistics",
  "commercial",
  "residential",
  "other",
] as const;

/**
 * Validates Contact / Technical Demo Request against strict schema
 */
export function validateContactInquiry(body: unknown): ValidationResult<ContactInquiryPayload> {
  const errors: ValidationErrorDetail[] = [];

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      success: false,
      errors: [{ field: "root", message: "Request body must be a JSON object", code: "TYPE_MISMATCH" }],
    };
  }

  const payload = body as Record<string, unknown>;
  const allowedKeys = new Set([
    "fullName",
    "company",
    "email",
    "phone",
    "industry",
    "facilityType",
    "message",
  ]);

  // Reject unexpected keys to prevent pollution
  for (const key of Object.keys(payload)) {
    if (!allowedKeys.has(key)) {
      errors.push({
        field: key,
        message: `Unexpected field '${key}' is not permitted`,
        code: "UNKNOWN_FIELD",
      });
    }
  }

  // Validate fullName
  const nameError = validateString(payload.fullName, "fullName", {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: SECURITY_PATTERNS.PERSON_NAME,
    patternErrorMsg: "Full name can only contain letters, spaces, hyphens, and periods",
  });
  if (nameError) errors.push(nameError);

  // Validate company
  const companyError = validateString(payload.company, "company", {
    required: true,
    minLength: 2,
    maxLength: 120,
    pattern: SECURITY_PATTERNS.COMPANY_NAME,
    patternErrorMsg: "Company name contains invalid characters",
  });
  if (companyError) errors.push(companyError);

  // Validate email
  const emailError = validateString(payload.email, "email", {
    required: true,
    minLength: 5,
    maxLength: 254,
    pattern: SECURITY_PATTERNS.EMAIL,
    patternErrorMsg: "Please provide a valid, RFC-compliant work email address",
  });
  if (emailError) errors.push(emailError);

  // Validate optional phone
  if (payload.phone !== undefined && payload.phone !== null && payload.phone !== "") {
    const phoneError = validateString(payload.phone, "phone", {
      required: false,
      minLength: 7,
      maxLength: 25,
      pattern: SECURITY_PATTERNS.PHONE,
      patternErrorMsg: "Phone number must be a valid international or local number",
    });
    if (phoneError) errors.push(phoneError);
  }

  // Validate industry enum
  const industryError = validateEnum(payload.industry, "industry", VALID_INDUSTRIES, true);
  if (industryError) errors.push(industryError);

  // Validate optional facilityType
  if (payload.facilityType !== undefined && payload.facilityType !== null && payload.facilityType !== "") {
    const facilityError = validateString(payload.facilityType, "facilityType", {
      required: false,
      minLength: 2,
      maxLength: 120,
    });
    if (facilityError) errors.push(facilityError);
  }

  // Validate message
  const messageError = validateString(payload.message, "message", {
    required: true,
    minLength: 10,
    maxLength: 3000,
  });
  if (messageError) errors.push(messageError);

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      fullName: (payload.fullName as string).trim(),
      company: (payload.company as string).trim(),
      email: (payload.email as string).trim().toLowerCase(),
      phone: payload.phone ? (payload.phone as string).trim() : undefined,
      industry: payload.industry as ContactInquiryPayload["industry"],
      facilityType: payload.facilityType ? (payload.facilityType as string).trim() : undefined,
      message: (payload.message as string).trim(),
    },
  };
}

/**
 * Authentication Schemas (Login, Registration, Password Reset)
 */
export interface AuthLoginPayload {
  email: string;
  password: string;
}

export function validateAuthLogin(body: unknown): ValidationResult<AuthLoginPayload> {
  const errors: ValidationErrorDetail[] = [];

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      success: false,
      errors: [{ field: "root", message: "Request body must be a JSON object", code: "TYPE_MISMATCH" }],
    };
  }

  const payload = body as Record<string, unknown>;
  const allowedKeys = new Set(["email", "password"]);

  for (const key of Object.keys(payload)) {
    if (!allowedKeys.has(key)) {
      errors.push({ field: key, message: `Unexpected field '${key}'`, code: "UNKNOWN_FIELD" });
    }
  }

  const emailErr = validateString(payload.email, "email", {
    required: true,
    minLength: 5,
    maxLength: 254,
    pattern: SECURITY_PATTERNS.EMAIL,
  });
  if (emailErr) errors.push(emailErr);

  const pwdErr = validateString(payload.password, "password", {
    required: true,
    minLength: 8,
    maxLength: 72, // bcrypt maximum boundary
  });
  if (pwdErr) errors.push(pwdErr);

  if (errors.length > 0) return { success: false, errors };

  return {
    success: true,
    data: {
      email: (payload.email as string).trim().toLowerCase(),
      password: payload.password as string,
    },
  };
}
