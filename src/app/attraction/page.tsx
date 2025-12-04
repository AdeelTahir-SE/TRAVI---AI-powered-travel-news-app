import AboutMuseumSection from "@/components/aboutMuseumSection";
import AttractionHeroSection from "@/components/attractionHeroSection";
import AttractionPageFeaturesSection from "@/components/attractionPageFeaturesSection";

export default function AttractionPage() {
    return (
        <div className="flex flex-col items-center justify-center">
            <AttractionHeroSection />
            <AttractionPageFeaturesSection />
            <AboutMuseumSection />
        </div>
    )
}