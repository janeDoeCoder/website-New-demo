import React from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/ui/SectionHeading";
import { Button } from "@/ui/Button";
import { GridMindPanel } from "@/visuals/GridMindPanel";
import { ArchitectureDiagram } from "@/visuals/ArchitectureDiagram";
import {
  Activity,
  ShieldCheck,
  Cpu,
  Layers,
  BarChart3,
  HardDrive,
  ArrowRight,
  ChevronRight,
  Database,
  Radio,
  FileCheck2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "GRiDMiND Platform — Electrical Infrastructure Supervision",
  description:
    "VANNIC GRiDMiND combines real-time three-phase telemetry, edge event intelligence, and preventive supervisory load control for commercial and industrial facilities.",
};

export default function PlatformPage() {
  const workflows = [
    {
      step: "01",
      title: "Real-Time Telemetry Ingestion",
      desc: "True-RMS sampling of 3-phase voltages, currents, power factors, and harmonics at distribution switchboards.",
    },
    {
      step: "02",
      title: "Edge Anomaly Detection",
      desc: "Deterministic algorithms compute negative phase sequence unbalance, rate of thermal rise, and kVA demand trends.",
    },
    {
      step: "03",
      title: "Preventive Load Control Action",
      desc: "Staged shedding or delayed interlock of approved non-critical loads before main capacity limits trip.",
    },
    {
      step: "04",
      title: "Forensic Event Archiving",
      desc: "Sub-cycle waveform pre-buffers and post-event stabilization metrics permanently logged for facility engineers.",
    },
    {
      step: "05",
      title: "Continuous Fleet Optimization",
      desc: "Aggregates multi-panel telemetry to identify chronic phase imbalance, low power factor feeders, and transformer health.",
    },
  ];

  const modules = [
    {
      icon: <Activity className="w-5 h-5 text-[#00C8FF]" />,
      title: "Real-Time Electrical Telemetry",
      description:
        "Sub-second capture of True-RMS voltage, current, active/reactive power, power factor, frequency, and total harmonic distortion.",
      tag: "TELEMETRY",
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#1677FF]" />,
      title: "Autonomous Edge Intelligence",
      description:
        "Local anomaly detection algorithms that operate 24/7 inside the switchboard, completely independent of plant internet or cloud uptime.",
      tag: "EDGE COMPUTING",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#10B981]" />,
      title: "Preventive Load Control Interlocks",
      description:
        "Multi-tier priority control that sheds designated non-critical auxiliary loads before main breaker capacity or contract demand trips.",
      tag: "CONTROL",
    },
    {
      icon: <HardDrive className="w-5 h-5 text-[#F59E0B]" />,
      title: "Sub-Cycle Event & Pre-Fault Buffering",
      description:
        "Preserves high-resolution electrical waveforms immediately prior to anomalous excursions for decisive root-cause analysis.",
      tag: "FORENSICS",
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-[#00C8FF]" />,
      title: "Demand & Tariff Optimization",
      description:
        "Windowed kVA demand monitoring with predictive warnings to avoid costly utility demand ratchets and power factor penalty surcharges.",
      tag: "ANALYTICS",
    },
    {
      icon: <Layers className="w-5 h-5 text-[#1677FF]" />,
      title: "Multi-Panel Fleet Oversight",
      description:
        "Single-pane supervision unifying main intake switchgear, sub-distribution boards, motor control centers, and auxiliary panels.",
      tag: "SUPERVISION",
    },
    {
      icon: <Radio className="w-5 h-5 text-[#10B981]" />,
      title: "Brownfield Meter & Sensor Ingestion",
      description:
        "Native RS-485 Modbus RTU interface connecting directly to existing energy meters, digital multi-function meters, and temperature probes.",
      tag: "INTEGRATION",
    },
    {
      icon: <Database className="w-5 h-5 text-[#00C8FF]" />,
      title: "Store-and-Forward Sync Architecture",
      description:
        "Solid-state local buffer guarantees zero loss of electrical telemetry during factory network interruptions or wide-area link drops.",
      tag: "RESILIENCE",
    },
    {
      icon: <FileCheck2 className="w-5 h-5 text-[#F59E0B]" />,
      title: "Auditable Compliance & Incident Logs",
      description:
        "Time-synchronized event logs provide definitive documentation for maintenance reviews, insurer audits, and utility queries.",
      tag: "COMPLIANCE",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Platform Hero */}
      <section className="py-16 sm:py-24 bg-radial-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-[#00C8FF] uppercase mb-4 inline-block px-3 py-1 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/20">
              PLATFORM OVERVIEW
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F8FC] tracking-tight leading-[1.12]">
              VANNIC GRiDMiND™
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-[#9EADC0] leading-relaxed">
              The supervisory intelligence platform that connects physical switchgear, edge computing, and preventive load control into a single unified operating layer.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Request a Demo
              </Button>
              <Button href="/technology" variant="secondary" size="lg" icon={<ChevronRight className="w-4 h-4" />}>
                Explore Technology
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Supervisory Console Live Demonstration */}
      <section className="py-16 sm:py-24 bg-[#040C15] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <GridMindPanel />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono text-[#00C8FF] tracking-wider uppercase block">
                ENGINEERED CLARITY
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F8FC]">
                Actionable Truth for Electrical Operators
              </h2>
              <p className="text-sm sm:text-base text-[#9EADC0] leading-relaxed">
                Traditional building management systems bury electrical risks under generic HVAC screens, while basic meters only offer retrospective billing charts. GRiDMiND is purpose-built to deliver continuous electrical vigilance.
              </p>
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-lg bg-[#061321] border border-white/[0.06]">
                  <div className="text-xs font-bold text-[#F5F8FC] mb-1">
                    Continuous Three-Phase Balance Tracking
                  </div>
                  <div className="text-xs text-[#9EADC0]">
                    Calculates voltage and current unbalance ratios in real time to prevent motor insulation breakdown.
                  </div>
                </div>
                <div className="p-3.5 rounded-lg bg-[#061321] border border-white/[0.06]">
                  <div className="text-xs font-bold text-[#F5F8FC] mb-1">
                    True-RMS Harmonics & Power Factor
                  </div>
                  <div className="text-xs text-[#9EADC0]">
                    Tracks total harmonic distortion on busbars and neutral conductors to preempt transformer overheating.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modular Capabilities Grid */}
      <section className="py-20 sm:py-28 bg-[#061321] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="PLATFORM CAPABILITIES"
            title="Core Supervisory Modules"
            description="Built to meet the demands of commercial facility managers, plant maintenance teams, and consulting electrical engineers."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <div
                key={mod.title}
                className="p-6 rounded-xl bg-[#0A1D2E] border border-white/[0.08] hover:border-[#00C8FF]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#061321] border border-white/10 flex items-center justify-center">
                      {mod.icon}
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-[#9EADC0] bg-white/[0.04] px-2 py-0.5 rounded border border-white/10">
                      {mod.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#F5F8FC] mb-2">{mod.title}</h3>
                  <p className="text-xs sm:text-sm text-[#9EADC0] leading-relaxed">
                    {mod.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operator Workflow Section */}
      <section className="py-20 sm:py-28 bg-[#040C15] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="OPERATIONAL WORKFLOW"
            title="How Operators Interact with GRiDMiND"
            description="From edge detection to supervisory verification, every stage is structured for fast engineering comprehension."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
            {workflows.map((wf) => (
              <div
                key={wf.step}
                className="p-5 rounded-xl bg-[#061321] border border-white/[0.08] flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#00C8FF] block mb-2">
                    STEP {wf.step}
                  </span>
                  <h4 className="text-sm font-bold text-[#F5F8FC] mb-2">{wf.title}</h4>
                  <p className="text-xs text-[#9EADC0] leading-relaxed">{wf.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-2xl bg-[#0A1D2E] border border-white/[0.1] text-center max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-[#F5F8FC] mb-3">
              Experience VANNIC GRiDMiND in Your Facility
            </h3>
            <p className="text-xs sm:text-sm text-[#9EADC0] mb-6 leading-relaxed">
              Schedule a technical consultation to explore brownfield compatibility with your existing switchgear and learn how preventive supervisory load control can protect critical uptime.
            </p>
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Request a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Architecture Reflow */}
      <section className="py-16 sm:py-24 bg-[#061321] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="CONNECTED STACK"
            title="Complete End-to-End Electrical Flow"
            description="VANNIC ties the physical power layer directly to local edge logic and central supervisory visibility."
            align="center"
          />
          <ArchitectureDiagram />
        </div>
      </section>
    </div>
  );
}
