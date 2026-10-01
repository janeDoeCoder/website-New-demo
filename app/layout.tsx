import type { Metadata, Viewport } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#061321",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.domain),
  title: {
    default: `${BRAND.brandName} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.brandName}`,
  },
  description:
    "VANNIC DYNAVION PRIVATE LIMITED develops intelligent electrical infrastructure monitoring, edge anomaly detection, and preventive supervisory control systems for commercial and industrial facilities.",
  keywords: [
    "VANNIC",
    "GRiDMiND",
    "electrical infrastructure intelligence",
    "industrial edge controller",
    "preventive load control",
    "three phase power monitoring",
    "sub-cycle event logging",
    "brownfield switchgear retrofit",
    "VANNIC DYNAVION",
  ],
  authors: [{ name: BRAND.companyName }],
  creator: BRAND.companyName,
  publisher: BRAND.companyName,
  icons: {
    icon: "/brand/vannic-icon.svg",
    shortcut: "/brand/vannic-icon.svg",
    apple: "/brand/vannic-icon.svg",
  },
  openGraph: {
    title: `${BRAND.brandName} — ${BRAND.tagline}`,
    description:
      "Intelligent electrical monitoring, edge risk detection, and preventive supervisory control for commercial and industrial infrastructure.",
    url: BRAND.domain,
    siteName: BRAND.companyName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/brand/vannic-logo.svg",
        width: 1200,
        height: 630,
        alt: `${BRAND.brandName} - ${BRAND.tagline}`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={cn("dark", "h-full", "antialiased", inter.variable, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col bg-[#061321] text-[#F5F8FC] font-sans selection:bg-[#1677FF]/30 selection:text-[#00C8FF]">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
