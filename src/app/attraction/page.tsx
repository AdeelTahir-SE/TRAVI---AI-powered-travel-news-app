import AboutMuseumSection from "@/components/aboutMuseumSection";
import AttractionHeroSection from "@/components/attractionHeroSection";
import AttractionHighlights from "@/components/attractionHighlights";
import AttractionPageFeaturesSection from "@/components/attractionPageFeaturesSection";
import FAQSection from "@/components/faqSection";
import HotelDetailsEssentialInformation from "@/components/hotelDetailsEssentialInformation";
import PricingSection from "@/components/pricingSection";
import TravelTipsSection from "@/components/travelerTips";
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
        </div>
    )
}