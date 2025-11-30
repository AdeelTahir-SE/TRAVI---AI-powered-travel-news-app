import BookStaySection from "@/components/bookStaySection";
import CategoryCardsSection from "@/components/categoryCardsSection";
import CategoryHeroSection from "@/components/categoryHeroSection";
import ShalimarWithAboveSection from "@/components/shalimarWithAboveCloudSection";
export default function Category() {
  return (
    <div className="flex flex-col items-center justify-center">
      <CategoryHeroSection />
      <CategoryCardsSection />
      <BookStaySection />
      <ShalimarWithAboveSection />
    </div>
  );
}
