import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/utils/supabase"
import { Article } from "@/utils/types"

async function getRelatedArticles(excludeTitle: string): Promise<Article[]> {
    const { data, error } = await supabase
        .from("article")
        .select("article_id, title, published_date, images, paras")
        .neq("title", excludeTitle)
        .order("created_at", { ascending: false })
        .limit(3)

    if (error || !data) return []
    return data as Article[]
}

export default async function RelatedArticlesSection({ currentTitle = "" }: { currentTitle?: string }) {
    const articles = await getRelatedArticles(currentTitle)

    if (articles.length === 0) return null

    return (
        <section className="flex flex-col items-center justify-center px-[20px] py-[60px] lg:py-[100px] lg:px-[140px] gap-[18px] lg:gap-[50px]">
            <div className="flex flex-col items-center justify-center">
                <h2 className="flex items-center justify-center gap-[12px] flex-wrap">
                    <span className="heading-2">Related</span>
                    <span className="stylish-yellow-text">Articles</span>
                </h2>
                <p className="text-center font-inter font-normal text-[15px] lg:text-[20px] leading-[24px] lg:leading-[32px] tracking-[-0.02em] text-[#1B1B1B]">
                    Explore more travel stories and destination guides from around the world.
                </p>
            </div>

            <div className="flex flex-row items-center justify-center flex-wrap gap-[20px] lg:gap-[30px]">
                {articles.map((article) => (
                    <RelatedArticleCard key={article.article_id} article={article} />
                ))}
            </div>
        </section>
    )
}

function RelatedArticleCard({ article }: { article: Article }) {
    const slug = encodeURIComponent(article.title.split(" ").join("-"))
    const coverImage = article.images?.[0]
    const excerpt = article.paras?.[0]?.substring(0, 120) + "…"

    return (
        <div className="flex flex-col items-center justify-center shadow-[9px_9px_75px_0px_#00000029] min-w-[320px] sm:w-[388px] min-h-[537px] gap-[28px] rounded-[25px]">
            <div className="flex flex-col items-center justify-center p-[8px] w-full overflow-hidden">
                {coverImage ? (
                    <Image
                        src={coverImage}
                        width={371}
                        height={295}
                        alt={article.title}
                        className="min-w-[320px] sm:w-[371px] h-[295px] overflow-hidden object-cover rounded-[25px]"
                    />
                ) : (
                    <div className="min-w-[320px] sm:w-[371px] h-[295px] bg-gradient-to-br from-blue-100 to-amber-50 rounded-[25px] flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>

            <div className="flex flex-col items-start justify-center px-[24px] pb-[22px] gap-[18px]">
                <h2 className="font-manrope font-extrabold text-[22px] leading-[28px] tracking-[-0.04em] text-[#112259] line-clamp-2">
                    {article.title}
                </h2>
                <p className="font-inter font-normal text-[16px] leading-[24px] tracking-[-0.02em] text-[#000000] line-clamp-3">
                    {excerpt}
                </p>
                <Link
                    href={`/article/${slug}`}
                    className="flex flex-row items-center justify-center text-[#F8A900] gap-[8px] font-inter font-semibold text-[18px] leading-[30px] tracking-[-0.02em]"
                >
                    Read More
                    <Image src={"/icons/read-more.svg"} width={27} height={27} alt="" className="w-[27px] h-[27px]" />
                </Link>
            </div>
        </div>
    )
}