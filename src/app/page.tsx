import FAQSection from "@/components/faqSection";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import ExploreActivitiesSection from "@/components/exploreActivitesSection";
export default function Home() {
  return (
    <section>
      <Navbar/>
      <HeroSection/>
      <ExploreActivitiesSection/>
      <FAQSection />

    </section>
  );
}
