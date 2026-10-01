export interface ElectricalProblem {
  id: string;
  code: string;
  title: string;
  symptom: string;
  electricalCause: string;
  consequence: string;
  vannicSolution: string;
  diagnosticMetric: string;
}

export const ELECTRICAL_PROBLEMS: ElectricalProblem[] = [
  {
    id: "phase-unbalance",
    code: "ERR-01",
    title: "Phase Voltage & Current Unbalance",
    symptom: "Three-phase motors running hot, audible humming, unexpected vibration.",
    electricalCause:
      "Uneven single-phase load distribution across R, Y, and B phases causing negative sequence currents.",
    consequence:
      "Severe motor derating, winding insulation breakdown, and premature motor failure.",
    vannicSolution:
      "VANNIC edge controllers continuously compute phase voltage/current unbalance ratios in real time, alerting maintenance before thermal destruction.",
    diagnosticMetric: "V_unbalance > 2.0% | I_unbalance > 5.0%",
  },
  {
    id: "harmonics-overheating",
    code: "ERR-02",
    title: "Harmonics & High Neutral Currents",
    symptom: "Switchgear busbars running hot, humming transformers, neutral conductor overheating.",
    electricalCause:
      "Proliferation of non-linear loads (VFDs, UPS systems, LED drivers) causing triplen harmonic accumulation on the neutral path.",
    consequence:
      "Transformer core saturation, neutral burn-out hazards, and nuisance capacitor bank failures.",
    vannicSolution:
      "Continuous True-RMS harmonic spectrum logging and neutral current tracking, identifying harmonic hotspots before panel damage occurs.",
    diagnosticMetric: "THD_i > 15% | I_neutral > 80% I_phase",
  },
  {
    id: "peak-demand-penalty",
    code: "ERR-03",
    title: "Peak Demand Spikes & Tariff Penalties",
    symptom: "Sudden utility surcharge penalties on the monthly commercial power bill.",
    electricalCause:
      "Simultaneous startup of high-inertia machinery, HVAC chillers, and auxiliary loads exceeding sanctioned kVA contract limit.",
    consequence:
      "Substantial recurring financial penalties, utility demand ratchets, and strained main intake gear.",
    vannicSolution:
      "Predictive windowed kVA demand monitoring with automated supervisory interlocks on approved non-critical loads prior to billing window expiry.",
    diagnosticMetric: "Demand kVA approaching 90% of Contract kVA",
  },
  {
    id: "motor-thermal-strain",
    code: "ERR-04",
    title: "Motor Inrush & Thermal Stress Cycles",
    symptom: "Recurring breaker trips during pump or conveyor startup cycles.",
    electricalCause:
      "Repeated starts during low-voltage conditions causing sustained high-current draw beyond thermal trip curves.",
    consequence:
      "Production line stoppage, contactor contact welding, and shortened electric motor service lifespans.",
    vannicSolution:
      "Edge-level starting profile validation, interlocking start sequences when supply line voltage is outside acceptable tolerance.",
    diagnosticMetric: "Start Inrush Amps / Voltage Sag %",
  },
  {
    id: "nuisance-tripping",
    code: "ERR-05",
    title: "Unexplained Nuisance Breaker Tripping",
    symptom: "Main or sub-feeders trip with no apparent fault recorded by conventional meters.",
    electricalCause:
      "Transient micro-faults, cumulative leakage, or brief current spikes that basic averaging meters miss entirely.",
    consequence:
      "Hours of lost production troubleshooting non-existent dead faults, operator frustration, and safety confusion.",
    vannicSolution:
      "Sub-cycle event logging and high-resolution waveform anomaly detection recorded directly on the VANNIC edge device.",
    diagnosticMetric: "Sub-cycle Transient Event Log & Timestamp",
  },
  {
    id: "reactive-gap",
    code: "ERR-06",
    title: "The Reactive Monitoring Gap",
    symptom: "Facility teams discover electrical failures only after equipment has halted.",
    electricalCause:
      "Traditional meters only store historical kWh logs without active edge intelligence or preventive load supervisory logic.",
    consequence:
      "Purely reactive maintenance posture, unscheduled downtime, and lack of verified pre-trip evidence.",
    vannicSolution:
      "VANNIC shifts the paradigm: continuous real-time edge vigilance combined with approved non-critical load control before catastrophic trip thresholds are reached.",
    diagnosticMetric: "Early Warning Margin (Minutes prior to trip)",
  },
];
