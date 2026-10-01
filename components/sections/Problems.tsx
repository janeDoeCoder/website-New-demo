import React from "react";
import { SectionHeading } from "@/ui/SectionHeading";
import { ProblemCard } from "@/ui/ProblemCard";
import { ELECTRICAL_PROBLEMS } from "@/content/problems";

export function Problems() {
  return (
    <section id="problems" className="py-20 sm:py-28 bg-[#020408] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="OPERATIONAL VULNERABILITIES"
          title="Electrical Problems That Derail Facilities"
          description="Commercial and industrial electrical infrastructure is vulnerable to subtle anomalies that basic averaging meters never catch until physical damage occurs."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ELECTRICAL_PROBLEMS.map((problem) => (
            <ProblemCard
              key={problem.id}
              code={problem.code}
              title={problem.title}
              symptom={problem.symptom}
              consequence={problem.consequence}
              solution={problem.vannicSolution}
              metric={problem.diagnosticMetric}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
