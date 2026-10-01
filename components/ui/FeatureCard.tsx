"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  icon?: React.ReactNode;
  tag?: string;
  title: string;
  description: string;
  technicalDetail?: string;
  className?: string;
}

export function FeatureCard({
  icon,
  tag,
  title,
  description,
  technicalDetail,
  className,
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex flex-col p-6 sm:p-7 rounded-2xl bg-[#081320] border border-white/[0.08] hover:border-[#00D2FF]/40 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_rgba(0,210,255,0.15)] hover:-translate-y-1 overflow-hidden",
        className
      )}
    >
      {/* Skiper UI Mouse Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(0, 210, 255, 0.12), transparent 70%)`
            : "none",
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-5">
          {icon && (
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#0052FF]/15 to-[#00D2FF]/15 text-[#00D2FF] border border-[#00D2FF]/30 group-hover:scale-105 group-hover:border-[#A6FF00]/50 transition-all duration-300">
              {icon}
            </div>
          )}
          {tag && (
            <span className="text-[10px] font-mono tracking-wider font-semibold text-[#9EADC0] bg-white/[0.04] border border-white/10 px-2.5 py-0.5 rounded-full">
              {tag}
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-[#F5F8FC] mb-2.5 group-hover:text-white transition-colors">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-[#9EADC0] leading-relaxed mb-4 flex-1">
          {description}
        </p>

        {technicalDetail && (
          <div className="pt-3 border-t border-white/[0.06] mt-auto">
            <p className="text-xs font-mono text-[#00D2FF] flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A6FF00]" />
              {technicalDetail}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
