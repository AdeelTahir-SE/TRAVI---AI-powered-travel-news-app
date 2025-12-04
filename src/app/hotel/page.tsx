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