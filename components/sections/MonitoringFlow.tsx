import React from "react";
import { SectionHeading } from "@/ui/SectionHeading";
import { ArchitectureDiagram } from "@/visuals/ArchitectureDiagram";
import { CheckCircle2 } from "lucide-react";

export function MonitoringFlow() {
  const lifecycleSteps = [
    {
      num: "01",
      title: "Monitor",
      description: "Continuous True-RMS sampling of 3-phase voltages, currents, harmonics, and thermal signatures.",
      badge: "Real-Time Telemetry",
    },
    {
      num: "02",
      title: "Detect",
      description: "Autonomous edge algorithms compute unbalance drift, peak demand spikes, and harmonic degradation.",
      badge: "Edge Computation",
    },
    {
      num: "03",
      title: "Analyze",
      description: "Local pre-fault buffers capture sub-cycle waveform deviations before conventional meters register them.",
      badge: "Forensic Analysis",
    },
    {
      num: "04",
      title: "Act",
      description: "Executes priority-based interlocks on approved non-critical auxiliary loads before breaker tripping occurs.",
      badge: "Preventive Control",
    },
    {
      num: "05",
      title: "Verify",
      description: "Validates feeder restoration, logs event timestamps to GRiDMiND, and alerts facility engineers.",
      badge: "Verification & Audit",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#040C15] border-y border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="OPERATIONAL PARADIGM"
          title="More Than Electrical Monitoring. Preventive Action."
          description="Traditional digital meters passively record consumption after outages happen. VANNIC bridges the critical operational gap between passive metering and catastrophic protection."
          align="center"
        />

        {/* Comparison: The Reactive Failure Loop vs The VANNIC Preventive Approach */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Traditional Way */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#061321] border border-[#EF4444]/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/20 px-3 py-1 rounded-md">
                  Traditional Status Quo
                </span>
                <span className="text-xs text-[#9EADC0] font-mono">REACTIVE</span>
              </div>
              <h3 className="text-xl font-bold text-[#F5F8FC] mb-3">
                Passive Energy Metering
              </h3>
              <ul className="space-y-3 text-sm text-[#9EADC0]">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-2 shrink-0" />
                  <span>Averages readings over 15-minute intervals, completely missing millisecond-scale electrical anomalies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-2 shrink-0" />
                  <span>No capability to intervene: cannot shed or hold loads before breakers trip.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-2 shrink-0" />
                  <span>Facility teams only discover problems when factory machinery halts or hospital HVAC shuts down.</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-white/[0.06] mt-6 text-xs font-mono text-[#EF4444]/90">
              Result: Avoidable downtime, burnt motors, demand surcharge penalties.
            </div>
          </div>

          {/* VANNIC Approach */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0A1D2E] border border-[#00C8FF]/30 shadow-[0_8px_30px_rgba(0,200,255,0.08)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#00C8FF] bg-[#00C8FF]/10 border border-[#00C8FF]/30 px-3 py-1 rounded-md">
                  The VANNIC Standard
                </span>
                <span className="text-xs text-[#10B981] font-mono">PREVENTIVE</span>
              </div>
              <h3 className="text-xl font-bold text-[#F5F8FC] mb-3">
                Edge Intelligence + Supervisory Control
              </h3>
              <ul className="space-y-3 text-sm text-[#9EADC0]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00C8FF] shrink-0 mt-0.5" />
                  <span>Continuous True-RMS sampling captures rapid phase unbalance, voltage sags, and harmonic rise.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00C8FF] shrink-0 mt-0.5" />
                  <span>Autonomous edge logic stages and sheds approved non-critical loads before main capacity limits are breached.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00C8FF] shrink-0 mt-0.5" />
                  <span>Sub-cycle pre-fault logging provides definitive forensic records for plant electrical engineers.</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-white/[0.06] mt-6 text-xs font-mono text-[#00C8FF]">
              Result: Uninterrupted critical operations, extended motor lifespans, controlled power bills.
            </div>
          </div>
        </div>

        {/* 5-Step Lifecycle Cards */}
        <div className="mb-14">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#9EADC0] text-center mb-8">
            THE FIVE-STAGE ELECTRICAL INTEGRITY PIPELINE
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {lifecycleSteps.map((step) => (
              <div
                key={step.num}
                className="p-5 rounded-xl bg-[#061321] border border-white/[0.08] hover:border-[#1677FF]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#00C8FF]">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-mono text-[#9EADC0] bg-white/[0.04] px-1.5 py-0.5 rounded">
                      {step.badge}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#F5F8FC] mb-2">{step.title}</h4>
                  <p className="text-xs text-[#9EADC0] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connected Architecture Flow */}
        <div className="pt-8 border-t border-white/[0.08]">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#9EADC0] text-center mb-6">
            CONNECTED INFRASTRUCTURE TO ENTERPRISE VISIBILITY
          </div>
          <ArchitectureDiagram />
        </div>
      </div>
    </section>
  );
}
