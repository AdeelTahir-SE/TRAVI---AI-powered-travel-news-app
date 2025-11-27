import CategoryCardsSection from "@/components/categoryCardsSection";
import CategoryHeroSection from "@/components/categoryHeroSection";

export default function Category() {
  return (
    <div className="flex flex-col items-center justify-center">
      <CategoryHeroSection />
      <CategoryCardsSection/>
    </div>
  );
}
