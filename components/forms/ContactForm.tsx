"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface FormState {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  facilityCategory: string;
  loadRange: string;
  facilityDetails: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  company?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    industry: "manufacturing",
    facilityCategory: "manufacturing-facility",
    loadRange: "not-sure",
    facilityDetails: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    const fullName = formData.fullName.trim();
    if (!fullName) {
      newErrors.fullName = "Please enter your full name";
    } else if (fullName.length < 2 || fullName.length > 100) {
      newErrors.fullName = "Full name must be between 2 and 100 characters";
    } else if (!/^[\p{L}\p{M}\s.'\-]+$/u.test(fullName)) {
      newErrors.fullName = "Full name contains invalid characters";
    }

    const company = formData.company.trim();
    if (!company) {
      newErrors.company = "Please enter your company or organization";
    } else if (company.length < 2 || company.length > 120) {
      newErrors.company = "Company name must be between 2 and 120 characters";
    } else if (!/^[\p{L}\p{N}\p{M}\s.,&'()/\-]+$/u.test(company)) {
      newErrors.company = "Company name contains invalid characters";
    }

    const email = formData.email.trim();
    if (!email) {
      newErrors.email = "Please enter your work email";
    } else if (email.length < 5 || email.length > 254) {
      newErrors.email = "Please enter a valid email address";
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const message = formData.message.trim();
    if (!message) {
      newErrors.message = "Please share details about your facility or inquiry";
    } else if (message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (message.length > 3000) {
      newErrors.message = "Message must be under 3000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Phone Normalization
    let normalizedPhone = formData.phone.trim();
    if (normalizedPhone && /^\d{10}$/.test(normalizedPhone)) {
      normalizedPhone = `+91 ${normalizedPhone}`;
    }

    // Combine Facility Fields for API
    const combinedFacilityType = `[${formData.facilityCategory}] [${formData.loadRange}] ${formData.facilityDetails}`.trim();

    const { facilityCategory, loadRange, facilityDetails, ...restData } = formData;

    const payload = {
      ...restData,
      phone: normalizedPhone,
      facilityType: combinedFacilityType,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.error?.details && Array.isArray(result.error.details)) {
          const fieldErrors: FormErrors = {};
          for (const err of result.error.details) {
            if (err.field && err.message) {
              (fieldErrors as Record<string, string>)[err.field] = err.message;
            }
          }
          setErrors(fieldErrors);
        }
        setServerError(result.error?.message || "Unable to submit inquiry. Please try again later.");
        return;
      }

      setSubmitted(true);
    } catch {
      setServerError("Network error: Please verify your connection or reach out via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div role="status" className="p-8 rounded-2xl bg-[#0A1D2E] border border-[#00C8FF]/30 text-center space-y-5 animate-in fade-in duration-300">
        <div className="w-12 h-12 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center mx-auto text-[#10B981]">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#F5F8FC] mb-2">
            Enquiry Received
          </h3>
          <p className="text-sm text-[#9EADC0] max-w-md mx-auto leading-relaxed">
            Thank you, <span className="text-[#F5F8FC] font-semibold">{formData.fullName}</span>. 
            Your facility requirements for <span className="text-[#F5F8FC]">{formData.company}</span> have been received.
            Our team will review the information and contact you regarding the next steps.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-white/[0.08]">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors"
          >
            Return to Home
          </Link>
          <Link
            href="/platform"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#0052FF]/20 text-[#00D2FF] hover:bg-[#0052FF]/30 border border-[#00D2FF]/30 text-sm font-medium transition-colors"
          >
            Explore GridMind
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name and Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-[#9EADC0] mb-2">
            Full Name <span className="text-[#00C8FF]">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Rajesh Kumar"
            className="w-full px-4 py-3 rounded-lg bg-[#061321] border border-white/[0.1] text-[#F5F8FC] text-sm placeholder:text-[#9EADC0]/40 focus:outline-none focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-[#EF4444] flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-xs font-mono uppercase tracking-wider text-[#9EADC0] mb-2">
            Company / Organization <span className="text-[#00C8FF]">*</span>
          </label>
          <input
            id="company"
            type="text"
            required
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="e.g. Precision Industries Ltd"
            className="w-full px-4 py-3 rounded-lg bg-[#061321] border border-white/[0.1] text-[#F5F8FC] text-sm placeholder:text-[#9EADC0]/40 focus:outline-none focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all"
          />
          {errors.company && (
            <p className="mt-1 text-xs text-[#EF4444] flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.company}
            </p>
          )}
        </div>
      </div>

      {/* Email and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-[#9EADC0] mb-2">
            Work Email <span className="text-[#00C8FF]">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. r.kumar@company.com"
            className="w-full px-4 py-3 rounded-lg bg-[#061321] border border-white/[0.1] text-[#F5F8FC] text-sm placeholder:text-[#9EADC0]/40 focus:outline-none focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-[#EF4444] flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-[#9EADC0] mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. 9876543210 or +91..."
            className="w-full px-4 py-3 rounded-lg bg-[#061321] border border-white/[0.1] text-[#F5F8FC] text-sm placeholder:text-[#9EADC0]/40 focus:outline-none focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all"
          />
        </div>
      </div>

      {/* Industry and Facility Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="industry" className="block text-xs font-mono uppercase tracking-wider text-[#9EADC0] mb-2">
            Industry Sector
          </label>
          <select
            id="industry"
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-[#061321] border border-white/[0.1] text-[#F5F8FC] text-sm focus:outline-none focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all"
          >
            <option value="manufacturing">Manufacturing & MSME</option>
            <option value="healthcare">Hospitals & Healthcare</option>
            <option value="hospitality">Hotels & Hospitality</option>
            <option value="campus">Educational Campus</option>
            <option value="cold-chain">Cold Storage & Refrigeration</option>
            <option value="logistics">Warehousing & Logistics</option>
            <option value="commercial">Commercial Buildings & Tech Parks</option>
            <option value="residential">Apartment & Residential Towers</option>
            <option value="other">Other Industrial / Commercial</option>
          </select>
        </div>

      </div>
      
      {/* Facility Categorization */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="facilityCategory" className="block text-xs font-mono uppercase tracking-wider text-[#9EADC0] mb-2">
            Facility Type
          </label>
          <select
            id="facilityCategory"
            value={formData.facilityCategory}
            onChange={(e) => setFormData({ ...formData, facilityCategory: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-[#061321] border border-white/[0.1] text-[#F5F8FC] text-sm focus:outline-none focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all"
          >
            <option value="manufacturing-facility">Manufacturing Facility</option>
            <option value="hospital">Hospital</option>
            <option value="hotel">Hotel</option>
            <option value="educational-campus">Educational Campus</option>
            <option value="cold-storage">Cold Storage</option>
            <option value="warehouse">Warehouse</option>
            <option value="commercial-building">Commercial Building</option>
            <option value="residential-tower">Residential Tower</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="loadRange" className="block text-xs font-mono uppercase tracking-wider text-[#9EADC0] mb-2">
            Load Range
          </label>
          <select
            id="loadRange"
            value={formData.loadRange}
            onChange={(e) => setFormData({ ...formData, loadRange: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-[#061321] border border-white/[0.1] text-[#F5F8FC] text-sm focus:outline-none focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all"
          >
            <option value="below-50kw">Below 50 kW</option>
            <option value="50-100kw">50–100 kW</option>
            <option value="100-250kw">100–250 kW</option>
            <option value="250-500kw">250–500 kW</option>
            <option value="500kw-1mw">500 kW–1 MW</option>
            <option value="1-5mw">1–5 MW</option>
            <option value="above-5mw">Above 5 MW</option>
            <option value="not-sure">Not Sure</option>
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="facilityDetails" className="block text-xs font-mono uppercase tracking-wider text-[#9EADC0] mb-2">
          Additional Facility Details
        </label>
        <input
          id="facilityDetails"
          type="text"
          maxLength={80}
          value={formData.facilityDetails}
          onChange={(e) => setFormData({ ...formData, facilityDetails: e.target.value })}
          placeholder="e.g. 500 kVA Transformer / Main LT Panel / DG backup"
          className="w-full px-4 py-3 rounded-lg bg-[#061321] border border-white/[0.1] text-[#F5F8FC] text-sm placeholder:text-[#9EADC0]/40 focus:outline-none focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-[#9EADC0] mb-2">
          Specific Electrical Challenges / Requirements <span className="text-[#00C8FF]">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          onFocus={(e) => {
            // Helper to ensure textarea is scrolled into view when keyboard opens on mobile
            setTimeout(() => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
          }}
          placeholder="Describe your current electrical challenges (e.g. frequent nuisance trips, high demand penalties, motor thermal stress, brownfield monitoring)..."
          className="w-full px-4 py-3 rounded-lg bg-[#061321] border border-white/[0.1] text-[#F5F8FC] text-sm placeholder:text-[#9EADC0]/40 focus:outline-none focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all resize-y scroll-m-32"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-[#EF4444] flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.message}
          </p>
        )}
      </div>

      {/* Server Error Alert */}
      {serverError && (
        <div className="p-4 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-xs text-[#EF4444] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[10px] bg-[#1677FF] hover:bg-[#2982FF] text-white font-semibold text-sm shadow-[0_2px_14px_rgba(22,119,255,0.4)] hover:shadow-[0_4px_22px_rgba(22,119,255,0.6)] active:translate-y-[1px] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{isSubmitting ? "Submitting..." : "Submit Request"}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
