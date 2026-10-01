import React from "react";
import { SectionHeading } from "@/ui/SectionHeading";
import { FeatureCard } from "@/ui/FeatureCard";
import { PLATFORM_FEATURES } from "@/content/features";
import { Activity, Cpu, ShieldAlert, FileSpreadsheet, Layers, LayoutDashboard } from "lucide-react";

export function PlatformFeatures() {
  const getFeatureIcon = (name: string) => {
    switch (name) {
      case "Activity":
        return <Activity className="w-5 h-5 text-[#00C8FF]" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-[#1677FF]" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-5 h-5 text-[#10B981]" />;
      case "FileSpreadsheet":
        return <FileSpreadsheet className="w-5 h-5 text-[#F59E0B]" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-[#00C8FF]" />;
      case "LayoutDashboard":
        return <LayoutDashboard className="w-5 h-5 text-[#1677FF]" />;
      default:
        return <Activity className="w-5 h-5 text-[#00C8FF]" />;
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#061321] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="SYSTEM SPECIFICATION"
          title="Architected for Industrial Rigor"
          description="Every component of the VANNIC platform is engineered to withstand electrical transients, industrial harmonics, and harsh electrical room ambient environments."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLATFORM_FEATURES.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={getFeatureIcon(feature.iconName)}
              tag={feature.category.toUpperCase()}
              title={feature.title}
              description={feature.description}
              technicalDetail={feature.technicalDetail}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
