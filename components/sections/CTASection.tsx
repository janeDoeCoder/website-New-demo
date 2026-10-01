import React from "react";
import { ArrowRight, ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "@/ui/Button";
import { BRAND } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-[#040C15] border-t border-white/[0.08] relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-accent opacity-50 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1677FF]/15 border border-[#1677FF]/30 text-[#00C8FF] text-xs font-mono font-semibold tracking-wider mb-6">
          <ShieldCheck className="w-4 h-4 text-[#00C8FF]" />
          <span>INDUSTRIAL ELECTRICAL INTELLIGENCE</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F8FC] tracking-tight leading-[1.15]">
          Ready to Move from Reactive Metering to Preventive Control?
        </h2>

        <p className="mt-5 text-base sm:text-lg text-[#9EADC0] max-w-2xl mx-auto leading-relaxed">
          Discover how VANNIC GRiDMiND and our industrial edge controllers protect facility continuity, identify electrical risks, and prevent avoidable downtime.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href="/contact"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {BRAND.hero.primaryCta}
          </Button>
          <Button
            href="/platform"
            variant="secondary"
            size="lg"
            icon={<ChevronRight className="w-4 h-4" />}
          >
            {BRAND.hero.secondaryCta}
          </Button>
        </div>

        <div className="mt-8 text-xs font-mono text-[#9EADC0]/80">
          Direct inquiries:{" "}
          <a
            href={`mailto:${BRAND.contactEmail}`}
            className="text-[#00C8FF] hover:underline"
          >
            {BRAND.contactEmail}
          </a>
        </div>
      </div>
    </section>
  );
}
