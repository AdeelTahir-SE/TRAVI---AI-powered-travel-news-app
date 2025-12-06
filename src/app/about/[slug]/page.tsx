import { use } from "react";
import AboutAttractionHeroSection from "@/components/aboutAttractionSection";
import { fetchRequest } from "@/utils/fetch";

export const dynamic = "force-static";
export const revalidate = 86400;








export async function generateStaticParams() {
  const {data,error} = await fetchRequest(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/attractions`,
    {
      cache: "force-cache",
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data?.map((item:any) => ({
    slug: item.slug,
  }));
}







async function getAttraction(slug: string) {
  const {data,error} = await fetchRequest(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/attractions/${slug}`,
    { cache: "force-cache" }
  );
  return {data,error}
}











export default function AboutAttractionPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const {data,error} = use(getAttraction(slug));

  return (
    <section className="flex flex-col items-center justify-center">
      {/* <AboutAttractionHeroSection data={data} /> */}
      <AboutAttractionHeroSection />
    </section>
  );
}













export async function generateMetadata({ params }: { params: { slug: string } }) {
  const {data,error} = await getAttraction(params.slug);

  if (!data) {
    return {
      title: "Attraction Not Found",
    };
  }

  return {
    title: data.title,
    description: data.description,
  };
}
