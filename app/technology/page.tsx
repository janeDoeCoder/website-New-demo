import React from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/ui/SectionHeading";
import { Button } from "@/ui/Button";
import { EdgeControllerVisual } from "@/visuals/EdgeControllerVisual";
import { ArchitectureDiagram } from "@/visuals/ArchitectureDiagram";
import {
  Cpu,
  Zap,
  ShieldCheck,
  Radio,
  Cloud,
  HardDrive,
  ArrowRight,
  ChevronRight,
  Terminal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Industrial Edge Technology & Architecture",
  description:
    "Explore the engineering architecture behind VANNIC industrial edge controllers, sub-cycle electrical sensing, local deterministic logic, and brownfield integration.",
};

export default function TechnologyPage() {
  const techPillars = [
    {
      icon: <Zap className="w-5 h-5 text-[#F59E0B]" />,
      title: "Three-Phase Electrical Sensing",
      badge: "PHYSICAL LAYER",
      description:
        "High-rate continuous True-RMS sampling across L1, L2, L3 and Neutral lines. Captures phase voltage unbalance, inrush transients, active/reactive load vectors, and harmonic current spectra up to standard industrial orders.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#1677FF]" />,
      title: "Local Deterministic Processing",
      badge: "EDGE ENGINE",
      description:
        "Embedded computing hardware located directly inside switchgear enclosures. Mathematical algorithms compute negative sequence current, thermal rate-of-rise, and predictive demand thresholds in sub-cycle timeframes.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#10B981]" />,
      title: "Preventive Supervisory Interlocks",
      badge: "CONTROL ACTUATION",
      description:
        "Galvanically isolated output relays interface directly with contactor control circuits or auxiliary trip loops of approved non-critical loads, executing staged shedding prior to breaker trip curves.",
    },
    {
      icon: <Radio className="w-5 h-5 text-[#00C8FF]" />,
      title: "Industrial Fieldbus & Communications",
      badge: "CONNECTIVITY",
      description:
        "Native RS-485 Modbus RTU / TCP interfaces enable non-disruptive integration with existing digital multi-function meters, power quality analyzers, and MCC panels.",
    },
    {
      icon: <Cloud className="w-5 h-5 text-[#1677FF]" />,
      title: "Secure Outbound Telemetry Stream",
      badge: "DATA LAYER",
      description:
        "One-way encrypted outbound telemetry connects to GRiDMiND with solid-state store-and-forward buffers, ensuring continuous operation and data integrity even during plant network dropouts.",
    },
    {
      icon: <HardDrive className="w-5 h-5 text-[#00C8FF]" />,
      title: "Sub-Cycle Forensic Buffering",
      badge: "FORENSIC LOGS",
      description:
        "Continuous circular RAM/flash buffers freeze and capture high-resolution waveform data before, during, and after an anomalous event for post-incident root cause forensics.",
    },
  ];

  const specs = [
    { label: "Mounting Standard", value: "35mm Industrial DIN-Rail Enclosure" },
    { label: "Sensing Topology", value: "3-Phase 4-Wire (3P4W) / 3-Phase 3-Wire (3P3W)" },
    { label: "Voltage Input Range", value: "Up to 500V L-L Nominal True-RMS" },
    { label: "Current Ingestion", value: "Standard 5A / 1A CT Secondary or Split-Core" },
    { label: "Fieldbus Support", value: "RS-485 Modbus RTU (Multi-Drop Master/Slave)" },
    { label: "Isolation", value: "Galvanically Isolated Sensing & Output Channels" },
    { label: "Local Autonomy", value: "100% Deterministic (Zero Cloud Dependency)" },
    { label: "Telemetry Security", value: "Outbound TLS / Encrypted MQTT Stream" },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-radial-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-[#00C8FF] uppercase mb-4 inline-block px-3 py-1 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/20">
              INDUSTRIAL TECHNOLOGY
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F8FC] tracking-tight leading-[1.12]">
              Deterministic Edge Intelligence Inside the Switchgear
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-[#9EADC0] leading-relaxed">
              Electrical risks unfold in milliseconds. VANNIC places dedicated computing power directly onto the industrial switchboard DIN-rail, ensuring autonomous vigilance without external dependencies.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Request Technical Briefing
              </Button>
              <Button href="/platform" variant="secondary" size="lg" icon={<ChevronRight className="w-4 h-4" />}>
                View Platform Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Controller Deep Dive */}
      <section className="py-16 sm:py-24 bg-[#040C15] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="HARDWARE INTEGRATION"
            title="The VANNIC Industrial Edge Controller"
            description="Engineered to bridge the physical electrical switchboard with modern supervisory intelligence."
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
            <div className="lg:col-span-7">
              <EdgeControllerVisual />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-xl bg-[#061321] border border-white/[0.08]">
                <div className="text-xs font-mono text-[#00C8FF] mb-1 uppercase tracking-wider">
                  Edge Determinism
                </div>
                <h3 className="text-lg font-bold text-[#F5F8FC] mb-2">
                  Zero Reliance on External Networks
                </h3>
                <p className="text-sm text-[#9EADC0] leading-relaxed">
                  Electrical faults do not wait for internet handshakes. All anomaly detection, unbalance calculations, and approved non-critical load shedding logic execute deterministically on local hardware inside the electrical panel.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#061321] border border-white/[0.08]">
                <div className="text-xs font-mono text-[#10B981] mb-1 uppercase tracking-wider">
                  Brownfield Compatibility
                </div>
                <h3 className="text-lg font-bold text-[#F5F8FC] mb-2">
                  Non-Disruptive Retrofit Deployment
                </h3>
                <p className="text-sm text-[#9EADC0] leading-relaxed">
                  Engineered to coexist with existing distribution boards, multi-function meters, and motor control centers without requiring plant shutdowns or rewiring certified breaker assemblies.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#061321] border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-6 text-xs font-mono text-[#00C8FF] uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>ENGINEERING SPECIFICATION OVERVIEW</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {specs.map((spec) => (
                <div key={spec.label} className="p-3.5 rounded-lg bg-[#0A1D2E]/70 border border-white/[0.04]">
                  <div className="text-[#9EADC0] font-mono text-[11px] mb-1">{spec.label}</div>
                  <div className="text-[#F5F8FC] font-semibold">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Six Technical Architecture Pillars */}
      <section className="py-20 sm:py-28 bg-[#061321] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="ARCHITECTURE PILLARS"
            title="Six Layers of Electrical Protection & Intelligence"
            description="From raw electromagnetic physical phenomena to central fleet visualization."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-6 rounded-xl bg-[#0A1D2E] border border-white/[0.08] hover:border-[#1677FF]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#061321] border border-white/10 flex items-center justify-center">
                      {pillar.icon}
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-[#9EADC0] bg-white/[0.04] px-2 py-0.5 rounded border border-white/10">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#F5F8FC] mb-2">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-[#9EADC0] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Flow Diagram */}
      <section id="architecture" className="py-20 sm:py-28 bg-[#040C15] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="SYSTEM TOPOLOGY"
            title="Physical Infrastructure to Cloud Platform"
            description="How electrical data travels securely from switchboards to operators."
            align="center"
          />
          <ArchitectureDiagram />

          <div className="mt-16 text-center">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Discuss Technical Integration
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
