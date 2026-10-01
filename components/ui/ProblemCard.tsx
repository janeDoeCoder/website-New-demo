import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export interface ProblemCardProps {
  code: string;
  title: string;
  symptom: string;
  consequence: string;
  solution: string;
  metric?: string;
  className?: string;
}

export function ProblemCard({
  code,
  title,
  symptom,
  consequence,
  solution,
  metric,
  className,
}: ProblemCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col p-6 rounded-[14px] bg-[#040812] border border-white/[0.08] hover:border-[#00D2FF]/30 hover:bg-[#060D1A] transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs font-semibold text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/25 px-2 py-0.5 rounded">
          {code}
        </span>
        {metric && (
          <span className="font-mono text-[11px] text-[#9EADC0] bg-white/[0.04] px-2 py-0.5 rounded border border-white/10">
            {metric}
          </span>
        )}
      </div>

      <h3 className="text-base sm:text-lg font-semibold text-[#F5F8FC] mb-3">
        {title}
      </h3>

      <div className="space-y-3 text-xs sm:text-sm text-[#9EADC0] mb-5 flex-1">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
          <p>
            <strong className="text-white/80 font-medium">Risk:</strong> {symptom}{" "}
            <span className="text-[#EF4444]/90 block mt-1">{consequence}</span>
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-white/[0.08] bg-black/20 -mx-6 -mb-6 p-4 rounded-b-[14px]">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#00C8FF] shrink-0 mt-0.5" />
          <p className="text-xs text-[#F5F8FC]/90 leading-relaxed">
            <span className="font-mono text-[#00C8FF] font-semibold">VANNIC Prevention:</span>{" "}
            {solution}
          </p>
        </div>
      </div>
    </div>
  );
}
