import CategoryHeroSection from "@/components/categoryHeroSection";
import ComparisonDescriptionSection from "@/components/comparisonDescriptionSection";
import HotelComparisonTableSection from "@/components/hotelComparisonTableSection";
import TopHotelsSection from "@/components/topHotelsSection";
import FAQSection from "@/components/faqSection";
import BookStaySection from "@/components/bookStaySection";
import ShalimarSection from "@/components/shalimarSection";
export default function ComparisonPage() {
  return (
    <div className="flex flex-col items-center justify-center overflow-x-auto">
      <CategoryHeroSection />
      <ComparisonDescriptionSection />
      <TopHotelsSection />
      <HotelComparisonTableSection />
      <FAQSection />
      <BookStaySection/>
      <ShalimarSection/>
    </div>
  );
}
