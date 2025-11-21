import FAQSection from "@/components/faqSection";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
export default function Home() {
  return (
    <section>
      <Navbar/>
      <HeroSection/>
      <FAQSection />
    </section>
  );
}
