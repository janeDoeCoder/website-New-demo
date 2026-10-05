"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";

interface FormState {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  facilityType: string;
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
    facilityType: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Please enter your company or organization";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your work email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please share details about your facility or inquiry";
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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
      <div className="p-8 rounded-2xl bg-[#0A1D2E] border border-[#00C8FF]/30 text-center space-y-4 animate-in fade-in duration-300">
        <div className="w-12 h-12 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center mx-auto text-[#10B981]">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-[#F5F8FC]">
          Enquiry Received
        </h3>
        <p className="text-sm text-[#9EADC0] max-w-md mx-auto leading-relaxed">
          Thank you for reaching out, <span className="text-[#F5F8FC] font-semibold">{formData.fullName}</span>. Our electrical engineering team at <span className="text-[#F5F8FC] font-semibold">{BRAND.companyName}</span> will review your inquiry for <span className="text-[#F5F8FC]">{formData.company}</span>.
        </p>
        <div className="pt-4 border-t border-white/[0.08] text-xs font-mono text-[#9EADC0]">
          You can also reach us directly at{" "}
          <a href={`mailto:${BRAND.contactEmail}`} className="text-[#00C8FF] hover:underline">
            {BRAND.contactEmail}
          </a>
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
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. +91 98765 43210"
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

        <div>
          <label htmlFor="facilityType" className="block text-xs font-mono uppercase tracking-wider text-[#9EADC0] mb-2">
            Facility Type / Load Range
          </label>
          <input
            id="facilityType"
            type="text"
            value={formData.facilityType}
            onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
            placeholder="e.g. 500 kVA Transformer / Main LT Panel"
            className="w-full px-4 py-3 rounded-lg bg-[#061321] border border-white/[0.1] text-[#F5F8FC] text-sm placeholder:text-[#9EADC0]/40 focus:outline-none focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all"
          />
        </div>
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
          placeholder="Describe your current electrical challenges (e.g. frequent nuisance trips, high demand penalties, motor thermal stress, brownfield monitoring)..."
          className="w-full px-4 py-3 rounded-lg bg-[#061321] border border-white/[0.1] text-[#F5F8FC] text-sm placeholder:text-[#9EADC0]/40 focus:outline-none focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all resize-y"
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
