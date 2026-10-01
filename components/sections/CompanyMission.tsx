import React from "react";
import { SectionHeading } from "@/ui/SectionHeading";
import { COMPANY_CONTENT } from "@/content/company";
import { BRAND } from "@/lib/constants";
import { ShieldCheck, Cpu, HardDrive, Award } from "lucide-react";

export function CompanyMission() {
  const icons = [
    <Cpu key="cpu" className="w-5 h-5 text-[#00C8FF]" />,
    <HardDrive key="hd" className="w-5 h-5 text-[#1677FF]" />,
    <ShieldCheck key="sc" className="w-5 h-5 text-[#10B981]" />,
    <Award key="aw" className="w-5 h-5 text-[#00C8FF]" />,
  ];

  return (
    <section id="company" className="py-20 sm:py-28 bg-[#061321] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="ENGINEERING PHILOSOPHY"
          title={BRAND.companyName}
          description={BRAND.tagline}
          align="center"
        />

        {/* Mission Statement Box */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0A1D2E] border border-white/[0.1] max-w-4xl mx-auto mb-16 text-center shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00C8FF] mb-3 inline-block">
            COMPANY MISSION
          </span>
          <p className="text-base sm:text-lg lg:text-xl font-medium text-[#F5F8FC] leading-relaxed">
            &ldquo;{COMPANY_CONTENT.mission}&rdquo;
          </p>
        </div>

        {/* 4 Core Engineering Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMPANY_CONTENT.philosophy.map((item, idx) => (
            <div
              key={item.title}
              className="p-6 sm:p-7 rounded-xl bg-[#061321] border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0A1D2E] border border-white/10 flex items-center justify-center">
                    {icons[idx]}
                  </div>
                  <h3 className="text-lg font-bold text-[#F5F8FC]">{item.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#9EADC0] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
