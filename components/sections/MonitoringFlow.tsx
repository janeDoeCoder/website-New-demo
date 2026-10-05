import React from "react";
import { SectionHeading } from "@/ui/SectionHeading";
import { ArchitectureDiagram } from "@/visuals/ArchitectureDiagram";

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
