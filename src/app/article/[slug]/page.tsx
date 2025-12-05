import ArticleCoupleSection from "@/components/articleCoupleSection";
import ArticleHeroSection from "@/components/articleHeroSection";
import RelatedArticlesSection from "@/components/relatedArticlesSection";
import TraviRecommends from "@/components/traviRecommends";
import ArticleContentSection from "@/components/articleContentSection";
async function fetchArticle(slug: string) {

}
export default function ArticlePage() {
    return (
        <div className="flex flex-col items-center justify-center">
            <ArticleHeroSection />
            <ArticleContentSection />

            <TraviRecommends />
            <RelatedArticlesSection />
            <ArticleCoupleSection />

        </div>
    )
}