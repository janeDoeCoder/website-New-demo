import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp, getRateLimitConfigs } from "@/lib/security/rate-limit";
import { validateContactInquiry } from "@/lib/security/validation";
import { handleApiError, AppError } from "@/lib/security/error-handler";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check (Public Endpoint Tier)
    const ip = getClientIp(req);
    const publicConfig = getRateLimitConfigs().public;
    const rateLimit = checkRateLimit(`public:contact:${ip}`, publicConfig);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Too many inquiries sent from this network. Please wait a moment before trying again.",
            code: "RATE_LIMIT_EXCEEDED",
          },
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds || 60),
            "X-RateLimit-Limit": String(rateLimit.limit),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(rateLimit.resetTime),
          },
        }
      );
    }

    // 2. Parse JSON payload safely
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      throw new AppError("Malformed JSON payload in request body", 400, "BAD_REQUEST");
    }

    // 3. Strict Input Schema Validation
    const validation = validateContactInquiry(body);
    if (!validation.success || !validation.data) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Input validation failed. Please check the submitted fields.",
            code: "VALIDATION_ERROR",
            details: validation.errors,
          },
        },
        {
          status: 400,
          headers: {
            "X-Content-Type-Options": "nosniff",
          },
        }
      );
    }

    const validData = validation.data;

    // 4. Server-side processing
    console.info(`[CONTACT_INQUIRY_RECEIVED] Facility: ${validData.company}, Industry: ${validData.industry}`);

    // 5. Forward inquiry to Google Forms → auto-records in linked Google Sheet
    const { submitToGoogleForm } = await import("@/adapters/google-forms");
    const formsResult = await submitToGoogleForm({
      fullName:     validData.fullName,
      company:      validData.company,
      email:        validData.email,
      phone:        validData.phone,
      industry:     validData.industry,
      facilityType: validData.facilityType,
      message:      validData.message,
    });

    if (!formsResult.success) {
      console.error(`[GoogleForms] Submission failed: ${formsResult.error}`);
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Our systems are currently unable to process your request. Please try again later or contact us directly.",
            code: "UPSTREAM_ERROR"
          }
        },
        { status: 502 }
      );
    } else if (formsResult.skipped) {
      console.warn("[GoogleForms] Skipped — GOOGLE_FORM_ID env var not configured.");
    }

    // 6. Successful Generic Response
    return NextResponse.json(
      {
        success: true,
        message: "Your facility inquiry has been received securely. An electrical engineering specialist will review it.",
      },
      {
        status: 200,
        headers: {
          "X-Content-Type-Options": "nosniff",
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": String(rateLimit.resetTime),
        },
      }
    );
  } catch (error) {
    return handleApiError(error, req);
  }
}
