import ArticleCoupleSection from "@/components/articleCoupleSection";
import ArticleHeroSection from "@/components/articleHeroSection";
import RelatedArticlesSection from "@/components/relatedArticlesSection";
import TraviRecommends from "@/components/traviRecommends";
import ArticleContentSection from "@/components/articleContentSection";
import ExperienceDubaiSection from "@/components/experienceDubaiSection";
import { supabase } from "@/utils/supabase";
import { Article } from "@/utils/types";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";

async function getArticle(title: string): Promise<Article | null> {
  console.log(title)
  const { data, error } = await supabase
    .from("article")
    .select("*")
    .eq("title", title?.split("-").join(" "))
    .single();

  if (error || !data) {
    console.error("Error fetching article:", error);
    return null;
  }

  return data as Article;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  const cleanSlug = decodeURIComponent(slug);

  const article = await getArticle(cleanSlug);

  if (!article) notFound();

  return (
    <div className="flex flex-col items-center justify-center">
      <ArticleHeroSection articleImage={article.images?.[0]} />
      <ArticleContentSection article={article} />
      <ExperienceDubaiSection />
      <TraviRecommends />
      <RelatedArticlesSection />
      <ArticleCoupleSection />
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: "Article Not Found | Travi",
      description: "The requested article could not be found.",
    };
  }

  const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/article/${params.slug}`;
  const imageUrl = article.images?.[0] || "/logos/navbar-text.svg";

  return {
    title: `${article.title} | Travi`,
    description: article.paras?.[0]?.substring(0, 160) || article.title,

    openGraph: {
      title: article.title,
      description: article.paras?.[0]?.substring(0, 160) || article.title,
      url: articleUrl,
      siteName: "Travi",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
      publishedTime: article.published_date,
    },

    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.paras?.[0]?.substring(0, 160) || article.title,
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
