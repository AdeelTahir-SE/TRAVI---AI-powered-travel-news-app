
import HeroSection from "@/components/hero-section";
import ExploreActivitiesSection from "@/components/exploreActivitesSection";
import ShalimarSection from "@/components/shalimarSection";
import ExploreDubaiSection from "@/components/exploreDubaiSection";
import TrendingSection from "@/components/trendingSection";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <section>
      <Navbar />
      <HeroSection />
      <ExploreActivitiesSection />
      <ExploreDubaiSection />
      <TrendingSection />
      <ShalimarSection />
      <Footer />
    </section>
  );
}
