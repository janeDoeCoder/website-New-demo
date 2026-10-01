export interface IndustryData {
  id: string;
  title: string;
  shortDescription: string;
  problem: string;
  impact: string;
  approach: string;
  keySignals: string[];
}

export const INDUSTRIES: IndustryData[] = [
  {
    id: "manufacturing-msmes",
    title: "Manufacturing & MSMEs",
    shortDescription:
      "Prevent unexpected machine stalls, motor thermal stress, and peak power penalties in industrial production environments.",
    problem:
      "Harmonic distortion from heavy motor drives, phase unbalance, and sudden surge loads leading to nuisance breaker trips.",
    impact:
      "Unplanned production line shutdowns, tool breakage, batch spoilage, and high demand-charge penalties.",
    approach:
      "VANNIC edge controllers continuously track three-phase electrical balance, thermal anomalies, and power quality indices, shedding approved non-critical loads prior to threshold breaches.",
    keySignals: ["Phase Voltage Unbalance", "Motor Thermal Rise", "Peak Demand Thresholds"],
  },
  {
    id: "hospitals-healthcare",
    title: "Hospitals & Healthcare",
    shortDescription:
      "Safeguard critical medical power circuits, diagnostic imaging bays, and emergency transition feeders.",
    problem:
      "Sensitive diagnostic equipment and life-support chillers operating under electrical noise, power factor degradation, and micro-interruptions.",
    impact:
      "Diagnostic equipment reboot delays, calibration drift, and risk of critical supply disruption during source changeovers.",
    approach:
      "High-speed edge monitoring of sensitive feeder harmonics and phase health, with strict isolation of non-essential auxiliary HVAC loads when main capacity fluctuates.",
    keySignals: ["Harmonic Current THD", "Neutral Earth Voltage", "Auxiliary Load Segregation"],
  },
  {
    id: "hotels-hospitality",
    title: "Hotels & Hospitality",
    shortDescription:
      "Maintain guest comfort and kitchen equipment reliability while regulating commercial tariff penalties.",
    problem:
      "Sharp peak loads driven by concurrent laundry operations, central chillers, banquet banqueting spikes, and kitchen induction ranges.",
    impact:
      "Tripping of main secondary distribution boards, guest dissatisfaction from HVAC stalls, and costly peak maximum demand surcharges.",
    approach:
      "Intelligent staged load supervision that modulates or temporarily holds non-critical ventilation and decorative systems during peak tariff intervals.",
    keySignals: ["Maximum Demand (kVA)", "Phase Loading Ratio", "Chiller Power Factor"],
  },
  {
    id: "educational-campuses",
    title: "Educational Campuses",
    shortDescription:
      "Streamline electrical distribution across research laboratories, auditoriums, hostelling blocks, and utility substations.",
    problem:
      "Distributed load profile spanning disparate building ages, unmonitored sub-panels, and irregular high-draw lab experiments.",
    impact:
      "Substation transformer overloading, localized blackouts during exams or events, and unverified branch consumption patterns.",
    approach:
      "Unified edge monitoring nodes installed across key campus distribution switchboards, aggregating real-time parameters into GRiDMiND with event logging and alerts.",
    keySignals: ["Substation Transformer Load", "Branch Current Imbalance", "Event Fault Logging"],
  },
  {
    id: "cold-storage",
    title: "Cold Storage & Refrigeration",
    shortDescription:
      "Protect perishable inventory by preempting compressor burnout and monitoring thermal-electrical correlation.",
    problem:
      "Compressor motor lockup, prolonged low-voltage running, and phase drops during extreme grid strain.",
    impact:
      "Refrigerant compressor motor failure, bulk inventory spoilage, insurance disputes, and prolonged repair lead times.",
    approach:
      "Real-time voltage window and current profile surveillance on refrigeration compressors, triggering immediate warnings before thermal overload relays seize the unit.",
    keySignals: ["Compressor Inrush Duration", "Supply Under-Voltage", "Continuous Run Amperage"],
  },
  {
    id: "warehouses-logistics",
    title: "Warehouses & Logistics Hubs",
    shortDescription:
      "Support continuous material handling, automated sorting hubs, and heavy battery charging stations.",
    problem:
      "High-power EV forklift charging banks causing sudden localized circuit strain and transformer heating.",
    impact:
      "Charging dock breaker trips, logistics dispatch delays, and accelerated deterioration of electrical feeder insulation.",
    approach:
      "Dynamic allocation of charging window capacities combined with continuous thermal and current monitoring across charging bay distribution panels.",
    keySignals: ["Dock Feeder Current", "Transformer Temperature Index", "Staged Charger Sequencing"],
  },
  {
    id: "commercial-buildings",
    title: "Commercial Buildings & Tech Parks",
    shortDescription:
      "Optimize multi-tenant distribution, tenant feeder transparency, and power factor health across central risers.",
    problem:
      "Non-linear server and IT switching power supply loads injecting high neutral currents and degrading power factor.",
    impact:
      "Excessive neutral conductor heating, utility penalty charges for low power factor, and unverified tenant billing disputes.",
    approach:
      "Continuous True-RMS monitoring across riser boards, automated harmonic spectrum recording, and preventive alerts on power factor degradation.",
    keySignals: ["Neutral Current Level", "True Power Factor (PF)", "Riser Load Distribution"],
  },
  {
    id: "apartments-residential",
    title: "Apartment Complexes & Residential Towers",
    shortDescription:
      "Supervise common utility pumps, elevators, DG backup changeovers, and common lighting circuits.",
    problem:
      "Unbalanced phase loading across residential phases, DG synchronizer strain, and water pump dry-run or motor stalling.",
    impact:
      "Frequent DG breaker trips during grid outages, elevator standby halts, and high communal diesel consumption.",
    approach:
      "Edge supervisory control on common service MCC panels, balancing pump cycles and preventing simultaneous high-inertia motor starts during generator operation.",
    keySignals: ["DG Feeder Frequency", "Pump Phase Current Balance", "Common Area Demand"],
  },
];
