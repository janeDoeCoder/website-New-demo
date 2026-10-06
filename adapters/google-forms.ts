/**
 * VANNIC — Google Forms Adapter
 *
 * Submits validated contact inquiry data to a Google Form via the
 * undocumented-but-stable prefill POST endpoint. Responses are automatically
 * written to the linked Google Sheets spreadsheet without any OAuth or
 * service-account credentials — the form acts as the authenticated sink.
 *
 * HOW THIS WORKS
 * ──────────────
 * Every Google Form exposes a public POST endpoint:
 *   https://docs.google.com/forms/d/e/<FORM_ID>/formResponse
 *
 * Each form field is identified by an `entry.<NUMBER>` key. Posting
 * URL-encoded key-value pairs to that endpoint records a new response row
 * in the linked Google Sheet — identical to a human filling in the form.
 *
 * SETUP REQUIRED
 * ──────────────
 * Set these in your .env.local (never commit real values):
 *   GOOGLE_FORM_ID=<the long ID from your form's /d/e/FORM_ID/viewform URL>
 *   GFORM_ENTRY_FULL_NAME=entry.XXXXXXXXX
 *   GFORM_ENTRY_COMPANY=entry.XXXXXXXXX
 *   GFORM_ENTRY_EMAIL=entry.XXXXXXXXX
 *   GFORM_ENTRY_PHONE=entry.XXXXXXXXX
 *   GFORM_ENTRY_INDUSTRY=entry.XXXXXXXXX
 *   GFORM_ENTRY_FACILITY_TYPE=entry.XXXXXXXXX
 *   GFORM_ENTRY_MESSAGE=entry.XXXXXXXXX
 */

export interface ContactFormPayload {
  fullName: string;
  company: string;
  email: string;
  phone?: string;
  industry?: string;
  facilityType?: string;
  message: string;
}

export interface GoogleFormsResult {
  success: boolean;
  /** True when the env vars are not configured — submission is skipped gracefully */
  skipped?: boolean;
  error?: string;
}

/**
 * Reads a required Google Forms env variable.
 * Returns null (rather than throwing) so the caller can decide to skip
 * gracefully when the form is not yet configured.
 */
function getEntryId(envKey: string): string | null {
  const value = process.env[envKey];
  if (!value || !value.startsWith("entry.")) return null;
  return value;
}

/**
 * Submits a validated contact inquiry to the configured Google Form.
 *
 * - If env vars are missing/unconfigured, returns `{ success: true, skipped: true }`
 *   so the rest of the API route still responds 200 to the user.
 * - On network / Google error, returns `{ success: false, error: '...' }` —
 *   the API route should log this but still return 200 to the user (don't
 *   expose backend failures via the contact form).
 */
export async function submitToGoogleForm(
  data: ContactFormPayload
): Promise<GoogleFormsResult> {
  const formId = process.env.GOOGLE_FORM_ID;

  // ── Guard: skip silently if not configured ──────────────────────────────
  if (!formId) {
    console.warn("[GoogleForms] GOOGLE_FORM_ID is not set. Skipping submission.");
    return { success: true, skipped: true };
  }

  const INDUSTRY_LABELS: Record<string, string> = {
    manufacturing: "Manufacturing & MSME",
    healthcare: "Hospitals & Healthcare",
    hospitality: "Hotels & Hospitality",
    campus: "Educational Campus",
    "cold-chain": "Cold Storage & Refrigeration",
    logistics: "Warehousing & Logistics",
    commercial: "Commercial Buildings & Tech Parks",
    residential: "Apartment & Residential Towers",
    other: "Other Industrial / Commercial",
  };

  const industryValue = data.industry
    ? (INDUSTRY_LABELS[data.industry] ?? data.industry)
    : "";

  const entries: Record<string, string | undefined> = {
    [getEntryId("GFORM_ENTRY_FULL_NAME") ?? "__missing_full_name"]:    data.fullName,
    [getEntryId("GFORM_ENTRY_COMPANY") ?? "__missing_company"]:        data.company,
    [getEntryId("GFORM_ENTRY_EMAIL") ?? "__missing_email"]:            data.email,
    [getEntryId("GFORM_ENTRY_PHONE") ?? "__missing_phone"]:            data.phone ?? "",
    [getEntryId("GFORM_ENTRY_INDUSTRY") ?? "__missing_industry"]:      industryValue,
    [getEntryId("GFORM_ENTRY_FACILITY_TYPE") ?? "__missing_facility"]: data.facilityType ?? "",
    [getEntryId("GFORM_ENTRY_MESSAGE") ?? "__missing_message"]:        data.message,
  };

  // Check that all required entries resolved to real entry.XXXXX keys
  const hasUnresolved = Object.keys(entries).some((k) => k.startsWith("__missing"));
  if (hasUnresolved) {
    const missing = Object.keys(entries)
      .filter((k) => k.startsWith("__missing"))
      .map((k) => k.replace("__missing_", "GFORM_ENTRY_").toUpperCase());
    console.warn(`[GoogleForms] Missing entry IDs for: ${missing.join(", ")}. Skipping.`);
    return { success: true, skipped: true };
  }

  // ── Build the URL-encoded form body ─────────────────────────────────────
  const formBody = new URLSearchParams();
  for (const [key, value] of Object.entries(entries)) {
    if (value !== undefined) formBody.append(key, value);
  }

  const endpoint = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

  // ── POST to Google Forms ─────────────────────────────────────────────────
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // Mimic a browser submission; Google does not require auth for public forms
        "User-Agent": "Mozilla/5.0 (compatible; VANNIC-Server/1.0)",
      },
      body: formBody.toString(),
      // Google returns a redirect (200 or 302) on success — either is fine
      redirect: "manual",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    // Google returns 200 (direct) or 302 (redirect to confirmation page) on success.
    // Any 4xx/5xx other than those indicates a real problem.
    if (response.status === 200 || response.status === 302) {
      console.info(`[GoogleForms] Submission recorded for: ${data.company}`);
      return { success: true };
    }

    console.error(`[GoogleForms] Unexpected status: ${response.status}`);
    return { success: false, error: `Google Forms returned HTTP ${response.status}` };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown network error";
    console.error(`[GoogleForms] Fetch failed: ${message}`);
    return { success: false, error: message };
  }
}
