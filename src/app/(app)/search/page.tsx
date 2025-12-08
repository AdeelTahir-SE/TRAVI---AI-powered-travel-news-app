import type { Metadata } from "next";
import SearchCardsSection from "@/components/searchCardsSection";
import SearchHeroSectoion from "@/components/searchHeroSection";
import ShalimarSection from "@/components/shalimarSection";
import ShalimarWithAboveSection from "@/components/shalimarWithAboveCloudSection";

export const metadata: Metadata = {
  title: "Search Travel Content | Travi",
  description: "Search for travel articles, destinations, attractions, and hotels. Find exactly what you're looking for with Travi's comprehensive search.",

  openGraph: {
    title: "Search Travel Content | Travi",
    description: "Search for travel articles, destinations, attractions, and hotels. Find exactly what you're looking for with Travi's comprehensive search.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/search`,
    siteName: "Travi",
    images: [
      {
        url: "/logos/navbar-text.svg",
        width: 1200,
        height: 630,
        alt: "Travi - Search Travel Content",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Search Travel Content | Travi",
    description: "Search for travel articles, destinations, attractions, and hotels. Find exactly what you're looking for with Travi's comprehensive search.",
    images: ["/logos/navbar-text.svg"],
  },

  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/search`,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function SearchPage() {

  return (
    <div className="flex flex-col items-center">
      <SearchHeroSectoion />
      <SearchCardsSection />
      <ShalimarWithAboveSection />


    </div>
  );
}
