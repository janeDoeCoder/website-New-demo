import React from "react";
import { SectionHeading } from "@/ui/SectionHeading";
import { COMPARISON_DATA } from "@/content/features";
import { CheckCircle2, Info } from "lucide-react";

export function Comparison() {
  return (
    <section className="py-20 sm:py-28 bg-[#040C15] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="SYSTEM DIFFERENTIATION"
          title="How VANNIC Compares to Existing Tools"
          description="VANNIC is neither a passive energy meter nor a cumbersome whole-plant automation rebuild. It is a dedicated electrical infrastructure intelligence layer."
          align="center"
        />

        {/* Technical Positioning Note */}
        <div className="mb-10 p-4 rounded-xl bg-[#061321] border border-white/[0.08] flex items-start gap-3 max-w-3xl mx-auto text-xs sm:text-sm text-[#9EADC0]">
          <Info className="w-5 h-5 text-[#00C8FF] shrink-0 mt-0.5" />
          <p>
            VANNIC does not seek to replace PLCs or complete SCADA systems. It provides focused electrical vigilance, True-RMS risk detection, and preventive auxiliary load supervisory control to complement established facility equipment.
          </p>
        </div>

        {/* Desktop Comparison Table */}
        <div className="hidden lg:block overflow-hidden rounded-2xl border border-white/[0.08] bg-[#061321]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#0A1D2E]/90 text-xs font-mono uppercase tracking-wider text-[#9EADC0]">
                <th className="py-4 px-6 w-1/4">Evaluation Parameter</th>
                <th className="py-4 px-6 w-1/4">Basic Digital Meter</th>
                <th className="py-4 px-6 w-1/4">Plant PLC / SCADA / BMS</th>
                <th className="py-4 px-6 w-1/4 bg-[#1677FF]/15 text-[#00C8FF] font-bold border-l border-white/[0.08]">
                  VANNIC GRiDMiND + Edge
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-xs sm:text-sm">
              {COMPARISON_DATA.map((row) => (
                <tr key={row.dimension} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#F5F8FC]">
                    {row.dimension}
                  </td>
                  <td className="py-4 px-6 text-[#9EADC0]">
                    {row.basicMeter}
                  </td>
                  <td className="py-4 px-6 text-[#9EADC0]">
                    {row.scadaBms}
                  </td>
                  <td className="py-4 px-6 bg-[#1677FF]/5 border-l border-white/[0.08] text-[#F5F8FC]">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00C8FF] shrink-0 mt-0.5" />
                      <span>{row.vannic}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Responsive Cards */}
        <div className="lg:hidden space-y-5">
          {COMPARISON_DATA.map((row) => (
            <div
              key={row.dimension}
              className="p-5 rounded-xl bg-[#061321] border border-white/[0.08] space-y-3"
            >
              <h3 className="text-base font-bold text-[#F5F8FC] border-b border-white/[0.06] pb-2">
                {row.dimension}
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-mono text-[#9EADC0] uppercase text-[10px] block">
                    Basic Meter:
                  </span>
                  <span className="text-[#9EADC0]">{row.basicMeter}</span>
                </div>
                <div>
                  <span className="font-mono text-[#9EADC0] uppercase text-[10px] block">
                    Heavy SCADA / PLC / BMS:
                  </span>
                  <span className="text-[#9EADC0]">{row.scadaBms}</span>
                </div>
                <div className="pt-2 border-t border-white/[0.06] bg-[#1677FF]/10 -mx-5 -mb-5 p-4 rounded-b-xl">
                  <span className="font-mono text-[#00C8FF] uppercase text-[10px] font-bold block mb-1">
                    VANNIC Solution:
                  </span>
                  <span className="text-[#F5F8FC] font-medium">{row.vannic}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
