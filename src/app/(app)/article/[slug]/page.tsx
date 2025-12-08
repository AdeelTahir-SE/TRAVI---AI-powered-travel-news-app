import ArticleCoupleSection from "@/components/articleCoupleSection";
import ArticleHeroSection from "@/components/articleHeroSection";
import RelatedArticlesSection from "@/components/relatedArticlesSection";
import TraviRecommends from "@/components/traviRecommends";
import ArticleContentSection from "@/components/articleContentSection";
import ExperienceDubaiSection from "@/components/experienceDubaiSection";
import { use } from "react";
import { fetchRequest } from "@/utils/fetch";







export const dynamic = "force-static";
export const revalidate = 86400;








export async function generateStaticParams() {
  const { data, error } = await fetchRequest(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles`,
    {
      cache: "force-cache",
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data?.map((item: any) => ({
    slug: item.slug,
  }));
}





















async function getArticle(slug: string) {
  const { data, error } = await fetchRequest(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/${slug}`,
    { cache: "force-cache" }
  );
  return { data, error };
}











export default function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // ❗ use() allows promise suspension inside component
  const { data, error } = use(getArticle(slug));

  return (
    <div className="flex flex-col items-center justify-center">
      <ArticleHeroSection />
      <ArticleContentSection />
      <ExperienceDubaiSection />

      <TraviRecommends />
      <RelatedArticlesSection />

      <ArticleCoupleSection />
    </div>
  );
}







export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data, error } = await getArticle(params.slug);

  if (!data) {
    return {
      title: "Article Not Found | Travi",
      description: "The requested article could not be found.",
    };
  }

  const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/article/${params.slug}`;
  const imageUrl = data?.image || "/logos/navbar-text.svg";

  return {
    title: `${data?.title} | Travi`,
    description: data?.description,

    openGraph: {
      title: data?.title,
      description: data?.description,
      url: articleUrl,
      siteName: "Travi",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data?.title,
        },
      ],
      type: "article",
      publishedTime: data?.publishedAt,
      authors: data?.author ? [data.author] : undefined,
      tags: data?.tags,
    },

    twitter: {
      card: "summary_large_image",
      title: data?.title,
      description: data?.description,
      images: [imageUrl],
    },

    alternates: {
      canonical: articleUrl,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
