import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col mb-12 sm:mb-16",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#00D2FF] mb-3 px-3.5 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/25 shadow-[0_0_15px_-3px_rgba(0,210,255,0.2)] inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A6FF00]" />
          <span>{eyebrow}</span>
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#F5F8FC] leading-[1.15] max-w-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#9EADC0] max-w-2xl font-normal leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
