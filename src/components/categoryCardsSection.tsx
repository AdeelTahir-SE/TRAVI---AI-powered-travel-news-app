'use client'

import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import HotelCard from "./hotelCard"
import { Hotel } from "@/utils/types"

const PRICE_OPTIONS = [
    { label: 'Any Price', value: '' },
    { label: 'Under $200',   value: '0-200' },
    { label: '$200 – $400',  value: '200-400' },
    { label: '$400 – $600',  value: '400-600' },
    { label: '$600+',        value: '600-99999' },
]

const RATING_OPTIONS = [
    { label: 'Any Rating', value: '' },
    { label: '4.5+', value: '4.5' },
    { label: '4+',   value: '4' },
    { label: '3.5+', value: '3.5' },
]

const SORT_OPTIONS = [
    { label: 'Newest',           value: '' },
    { label: 'Price: Low → High', value: 'price-low' },
    { label: 'Price: High → Low', value: 'price-high' },
    { label: 'Top Rated',         value: 'rating' },
    { label: 'Most Reviewed',     value: 'popular' },
]

const ITEMS_PER_PAGE = 9

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
    return (
        <div className="flex flex-col border border-[#D0D5DD] rounded-[30px] bg-white w-[300px] sm:w-[350px] md:w-[400px] lg:w-[525px] max-w-[525px] shadow-lg animate-pulse">
            <div className="h-[260px] bg-gray-200 rounded-t-[30px]" />
            <div className="p-6 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-1/2" />
            </div>
            <div className="border-t border-[#D0D5DD] p-6 flex justify-between items-center">
                <div className="h-8 bg-gray-200 rounded w-20" />
                <div className="h-10 bg-gray-100 rounded-full w-32" />
            </div>
        </div>
    )
}

// ── Pagination bar (reused from searchCardsSection pattern) ──────────────────
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
                <button
                    onClick={() => onPage(current - 1)}
                    disabled={current === 1}
                    className="w-[58px] h-[58px] rounded-full flex items-center justify-center border border-[#D0D5DD] disabled:opacity-40"
                >
                    <Image src="/icons/arrow-left.svg" alt="" width={24} height={24} className="w-6 h-6" />
                </button>
                <span className="font-inter text-[20px] text-[#344054]">Page {current} of {total}</span>
                <button
                    onClick={() => onPage(current + 1)}
                    disabled={current === total}
                    className="w-[58px] h-[58px] rounded-full flex items-center justify-center border border-[#D0D5DD] disabled:opacity-40"
                >
                    <Image src="/icons/arrow-left.svg" alt="" width={24} height={24} className="w-6 h-6 rotate-180" />
                </button>
            </div>
        </>
    )
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function CategoryCardsSection() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentPage   = Math.max(parseInt(searchParams.get('page')  || '1'), 1)
    const currentSort   = searchParams.get('sortBy')   || ''
    const currentPrice  = searchParams.get('price')    || ''
    const currentRating = searchParams.get('rating')   || ''
    const currentLoc    = searchParams.get('location') || ''

    const [hotels,     setHotels]     = useState<Hotel[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const [total,      setTotal]      = useState(0)
    const [loading,    setLoading]    = useState(true)

    const update = useCallback((overrides: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString())
        Object.entries(overrides).forEach(([k, v]) => {
            if (v) params.set(k, v); else params.delete(k)
        })
        // Reset to page 1 on any filter change except page itself
        if (!('page' in overrides)) params.set('page', '1')
        router.push(`/category?${params.toString()}`)
    }, [router, searchParams])

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true)
            try {
                const params = new URLSearchParams()
                params.set('page',  currentPage.toString())
                params.set('limit', ITEMS_PER_PAGE.toString())
                if (currentSort)   params.set('sortBy',  currentSort)
                if (currentLoc)    params.set('location', currentLoc)
                if (currentRating) params.set('rating',  currentRating)
                if (currentPrice) {
                    const [min, max] = currentPrice.split('-')
                    if (min) params.set('priceMin', min)
                    if (max) params.set('priceMax', max)
                }

                const res  = await fetch(`/api/hotels?${params.toString()}`)
                const data = await res.json()
                setHotels(data.hotels || [])
                setTotal(data.total  || 0)
                setTotalPages(data.totalPages || 1)
            } catch {
                setHotels([])
            } finally {
                setLoading(false)
            }
        }
        fetchHotels()
    }, [currentPage, currentSort, currentPrice, currentRating, currentLoc])

    const selectCls = "bg-transparent outline-none font-inter font-medium text-[18px] leading-[100%] tracking-[-0.02em] cursor-pointer"
    const wrapCls   = "border border-[#D0D5DD] rounded-[12px] px-[20px] py-[14px]"

    return (
        <section className="relative flex flex-col items-center justify-center gap-[60px] lg:gap-[80px] px-[20px] md:px-[70px] py-[60px] 2xl:px-[140px] 2xl:py-[120px] w-full">
            {/* Decorative background */}
            <div className="absolute inset-0 -z-10 top-[400px]">
                <Image src="/background-images/explore-dubai-background-effect.png" alt="" fill className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,1)_100%)]" />
            </div>

            {/* ── Filter bar ── */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between w-full">

                {/* Desktop filters */}
                <div className="hidden lg:flex flex-wrap items-center gap-3">
                    {/* Price range */}
                    <div className={wrapCls}>
                        <select className={selectCls} value={currentPrice} onChange={e => update({ price: e.target.value })}>
                            {PRICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>
                    {/* Min rating */}
                    <div className={wrapCls}>
                        <select className={selectCls} value={currentRating} onChange={e => update({ rating: e.target.value })}>
                            {RATING_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>
                    {/* Location text search */}
                    <div className={`${wrapCls} flex items-center gap-2`}>
                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Location…"
                            defaultValue={currentLoc}
                            className="bg-transparent outline-none font-inter text-[18px] w-32 placeholder-gray-400"
                            onKeyDown={e => { if (e.key === 'Enter') update({ location: (e.target as HTMLInputElement).value }) }}
                            onBlur={e => update({ location: e.target.value })}
                        />
                    </div>
                </div>

                {/* Mobile filter row */}
                <div className="flex lg:hidden items-center justify-between gap-3 w-full">
                    <div className={`${wrapCls} flex-1`}>
                        <select className={`${selectCls} w-full`} value={currentPrice} onChange={e => update({ price: e.target.value })}>
                            {PRICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>
                    <div className={`${wrapCls} flex-1`}>
                        <select className={`${selectCls} w-full`} value={currentRating} onChange={e => update({ rating: e.target.value })}>
                            {RATING_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>
                </div>

                {/* Sort by — always visible */}
                <div className="flex items-center gap-3 w-full lg:w-fit justify-between lg:justify-end">
                    <span className="font-inter font-bold text-[20px] leading-none tracking-[-0.02em] shrink-0">Sort By:</span>
                    <div className={wrapCls}>
                        <select className={selectCls} value={currentSort} onChange={e => update({ sortBy: e.target.value })}>
                            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* ── Result count ── */}
            {!loading && (
                <p className="self-start font-inter text-[16px] text-gray-500 -mt-8">
                    {total > 0 ? `${total} hotel${total !== 1 ? 's' : ''} found` : 'No hotels match your filters'}
                </p>
            )}

            {/* ── Cards grid ── */}
            <div className="flex flex-row flex-wrap items-center justify-center gap-[32px] w-full">
                {loading
                    ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => <SkeletonCard key={i} />)
                    : hotels.length === 0
                        ? (
                            <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
                                <svg className="w-20 h-20 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <p className="font-manrope font-semibold text-[32px] text-gray-500">No hotels found</p>
                                <p className="font-inter text-[20px] text-gray-400">Try adjusting your filters</p>
                                <button
                                    onClick={() => router.push('/category')}
                                    className="mt-2 px-8 py-3 bg-[#F8A900] hover:bg-[#e09800] text-black font-bold rounded-full transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )
                        : hotels.map(hotel => <HotelCard key={hotel.hotel_id} hotel={hotel} />)
                }
            </div>

            {/* ── Pagination ── */}
            {!loading && hotels.length > 0 && (
                <Pagination
                    current={currentPage}
                    total={totalPages}
                    onPage={p => update({ page: p.toString() })}
                />
            )}
        </section>
    )
}
