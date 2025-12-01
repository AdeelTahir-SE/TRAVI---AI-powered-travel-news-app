import CategoryHeroSection from "@/components/categoryHeroSection";
import ShalimarWithAboveSection from "@/components/shalimarWithAboveCloudSection";
import TagCardsSection from "@/components/tagCardsSection";
import AboutLocationSection from "@/components/aboutLocationComponent";
export default function Tag(){
    return(
        <div className="flex flex-col items-center justify-center">
            <CategoryHeroSection/>
            <TagCardsSection/>
            <AboutLocationSection/>
            <ShalimarWithAboveSection/>

        </div>
    )
}