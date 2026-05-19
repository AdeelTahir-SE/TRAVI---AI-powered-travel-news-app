import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://travi-ai-powered-travel-news-app.vercel.app";
const siteTitle = "Travi | Travel News & Trending Destinations";
const siteDescription =
  "Travi keeps you updated with the latest travel news, trending destinations, activities, and travel guides from around the world. Powered by AI.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | Travi",
  },
  description: siteDescription,
  keywords: [
    "travel news",
    "trending destinations",
    "Dubai travel",
    "travel guide",
    "luxury hotels",
    "travel tips",
    "UAE tourism",
    "AI travel journalism",
    "travel articles",
  ],
  authors: [{ name: "Travi" }],
  creator: "Travi",
  publisher: "Travi",

  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Travi",
    images: [
      {
        url: "/logos/navbar-text.svg",
        width: 1200,
        height: 630,
        alt: "Travi - Travel News & Trending Destinations",
      },
    ],
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/logos/navbar-text.svg"],
    creator: "@travi_travel",
  },

  icons: {
    icon: "/logos/navbar-text.svg",
    shortcut: "/logos/navbar-text.svg",
  },

  alternates: {
    canonical: siteUrl,
  },

  metadataBase: new URL(siteUrl),

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },

  category: "travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
