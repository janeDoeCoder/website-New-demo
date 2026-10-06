# Google Form Setup Guide
## VANNIC DYNAVION — Contact Inquiry Form → Google Sheets

This guide walks you through creating the Google Form, linking it to Sheets,
and extracting the exact values you need to paste into `.env.local`.

---

## Part 1 — Create the Google Form

### 1.1 Open Google Forms
Go to → **https://forms.google.com**  
Click the large **"+"** tile to create a blank form.

---

### 1.2 Set Title & Description
| Field | Value |
|-------|-------|
| **Form Title** | `VANNIC DYNAVION — Facility Enquiry & Demo Request` |
| **Description** | `Request a technical demo and facility assessment from VANNIC DYNAVION PRIVATE LIMITED.` |

---

### 1.3 Add the 7 Fields (in order)

Use the **"+"** button on the floating right toolbar to add each question.

| # | Label | Type | Required? |
|---|-------|------|-----------|
| 1 | `Full Name` | Short answer | ✅ Yes |
| 2 | `Company / Organization` | Short answer | ✅ Yes |
| 3 | `Work Email` | Short answer | ✅ Yes |
| 4 | `Phone Number` | Short answer | ❌ No |
| 5 | `Industry Sector` | Dropdown | ❌ No |
| 6 | `Facility Type / Load Range` | Short answer | ❌ No |
| 7 | `Specific Electrical Challenges / Requirements` | Paragraph | ✅ Yes |

**Dropdown options for field 5 (Industry Sector):**
```
Manufacturing & MSME
Hospitals & Healthcare
Hotels & Hospitality
Educational Campus
Cold Storage & Refrigeration
Warehousing & Logistics
Commercial Buildings & Tech Parks
Apartment & Residential Towers
Other Industrial / Commercial
```

---

## Part 2 — Link to Google Sheets

1. Click the **"Responses"** tab at the top of the form editor
2. Click the **Google Sheets icon** (green spreadsheet icon) in the top-right of the Responses tab
3. Choose **"Create a new spreadsheet"**
4. Name it: **`VANNIC Enquiries — Form Responses`**
5. Click **"Create"**

All future form submissions will auto-populate into this spreadsheet.

---

## Part 3 — Extract the Form ID & Entry IDs

### 3.1 Open the Pre-filled Link Generator
1. In the form editor, click the **3-dot menu** in the top-right corner
2. Click **"Get pre-filled link"**
3. A preview of your form will open

### 3.2 Fill in Every Field with Sample Values
| Field | Type anything, e.g. |
|-------|---------------------|
| Full Name | `Test User` |
| Company / Organization | `Test Company Ltd` |
| Work Email | `test@example.com` |
| Phone Number | `9999999999` |
| Industry Sector | Select any option |
| Facility Type / Load Range | `500 kVA Panel` |
| Specific Electrical Challenges | `Test challenge` |

### 3.3 Click "Get Link"
A dialog appears with a long URL. Click **"Copy link"**.

The URL looks like this:
```
https://docs.google.com/forms/d/e/1FAIpQLSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/viewform?usp=pp_url
  &entry.123456789=Test+User
  &entry.234567890=Test+Company+Ltd
  &entry.345678901=test%40example.com
  &entry.456789012=9999999999
  &entry.567890123=Manufacturing+%26+MSME
  &entry.678901234=500+kVA+Panel
  &entry.789012345=Test+challenge
```

### 3.4 Extract Your Values

**Form ID** — from the URL between `/d/e/` and `/viewform`:
```
https://docs.google.com/forms/d/e/<<FORM_ID>>/viewform
```

**Entry IDs** — each `entry.XXXXXXXXX` in the URL maps to a field in creation order:

| Position | Field | Env Var |
|----------|-------|---------|
| 1st `entry.*` | Full Name | `GFORM_ENTRY_FULL_NAME` |
| 2nd `entry.*` | Company / Organization | `GFORM_ENTRY_COMPANY` |
| 3rd `entry.*` | Work Email | `GFORM_ENTRY_EMAIL` |
| 4th `entry.*` | Phone Number | `GFORM_ENTRY_PHONE` |
| 5th `entry.*` | Industry Sector | `GFORM_ENTRY_INDUSTRY` |
| 6th `entry.*` | Facility Type | `GFORM_ENTRY_FACILITY_TYPE` |
| 7th `entry.*` | Electrical Challenges | `GFORM_ENTRY_MESSAGE` |

> **Quick extraction tip:** Paste the URL into a text editor and use
> find/replace with pattern `entry\.\d+` — each match in order = one field.

---

## Part 4 — Configure `.env.local`

Open `.env.local` in the project root and replace the placeholder values:

```bash
GOOGLE_FORM_ID=1FAIpQLScJzZWTdXwrDrnmVp1N-MIXZXaOllUIhkJZJRR83FQllWUcww

GFORM_ENTRY_FULL_NAME=entry.328537296
GFORM_ENTRY_COMPANY=entry.252430551
GFORM_ENTRY_EMAIL=entry.437330281
GFORM_ENTRY_PHONE=entry.856312575
GFORM_ENTRY_INDUSTRY=entry.867400382
GFORM_ENTRY_FACILITY_TYPE=entry.555159604
GFORM_ENTRY_MESSAGE=entry.1925147202
```

> `.env.local` is in `.gitignore` — it will **never** be committed.

---

## Part 5 — Vercel Deployment (Production)

1. Go to **vercel.com → your project → Settings → Environment Variables**
2. Add each variable below for **Production** (and optionally Preview):

| Variable Name | Value |
|---------------|-------|
| `GOOGLE_FORM_ID` | your form ID |
| `GFORM_ENTRY_FULL_NAME` | `entry.XXXXXXXXX` |
| `GFORM_ENTRY_COMPANY` | `entry.XXXXXXXXX` |
| `GFORM_ENTRY_EMAIL` | `entry.XXXXXXXXX` |
| `GFORM_ENTRY_PHONE` | `entry.XXXXXXXXX` |
| `GFORM_ENTRY_INDUSTRY` | `entry.XXXXXXXXX` |
| `GFORM_ENTRY_FACILITY_TYPE` | `entry.XXXXXXXXX` |
| `GFORM_ENTRY_MESSAGE` | `entry.XXXXXXXXX` |

3. Redeploy after saving.

---

## Part 6 — Verify It Works

1. Run `npm run dev`
2. Go to `http://localhost:3000/contact` and submit the form
3. Open your Google Sheet — a new row should appear within seconds
4. In the dev terminal, look for: `[GoogleForms] Submission recorded for: <company>`

If you see `Skipped — GOOGLE_FORM_ID env var not configured`, the `.env.local` is not saved yet.

---

## Architecture

```
User fills contact form
       ↓
ContactForm.tsx (client) → POST /api/contact
       ↓
route.ts (server)
  ├── Rate limit check
  ├── Schema validation
  ├── submitToGoogleForm()  ← adapters/google-forms.ts
  │     └── POST https://docs.google.com/forms/d/e/<ID>/formResponse
  │           └── Google writes row → linked Google Sheet ✅
  └── Returns 200 to user
```

No OAuth. No service accounts. No credentials stored beyond the Form ID and field entry IDs.
