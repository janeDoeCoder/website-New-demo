import React from "react";
import { SectionHeading } from "@/ui/SectionHeading";
import { ShieldAlert, ArrowRight, Zap, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/ui/Button";

export function PreventiveControl() {
  const priorityTiers = [
    {
      tier: "Tier 1",
      name: "Critical Operations Feeder",
      policy: "NEVER SHED",
      color: "border-[#10B981]/40 bg-[#10B981]/10 text-[#10B981]",
      examples: "Intensive care units, continuous furnace drives, clean-room ventilation, automated robotic assembly.",
      statusText: "Continuous Uninterrupted Supply Priority",
      action: "Protected by hardcoded hardware interlocks from shedding under any circumstance.",
    },
    {
      tier: "Tier 2",
      name: "Semi-Critical Equipment",
      policy: "STAGED SURVEILLANCE",
      color: "border-[#00D2FF]/40 bg-[#00D2FF]/10 text-[#00D2FF]",
      examples: "Main chilled water pumps, plant air compressors, logistics conveyors, standard facility risers.",
      statusText: "Interlocked startup sequencing to eliminate high concurrent inrush",
      action: "Permitted soft-cycling and dynamic inrush throttling during feeder stress.",
    },
    {
      tier: "Tier 3",
      name: "Approved Non-Critical Loads",
      policy: "PRE-TRIP SHEDDING ENABLED",
      color: "border-[#F59E0B]/40 bg-[#F59E0B]/10 text-[#F59E0B]",
      examples: "Auxiliary ventilation blowers, secondary water heaters, decorative façade lighting, non-essential laundry banks.",
      statusText: "Shed automatically before sanctioned demand or thermal limits trigger main breaker trips",
      action: "Shed in {'<'} 30ms via deterministic dry contact to keep total feeder under capacity limits.",
    },
  ];

  return (
    <section id="preventive-control" className="py-20 sm:py-28 bg-[#061321] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="PREVENTIVE SUPERVISION"
          title="Supervisory Load Control Before Avoidable Interruptions Occur"
          description="A tripped main circuit breaker halts the entire facility. VANNIC protects critical operational continuity by supervising approved non-critical auxiliary loads at the edge."
          align="center"
        />

        {/* Siemens-Style Single-Line Supervisory Sequence */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-[#081320] border border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.08]">
            <div>
              <span className="text-xs font-mono text-[#00D2FF] tracking-wider uppercase block mb-1">
                SINGLE-LINE SUPERVISORY LOGIC (SLD)
              </span>
              <h3 className="text-lg font-bold text-[#F5F8FC]">
                Autonomous Incomer Protection Sequence
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#A6FF00] bg-[#A6FF00]/10 border border-[#A6FF00]/20 px-3 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-[#A6FF00] animate-pulse" />
              <span>Edge Anomaly Interlock Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1: Normal Incomer Load */}
            <div className="p-4 rounded-xl bg-[#050B14] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono text-[#9EADC0] mb-1">STEP 01 • INGESTION</div>
                <div className="text-sm font-bold text-[#F5F8FC] mb-1">415V Incomer LT Bus</div>
                <p className="text-xs text-[#9EADC0]">Split-core CTs sample True-RMS current & active harmonic drift.</p>
              </div>
              <div className="mt-3 pt-2 border-t border-white/[0.06] text-[11px] font-mono text-[#10B981]">
                Baseline: Balanced (68% kVA)
              </div>
            </div>

            {/* Step 2: Demand Surge Detected */}
            <div className="p-4 rounded-xl bg-[#050B14] border border-[#F59E0B]/30 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono text-[#F59E0B] mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>STEP 02 • THRESHOLD RISK</span>
                </div>
                <div className="text-sm font-bold text-[#F5F8FC] mb-1">Surge Event Approaching</div>
                <p className="text-xs text-[#9EADC0]">Multiple compressors switch on concurrently. Load reaches 92% breaker threshold.</p>
              </div>
              <div className="mt-3 pt-2 border-t border-white/[0.06] text-[11px] font-mono text-[#F59E0B]">
                Risk: Imminent Main Breaker Trip
              </div>
            </div>

            {/* Step 3: Edge Pre-Trip Shed */}
            <div className="p-4 rounded-xl bg-[#081320] border border-[#00D2FF]/40 shadow-[0_0_20px_rgba(0,210,255,0.15)] flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono text-[#00D2FF] mb-1 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>STEP 03 • EDGE INTERLOCK</span>
                </div>
                <div className="text-sm font-bold text-[#00D2FF] mb-1">Tier-3 Shed Executed</div>
                <p className="text-xs text-[#9EADC0]">Edge controller triggers dry-contact interlock, shedding approved non-critical heaters in {'<'} 28ms.</p>
              </div>
              <div className="mt-3 pt-2 border-t border-white/[0.06] text-[11px] font-mono text-[#00D2FF]">
                Deterministic Response: {'<'} 28ms
              </div>
            </div>

            {/* Step 4: Facility Continuity Preserved */}
            <div className="p-4 rounded-xl bg-[#050B14] border border-[#10B981]/30 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono text-[#10B981] mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>STEP 04 • CONTINUITY SAVED</span>
                </div>
                <div className="text-sm font-bold text-[#F5F8FC] mb-1">Main Incomer Protected</div>
                <p className="text-xs text-[#9EADC0]">Load drops back to 78%. Critical Tier-1 manufacturing lines run without a flicker.</p>
              </div>
              <div className="mt-3 pt-2 border-t border-white/[0.06] text-[11px] font-mono text-[#10B981]">
                Zero Outage • Surcharge Avoided
              </div>
            </div>
          </div>
        </div>

        {/* Priority Tiers Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {priorityTiers.map((tier) => (
            <div
              key={tier.tier}
              className="p-6 sm:p-7 rounded-xl bg-[#0A1D2E] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase font-bold text-[#F5F8FC]">
                    {tier.tier}
                  </span>
                  <span
                    className={`font-mono text-[11px] font-bold px-2.5 py-0.5 rounded border ${tier.color}`}
                  >
                    {tier.policy}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#F5F8FC] mb-2">{tier.name}</h3>
                <p className="text-xs text-[#9EADC0] mb-4 leading-relaxed">
                  <strong className="text-white/80">Examples:</strong> {tier.examples}
                </p>
                <div className="text-xs text-[#9EADC0] bg-black/20 p-2.5 rounded border border-white/5">
                  <strong className="text-white block font-mono text-[11px] mb-1">Supervisory Rule:</strong>
                  {tier.action}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] mt-4 text-xs font-mono text-[#00C8FF]/90">
                {tier.statusText}
              </div>
            </div>
          ))}
        </div>

        {/* Preventive Logic Architecture Callout */}
        <div className="p-8 rounded-2xl bg-[#0A1D2E]/80 border border-white/[0.12] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D2FF] mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>SAFETY ARCHITECTURE PRINCIPLE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F5F8FC] mb-3">
              Focused Electrical Intelligence — Designed to Complement Existing Automation
            </h3>
            <p className="text-sm text-[#9EADC0] leading-relaxed">
              VANNIC does not claim to replace all PLC, BMS, or plant SCADA systems. Instead, it provides a dedicated, highly reliable electrical supervisory layer for commercial and industrial facilities. Load control is strictly restricted to approved non-critical circuits that facility managers designate, ensuring zero disruption to core manufacturing or healthcare processes.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <Button href="/contact" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
              Discuss Facility Pilot
            </Button>
            <Button href="/technology" variant="secondary">
              View Control Hardware
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
