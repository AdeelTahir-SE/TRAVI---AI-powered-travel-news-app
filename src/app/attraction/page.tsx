import AboutMuseumSection from "@/components/aboutMuseumSection";
import AttractionBookStaySection from "@/components/attractionBookingSection";
import AttractionHeroSection from "@/components/attractionHeroSection";
import AttractionHighlights from "@/components/attractionHighlights";
import AttractionPageFeaturesSection from "@/components/attractionPageFeaturesSection";
import FAQSection from "@/components/faqSection";
import HotelDetailsEssentialInformation from "@/components/hotelDetailsEssentialInformation";
import LocationAndNearBySection from "@/components/locationAndNearBySection";
import PricingSection from "@/components/pricingSection";
import ShalimarWithAboveSection from "@/components/shalimarWithAboveCloudSection";
import TravelTipsSection from "@/components/travelerTips";
import YouMightLikeSection from "@/components/youMightLikeSection";
export default function AttractionPage() {
    return (
        <div className="flex flex-col items-center justify-center">
            <AttractionHeroSection />
            <AttractionPageFeaturesSection />
            <AboutMuseumSection />
            <PricingSection />
            <HotelDetailsEssentialInformation />
            <AttractionHighlights />
            <TravelTipsSection />
            <FAQSection />
            <LocationAndNearBySection />
            <AttractionBookStaySection />
            <YouMightLikeSection />
            <ShalimarWithAboveSection />
        </div>
    )
}