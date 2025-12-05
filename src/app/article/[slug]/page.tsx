import ArticleCoupleSection from "@/components/articleCoupleSection";
import ArticleHeroSection from "@/components/articleHeroSection";
import RelatedArticlesSection from "@/components/relatedArticlesSection";
import TraviRecommends from "@/components/traviRecommends";
import CommentContainer from "@/components/commentContainer"
import QuoteWithoutImage from "@/components/quoteWithoutImage";
export default function ArticlePage() {
    return (
        <div className="flex flex-col items-center justify-center">
            <ArticleHeroSection />
            <TraviRecommends />
            <RelatedArticlesSection />
            <ArticleCoupleSection />
            <CommentContainer />
            <QuoteWithoutImage />

        </div>
    )
}