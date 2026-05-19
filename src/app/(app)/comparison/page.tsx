import type { Metadata } from "next";
import CategoryHeroSection from "@/components/categoryHeroSection";
import ComparisonDescriptionSection from "@/components/comparisonDescriptionSection";
import HotelComparisonTableSection from "@/components/hotelComparisonTableSection";
import TopHotelsSection from "@/components/topHotelsSection";
import FAQSection from "@/components/faqSection";
import BookStaySection from "@/components/bookStaySection";
import ShalimarSection from "@/components/shalimarSection";

export const metadata: Metadata = {
  title: "Hotel Comparison | Travi",
  description: "Compare top hotels and accommodations to find the perfect stay for your travel needs. Detailed comparisons of amenities, prices, and reviews.",

  openGraph: {
    title: "Hotel Comparison | Travi",
    description: "Compare top hotels and accommodations to find the perfect stay for your travel needs. Detailed comparisons of amenities, prices, and reviews.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/comparison`,
    siteName: "Travi",
    images: [
      {
        url: "/logos/navbar-text.svg",
        width: 1200,
        height: 630,
        alt: "Travi - Hotel Comparison",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hotel Comparison | Travi",
    description: "Compare top hotels and accommodations to find the perfect stay for your travel needs. Detailed comparisons of amenities, prices, and reviews.",
    images: ["/logos/navbar-text.svg"],
  },

  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/comparison`,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ComparisonPage() {
  return (
    <div className="flex flex-col overflow-hidden w-full">
      <CategoryHeroSection />
      <ComparisonDescriptionSection />
      <TopHotelsSection />
      <HotelComparisonTableSection />
      <FAQSection />
      <BookStaySection />
      <ShalimarSection />
    </div>
  );
}
