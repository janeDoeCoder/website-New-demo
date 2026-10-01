import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "blue" | "cyan" | "emerald" | "amber" | "outline" | "neutral";
  size?: "sm" | "md";
  pulse?: boolean;
}

export function Badge({
  className,
  variant = "cyan",
  size = "md",
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    blue: "bg-[#1677FF]/15 text-[#60A5FA] border-[#1677FF]/30",
    cyan: "bg-[#00C8FF]/10 text-[#00C8FF] border-[#00C8FF]/30",
    emerald: "bg-[#10B981]/15 text-[#34D399] border-[#10B981]/30",
    amber: "bg-[#F59E0B]/15 text-[#FBBF24] border-[#F59E0B]/30",
    outline: "bg-transparent text-[#9EADC0] border-white/15",
    neutral: "bg-white/[0.05] text-[#9EADC0] border-white/10",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 font-medium tracking-wide",
    md: "text-xs px-2.5 py-1 font-semibold tracking-wider",
  };

  const dotColors = {
    blue: "bg-[#1677FF]",
    cyan: "bg-[#00C8FF]",
    emerald: "bg-[#10B981]",
    amber: "bg-[#F59E0B]",
    outline: "bg-[#9EADC0]",
    neutral: "bg-white/40",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border uppercase font-mono select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
              dotColors[variant]
            )}
          />
          <span
            className={cn("relative inline-flex rounded-full h-1.5 w-1.5", dotColors[variant])}
          />
        </span>
      )}
      {children}
    </span>
  );
}
