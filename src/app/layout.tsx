import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



const siteTitle = "Travi | Travel News & Trending Destinations";
const siteDescription =
  "Travi keeps you updated with the latest travel news, trending destinations, activities, and travel guides from around the world.";


export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,

  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: process.env.NEXT_PUBLIC_SITE_URL, // replace with your domain
    siteName: "Travi",
    images: [
      {
        url: "/navbar-text.svg", // your social preview image
        width: 1200,
        height: 630,
        alt: "Travi - Travel News & Trending Destinations",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/navbar-text.svg"],
  },

  icons: {
    icon: "/navbar-text.svg",
  },

  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },

  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://travi-ai-powered-travel-news-app.vercel.app/"),

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />

        {children}
        <Footer />
      </body>
    </html>
  );
}
