import React from "react";
import { SectionHeading } from "@/ui/SectionHeading";
import { EdgeControllerVisual } from "@/visuals/EdgeControllerVisual";
import { WifiOff, HardDrive, Radio, Gauge } from "lucide-react";

export function EdgeIntelligence() {
  const hardwareFeatures = [
    {
      icon: <WifiOff className="w-5 h-5 text-[#00C8FF]" />,
      title: "100% Autonomous Local Operation",
      description:
        "The controller executes all sampling, unbalance calculations, and load shedding interlocks locally without requiring external cloud connectivity.",
    },
    {
      icon: <Gauge className="w-5 h-5 text-[#10B981]" />,
      title: "Sub-Cycle True-RMS Sampling",
      description:
        "Continuous high-rate sampling across all phases captures micro-sags, transient spikes, and harmonic current distortion in real time.",
    },
    {
      icon: <HardDrive className="w-5 h-5 text-[#1677FF]" />,
      title: "Embedded Solid-State Event Buffers",
      description:
        "Preserves high-resolution pre-fault electrical parameters locally, ensuring forensic evidence is never lost during a plant power collapse.",
    },
    {
      icon: <Radio className="w-5 h-5 text-[#00C8FF]" />,
      title: "Industrial Modbus / RS-485 Engine",
      description:
        "Interfaces with existing multi-function energy meters, temperature probes, and auxiliary contactor trip circuits seamlessly.",
    },
  ];

  return (
    <section id="edge" className="py-20 sm:py-28 bg-[#040C15] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="EMBEDDED HARDWARE ARCHITECTURE"
          title="Edge Intelligence Inside the Switchgear"
          description="Electrical risks occur in fractions of a second. VANNIC places dedicated computing power directly on the switchboard DIN-rail."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left: Edge Controller Visual Component */}
          <div className="lg:col-span-7">
            <EdgeControllerVisual />
          </div>

          {/* Right: Technical Explanation */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-xl bg-[#061321] border border-white/[0.08]">
              <div className="text-xs font-mono text-[#00C8FF] mb-1">
                MILLISECOND DETERMINISM
              </div>
              <h3 className="text-lg font-bold text-[#F5F8FC] mb-2">
                Why Cloud-Only IoT Fails Electrical Infrastructure
              </h3>
              <p className="text-sm text-[#9EADC0] leading-relaxed">
                A breaker trips in 20 to 100 milliseconds. Internet connections have latency, packet loss, and frequent dropouts. By processing electrical data at the edge, VANNIC guarantees deterministic execution unaffected by external network state.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#061321] border border-white/[0.08]">
              <div className="text-xs font-mono text-[#10B981] mb-1">
                INDUSTRIAL GRADE
              </div>
              <h3 className="text-lg font-bold text-[#F5F8FC] mb-2">
                Designed for Severe Panel Environments
              </h3>
              <p className="text-sm text-[#9EADC0] leading-relaxed">
                Standard 35mm DIN-rail mounting, galvanically isolated sensing inputs, wide operating temperature tolerances, and integrated store-and-forward telemetry buffers.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {hardwareFeatures.map((feat) => (
            <div
              key={feat.title}
              className="p-5 rounded-xl bg-[#061321] border border-white/[0.08] flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#0A1D2E] border border-white/10 flex items-center justify-center mb-4">
                  {feat.icon}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-[#F5F8FC] mb-2">
                  {feat.title}
                </h4>
                <p className="text-xs text-[#9EADC0] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
