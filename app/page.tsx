import React from "react";
import { Hero } from "@/components/sections/Hero";
import { MonitoringFlow } from "@/components/sections/MonitoringFlow";
import { PlatformOverview } from "@/components/sections/PlatformOverview";
import { Problems } from "@/components/sections/Problems";
import { PreventiveControl } from "@/components/sections/PreventiveControl";
import { EdgeIntelligence } from "@/components/sections/EdgeIntelligence";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { Comparison } from "@/components/sections/Comparison";
import { PlatformFeatures } from "@/components/sections/PlatformFeatures";
import { Brownfield } from "@/components/sections/Brownfield";
import { CompanyMission } from "@/components/sections/CompanyMission";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero */}
      <Hero />

      {/* 2. More Than Electrical Monitoring */}
      <MonitoringFlow />

      {/* 3. VANNIC GRiDMiND Overview */}
      <PlatformOverview />

      {/* 4. Electrical Problems / Operational Risks */}
      <Problems />

      {/* 5. Preventive Load Control */}
      <PreventiveControl />

      {/* 6. Edge Intelligence */}
      <EdgeIntelligence />

      {/* 7. Target Industries */}
      <IndustriesSection />

      {/* 8. VANNIC vs basic metering / complex automation */}
      <Comparison />

      {/* 9. Platform Features */}
      <PlatformFeatures />

      {/* 10. Brownfield Infrastructure */}
      <Brownfield />

      {/* 11. Company & Mission */}
      <CompanyMission />

      {/* 12. Final CTA */}
      <CTASection />
    </div>
  );
}
