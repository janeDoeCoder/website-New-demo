import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FOOTER_NAVIGATION } from "@/content/navigation";
import { BRAND } from "@/lib/constants";
import { Mail, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#03070E] border-t border-white/[0.08] text-[#9EADC0] pt-16 pb-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-gradient-to-t from-[#0052FF]/10 via-[#00D2FF]/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/[0.08]">
          {/* Brand & Mission column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative w-9 h-9 shrink-0">
                <Image
                  src="/brand/vannic-mark.png"
                  alt="VANNIC"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(0,210,255,0.3)]"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="text-lg font-black tracking-[0.14em] text-[#F5F8FC]">
                    {BRAND.brandName}
                  </span>
                </div>
                <span className="text-[9px] font-mono font-bold tracking-[0.28em] text-gradient-brand uppercase">
                  DYNAVION
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#F5F8FC]/90 font-medium leading-relaxed max-w-sm">
              {BRAND.tagline}
            </p>

            <p className="text-xs text-[#9EADC0]/80 leading-relaxed max-w-sm">
              {BRAND.companyName} designs intelligent edge monitoring, abnormal-condition
              detection, and preventive supervisory control systems for commercial and industrial
              electrical infrastructure.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs font-mono text-[#9EADC0]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#00D2FF]" />
                <a
                  href={`mailto:${BRAND.contactEmail}`}
                  className="hover:text-white transition-colors"
                >
                  {BRAND.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#A6FF00]" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#F5F8FC] font-semibold">
              Platform
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {FOOTER_NAVIGATION.platform.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-[#F5F8FC] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#F5F8FC] font-semibold">
              Industries
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {FOOTER_NAVIGATION.industries.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-[#F5F8FC] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#F5F8FC] font-semibold">
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {FOOTER_NAVIGATION.company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-[#F5F8FC] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9EADC0]/70 font-mono">
          <p>© {currentYear} {BRAND.companyName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/platform" className="hover:text-white transition-colors">
              GRiDMiND
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
