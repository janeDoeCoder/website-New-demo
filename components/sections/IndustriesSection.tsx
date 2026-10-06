import React from "react";
import Link from "next/link";
import { SectionHeading } from "@/ui/SectionHeading";
import { INDUSTRIES } from "@/content/industries";
import { ArrowRight, Factory, Building2, Hotel, School, Snowflake, Warehouse, Building, Home } from "lucide-react";
import { Button } from "@/ui/Button";

export function IndustriesSection() {
  const getIndustryIcon = (id: string) => {
    switch (id) {
      case "manufacturing-msmes":
        return <Factory className="w-5 h-5 text-[#00C8FF]" />;
      case "hospitals-healthcare":
        return <Building2 className="w-5 h-5 text-[#10B981]" />;
      case "hotels-hospitality":
        return <Hotel className="w-5 h-5 text-[#F59E0B]" />;
      case "educational-campuses":
        return <School className="w-5 h-5 text-[#1677FF]" />;
      case "cold-storage":
        return <Snowflake className="w-5 h-5 text-[#00C8FF]" />;
      case "warehouses-logistics":
        return <Warehouse className="w-5 h-5 text-[#F59E0B]" />;
      case "commercial-buildings":
        return <Building className="w-5 h-5 text-[#10B981]" />;
      case "apartments-residential":
        return <Home className="w-5 h-5 text-[#1677FF]" />;
      default:
        return <Factory className="w-5 h-5 text-[#00C8FF]" />;
    }
  };

  return (
    <section id="industries" className="py-20 sm:py-28 bg-[#061321] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FACILITY PROFILES"
          title="Engineered for High-Consequence Electrical Environments"
          description="Different facilities suffer distinct electrical failure modes. VANNIC provides tailored supervisory rules matching real industrial and commercial operating contexts."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.id}
              className="p-6 rounded-xl bg-[#0A1D2E] border border-white/[0.08] hover:border-[#00C8FF]/30 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#061321] border border-white/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {getIndustryIcon(ind.id)}
                </div>
                <h3 className="text-base font-bold text-[#F5F8FC] mb-2 group-hover:text-white">
                  {ind.title}
                </h3>
                <p className="text-xs text-[#9EADC0] leading-relaxed mb-4">
                  {ind.shortDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] mt-auto">
                <div className="flex flex-col gap-1 mb-2">
                  {ind.keySignals.slice(0, 2).map((signal, i) => (
                    <div key={i} className="text-[11px] font-mono text-[#00C8FF]/90 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#00C8FF]/60 shrink-0" />
                      {signal}
                    </div>
                  ))}
                </div>
                <Link
                  href={`/industries#${ind.id}`}
                  className="text-xs font-medium text-[#1677FF] hover:text-[#00C8FF] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Explore use case</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button href="/industries" variant="secondary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            View Detailed Industry Breakdowns
          </Button>
        </div>
      </div>
    </section>
  );
}
