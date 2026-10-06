import React from "react";
import Image from "next/image";
import { Activity, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GridMindPanelProps {
  className?: string;
  variant?: "hero" | "full";
}

export function GridMindPanel({ className, variant = "full" }: GridMindPanelProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-[#06101E]/95 border border-white/[0.12] p-5 sm:p-6 shadow-[0_16px_48px_rgba(0,0,0,0.75)] font-mono backdrop-blur-md relative overflow-hidden",
        className
      )}
    >
      {/* Top Console Bar */}
      <div className="flex flex-wrap items-center justify-between pb-3.5 border-b border-white/[0.08] gap-2">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 relative shrink-0">
            <Image
              src="/brand/vannic-mark.png"
              alt="VANNIC"
              width={28}
              height={28}
              className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider text-[#F5F8FC]">
                GRiDMiND SUPERVISORY ENGINE
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-gradient-to-r from-[#0052FF]/20 to-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/30 font-semibold">
                LIVE TELEMETRY
              </span>
            </div>
          </div>
        </div>
        <div className="text-[11px] text-[#9EADC0] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#A6FF00] animate-pulse" />
          <span>FEEDER: <strong className="text-[#F5F8FC]">MAIN INCOMING L-4</strong></span>
        </div>
      </div>

      {/* Concise Mobile Preview (Hero Only) */}
      {variant === "hero" && (
        <div className="sm:hidden flex items-center justify-between p-3 rounded-lg bg-[#050B14] border border-[#00D2FF]/30 my-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00D2FF]" />
            <span className="text-xs font-bold text-[#F5F8FC]">3-Phase System Balanced</span>
          </div>
          <span className="text-[11px] font-mono text-[#A6FF00]">415V Nominal</span>
        </div>
      )}

      {/* 3-Phase Electrical Parameter Bank with Phase Colors */}
      <div className={cn(
        "my-4 gap-2 sm:gap-3",
        variant === "hero" 
          ? "hidden sm:grid sm:grid-cols-3" 
          : "flex overflow-x-auto snap-x snap-mandatory pb-2 sm:pb-0 sm:grid sm:grid-cols-3 hide-scrollbar"
      )}>
        {/* Phase R */}
        <div className="min-w-[85%] sm:min-w-0 snap-start shrink-0 p-3 rounded-lg bg-[#050B14] border border-white/[0.06] hover:border-[#EF4444]/40 transition-colors">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-[#EF4444] px-1.5 py-0.2 rounded bg-[#EF4444]/10 border border-[#EF4444]/30">
              R-PHASE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#A6FF00]" />
          </div>
          <div className="text-base sm:text-lg font-bold text-[#F5F8FC] tracking-tight">
            239.4 <span className="text-[10px] font-normal text-[#9EADC0]">V</span>
          </div>
          <div className="text-[11px] text-[#9EADC0] mt-0.5 flex justify-between">
            <span>184.2 A</span>
            <span className="text-[9px] text-[#A6FF00]">PF 0.98</span>
          </div>
        </div>

        {/* Phase Y */}
        <div className="min-w-[85%] sm:min-w-0 snap-start shrink-0 p-3 rounded-lg bg-[#050B14] border border-white/[0.06] hover:border-[#F59E0B]/40 transition-colors">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-[#F59E0B] px-1.5 py-0.2 rounded bg-[#F59E0B]/10 border border-[#F59E0B]/30">
              Y-PHASE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#A6FF00]" />
          </div>
          <div className="text-base sm:text-lg font-bold text-[#F5F8FC] tracking-tight">
            240.1 <span className="text-[10px] font-normal text-[#9EADC0]">V</span>
          </div>
          <div className="text-[11px] text-[#9EADC0] mt-0.5 flex justify-between">
            <span>182.8 A</span>
            <span className="text-[9px] text-[#A6FF00]">PF 0.99</span>
          </div>
        </div>

        {/* Phase B */}
        <div className="min-w-[85%] sm:min-w-0 snap-start shrink-0 p-3 rounded-lg bg-[#050B14] border border-white/[0.06] hover:border-[#00D2FF]/40 transition-colors">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-[#00D2FF] px-1.5 py-0.2 rounded bg-[#00D2FF]/10 border border-[#00D2FF]/30">
              B-PHASE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#A6FF00]" />
          </div>
          <div className="text-base sm:text-lg font-bold text-[#F5F8FC] tracking-tight">
            238.9 <span className="text-[10px] font-normal text-[#9EADC0]">V</span>
          </div>
          <div className="text-[11px] text-[#9EADC0] mt-0.5 flex justify-between">
            <span>185.1 A</span>
            <span className="text-[9px] text-[#A6FF00]">PF 0.98</span>
          </div>
        </div>
      </div>

      {/* Aggregated System Indicators */}
      <div className={cn("gap-2 mb-4", variant === "hero" ? "hidden sm:grid sm:grid-cols-4" : "grid grid-cols-2 sm:grid-cols-4")}>
        <div className="p-2.5 rounded bg-[#050B14]/90 border border-white/[0.04]">
          <div className="text-[10px] text-[#9EADC0] uppercase">True Power Factor</div>
          <div className="text-sm font-bold text-[#A6FF00] mt-0.5">0.985 Ind</div>
        </div>
        <div className="p-2.5 rounded bg-[#050B14]/90 border border-white/[0.04]">
          <div className="text-[10px] text-[#9EADC0] uppercase">Grid Frequency</div>
          <div className="text-sm font-bold text-[#F5F8FC] mt-0.5">50.02 Hz</div>
        </div>
        <div className="p-2.5 rounded bg-[#050B14]/90 border border-white/[0.04]">
          <div className="text-[10px] text-[#9EADC0] uppercase">Active Demand</div>
          <div className="text-sm font-bold text-[#00D2FF] mt-0.5">128.4 kW</div>
        </div>
        <div className="p-2.5 rounded bg-[#050B14]/90 border border-white/[0.04]">
          <div className="text-[10px] text-[#9EADC0] uppercase">Harmonic THD_v</div>
          <div className="text-sm font-bold text-[#A6FF00] mt-0.5">1.8% [Safe]</div>
        </div>
      </div>

      {/* Priority Load Management Strip */}
      <div className={cn("p-3 rounded-lg bg-[#050B14] border border-white/[0.06] mb-3", variant === "hero" ? "hidden lg:block" : "block")}>
        <div className="flex items-center justify-between text-[11px] mb-2">
          <span className="font-semibold text-[#F5F8FC] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00D2FF]" />
            LOAD SUPERVISION & PREVENTIVE THRESHOLDS
          </span>
          <span className="text-[10px] text-[#A6FF00] font-bold">SYSTEM BALANCED</span>
        </div>

        <div className="space-y-1.5 text-[10px]">
          <div className="flex items-center justify-between py-1 px-2.5 rounded bg-white/[0.02] border-l-2 border-[#A6FF00]">
            <span className="text-[#9EADC0]">Priority 1: Core Process & Healthcare Feeders</span>
            <span className="text-[#A6FF00] font-semibold">PROTECTED // LOCKED</span>
          </div>
          <div className="flex items-center justify-between py-1 px-2.5 rounded bg-white/[0.02] border-l-2 border-[#00D2FF]">
            <span className="text-[#9EADC0]">Priority 2: Secondary Chiller / Motor Banks</span>
            <span className="text-[#00D2FF]">SURVEILLANCE ACTIVE</span>
          </div>
          <div className="flex items-center justify-between py-1 px-2.5 rounded bg-white/[0.02] border-l-2 border-[#F59E0B]">
            <span className="text-[#9EADC0]">Priority 3: Approved Non-Critical Aux Loads</span>
            <span className="text-[#F59E0B]">PRE-TRIP INTERLOCK READY</span>
          </div>
        </div>
      </div>

      {/* Bottom Forensic Event State */}
      <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-[#9EADC0]">
        <div className="flex items-center gap-1.5 text-[#00D2FF]">
          <Activity className="w-3.5 h-3.5" />
          <span>Sub-cycle Event Pre-Buffer: Armed</span>
        </div>
        <div className="text-[9px] text-[#9EADC0] italic">
          Demonstration engineering data
        </div>
      </div>
    </div>
  );
}
