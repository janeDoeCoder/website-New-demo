export const COMPANY_CONTENT = {
  legalName: "VANNIC DYNAVION PRIVATE LIMITED",
  brandName: "VANNIC",
  tagline: "Intelligence Behind Every Kilowatt.",
  mission:
    "VANNIC DYNAVION PRIVATE LIMITED aims to make commercial and industrial electrical infrastructure more intelligent, reliable, and efficient by moving facilities from reactive monitoring toward preventive, data-driven energy management.",
  philosophy: [
    {
      title: "Edge-First Determinism",
      description:
        "Industrial electrical systems operate in milliseconds. Protection, unbalance computation, and supervisory trip rules must execute deterministically at the edge, independent of cloud connectivity.",
    },
    {
      title: "Pragmatic Brownfield Coexistence",
      description:
        "Real-world factories and commercial facilities have established switchgear, transformers, and distribution boards. VANNIC is designed to integrate into existing electrical rooms without requiring multi-million rupee tear-downs.",
    },
    {
      title: "Preventive Action Over Passive Recording",
      description:
        "Historic graphs cannot restart an idle production line. VANNIC bridges the critical gap between passive metering and catastrophic protection by actively shedding non-critical loads before main circuit breakers trip.",
    },
    {
      title: "Engineering Integrity & Credibility",
      description:
        "We build for electrical engineers, plant heads, and facility managers. Every metric, alarm, and recommendation is anchored in True-RMS electrical realities rather than vague software claims.",
    },
  ],
  architectureLayers: [
    {
      layer: "01",
      title: "Electrical Infrastructure",
      subtitle: "Switchboards, Transformers, Motors & MCC Panels",
      description:
        "The physical power distribution layer where commercial energy flows through feeders, busbars, and distribution breakers.",
    },
    {
      layer: "02",
      title: "Sensing & Ingestion",
      subtitle: "Current Transformers, Voltage Probes & Modbus Links",
      description:
        "High-accuracy instrumentation capturing True-RMS waveforms, current flows, phase angles, and thermal indicators.",
    },
    {
      layer: "03",
      title: "VANNIC Industrial Edge Controller",
      subtitle: "Local Embedded Computing & Real-Time Processing",
      description:
        "Ruggedized edge hardware installed directly inside electrical panels executing local anomaly detection and priority logic.",
    },
    {
      layer: "04",
      title: "Preventive Supervisory Control",
      subtitle: "Priority-Ranked Non-Critical Auxiliary Load Interlocks",
      description:
        "Deterministic local actuation that sheds or staggers designated auxiliary equipment before main capacity limits are breached.",
    },
    {
      layer: "05",
      title: "VANNIC GRiDMiND Platform",
      subtitle: "Unified Facility Intelligence & Multi-Site Fleet Supervision",
      description:
        "Cloud-based operational console providing engineering trend analysis, automated incident reconstruction, and predictive fleet health.",
    },
  ],
};
