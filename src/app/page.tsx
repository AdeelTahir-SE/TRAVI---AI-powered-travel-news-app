import FAQSection from "@/components/faqSection";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import ExploreActivitiesSection from "@/components/exploreActivitesSection";
import ShalimarSection from "@/components/shalimarSection";
import ExploreDubaiSection from "@/components/exploreDubaiSection";
import Footer from "@/components/footer";
import TrendingSection from "@/components/trendingSection";
export default function Home() {
  return (
    <section>
      <Navbar />
      <HeroSection />
      <ExploreActivitiesSection />
      {/* <FAQSection /> */}
      <ExploreDubaiSection />
      <TrendingSection />
      <ShalimarSection/>

      <Footer />
    </section>
  );
}
