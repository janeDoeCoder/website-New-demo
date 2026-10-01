"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { MAIN_NAVIGATION } from "@/content/navigation";
import { BRAND } from "@/lib/constants";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3",
          scrolled
            ? "bg-[#050B14]/85 backdrop-blur-xl border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            : "bg-[#081320]/60 backdrop-blur-md border border-white/[0.08]"
        )}
      >
        <div className="flex items-center justify-between">
          {/* Official VANNIC DYNAVION Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] rounded-lg"
          >
            {/* The 3-Wave Emblem from Official Logo */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0">
              <Image
                src="/brand/vannic-mark.png"
                alt="VANNIC DYNAVION"
                width={48}
                height={48}
                className="w-full h-full object-contain drop-shadow-[0_2px_10px_rgba(0,210,255,0.35)] group-hover:scale-105 transition-transform"
                priority
              />
            </div>

            {/* Typography matching official brand */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-[0.14em] text-[#F5F8FC] leading-none group-hover:text-white transition-colors">
                  VANNIC
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#A6FF00] animate-pulse" />
              </div>
              <span className="text-[9px] font-mono font-bold tracking-[0.3em] uppercase leading-tight mt-0.5 text-gradient-brand">
                DYNAVION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Skiper UI Pill Capsule */}
          <nav className="hidden md:flex items-center gap-1 bg-[#050B14]/70 border border-white/[0.08] rounded-full px-3 py-1.5 shadow-inner">
            {MAIN_NAVIGATION.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-xs lg:text-[13px] font-medium px-4 py-1.5 rounded-full transition-all relative",
                    isActive
                      ? "text-white bg-gradient-to-r from-[#0052FF]/30 to-[#00D2FF]/20 text-[#00D2FF] font-semibold border border-[#00D2FF]/30 shadow-[0_0_12px_rgba(0,210,255,0.2)]"
                      : "text-[#9EADC0] hover:text-[#F5F8FC] hover:bg-white/[0.05]"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#A6FF00]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action & Demo Request */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="relative group inline-flex items-center justify-center gap-2 text-xs lg:text-sm font-semibold px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0052FF] via-[#0088FF] to-[#00D2FF] hover:from-[#0066FF] hover:to-[#00E5FF] text-white shadow-[0_2px_18px_rgba(0,136,255,0.45)] hover:shadow-[0_4px_25px_rgba(0,210,255,0.65)] active:translate-y-[1px] transition-all overflow-hidden"
            >
              {/* Shimmer light sweep */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <span className="relative flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#A6FF00]" />
                <span>{BRAND.hero.primaryCta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
