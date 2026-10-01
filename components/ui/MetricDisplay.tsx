import React from "react";
import { cn } from "@/lib/utils";

export interface MetricDisplayProps {
  label: string;
  value: string;
  unit?: string;
  status?: "normal" | "warning" | "alert";
  subtext?: string;
  phase?: "R" | "Y" | "B" | "N" | "ALL";
  className?: string;
}

export function MetricDisplay({
  label,
  value,
  unit,
  status = "normal",
  subtext,
  phase,
  className,
}: MetricDisplayProps) {
  const phaseColors = {
    R: "text-[#EF4444] border-[#EF4444]/30 bg-[#EF4444]/10",
    Y: "text-[#F59E0B] border-[#F59E0B]/30 bg-[#F59E0B]/10",
    B: "text-[#3B82F6] border-[#3B82F6]/30 bg-[#3B82F6]/10",
    N: "text-[#9EADC0] border-white/20 bg-white/5",
    ALL: "text-[#00C8FF] border-[#00C8FF]/30 bg-[#00C8FF]/10",
  };

  const statusIndicators = {
    normal: "bg-[#10B981]",
    warning: "bg-[#F59E0B]",
    alert: "bg-[#EF4444]",
  };

  return (
    <div
      className={cn(
        "p-3.5 rounded-lg bg-[#061321]/90 border border-white/[0.08] flex flex-col justify-between font-mono",
        className
      )}
    >
      <div className="flex items-center justify-between text-[11px] text-[#9EADC0] mb-1.5">
        <div className="flex items-center gap-1.5">
          {phase && (
            <span
              className={cn(
                "px-1.5 py-0.2 rounded text-[10px] font-bold border",
                phaseColors[phase]
              )}
            >
              {phase}
            </span>
          )}
          <span className="tracking-wider uppercase font-medium">{label}</span>
        </div>
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", statusIndicators[status])}
          title={`Status: ${status}`}
        />
      </div>

      <div className="flex items-baseline gap-1 my-0.5">
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#F5F8FC]">
          {value}
        </span>
        {unit && <span className="text-xs text-[#9EADC0] font-normal">{unit}</span>}
      </div>

      {subtext && (
        <span className="text-[10px] text-[#9EADC0]/80 tracking-wide mt-1 block">
          {subtext}
        </span>
      )}
    </div>
  );
}
