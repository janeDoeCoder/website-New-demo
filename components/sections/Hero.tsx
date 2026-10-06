import React from "react";
import Image from "next/image";
import { ArrowRight, ChevronRight, ShieldCheck, Cpu, Zap, Activity } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { Button } from "@/ui/Button";
import { GridMindPanel } from "@/visuals/GridMindPanel";
import { ElectricalShaderBackground } from "@/visuals/ElectricalShaderBackground";
import { BorderBeam } from "@/ui/BorderBeam";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32 bg-[#020408]">
      {/* Interactive WebGL-style Canvas Wave Shader (animmasterlib style) */}
      <ElectricalShaderBackground />

      {/* Atmospheric radial ambient light */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#0052FF]/12 via-[#00D2FF]/06 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-[#A6FF00]/04 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Messaging & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Eyebrow with Official Brand Mark */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#040810]/95 border border-[#00D2FF]/30 text-xs font-mono font-semibold tracking-wider mb-6 shadow-[0_0_20px_-3px_rgba(0,210,255,0.25)]">
              <div className="w-4 h-4 relative">
                <Image
                  src="/brand/vannic-mark.png"
                  alt="VANNIC"
                  width={16}
                  height={16}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[#00D2FF]">{BRAND.hero.eyebrow}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A6FF00] animate-pulse" />
              <span className="text-[10px] text-[#9EADC0] border-l border-white/20 pl-2 uppercase">
                {BRAND.hero.edgeSeriesLabel}
              </span>
            </div>

            {/* Exact Headline from PRD with Brand Tri-Color Gradient */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#F5F8FC] leading-[1.10]">
              {BRAND.hero.headlineLine1}
              <span className="block text-gradient-brand mt-1.5 pb-1">
                {BRAND.hero.headlineLine2}
              </span>
            </h1>

            {/* Exact Supporting copy from PRD */}
            <p className="mt-6 text-base sm:text-lg text-[#9EADC0] leading-relaxed max-w-xl font-normal">
              {BRAND.hero.description}
            </p>

            {/* Small target audience line */}
            <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-mono text-[#00D2FF]/95">
              <span className="w-2 h-2 rounded-full bg-[#A6FF00]" />
              <span>{BRAND.hero.targetAudienceNote}</span>
            </div>

            {/* CTAs with micro-shine effect */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                className="bg-gradient-to-r from-[#0052FF] via-[#0088FF] to-[#00D2FF] hover:from-[#0066FF] hover:to-[#00E5FF] shadow-[0_4px_24px_rgba(0,136,255,0.45)] hover:shadow-[0_6px_32px_rgba(0,210,255,0.65)]"
              >
                {BRAND.hero.primaryCta}
              </Button>
              <Button
                href="/platform"
                variant="secondary"
                size="lg"
                icon={<ChevronRight className="w-4 h-4" />}
                className="border-white/15 hover:border-[#00D2FF]/40 bg-[#081320]/80"
              >
                {BRAND.hero.secondaryCta}
              </Button>
            </div>

            {/* Hardware + Edge + Software reassurance badges with subtle glow */}
            <div className="mt-10 pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 w-full">
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-[#9EADC0] uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#A6FF00]" />
                  Sensors
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#F5F8FC] mt-0.5">
                  True-RMS 3-Phase
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-[#9EADC0] uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#00D2FF]" />
                  Edge Engine
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#F5F8FC] mt-0.5">
                  Sub-Cycle Local Logic
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-[#9EADC0] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0052FF]" />
                  Control
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#F5F8FC] mt-0.5">
                  Pre-Trip Load Shed
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Primary Visual — GRiDMiND Console */}
          <div className="lg:col-span-6 flex flex-col gap-4 relative">
            {/* Visual Header Note */}
            <div className="flex items-center justify-between px-2 text-xs font-mono text-[#9EADC0]">
              <span className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#A6FF00] animate-pulse" />
                <span className="text-[#F5F8FC] font-semibold">GRIDMIND SUPERVISORY CONSOLE</span>
              </span>
              <span className="text-[11px] font-semibold text-gradient-brand">
                HARDWARE ⇄ CLOUD
              </span>
            </div>

            {/* GRiDMiND Console — Primary Visual with BorderBeam */}
            <div className="relative rounded-2xl p-0.5 overflow-hidden">
              <BorderBeam
                size={120}
                duration={5}
                colorFrom="#0052FF"
                colorTo="#00D2FF"
                borderWidth={1.5}
              />
              <GridMindPanel variant="hero" className="w-full" />
            </div>

            {/* Edge Controller — Compact Status Strip */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#040C15] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#9EADC0] shrink-0">
                <Cpu className="w-3.5 h-3.5 text-[#A6FF00]" />
                <span className="text-[#F5F8FC] font-semibold">EDGE CONTROLLER</span>
              </div>
              <div className="w-px h-4 bg-white/10 shrink-0" />
              <div className="flex items-center gap-4 text-[11px] font-mono text-[#9EADC0] overflow-x-auto">
                <span className="flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  DIN-Rail Mounted
                </span>
                <span className="flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
                  Sub-Cycle Sampling
                </span>
                <span className="flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A6FF00]" />
                  Offline Autonomous
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
