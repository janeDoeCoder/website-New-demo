import React from "react";
import { Zap, Cpu, ShieldCheck, LayoutDashboard, Radio, ArrowRight, ArrowDown, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ArchitectureDiagramProps {
  className?: string;
  variant?: "horizontal" | "stacked" | "auto";
}

export function ArchitectureDiagram({ className }: ArchitectureDiagramProps) {
  const stages = [
    {
      step: "01",
      layer: "Physical Layer",
      title: "Electrical Infrastructure",
      subtitle: "Switchgear & Busbars",
      specs: "415V / 11kV LT Panels • Incomer ACBs • MCCs",
      detail: "Three-phase incoming feeders, transformers, distribution panels, and inductive motor loads.",
      icon: <Zap className="w-5 h-5 text-[#0052FF]" />,
      accentColor: "border-[#0052FF]/30 bg-[#0052FF]/5 hover:border-[#0052FF]/60",
      badgeColor: "text-[#60A5FA] border-[#60A5FA]/30 bg-[#60A5FA]/10",
      signalText: "Raw 3-Phase AC Feed",
    },
    {
      step: "02",
      layer: "Sensing Layer",
      title: "Non-Intrusive Sensing",
      subtitle: "Split-Core Probes",
      specs: "True-RMS • 64+ Samples/Cycle • Class 0.5",
      detail: "Continuous sub-cycle current, voltage unbalance, power factor, and thermal signature ingestion.",
      icon: <Radio className="w-5 h-5 text-[#00D2FF]" />,
      accentColor: "border-[#00D2FF]/30 bg-[#00D2FF]/5 hover:border-[#00D2FF]/60",
      badgeColor: "text-[#00D2FF] border-[#00D2FF]/30 bg-[#00D2FF]/10",
      signalText: "High-Rate Telemetry",
    },
    {
      step: "03",
      layer: "Edge Layer",
      title: "Industrial Edge Controller",
      subtitle: "Deterministic Logic",
      specs: "< 20ms Response • Offline Autonomous Engine",
      detail: "Embedded anomaly detection running independently of cloud, WiFi, or external network availability.",
      icon: <Cpu className="w-5 h-5 text-[#A6FF00]" />,
      accentColor: "border-[#A6FF00]/40 bg-[#081320] ring-1 ring-[#A6FF00]/30 shadow-[0_0_25px_-5px_rgba(166,255,0,0.18)]",
      badgeColor: "text-[#A6FF00] border-[#A6FF00]/40 bg-[#A6FF00]/10 font-bold",
      highlight: true,
      signalText: "Pre-Fault Interlock",
    },
    {
      step: "04",
      layer: "Control Layer",
      title: "Preventive Load Control",
      subtitle: "Supervisory Interlocks",
      specs: "Dry Contacts • Modbus RTU/TCP • Priority Tiers",
      detail: "Autonomous staged shedding of approved non-critical auxiliary loads before main capacity trips.",
      icon: <ShieldCheck className="w-5 h-5 text-[#00D2FF]" />,
      accentColor: "border-[#00D2FF]/30 bg-[#00D2FF]/5 hover:border-[#00D2FF]/60",
      badgeColor: "text-[#00D2FF] border-[#00D2FF]/30 bg-[#00D2FF]/10",
      signalText: "Secure Cloud Uplink",
    },
    {
      step: "05",
      layer: "Supervisory Layer",
      title: "VANNIC GRiDMiND",
      subtitle: "Facility Console",
      specs: "Sub-Second Telemetry • Waveform Forensic Logs",
      detail: "Centralized visibility, event timeline reconstruction, and multi-site electrical fleet benchmarking.",
      icon: <LayoutDashboard className="w-5 h-5 text-[#0052FF]" />,
      accentColor: "border-[#0052FF]/30 bg-[#0052FF]/5 hover:border-[#0052FF]/60",
      badgeColor: "text-[#0052FF] border-[#0052FF]/30 bg-[#0052FF]/10",
      signalText: "Active Supervision",
    },
  ];

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Industrial System Architecture Flow */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 lg:gap-4 relative items-stretch">
        {stages.map((item, idx) => (
          <div key={item.step} className="flex flex-col relative group">
            {/* Stage Card */}
            <div
              className={cn(
                "p-5 rounded-2xl border transition-all duration-300 flex-1 flex flex-col justify-between relative overflow-hidden",
                item.accentColor,
                item.highlight
                  ? "bg-[#081320]"
                  : "bg-[#050B14] hover:bg-[#07111D]"
              )}
            >
              {/* Subtle top indicator bar */}
              <div
                className={cn(
                  "absolute top-0 left-0 right-0 h-0.5 opacity-60",
                  item.highlight
                    ? "bg-gradient-to-r from-[#00D2FF] via-[#A6FF00] to-[#0052FF]"
                    : "bg-white/10 group-hover:bg-[#00D2FF]/40"
                )}
              />

              <div>
                {/* Header: Layer & Step */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#9EADC0]">
                      {item.layer}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider mt-1 inline-block w-fit",
                        item.badgeColor
                      )}
                    >
                      STAGE {item.step}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#050B14] border border-white/10 shadow-sm shrink-0">
                    {item.icon}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h4 className="text-sm font-bold text-[#F5F8FC] leading-snug group-hover:text-white transition-colors">
                  {item.title}
                </h4>
                <div className="text-[11px] font-mono text-[#00D2FF] mt-0.5 mb-2 font-medium">
                  {item.subtitle}
                </div>

                {/* Technical Specifications Tag */}
                <div className="text-[10px] font-mono text-[#9EADC0] bg-white/[0.04] border border-white/[0.06] rounded px-2 py-1 mb-3">
                  {item.specs}
                </div>
              </div>

              {/* Description & Technical Detail */}
              <div className="pt-2.5 border-t border-white/[0.08] mt-2">
                <p className="text-xs text-[#9EADC0] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>

            {/* Connecting Telemetry Conduit (Desktop & Mobile) */}
            {idx < stages.length - 1 && (
              <>
                {/* Desktop Directional Pulse Conduit */}
                <div className="hidden md:flex absolute -right-2.5 lg:-right-3 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-[#050B14] border border-white/20 items-center justify-center text-[#00D2FF] shadow-sm">
                  <ArrowRight className="w-3 h-3" />
                </div>
                {/* Mobile Conduit */}
                <div className="flex md:hidden justify-center my-2 text-[#00D2FF]">
                  <ArrowDown className="w-4 h-4 animate-pulse" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Industrial Context Legend / Architectural Guarantee */}
      <div className="p-3.5 rounded-xl bg-[#061321] border border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#9EADC0]">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#A6FF00] shrink-0" />
          <span>
            <strong className="text-white">Deterministic Edge Execution:</strong> Anomaly detection & preventive shedding cycle in &lt; 20ms without relying on cloud availability.
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            Continuous Supply
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00D2FF]" />
            Split-Core Ingestion
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#A6FF00]" />
            Autonomous Local Edge
          </span>
        </div>
      </div>
    </div>
  );
}
