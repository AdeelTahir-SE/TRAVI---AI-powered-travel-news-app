import type { Metadata } from "next";
import AboutLocationSection from "@/components/aboutLocationComponent"
import BookStaySection from "@/components/bookStaySection"
import CategoryHeroSection from "@/components/categoryHeroSection"
import LocationAttractionsSection from "@/components/locationAttractionsSection"
import LocationDownTownMap from "@/components/locationDownTownMap"
import LocationHotelsSection from "@/components/locationHotelsSection"
import ShalimarWithAboveSection from "@/components/shalimarWithAboveCloudSection"

export const metadata: Metadata = {
    title: "Travel Locations | Travi",
    description: "Explore travel destinations, attractions, and hotels in popular locations worldwide. Find the best places to visit and stay.",

    openGraph: {
        title: "Travel Locations | Travi",
        description: "Explore travel destinations, attractions, and hotels in popular locations worldwide. Find the best places to visit and stay.",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/location`,
        siteName: "Travi",
        images: [
            {
                url: "/logos/navbar-text.svg",
                width: 1200,
                height: 630,
                alt: "Travi - Travel Locations",
            },
        ],
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Travel Locations | Travi",
        description: "Explore travel destinations, attractions, and hotels in popular locations worldwide. Find the best places to visit and stay.",
        images: ["/logos/navbar-text.svg"],
    },

    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/location`,
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function Location() {
    return (
        <div>
            <CategoryHeroSection />
            <AboutLocationSection />
            <LocationHotelsSection />
            <LocationAttractionsSection />
            <LocationDownTownMap />
            <BookStaySection />
            <ShalimarWithAboveSection />
        </div>
    )
}