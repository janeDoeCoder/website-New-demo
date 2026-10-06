import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children?: React.ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-[10px] transition-all duration-200 select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variantStyles = {
    primary:
      "bg-[#0052FF] hover:bg-[#0040DD] text-white shadow-[0_2px_14px_rgba(0,82,255,0.4)] hover:shadow-[0_4px_22px_rgba(0,82,255,0.6)] active:translate-y-[1px]",
    secondary:
      "bg-[#081320] hover:bg-[#0E2034] text-[#F5F8FC] border border-white/15 hover:border-[#00D2FF]/40 shadow-sm active:translate-y-[1px]",
    outline:
      "bg-transparent hover:bg-white/[0.05] text-[#F5F8FC] border border-white/20 hover:border-white/40 active:translate-y-[1px]",
    ghost:
      "bg-transparent hover:bg-white/[0.06] text-[#9EADC0] hover:text-[#F5F8FC]",
    link:
      "bg-transparent text-[#00C8FF] hover:underline p-0 h-auto font-normal",
  };

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3 gap-2.5",
  };

  const combinedClasses = cn(
    baseStyles,
    variantStyles[variant],
    variant !== "link" && sizeStyles[size],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
