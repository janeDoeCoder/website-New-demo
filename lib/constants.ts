export const BRAND = {
  companyName: "VANNIC DYNAVION PRIVATE LIMITED",
  brandName: "VANNIC",
  productName: "VANNIC GRiDMiND",
  tagline: "Intelligence Behind Every Kilowatt.",
  domain: "https://www.vannicdynavion.com",
  canonicalUrl: "https://www.vannicdynavion.com",
  contactEmail: "contact@vannicdynavion.com",
  hero: {
    eyebrow: "VANNIC GRiDMiND",
    headlineLine1: "Detect Electrical Risks",
    headlineLine2: "Before They Become Downtime.",
    description:
      "VANNIC monitors electrical conditions in real time, detects developing risks and supports preventive control of approved non-critical loads before avoidable interruptions occur.",
    targetAudienceNote: "Designed for commercial and industrial electrical infrastructure.",
    primaryCta: "Request a Demo",
    secondaryCta: "Explore the Platform",
    edgeSeriesLabel: "Series-1 Active",
  },
  mission:
    "VANNIC DYNAVION PRIVATE LIMITED aims to make commercial and industrial electrical infrastructure more intelligent, reliable, and efficient by moving facilities from reactive monitoring toward preventive, data-driven energy management.",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Platform", href: "/platform" },
  { label: "Technology", href: "/technology" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const BREAKPOINTS = {
  mobile: 360,
  mobileLg: 430,
  tablet: 768,
  laptop: 1024,
  desktop: 1366,
  desktopLg: 1440,
  wide: 1920,
} as const;
