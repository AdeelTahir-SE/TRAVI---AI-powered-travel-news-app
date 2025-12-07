import AboutMuseumSection from "@/components/aboutMuseumSection";
import AttractionBookStaySection from "@/components/attractionBookingSection";
import AttractionHeroSection from "@/components/attractionHeroSection";
import AttractionHighlights from "@/components/attractionHighlights";
import AttractionPageFeaturesSection from "@/components/attractionPageFeaturesSection";
import FAQSection from "@/components/faqSection";
import HotelDetailsEssentialInformation from "@/components/hotelDetailsEssentialInformation";
import LocationAndNearBySection from "@/components/locationAndNearBySection";
import PricingSection from "@/components/pricingSection";
import ShalimarWithAboveSection from "@/components/shalimarWithAboveCloudSection";
import TravelTipsSection from "@/components/travelerTips";
import YouMightLikeSection from "@/components/youMightLikeSection";
import { fetchRequest } from "@/utils/fetch";
import { use } from "react";





export const dynamic = "force-static";
export const revalidate = 86400;



export async function generateStaticParams() {
  const { data, error } = await fetchRequest(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/attractions`,
    {
      cache: "force-cache",
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data?.map((item: any) => ({
    slug: item.slug,
  }));
}







async function getAttraction(slug: string) {
  const { data, error } = await fetchRequest(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/attractions/${slug}`,
    { cache: "force-cache" }
  );
  return { data, error };
}










export default function AttractionPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data, error } = use(getAttraction(slug));
  return (
    <div className="flex flex-col items-center justify-center">
      <AttractionHeroSection />
      <AttractionPageFeaturesSection />
      <AboutMuseumSection />
      <PricingSection />
      <HotelDetailsEssentialInformation />
      <AttractionHighlights />
      <TravelTipsSection />
      <FAQSection />
      <LocationAndNearBySection />
      <AttractionBookStaySection />
      <YouMightLikeSection />
      <ShalimarWithAboveSection />
    </div>
  )
}




export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data, error } = await getAttraction(params.slug);

  if (!data) {
    return {
      title: "Attraction Not Found | Travi",
      description: "The requested attraction could not be found.",
    };
  }

  const attractionUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/attraction/${params.slug}`;
  const imageUrl = data?.image || "/logos/navbar-text.svg";

  return {
    title: `${data.title} | Travi`,
    description: data.description,

    openGraph: {
      title: data.title,
      description: data.description,
      url: attractionUrl,
      siteName: "Travi",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      type: "website",
      locale: "en_US",
    },

    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [imageUrl],
    },

    alternates: {
      canonical: attractionUrl,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
