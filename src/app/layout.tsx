import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const title = `${site.name} | Nigerian food made from scratch`;

export const metadata: Metadata = {
  // Only set once the real domain is known (SITE_URL); Vercel fills this in automatically otherwise
  metadataBase: process.env.SITE_URL ? new URL(process.env.SITE_URL) : undefined,
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: [
    "Nigerian food Toronto",
    "jollof rice",
    "puff puff",
    "small chops",
    "gizdodo",
    "chin chin",
    "zobo",
    "African catering GTA",
    "party trays",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_CA",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: site.name }],
  },
  other: {
    "geo.region": "CA-ON",
    "geo.placename": "Toronto",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#fff6ec",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-CA" className={`${fraunces.variable} ${jakarta.variable} ${caveat.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
