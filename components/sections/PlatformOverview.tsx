import React from "react";
import { SectionHeading } from "@/ui/SectionHeading";
import { GridMindPanel } from "@/visuals/GridMindPanel";
import { Activity, Clock, ShieldCheck, BarChart3, Database, Layers } from "lucide-react";
import { BRAND } from "@/lib/constants";

export function PlatformOverview() {
  const capabilities = [
    {
      icon: <Activity className="w-5 h-5 text-[#00C8FF]" />,
      title: "Real-Time Electrical Telemetry",
      description:
        "Monitors voltage, current, active/reactive power, power factor, frequency, and THD across distribution feeders with millisecond resolution.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#10B981]" />,
      title: "Preventive Load Control",
      description:
        "Interlocks with approved non-critical loads to stage or shed power draw before main capacity or contract demand limits are breached.",
    },
    {
      icon: <Clock className="w-5 h-5 text-[#1677FF]" />,
      title: "Pre-Fault Forensic Recording",
      description:
        "Sub-cycle waveform snapshots preserved on local edge storage before and during anomalous electrical excursions.",
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-[#00C8FF]" />,
      title: "Demand & Tariff Optimization",
      description:
        "Tracks windowed kVA demand curves to prevent severe utility maximum demand penalties and power factor surcharges.",
    },
    {
      icon: <Database className="w-5 h-5 text-[#1677FF]" />,
      title: "Edge-to-Cloud Synchronization",
      description:
        "Robust store-and-forward telemetry protocol ensures zero data loss during facility internet connectivity interruptions.",
    },
    {
      icon: <Layers className="w-5 h-5 text-[#10B981]" />,
      title: "Multi-Panel Fleet Oversight",
      description:
        "Provides single-pane-of-glass supervision across all facility switchgear, secondary distribution boards, and remote campuses.",
    },
  ];

  return (
    <section id="platform" className="py-20 sm:py-28 bg-[#020408] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="PLATFORM INTELLIGENCE"
          title={BRAND.productName}
          description="A unified supervisory intelligence platform designed specifically for commercial and industrial electrical infrastructure."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left: Interactive/Visual Representation of GRiDMiND */}
          <div className="lg:col-span-7">
            <div className="text-xs font-mono text-[#9EADC0] mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                CENTRAL SUPERVISORY CONSOLE
              </span>
              <span className="text-[11px] text-[#00C8FF]">TRUE-RMS INGESTION</span>
            </div>
            <GridMindPanel />
          </div>

          {/* Right: Key Value Attributes */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl bg-[#040812] border border-white/[0.08]">
              <h3 className="text-lg font-bold text-[#F5F8FC] mb-2">
                Engineered for Electrical Credibility
              </h3>
              <p className="text-sm text-[#9EADC0] leading-relaxed">
                GRiDMiND is built for plant engineers, facility managers, and electrical consultants who demand precision. It replaces vague dashboard widgets with actionable True-RMS telemetry, phase unbalance indexes, and deterministic load interlocking.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#040812] border border-white/[0.08]">
              <h3 className="text-lg font-bold text-[#F5F8FC] mb-2">
                Autonomous Local Safeguards
              </h3>
              <p className="text-sm text-[#9EADC0] leading-relaxed">
                Even if network connectivity drops, local VANNIC edge controllers continue monitoring switchgear and enforcing approved load supervisory rules without skipping a single electrical cycle.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="p-6 rounded-xl bg-[#040812] border border-white/[0.08] hover:border-[#00C8FF]/30 hover:bg-[#060D1A] transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-[#020408] border border-white/10 flex items-center justify-center mb-4">
                {cap.icon}
              </div>
              <h4 className="text-base font-semibold text-[#F5F8FC] mb-2">{cap.title}</h4>
              <p className="text-xs sm:text-sm text-[#9EADC0] leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
