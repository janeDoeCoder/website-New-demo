export interface PlatformFeature {
  id: string;
  category: "monitoring" | "intelligence" | "control" | "integration";
  title: string;
  description: string;
  technicalDetail: string;
  iconName: string;
}

export const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    id: "real-time-monitoring",
    category: "monitoring",
    title: "Continuous Three-Phase Electrical Telemetry",
    description:
      "Captures True-RMS voltage, current, active power, reactive power, power factor, frequency, and harmonic distortion across distribution boards.",
    technicalDetail:
      "High-rate edge sampling across L1, L2, L3, and Neutral with millisecond-grade anomaly timestamping.",
    iconName: "Activity",
  },
  {
    id: "edge-intelligence",
    category: "intelligence",
    title: "Autonomous Edge Processing Unit",
    description:
      "Embedded computing operating directly inside electrical switchgear. Computes unbalance, thermal drift, and fault precursors locally.",
    technicalDetail:
      "Deterministic local execution independent of cloud or internet connectivity, ensuring uninterrupted vigilance.",
    iconName: "Cpu",
  },
  {
    id: "preventive-load-control",
    category: "control",
    title: "Approved Non-Critical Load Control",
    description:
      "Enables supervised shedding or delayed startup of non-critical auxiliary loads when capacity or electrical quality is compromised.",
    technicalDetail:
      "Priority-ranked interlocking ensuring critical production or healthcare circuits remain undisturbed.",
    iconName: "ShieldAlert",
  },
  {
    id: "event-intelligence",
    category: "intelligence",
    title: "Sub-Cycle Event & Pre-Fault Logging",
    description:
      "Records high-resolution parameter snapshots before, during, and after electrical events to provide definitive forensic proof.",
    technicalDetail:
      "Preserves pre-fault event buffers on solid-state local storage for post-incident root-cause investigation.",
    iconName: "FileSpreadsheet",
  },
  {
    id: "brownfield-readiness",
    category: "integration",
    title: "Non-Intrusive Brownfield Retrofit",
    description:
      "Designed to integrate seamlessly into existing switchboards, main distribution frames, and sub-panels without replacing working infrastructure.",
    technicalDetail:
      "Compatible with standard industrial CTs, existing digital multi-function meters, and Modbus/RS-485 interfaces.",
    iconName: "Layers",
  },
  {
    id: "gridmind-cloud",
    category: "monitoring",
    title: "VANNIC GRiDMiND Unified Supervision",
    description:
      "Enterprise supervisory console delivering facility-wide electrical transparency, event timeline playback, and multi-site visibility.",
    technicalDetail:
      "Encrypted outbound telemetry stream, role-based operator views, and exportable engineering logs.",
    iconName: "LayoutDashboard",
  },
];

export interface ComparisonDimension {
  dimension: string;
  basicMeter: string;
  scadaBms: string;
  vannic: string;
  vannicAdvantage: string;
}

export const COMPARISON_DATA: ComparisonDimension[] = [
  {
    dimension: "Primary Focus",
    basicMeter: "Passive consumption logging & bill verification",
    scadaBms: "Broad plant automation or HVAC building management",
    vannic: "Electrical risk detection & preventive supervisory control",
    vannicAdvantage: "Dedicated focus on electrical reliability and early fault prevention",
  },
  {
    dimension: "Action Capability",
    basicMeter: "None (Display-only / historic logging)",
    scadaBms: "Custom PLC control for general process sequences",
    vannic: "Automated shedding / sequencing of approved non-critical loads",
    vannicAdvantage: "Prevents avoidably tripping main supply breakers before outage occurs",
  },
  {
    dimension: "Edge Processing",
    basicMeter: "Simple arithmetic (kWh summation)",
    scadaBms: "Requires heavy industrial PLC cabinets & complex ladder logic",
    vannic: "Purpose-built edge controller with electrical condition algorithms",
    vannicAdvantage: "Zero-latency local fault precursor computation at board level",
  },
  {
    dimension: "Brownfield Deployment",
    basicMeter: "Simple panel meter replacement",
    scadaBms: "High engineering cost, lengthy commissioning, rip-and-replace",
    vannic: "Non-disruptive retrofit into existing switchboards and CT loops",
    vannicAdvantage: "Fast installation without rebuilding established electrical switchgear",
  },
  {
    dimension: "Event Diagnostics",
    basicMeter: "Averaged 15-minute intervals (misses transient trips)",
    scadaBms: "Vast alarms requiring specialized engineering triage",
    vannic: "Sub-cycle event pre-buffers and electrical root-cause indicators",
    vannicAdvantage: "Actionable electrical answers for facility and maintenance engineers",
  },
];

export const BROWNFIELD_PILLARS = [
  {
    step: "01",
    title: "Standard Sensor Interfacing",
    description:
      "Connects directly with standard split-core current transformers (CTs) and potential references without requiring busbar shutdowns.",
  },
  {
    step: "02",
    title: "Multi-Protocol Meter Ingestion",
    description:
      "Interfaces with existing digital power meters over Modbus RTU / RS-485 to leverage investments already installed in switchboards.",
  },
  {
    step: "03",
    title: "Safe Auxiliary Load Interlocks",
    description:
      "Interlocks with existing contactor auxiliary coils or trip circuit controls only for explicitly designated non-critical loads.",
  },
  {
    step: "04",
    title: "Independent Edge Operation",
    description:
      "Operates fully autonomously within the switchboard enclosure, maintaining monitoring and protective rules even during external communication loss.",
  },
];
