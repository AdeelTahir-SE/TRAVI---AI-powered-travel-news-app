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
import { supabase } from "@/utils/supabase";
import { Hotel } from "@/utils/types";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getHotel(title: string): Promise<Hotel | null> {
    const { data, error } = await supabase
        .from("hotel")
        .select("*")
        .eq("title", title?.split("-").join(" "))
        .single();

    if (error || !data) {
        console.error("Error fetching hotel:", error);
        return null;
    }

    return data as Hotel;
}

export default async function HotelPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const cleanSlug = decodeURIComponent(slug);
    const hotel = await getHotel(cleanSlug);
    if (!hotel) notFound();

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
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const cleanSlug = decodeURIComponent(slug);
    const hotel = await getHotel(cleanSlug);

    if (!hotel) {
        return {
            title: "Hotel Not Found | Travi",
            description: "The requested hotel could not be found.",
        };
    }

    const hotelUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/hotel/${slug}`;
    const imageUrl =
        hotel.hotel_image_in_clouds ||
        hotel.about_hotel_images?.[0] ||
        "/logos/navbar-text.svg";

    return {
        title: `${hotel.title} | Travi`,
        description:
            hotel.tagline || `Discover ${hotel.title} - ${hotel.location || ""}`,

        openGraph: {
            title: hotel.title,
            description:
                hotel.tagline || `Discover ${hotel.title} - ${hotel.location || ""}`,
            url: hotelUrl,
            siteName: "Travi",
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: hotel.title,
                },
            ],
            type: "website",
        },

        twitter: {
            card: "summary_large_image",
            title: hotel.title,
            description:
                hotel.tagline || `Discover ${hotel.title} - ${hotel.location || ""}`,
            images: [imageUrl],
        },

        alternates: {
            canonical: hotelUrl,
        },

        robots: {
            index: true,
            follow: true,
        },
    };
}