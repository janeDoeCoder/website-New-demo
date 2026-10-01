"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { MAIN_NAVIGATION } from "@/content/navigation";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        className="p-2 rounded-lg text-[#F5F8FC] hover:bg-white/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C8FF]"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[65px] bg-[#061321]/95 backdrop-blur-xl z-50 flex flex-col p-6 overflow-y-auto border-t border-white/[0.08] animate-in fade-in duration-200"
        >
          <nav className="flex flex-col gap-2 my-auto">
            {MAIN_NAVIGATION.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "flex items-center justify-between text-lg font-medium py-3.5 px-4 rounded-xl transition-colors",
                    isActive
                      ? "text-[#00C8FF] bg-[#1677FF]/10 font-semibold border border-[#00C8FF]/20"
                      : "text-[#9EADC0] hover:text-[#F5F8FC] hover:bg-white/[0.04]"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#00C8FF]" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/[0.08] mt-6 flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-[10px] bg-[#1677FF] hover:bg-[#2982FF] text-white font-medium text-base shadow-[0_2px_12px_rgba(22,119,255,0.4)] transition-all"
            >
              <span>{BRAND.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="text-center pt-2">
              <span className="text-xs font-mono text-[#9EADC0]/70">
                {BRAND.companyName}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
