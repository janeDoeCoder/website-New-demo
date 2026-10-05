"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error securely with digest to monitoring (e.g. Sentry / CloudWatch)
    console.error("[APPLICATION_RUNTIME_ERROR]", {
      message: error.message,
      digest: error.digest,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full p-8 rounded-2xl bg-[#061321] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/30 flex items-center justify-center mx-auto text-[#EF4444]">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#EF4444] font-semibold">
            System Notice
          </span>
          <h1 className="text-2xl font-bold text-[#F5F8FC]">
            Something Went Wrong
          </h1>
          <p className="text-sm text-[#9EADC0] leading-relaxed">
            An unexpected error occurred while processing this interface. Our technical operations team has logged the event.
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-white/30 pt-1">
              Incident Reference: <span className="text-white/60">{error.digest}</span>
            </p>
          )}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#1677FF] hover:bg-[#2982FF] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#F5F8FC] text-xs font-semibold border border-white/[0.08] transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Overview</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
