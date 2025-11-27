
import HeroSection from "@/components/hero-section";
import ExploreActivitiesSection from "@/components/exploreActivitesSection";
import ShalimarSection from "@/components/shalimarSection";
import ExploreDubaiSection from "@/components/exploreDubaiSection";
import TrendingSection from "@/components/trendingSection";
export default function Home() {
  return (
    <section>
      <HeroSection />
      <ExploreActivitiesSection />
      {/* <FAQSection /> */}
      <ExploreDubaiSection />
      <TrendingSection />
      <ShalimarSection/>

    </section>
  );
}
