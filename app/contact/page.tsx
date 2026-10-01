import React from "react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { BRAND } from "@/lib/constants";
import { Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Request a Demo — VANNIC DYNAVION",
  description:
    "Request a technical demo or facility pilot assessment with VANNIC DYNAVION PRIVATE LIMITED. Discuss brownfield electrical monitoring and preventive load control.",
};

export default function ContactPage() {
  const steps = [
    {
      num: "01",
      title: "SLD & Infrastructure Review",
      desc: "Our electrical engineering team reviews your single-line diagram, transformer capacity, and breaker layout.",
    },
    {
      num: "02",
      title: "Vulnerability Assessment",
      desc: "We identify unmonitored feeders, nuisance tripping points, and approved non-critical circuits suitable for control.",
    },
    {
      num: "03",
      title: "Pilot Deployment Plan",
      desc: "We propose a non-disruptive brownfield integration plan using standard split-core CTs and Modbus fieldbuses.",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Contact Hero */}
      <section className="py-16 sm:py-24 bg-radial-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-[#00C8FF] uppercase mb-4 inline-block px-3 py-1 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/20">
              CONNECT WITH US
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F8FC] tracking-tight leading-[1.12]">
              Request a Technical Demo & Facility Assessment
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-[#9EADC0] leading-relaxed">
              Explore how VANNIC GRiDMiND and our industrial edge controllers protect your critical operations, identify developing risks, and eliminate avoidable electrical downtime.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form and Direct Details Grid */}
      <section className="py-16 sm:py-24 bg-[#040C15] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-7 p-6 sm:p-10 rounded-2xl bg-[#061321] border border-white/[0.08]">
              <div className="mb-8">
                <span className="text-xs font-mono text-[#00C8FF] tracking-wider uppercase block mb-1">
                  DEMO / PILOT ENQUIRY
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#F5F8FC]">
                  Share Your Facility Requirements
                </h2>
                <p className="text-xs sm:text-sm text-[#9EADC0] mt-1">
                  All technical information is held under strict professional engineering confidentiality.
                </p>
              </div>

              <ContactForm />
            </div>

            {/* Direct Information & Process Column */}
            <div className="lg:col-span-5 space-y-8">
              {/* Company Information Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0A1D2E] border border-white/[0.08] space-y-6">
                <div>
                  <span className="text-xs font-mono text-[#00C8FF] tracking-wider uppercase block mb-1">
                    OFFICIAL HEADQUARTERS
                  </span>
                  <h3 className="text-lg font-bold text-[#F5F8FC]">
                    {BRAND.companyName}
                  </h3>
                  <p className="text-xs text-[#9EADC0] mt-1">
                    {BRAND.tagline}
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-[#9EADC0] pt-4 border-t border-white/[0.06]">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#00C8FF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-medium">Direct Inquiries</strong>
                      <a href={`mailto:${BRAND.contactEmail}`} className="text-[#00C8FF] hover:underline">
                        {BRAND.contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#00C8FF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-medium">Location</strong>
                      <span>India</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#00C8FF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-medium">Engineering Response</strong>
                      <span>Technical responses provided within 24 to 48 business hours.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Engagement Steps Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#061321] border border-white/[0.08]">
                <h4 className="text-sm font-mono uppercase tracking-wider text-[#F5F8FC] font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>Technical Evaluation Roadmap</span>
                </h4>
                <div className="space-y-4">
                  {steps.map((st) => (
                    <div key={st.num} className="flex items-start gap-3 text-xs">
                      <span className="font-mono font-bold text-[#00C8FF] bg-[#00C8FF]/10 px-2 py-0.5 rounded border border-[#00C8FF]/20 shrink-0">
                        {st.num}
                      </span>
                      <div>
                        <strong className="text-[#F5F8FC] block mb-0.5">{st.title}</strong>
                        <span className="text-[#9EADC0] leading-relaxed">{st.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
