"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { FOOTER_NAVIGATION } from "@/content/navigation";
import { BRAND } from "@/lib/constants";
import {
  Mail,
  MapPin,
  Terminal,
  Copy,
  Check,
  ArrowUpRight,
  ChevronUp,
  Activity,
  ShieldCheck,
  Cpu,
} from "lucide-react";

export function ModernFooter() {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  const command = "curl -s https://api.vannicdynavion.com/status | jq .telemetry";

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: -1000, y: -1000 });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden bg-[#050506] text-[#8A8F98] border-t border-white/[0.06] selection:bg-[#00D2FF]/20 selection:text-[#00D2FF]"
    >
      {/* Layer 1: Ambient Base Gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)] opacity-95"
        aria-hidden="true"
      />

      {/* Layer 2: Subtle 64px Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      {/* Layer 3: Floating Ambient Light Blobs (Linear/Modern style with VANNIC Cyan/Blue) */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 h-[420px] w-[580px] rounded-full bg-[#00D2FF]/[0.07] blur-[140px] animate-[pulse_9s_ease-in-out_infinite]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-[380px] w-[500px] rounded-full bg-[#0052FF]/[0.08] blur-[150px]"
        aria-hidden="true"
      />

      {/* Layer 4: Interactive Mouse Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 210, 255, 0.07), transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Top Feature Bar: Live Telemetry Status & Interactive CLI / Command Capsule */}
        <div className="mb-14 pb-10 border-b border-white/[0.06] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Real-Time System Telemetry Pill */}
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.07] backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
            </span>
            <span className="text-xs font-mono text-[#EDEDEF] tracking-tight flex items-center gap-2">
              <span className="font-semibold text-white">Edge Telemetry Active</span>
              <span className="text-white/30">•</span>
              <span className="text-[#8A8F98]">99.99% Uptime</span>
              <span className="text-white/30 hidden sm:inline">•</span>
              <span className="text-[#00D2FF] hidden sm:inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Grid-Verified
              </span>
            </span>
          </div>

          {/* Developer Quick-Action CLI Terminal Capsule */}
          <div className="flex items-center gap-2 max-w-md w-full sm:w-auto">
            <div className="flex items-center justify-between w-full sm:w-auto gap-3 px-3.5 py-1.5 rounded-lg bg-[#0A0A0C] border border-white/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-200 hover:border-white/[0.14] group">
              <div className="flex items-center gap-2 font-mono text-xs text-[#8A8F98]">
                <Terminal className="w-3.5 h-3.5 text-[#00D2FF]" />
                <span className="text-white/40 select-none">$</span>
                <span className="text-[#EDEDEF] truncate max-w-[210px] sm:max-w-none">
                  {command}
                </span>
              </div>
              <button
                type="button"
                onClick={copyToClipboard}
                title="Copy developer command"
                aria-label="Copy telemetry command"
                className="inline-flex items-center justify-center p-1.5 rounded-md text-white/50 hover:text-white hover:bg-white/[0.06] active:scale-[0.96] transition-[color,background-color,transform] duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF]/50"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                ) : (
                  <Copy className="w-3.5 h-3.5 group-hover:text-[#00D2FF] transition-colors" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 5-Column Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/[0.06]">
          {/* Brand Anchor (5 Cols on Large screens) */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3.5 group outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF]/50 rounded-lg"
            >
              <div className="relative w-9 h-9 shrink-0 rounded-lg p-1 bg-white/[0.04] border border-white/[0.08] group-hover:border-[#00D2FF]/40 transition-[border-color] duration-200">
                <Image
                  src="/brand/vannic-mark.png"
                  alt="VANNIC"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain drop-shadow-[0_2px_10px_rgba(0,210,255,0.35)]"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-[0.14em] text-[#EDEDEF] group-hover:text-white transition-colors">
                  {BRAND.brandName}
                </span>
                <span className="text-[9px] font-mono font-bold tracking-[0.28em] text-[#00D2FF] uppercase">
                  DYNAVION
                </span>
              </div>
            </Link>

            <p className="text-sm font-medium text-[#EDEDEF]/90 leading-relaxed max-w-sm">
              {BRAND.tagline}
            </p>

            <p className="text-xs text-[#8A8F98] leading-relaxed max-w-sm">
              Intelligent edge supervisory control, high-frequency anomaly detection,
              and non-critical load prevention engineered for mission-critical electrical infrastructure.
            </p>

            {/* Direct Contact & Location Micro-Pills */}
            <div className="pt-2 flex flex-col gap-2.5 text-xs font-mono text-[#8A8F98]">
              <a
                href={`mailto:${BRAND.contactEmail}`}
                className="inline-flex items-center gap-2 hover:text-[#EDEDEF] transition-colors group w-fit"
              >
                <div className="w-5 h-5 rounded flex items-center justify-center bg-white/[0.04] border border-white/[0.06] group-hover:border-[#00D2FF]/30 transition-colors">
                  <Mail className="w-3 h-3 text-[#00D2FF]" />
                </div>
                <span>{BRAND.contactEmail}</span>
              </a>
              <div className="inline-flex items-center gap-2">
                <div className="w-5 h-5 rounded flex items-center justify-center bg-white/[0.04] border border-white/[0.06]">
                  <MapPin className="w-3 h-3 text-[#10B981]" />
                </div>
                <span>India • Commercial & Industrial Deployments</span>
              </div>
            </div>
          </div>

          {/* Navigation Links Columns (7 Cols on Large screens: Platform, Industries, Company, Legal) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Column 1: Platform */}
            <div className="space-y-3.5">
              <h3 className="text-xs font-mono uppercase tracking-[0.18em] text-[#EDEDEF] font-semibold flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-[#00D2FF]" /> Platform
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {FOOTER_NAVIGATION.platform.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1 text-[#8A8F98] hover:text-[#EDEDEF] transition-[color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-[#00D2FF] transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Industries */}
            <div className="space-y-3.5">
              <h3 className="text-xs font-mono uppercase tracking-[0.18em] text-[#EDEDEF] font-semibold flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-[#0052FF]" /> Industries
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {FOOTER_NAVIGATION.industries.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1 text-[#8A8F98] hover:text-[#EDEDEF] transition-[color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-[#00D2FF] transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="space-y-3.5">
              <h3 className="text-xs font-mono uppercase tracking-[0.18em] text-[#EDEDEF] font-semibold">
                Company
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {FOOTER_NAVIGATION.company.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1 text-[#8A8F98] hover:text-[#EDEDEF] transition-[color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-[#00D2FF] transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Legal & Standards */}
            <div className="space-y-3.5">
              <h3 className="text-xs font-mono uppercase tracking-[0.18em] text-[#EDEDEF] font-semibold">
                Compliance
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {FOOTER_NAVIGATION.legal.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1 text-[#8A8F98] hover:text-[#EDEDEF] transition-[color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1"
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <span className="text-xs text-white/40 block pt-1">
                    IEEE / IEC compliant telemetry architecture
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8A8F98]/80">
          <div className="flex items-center gap-3">
            <p>© {currentYear} {BRAND.companyName}. All rights reserved.</p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] hover:text-white text-[#8A8F98] border border-white/[0.06] transition-[background-color,color,transform] duration-150 active:scale-[0.96] outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF]/50"
          >
            <span>Top</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
