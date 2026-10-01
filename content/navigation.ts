export interface NavItem {
  label: string;
  href: string;
}

export const MAIN_NAVIGATION: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Platform", href: "/platform" },
  { label: "Technology", href: "/technology" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAVIGATION = {
  platform: [
    { label: "GRiDMiND Overview", href: "/platform" },
    { label: "Edge Architecture", href: "/technology" },
    { label: "Preventive Load Control", href: "/platform#preventive-control" },
    { label: "Brownfield Integration", href: "/technology#brownfield" },
  ],
  industries: [
    { label: "Manufacturing & MSMEs", href: "/industries#manufacturing-msmes" },
    { label: "Hospitals & Healthcare", href: "/industries#hospitals-healthcare" },
    { label: "Hotels & Hospitality", href: "/industries#hotels-hospitality" },
    { label: "Cold Storage & Logistics", href: "/industries#cold-storage" },
    { label: "Commercial Buildings", href: "/industries#commercial-buildings" },
  ],
  company: [
    { label: "About VANNIC", href: "/about" },
    { label: "Engineering Philosophy", href: "/about#philosophy" },
    { label: "Architecture Story", href: "/technology#architecture" },
    { label: "Contact & Demo", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
