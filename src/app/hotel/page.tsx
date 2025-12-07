import type { Metadata } from "next";
import AboutHotelSection from "@/components/aboutHotelSection";
import BookStaySection from "@/components/bookStaySection";
import FAQSection from "@/components/faqSection";
import HotelDetailHeroSection from "@/components/hotelDetailHeroSection";
import HotelDetailsEssentialInformation from "@/components/hotelDetailsEssentialInformation";
import HotelHighLightsSection from "@/components/hotelHighLightsSection";
import HotelImageWithCloudSection from "@/components/hotelImageWithCloudSectoin";
import HotelSpecsSection from "@/components/hotelSpecsSection";
import RoomTypesSection from "@/components/RoomTypesSection";
import ShalimarWithAboveSection from "@/components/shalimarWithAboveCloudSection";
import TravelerTips from "@/components/travelerTips";

export const metadata: Metadata = {
    title: "Hotel Details | Travi",
    description: "Discover detailed information about hotels, amenities, room types, and booking options for your perfect stay.",

    openGraph: {
        title: "Hotel Details | Travi",
        description: "Discover detailed information about hotels, amenities, room types, and booking options for your perfect stay.",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/hotel`,
        siteName: "Travi",
        images: [
            {
                url: "/logos/navbar-text.svg",
                width: 1200,
                height: 630,
                alt: "Travi - Hotel Details",
            },
        ],
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Hotel Details | Travi",
        description: "Discover detailed information about hotels, amenities, room types, and booking options for your perfect stay.",
        images: ["/logos/navbar-text.svg"],
    },

    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/hotel`,
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function HotelPage() {
    return (
        <div className="flex flex-col items-center justify-center">
            <HotelDetailHeroSection />
            <HotelSpecsSection />
            <AboutHotelSection />
            <HotelImageWithCloudSection />
            <HotelHighLightsSection />
            <RoomTypesSection />
            <HotelDetailsEssentialInformation />
            <TravelerTips />
            <FAQSection />
            <BookStaySection />
            <ShalimarWithAboveSection />
        </div>
    )
}