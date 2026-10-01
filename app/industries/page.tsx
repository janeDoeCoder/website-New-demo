import React from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/ui/SectionHeading";
import { Button } from "@/ui/Button";
import { INDUSTRIES } from "@/content/industries";
import {
  Factory,
  Building2,
  Hotel,
  School,
  Snowflake,
  Warehouse,
  Building,
  Home,
  AlertTriangle,
  Flame,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Industry Applications & Use Cases",
  description:
    "Explore electrical risk detection and preventive supervisory load control across manufacturing, healthcare, hospitality, cold chain, and commercial infrastructure.",
};

export default function IndustriesPage() {
  const getIndustryIcon = (id: string) => {
    switch (id) {
      case "manufacturing-msmes":
        return <Factory className="w-6 h-6 text-[#00C8FF]" />;
      case "hospitals-healthcare":
        return <Building2 className="w-6 h-6 text-[#10B981]" />;
      case "hotels-hospitality":
        return <Hotel className="w-6 h-6 text-[#F59E0B]" />;
      case "educational-campuses":
        return <School className="w-6 h-6 text-[#1677FF]" />;
      case "cold-storage":
        return <Snowflake className="w-6 h-6 text-[#00C8FF]" />;
      case "warehouses-logistics":
        return <Warehouse className="w-6 h-6 text-[#F59E0B]" />;
      case "commercial-buildings":
        return <Building className="w-6 h-6 text-[#10B981]" />;
      case "apartments-residential":
        return <Home className="w-6 h-6 text-[#1677FF]" />;
      default:
        return <Factory className="w-6 h-6 text-[#00C8FF]" />;
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Industries Hero */}
      <section className="py-16 sm:py-24 bg-radial-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-[#00C8FF] uppercase mb-4 inline-block px-3 py-1 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/20">
              INDUSTRIAL APPLICATIONS
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F8FC] tracking-tight leading-[1.12]">
              Preventive Electrical Intelligence by Industry
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-[#9EADC0] leading-relaxed">
              Every facility type faces unique electrical challenges. VANNIC provides tailored supervisory rules that prevent avoidable downtime and protect critical electrical continuity.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Request Industry Assessment
              </Button>
              <Button href="/platform" variant="secondary" size="lg" icon={<ChevronRight className="w-4 h-4" />}>
                Explore GRiDMiND
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Industry Breakdown Cards */}
      <section className="py-16 sm:py-24 bg-[#040C15] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.id}
              id={ind.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#061321] border border-white/[0.08] hover:border-white/[0.16] transition-all scroll-mt-24"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0A1D2E] border border-white/10 flex items-center justify-center shrink-0">
                    {getIndustryIcon(ind.id)}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#F5F8FC]">
                      {ind.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#9EADC0] mt-0.5">
                      {ind.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {ind.keySignals.map((sig) => (
                    <span
                      key={sig}
                      className="text-[11px] font-mono font-medium text-[#00C8FF] bg-[#00C8FF]/10 border border-[#00C8FF]/20 px-2.5 py-1 rounded-md"
                    >
                      {sig}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3-Column Problem Impact Approach Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                {/* 1. Problem */}
                <div className="p-4 rounded-xl bg-[#0A1D2E]/60 border border-white/[0.04]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F59E0B] uppercase font-bold mb-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Electrical Problem</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#9EADC0] leading-relaxed">
                    {ind.problem}
                  </p>
                </div>

                {/* 2. Operational Impact */}
                <div className="p-4 rounded-xl bg-[#0A1D2E]/60 border border-white/[0.04]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#EF4444] uppercase font-bold mb-2">
                    <Flame className="w-4 h-4 shrink-0" />
                    <span>Operational Impact</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#9EADC0] leading-relaxed">
                    {ind.impact}
                  </p>
                </div>

                {/* 3. VANNIC Approach */}
                <div className="p-4 rounded-xl bg-[#0A1D2E] border border-[#00C8FF]/20 shadow-[0_0_20px_-5px_rgba(0,200,255,0.08)]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00C8FF] uppercase font-bold mb-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>VANNIC Approach</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F5F8FC] leading-relaxed">
                    {ind.approach}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Assessment CTA */}
      <section className="py-20 bg-[#061321] border-t border-white/[0.06] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FACILITY EVALUATION"
            title="Evaluate Your Electrical Infrastructure"
            description="Our engineering team reviews single-line diagrams (SLDs), past nuisance tripping records, and maximum demand profiles to propose targeted preventive supervisory controls."
            align="center"
          />
          <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Request Facility Review
          </Button>
        </div>
      </section>
    </div>
  );
}
