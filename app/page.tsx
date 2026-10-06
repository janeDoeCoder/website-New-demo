import React from "react";
import { Hero } from "@/components/sections/Hero";
import { MonitoringFlow } from "@/components/sections/MonitoringFlow";
import { PlatformOverview } from "@/components/sections/PlatformOverview";
import { Problems } from "@/components/sections/Problems";
import { PreventiveControl } from "@/components/sections/PreventiveControl";
import { EdgeIntelligence } from "@/components/sections/EdgeIntelligence";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { Comparison } from "@/components/sections/Comparison";
import { Brownfield } from "@/components/sections/Brownfield";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Operational Paradigm — 5-stage lifecycle + architecture flow */}
      <MonitoringFlow />

      {/* 3. VANNIC GRiDMiND Platform Overview */}
      <PlatformOverview />

      {/* 4. Electrical Problems / Operational Risks */}
      <Problems />

      {/* 5. Preventive Load Control */}
      <PreventiveControl />

      {/* 6. Edge Intelligence — hardware architecture */}
      <EdgeIntelligence />

      {/* 7. Target Industries */}
      <IndustriesSection />

      {/* 8. VANNIC vs basic metering / complex automation */}
      <Comparison />

      {/* 9. Brownfield Infrastructure */}
      <Brownfield />

      {/* 10. Final CTA */}
      <CTASection />
    </div>
  );
}
