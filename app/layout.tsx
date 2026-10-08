import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Air Suspension",
    "AirTouch Stance",
    "air touch stance",
    "Air Suspension Egypt",
    "Car Air Suspension",
    "Luxury Car Suspension",
    "Vehicle Air Ride",
    "Performance Suspension",
    "air suspension stance",
    "stance suspension",
    "Mansoura Egypt Car",
  ],
  authors: [{ name: "AirTouch Stance" }],
  creator: "AirTouch Stance",
  publisher: "AirTouch Stance",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: SITE_CONFIG.googleSiteVerification,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  // icon.png in app/ directory is automatically picked up by Next.js
  // as favicon (32x32 in browser tab) and icon
  icons: {
    icon: [
      { url: "/images/logo.webp", type: "image/webp" },
    ],
    apple: [
      { url: "/images/logo.webp", type: "image/webp" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#fbfbfe] text-[#040316] antialiased">
        {children}
      </body>
    </html>
  );
}
