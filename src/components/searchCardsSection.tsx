'use client'

import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import HotelCard from "./hotelCard"
import BookStaySection from "./bookStaySection"
import { Hotel, Article } from "@/utils/types"

const PRICE_OPTIONS = [
    { label: 'Any Price',     value: '' },
    { label: 'Under $200',    value: '0-200' },
    { label: '$200 – $400',   value: '200-400' },
    { label: '$400 – $600',   value: '400-600' },
    { label: '$600+',         value: '600-99999' },
]

const RATING_OPTIONS = [
    { label: 'Any Rating', value: '' },
    { label: '4.5+', value: '4.5' },
    { label: '4+',   value: '4' },
    { label: '3.5+', value: '3.5' },
]

const HOTEL_SORT_OPTIONS = [
    { label: 'Default',           value: '' },
    { label: 'Price: Low → High', value: 'price-low' },
    { label: 'Price: High → Low', value: 'price-high' },
    { label: 'Top Rated',         value: 'rating' },
    { label: 'Most Reviewed',     value: 'popular' },
]

const ARTICLE_SORT_OPTIONS = [
    { label: 'Newest First', value: '' },
    { label: 'Oldest First', value: 'oldest' },
]

interface SearchCardsSectionProps {
    hotels:      Hotel[]
    articles:    Article[]
    loading:     boolean
    error:       string | null
    currentPage: number
    totalPages:  number
    totalCount:  number
}

// ── Article card ──────────────────────────────────────────────────────────────
function ArticleCard({ article }: { article: Article }) {
    const slug = article.title?.replace(/ /g, '-') || ''
    const date = article.published_date
        ? new Date(article.published_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        : ''

    return (
        <div className="flex flex-col border border-[#D0D5DD] rounded-[30px] bg-white w-[300px] sm:w-[350px] md:w-[400px] lg:w-[525px] max-w-[525px] shadow-lg overflow-hidden">
            <div className="relative h-[220px] w-full bg-gray-100">
                <Image
                    src={article.images?.[0] || '/background-images/explore-dubai.svg'}
                    alt={article.title}
                    fill
                    className="object-cover"
                />
                {date && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#112259] font-inter text-xs font-semibold px-3 py-1 rounded-full">
                        {date}
                    </span>
                )}
            </div>
            <div className="p-6 flex flex-col gap-3 flex-1">
                <h3 className="font-inter font-semibold text-[22px] leading-[30px] tracking-[-0.02em] line-clamp-2">
                    {article.title}
                </h3>
                <p className="font-inter text-[16px] text-[#475467] leading-[24px] line-clamp-3">
                    {article.paras?.[0]?.substring(0, 160)}…
                </p>
            </div>
            <div className="px-6 pb-6">
                <Link
                    href={`/article/${slug}`}
                    className="inline-flex items-center gap-2 border border-[#D0D5DD] hover:bg-blue-50 hover:border-[#0D7FF2] transition-colors py-[16px] px-[24px] rounded-full font-inter font-bold text-[18px]"
                >
                    Read Article
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
    return (
        <div className="flex flex-col border border-[#D0D5DD] rounded-[30px] bg-white w-[300px] sm:w-[350px] md:w-[400px] lg:w-[525px] max-w-[525px] shadow-lg animate-pulse">
            <div className="h-[220px] bg-gray-200 rounded-t-[30px]" />
            <div className="p-6 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-2/3" />
            </div>
            <div className="border-t border-[#D0D5DD] p-6 flex justify-between items-center">
                <div className="h-8 bg-gray-200 rounded w-20" />
                <div className="h-10 bg-gray-100 rounded-full w-32" />
            </div>
        </div>
    )
}

// ── Pagination ────────────────────────────────────────────────────────────────
function Pagination({ current, total, onPage }: { current: number; total: number; onPage: (p: number) => void }) {
    if (total <= 1) return null

    const pages: (number | '...')[] = []
    if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i)
    } else {
        pages.push(1)
        if (current > 3) pages.push('...')
        for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i)
        if (current < total - 2) pages.push('...')
        pages.push(total)
    }

    return (
        <>
            {/* Desktop */}
            <div className="hidden md:flex flex-row items-center justify-between border-t border-white w-full pt-2">
                <button
                    onClick={() => onPage(current - 1)}
                    disabled={current === 1}
                    className="flex items-center gap-2 px-[30px] py-[24px] border border-[#D0D5DD] rounded-full font-inter font-bold text-[20px] transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    <Image src="/icons/arrow-left.svg" alt="" width={24} height={24} className="w-6 h-6" />
                    Previous
                </button>
                <div className="flex items-center gap-1">
                    {pages.map((p, i) => p === '...'
                        ? <span key={`e${i}`} className="px-4 py-2 font-inter text-[18px]">…</span>
                        : <button
                            key={p}
                            onClick={() => onPage(p as number)}
                            className={`font-inter font-medium text-[18px] px-4 py-2 rounded-xl transition-colors ${current === p ? 'bg-[#0D7FF2] text-white' : 'bg-white hover:bg-gray-100'}`}
                        >{p}</button>
                    )}
                </div>
                <button
                    onClick={() => onPage(current + 1)}
                    disabled={current === total}
                    className="flex items-center gap-2 px-[30px] py-[24px] border border-[#D0D5DD] rounded-full font-inter font-bold text-[20px] transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    Next
                    <Image src="/icons/arrow-left.svg" alt="" width={24} height={24} className="w-6 h-6 rotate-180" />
                </button>
            </div>
            {/* Mobile */}
            <div className="md:hidden flex items-center justify-between w-full border-t border-white pt-2">
                <button onClick={() => onPage(current - 1)} disabled={current === 1} className="w-[58px] h-[58px] rounded-full flex items-center justify-center border border-[#D0D5DD] disabled:opacity-40">
                    <Image src="/icons/arrow-left.svg" alt="" width={24} height={24} className="w-6 h-6" />
                </button>
                <span className="font-inter text-[20px] text-[#344054]">Page {current} of {total}</span>
                <button onClick={() => onPage(current + 1)} disabled={current === total} className="w-[58px] h-[58px] rounded-full flex items-center justify-center border border-[#D0D5DD] disabled:opacity-40">
                    <Image src="/icons/arrow-left.svg" alt="" width={24} height={24} className="w-6 h-6 rotate-180" />
                </button>
            </div>
        </>
    )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function SearchCardsSection({
    hotels, articles, loading, error, currentPage, totalPages, totalCount,
}: SearchCardsSectionProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentType   = searchParams.get('type')     || 'all'
    const currentSort   = searchParams.get('sortBy')   || ''
    const currentPrice  = searchParams.get('price')    || ''
    const currentRating = searchParams.get('rating')   || ''
    const query         = searchParams.get('q')        || ''

    const isArticlesTab = currentType === 'articles'
    const hasResults    = isArticlesTab ? articles.length > 0 : hotels.length > 0
    const sortOptions   = isArticlesTab ? ARTICLE_SORT_OPTIONS : HOTEL_SORT_OPTIONS

    const update = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value && value !== 'all') params.set(key, value)
        else params.delete(key)
        if (key !== 'page') params.set('page', '1')
        router.push(`/search?${params.toString()}`)
    }

    const goToPage = (p: number) => {
        if (p < 1 || p > totalPages) return
        update('page', p.toString())
    }

    const tabCls = (t: string) =>
        `border rounded-[12px] py-[14px] px-[22px] font-inter font-medium text-[20px] leading-none transition-colors ${currentType === t
            ? 'bg-[#0D7FF2] text-white border-[#0D7FF2]'
            : 'bg-white text-black border-[#D0D5DD] hover:border-[#0D7FF2]'}`

    const selectCls = "bg-transparent outline-none font-inter font-medium text-[18px] leading-none tracking-[-0.02em] cursor-pointer"
    const wrapCls   = "border border-[#D0D5DD] rounded-[12px] px-[20px] py-[14px]"

    // ── Loading state ─────────────────────────────────────────────────────────
    if (loading) {
        return (
            <section className="relative flex flex-col items-center gap-[60px] px-[20px] md:px-[70px] py-[60px] 2xl:px-[140px] w-full">
                <div className="flex flex-wrap justify-center gap-[32px] w-full">
                    {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            </section>
        )
    }

    // ── Error state ───────────────────────────────────────────────────────────
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-red-600 text-lg font-inter">{error}</p>
            </div>
        )
    }

    // ── Empty state ───────────────────────────────────────────────────────────
    if (!hasResults) {
        return (
            <div className="flex flex-col items-center justify-center gap-[70px] md:gap-0 min-w-full">
                <section className="relative w-full flex flex-col items-center justify-center px-[20px] py-[100px] lg:py-[200px] lg:px-[140px]">
                    <div className="hidden lg:block absolute inset-0 top-[160px] -z-10">
                        <Image src="/background-images/explore-dubai-background-effect.png" alt="" fill className="object-cover" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_20%,rgba(255,255,255,0)_80%,rgba(255,255,255,1)_100%)]" />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-[48px] text-center">
                        <Image src="/images/no-result.svg"        width={511} height={390} alt="No results" className="hidden md:block" />
                        <Image src="/images/no-result-phones.svg" width={183} height={166} alt="No results" className="md:hidden" />
                        <div className="flex flex-col items-center gap-5">
                            <h2 className="font-manrope font-semibold text-[48px] leading-none tracking-[-0.03em]">Nothing Matches Your Search</h2>
                            <p className="font-inter text-[22px] font-normal text-[#475467]">No results found. Try adjusting your filters.</p>
                        </div>
                    </div>
                </section>
                <div className="md:hidden"><BookStaySection /></div>
            </div>
        )
    }

    return (
        <section className="relative overflow-y-hidden flex flex-col items-center justify-center gap-[60px] lg:gap-[80px] px-[20px] md:px-[70px] py-[60px] 2xl:px-[140px] 2xl:py-[120px] w-full">
            {/* Decorative bg */}
            <div className="absolute inset-0 -z-10 top-[500px]">
                <Image src="/background-images/explore-dubai-background-effect.png" alt="" fill className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,1)_100%)]" />
            </div>

            {/* ── Filter bar ── */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between w-full">

                {/* Type tabs — desktop */}
                <div className="hidden lg:flex flex-row items-center gap-3 flex-wrap">
                    {['all','hotels','articles','attractions','guides'].map(t => (
                        <button key={t} onClick={() => update('type', t)} className={tabCls(t)}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>
                {/* Type tabs — mobile */}
                <div className={`${wrapCls} flex lg:hidden w-full`}>
                    <select className={`${selectCls} w-full`} value={currentType} onChange={e => update('type', e.target.value)}>
                        {['all','hotels','articles','attractions','guides'].map(t => (
                            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                        ))}
                    </select>
                </div>

                {/* Extra hotel filters */}
                {!isArticlesTab && (
                    <div className="hidden lg:flex items-center gap-3">
                        <div className={wrapCls}>
                            <select className={selectCls} value={currentPrice} onChange={e => update('price', e.target.value)}>
                                {PRICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                        </div>
                        <div className={wrapCls}>
                            <select className={selectCls} value={currentRating} onChange={e => update('rating', e.target.value)}>
                                {RATING_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                        </div>
                    </div>
                )}

                {/* Sort + result count */}
                <div className="flex items-center gap-3 w-full lg:w-fit justify-between lg:justify-end">
                    {totalCount > 0 && (
                        <span className="font-inter text-[16px] text-gray-500 hidden lg:block">
                            {totalCount} result{totalCount !== 1 ? 's' : ''}
                        </span>
                    )}
                    <span className="font-inter font-bold text-[20px] leading-none tracking-[-0.02em] shrink-0">Sort By:</span>
                    <div className={wrapCls}>
                        <select className={selectCls} value={currentSort} onChange={e => update('sortBy', e.target.value)}>
                            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Mobile result count + extra filters */}
            <div className="flex lg:hidden items-center justify-between w-full -mt-8">
                {totalCount > 0 && (
                    <span className="font-inter text-[15px] text-gray-500">{totalCount} result{totalCount !== 1 ? 's' : ''}</span>
                )}
                {!isArticlesTab && (
                    <div className="flex items-center gap-2">
                        <div className={`${wrapCls} text-sm`}>
                            <select className={`${selectCls} text-sm`} value={currentPrice} onChange={e => update('price', e.target.value)}>
                                {PRICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                        </div>
                        <div className={`${wrapCls} text-sm`}>
                            <select className={`${selectCls} text-sm`} value={currentRating} onChange={e => update('rating', e.target.value)}>
                                {RATING_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Cards grid ── */}
            <div className="flex flex-row flex-wrap items-center justify-center gap-[32px] w-full">
                {isArticlesTab
                    ? articles.map((a, i) => <ArticleCard key={a.article_id ?? i} article={a} />)
                    : hotels.map((h, i)   => <HotelCard   key={h.hotel_id    ?? i} hotel={h}   />)
                }
            </div>

            {/* ── Pagination ── */}
            <Pagination current={currentPage} total={totalPages} onPage={goToPage} />
        </section>
    )
}
