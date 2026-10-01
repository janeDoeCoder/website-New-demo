import React from "react";
import { SectionHeading } from "@/ui/SectionHeading";
import { BROWNFIELD_PILLARS } from "@/content/features";
import { Wrench, ShieldCheck } from "lucide-react";
import { Button } from "@/ui/Button";

export function Brownfield() {
  return (
    <section id="brownfield" className="py-20 sm:py-28 bg-[#040C15] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="NON-INTRUSIVE RETROFIT"
          title="Engineered for Existing Brownfield Switchgear"
          description="Industrial plants cannot shut down production for weeks to rebuild electrical rooms. VANNIC is architected to deploy directly alongside your established electrical assets."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {BROWNFIELD_PILLARS.map((pillar) => (
            <div
              key={pillar.step}
              className="p-6 rounded-xl bg-[#061321] border border-white/[0.08] hover:border-[#1677FF]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-sm font-bold text-[#00C8FF]">
                    {pillar.step}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#0A1D2E] border border-white/10 flex items-center justify-center text-[#1677FF]">
                    <Wrench className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#F5F8FC] mb-2">{pillar.title}</h3>
                <p className="text-xs text-[#9EADC0] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Brownfield Engineering Guarantee Card */}
        <div className="p-8 rounded-2xl bg-[#0A1D2E] border border-white/[0.12] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#F5F8FC] mb-1">
                Zero Disruption to Existing Circuit Protection
              </h4>
              <p className="text-xs sm:text-sm text-[#9EADC0] max-w-2xl leading-relaxed">
                VANNIC operates alongside certified circuit breakers and protection relays without modifying their thermal-magnetic or electronic trip units. Protection coordination remains 100% compliant.
              </p>
            </div>
          </div>
          <Button href="/contact" variant="primary" className="shrink-0">
            Request Site Evaluation
          </Button>
        </div>
      </div>
    </section>
  );
}
