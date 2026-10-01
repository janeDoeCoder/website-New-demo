import React from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/ui/SectionHeading";
import { Button } from "@/ui/Button";
import { COMPANY_CONTENT } from "@/content/company";
import { BRAND } from "@/lib/constants";
import { ArrowRight, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About VANNIC DYNAVION — Company & Mission",
  description:
    "Learn about VANNIC DYNAVION PRIVATE LIMITED, our engineering philosophy, and our mission to build intelligent, preventive electrical infrastructure systems.",
};

export default function AboutPage() {
  const whyElectrical = [
    {
      title: "The Heart of Modern Industry",
      description:
        "Every industrial manufacturing line, diagnostic hospital scanner, and commercial cold-room depends completely on electrical power quality. When electrical power fails, modern enterprise halts.",
    },
    {
      title: "The Unmonitored Blind Spot",
      description:
        "While plants spend fortunes on process automation, switchboards and motor feeders are often treated as dumb physical conduits, monitored only by coarse 15-minute billing meters.",
    },
    {
      title: "The Preventive Imperative",
      description:
        "Most electrical downtime is avoidable. Micro-sags, phase imbalance, and harmonic overheating show clear physical precursors prior to tripping. VANNIC captures these precursors and intervenes in time.",
    },
  ];

  const longTermDirection = [
    {
      phase: "Near Term",
      title: "Brownfield Switchgear Vigilance",
      description:
        "Equipping MSMEs, hospitals, and commercial facilities with non-intrusive edge controllers to prevent nuisance tripping and enforce approved non-critical load controls.",
    },
    {
      phase: "Medium Term",
      title: "Sub-Cycle Pre-Fault Waveform Libraries",
      description:
        "Developing specialized edge anomaly libraries that recognize early micro-arcing, motor winding insulation deterioration, and transformer core saturation before catastrophic faults occur.",
    },
    {
      phase: "Long Term",
      title: "Autonomous Microgrid Fleet Balancing",
      description:
        "Interconnecting multi-facility electrical intelligence to optimize captive DG sets, renewable solar feeds, and battery storage alongside standard utility power grids.",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* About Hero */}
      <section className="py-16 sm:py-24 bg-radial-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-[#00C8FF] uppercase mb-4 inline-block px-3 py-1 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/20">
              COMPANY OVERVIEW
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F8FC] tracking-tight leading-[1.12]">
              {BRAND.companyName}
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-[#9EADC0] leading-relaxed">
              {BRAND.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Contact Our Team
              </Button>
              <Button href="/platform" variant="secondary" size="lg" icon={<ChevronRight className="w-4 h-4" />}>
                Explore the Platform
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 sm:py-24 bg-[#040C15] border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00C8FF] mb-4 inline-block">
            OUR PURPOSE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5F8FC] leading-snug">
            &ldquo;{COMPANY_CONTENT.mission}&rdquo;
          </h2>
        </div>
      </section>

      {/* Why Electrical Infrastructure Matters */}
      <section className="py-20 sm:py-28 bg-[#061321] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="WHY IT MATTERS"
            title="The Critical Electrical Blind Spot"
            description="Electrical power distribution has changed dramatically with modern non-linear loads and electronic drives, yet monitoring tools have remained mostly passive."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyElectrical.map((item) => (
              <div
                key={item.title}
                className="p-6 sm:p-7 rounded-xl bg-[#0A1D2E] border border-white/[0.08] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#F5F8FC] mb-3">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#9EADC0] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Philosophy */}
      <section id="philosophy" className="py-20 sm:py-28 bg-[#040C15] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FOUNDATIONAL PRINCIPLES"
            title="Our Engineering Philosophy"
            description="How we approach hardware reliability, firmware determinism, and industrial software design."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMPANY_CONTENT.philosophy.map((item) => (
              <div
                key={item.title}
                className="p-6 sm:p-7 rounded-xl bg-[#061321] border border-white/[0.08] hover:border-white/[0.18] transition-all"
              >
                <h3 className="text-lg font-bold text-[#F5F8FC] mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#9EADC0] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long-Term Direction */}
      <section className="py-20 sm:py-28 bg-[#061321] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="PRODUCT ROADMAP"
            title="Long-Term Technology Direction"
            description="Our systematic path toward comprehensive industrial electrical intelligence."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {longTermDirection.map((step) => (
              <div
                key={step.phase}
                className="p-6 rounded-xl bg-[#0A1D2E] border border-white/[0.08] flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#00C8FF] uppercase tracking-wider block mb-2">
                    {step.phase}
                  </span>
                  <h3 className="text-base font-bold text-[#F5F8FC] mb-2">{step.title}</h3>
                  <p className="text-xs text-[#9EADC0] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Connect with VANNIC Leadership
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
