import React from "react";
import Image from "next/image";
import { Cpu, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EdgeControllerVisualProps {
  className?: string;
  interactive?: boolean;
}

export function EdgeControllerVisual({ className }: EdgeControllerVisualProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl bg-[#081320]/95 border border-white/[0.12] p-5 sm:p-6 shadow-[0_16px_48px_rgba(0,0,0,0.7)] font-mono overflow-hidden backdrop-blur-md",
        className
      )}
    >
      {/* Top Header of Industrial Device */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0052FF]/20 to-[#00D2FF]/20 border border-[#00D2FF]/40 flex items-center justify-center p-1">
            <Image
              src="/brand/vannic-mark.png"
              alt="VANNIC"
              width={24}
              height={24}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-[#F5F8FC] tracking-wider flex items-center gap-2">
              <span>VANNIC INDUSTRIAL EDGE CONTROLLER</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/30">
                REV 2.4
              </span>
            </div>
            <div className="text-[10px] text-[#9EADC0]">
              DIN-RAIL EMBEDDED REAL-TIME ENGINE
            </div>
          </div>
        </div>

        {/* LED Status Bank with official colors */}
        <div className="flex items-center gap-2.5 text-[10px]">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#A6FF00] shadow-[0_0_8px_#A6FF00] animate-pulse" />
            <span className="text-[#9EADC0]">PWR</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#00D2FF] shadow-[0_0_8px_#00D2FF]" />
            <span className="text-[#9EADC0]">RS485</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#0052FF] shadow-[0_0_8px_#0052FF]" />
            <span className="text-[#9EADC0]">DETERMINISTIC</span>
          </div>
        </div>
      </div>

      {/* Internal Architecture Flow Representation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
        {/* Step 1: Ingestion */}
        <div className="p-3.5 rounded-lg bg-[#050B14] border border-white/[0.06] flex flex-col justify-between hover:border-[#00D2FF]/30 transition-colors">
          <div className="text-[11px] font-semibold text-[#00D2FF] mb-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#A6FF00]" />
            <span>01. SENSING INPUTS</span>
          </div>
          <div className="space-y-1.5 text-[10px] text-[#9EADC0]">
            <div className="flex justify-between items-center py-0.5 border-b border-white/[0.04]">
              <span>3-Phase CT Loops</span>
              <span className="text-[#F5F8FC] font-semibold">True-RMS</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-white/[0.04]">
              <span>Voltage Ref (415V)</span>
              <span className="text-[#A6FF00]">Nominal 50Hz</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span>Busbar Thermal Index</span>
              <span className="text-[#F5F8FC]">41.8°C [Safe]</span>
            </div>
          </div>
          <div className="mt-2 text-[9px] text-[#9EADC0] uppercase tracking-wider">
            Sub-Cycle Ingestion
          </div>
        </div>

        {/* Step 2: Edge Processing */}
        <div className="p-3.5 rounded-lg bg-[#050B14] border border-[#00D2FF]/30 relative overflow-hidden flex flex-col justify-between shadow-[0_0_20px_-4px_rgba(0,210,255,0.18)]">
          <div className="text-[11px] font-semibold text-[#F5F8FC] mb-2 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#0052FF]" />
            <span>02. LOCAL ENGINE</span>
          </div>
          <div className="space-y-1.5 text-[10px] text-[#9EADC0]">
            <div className="flex justify-between items-center py-0.5 border-b border-white/[0.04]">
              <span>Unbalance Delta</span>
              <span className="text-[#A6FF00] font-semibold">0.8% [Balanced]</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-white/[0.04]">
              <span>Pre-Trip Buffer</span>
              <span className="text-[#00D2FF]">Continuous Rec</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span>Offline Autonomy</span>
              <span className="text-[#A6FF00]">100% Deterministic</span>
            </div>
          </div>
          <div className="mt-2 text-[9px] text-gradient-brand uppercase tracking-wider font-bold">
            Zero Cloud Latency
          </div>
        </div>

        {/* Step 3: Preventive Control */}
        <div className="p-3.5 rounded-lg bg-[#050B14] border border-white/[0.06] flex flex-col justify-between hover:border-[#A6FF00]/30 transition-colors">
          <div className="text-[11px] font-semibold text-[#A6FF00] mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#A6FF00]" />
            <span>03. PREVENTIVE SHED</span>
          </div>
          <div className="space-y-1.5 text-[10px] text-[#9EADC0]">
            <div className="flex justify-between items-center py-0.5 border-b border-white/[0.04]">
              <span>Aux Vent Blower 01</span>
              <span className="text-[#F59E0B]">Staged Hold</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-white/[0.04]">
              <span>Secondary Chiller</span>
              <span className="text-[#A6FF00]">Interlocked</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span>Core Medical / Line</span>
              <span className="text-[#A6FF00] font-bold">Guarded</span>
            </div>
          </div>
          <div className="mt-2 text-[9px] text-[#9EADC0] uppercase tracking-wider">
            Approved Non-Critical Only
          </div>
        </div>
      </div>

      {/* Controller Bottom Terminal Strip Representation */}
      <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#9EADC0]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-xs bg-[#0052FF]" />
          <span>DIN-Rail 35mm Industrial Chassis</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#00D2FF]">
          <span>Modbus RTU / RS485 Native Link</span>
          <ArrowRight className="w-3 h-3" />
        </div>
        <div className="text-[10px] text-white/50">
          Galvanically Isolated Channels
        </div>
      </div>
    </div>
  );
}
