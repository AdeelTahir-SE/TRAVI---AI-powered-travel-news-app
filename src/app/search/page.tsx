import SearchCardsSection from "@/components/searchCardsSection";
import SearchHeroSectoion from "@/components/searchHeroSection";
import ShalimarSection from "@/components/shalimarSection";
import ShalimarWithAboveSection from "@/components/shalimarWithAboveCloudSection";
export default function SearchPage() {
  return (
    <div className="flex flex-col items-center">
      <SearchHeroSectoion />
      <SearchCardsSection/>
      <ShalimarWithAboveSection/>

      
    </div>
  );
}
