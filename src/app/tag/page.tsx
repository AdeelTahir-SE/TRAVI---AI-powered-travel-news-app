import type { Metadata } from "next";
import CategoryHeroSection from "@/components/categoryHeroSection";
import ShalimarWithAboveSection from "@/components/shalimarWithAboveCloudSection";
import TagCardsSection from "@/components/tagCardsSection";
import AboutLocationSection from "@/components/aboutLocationComponent";

export const metadata: Metadata = {
    title: "Travel Tags | Travi",
    description: "Browse travel content by tags and discover related articles, destinations, and experiences. Explore curated travel topics.",

    openGraph: {
        title: "Travel Tags | Travi",
        description: "Browse travel content by tags and discover related articles, destinations, and experiences. Explore curated travel topics.",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/tag`,
        siteName: "Travi",
        images: [
            {
                url: "/logo/navbar-text.svg",
                width: 1200,
                height: 630,
                alt: "Travi - Travel Tags",
            },
        ],
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Travel Tags | Travi",
        description: "Browse travel content by tags and discover related articles, destinations, and experiences. Explore curated travel topics.",
        images: ["/logo/navbar-text.svg"],
    },

    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/tag`,
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function Tag() {
    return (
        <div className="flex flex-col items-center justify-center">
            <CategoryHeroSection />
            <TagCardsSection />
            <AboutLocationSection />
            <ShalimarWithAboveSection />

        </div>
    )
}