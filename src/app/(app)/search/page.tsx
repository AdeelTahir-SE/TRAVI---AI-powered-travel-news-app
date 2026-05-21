'use client'

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import SearchCardsSection from "@/components/searchCardsSection"
import SearchHeroSectoion from "@/components/searchHeroSection"
import ShalimarWithAboveSection from "@/components/shalimarWithAboveCloudSection"
import { Hotel, Article } from "@/utils/types"

const LIMIT = 12

export default function SearchPage() {
  const searchParams = useSearchParams()

  const query     = searchParams.get('q')        || ''
  const type      = searchParams.get('type')     || 'all'
  const location  = searchParams.get('location') || ''
  const page      = Math.max(parseInt(searchParams.get('page') || '1'), 1)
  const sortBy    = searchParams.get('sortBy')   || ''
  const price     = searchParams.get('price')    || ''
  const rating    = searchParams.get('rating')   || ''

  const [hotels,      setHotels]      = useState<Hotel[]>([])
  const [articles,    setArticles]    = useState<Article[]>([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState<string | null>(null)
  const [totalCount,  setTotalCount]  = useState(0)
  const [totalPages,  setTotalPages]  = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const showArticles = type === 'articles'
        const showHotels   = type === 'hotels' || type === 'all'

        // ── Articles branch ──────────────────────────────────────────
        if (showArticles) {
          const params = new URLSearchParams()
          if (query)  params.set('q',      query)
          if (sortBy) params.set('sortBy', sortBy)
          params.set('page',  page.toString())
          params.set('limit', LIMIT.toString())

          const res  = await fetch(`/api/articles?${params.toString()}`)
          if (!res.ok) throw new Error('Failed to fetch articles')
          const data = await res.json()

          setArticles(data.articles || [])
          setHotels([])
          setTotalCount(data.total      || 0)
          setTotalPages(data.totalPages || 1)
          return
        }

        // ── Hotels branch ────────────────────────────────────────────
        if (showHotels) {
          const params = new URLSearchParams()
          if (query)    params.set('q',        query)
          if (location) params.set('location', location)
          if (sortBy)   params.set('sortBy',   sortBy)
          if (rating)   params.set('rating',   rating)
          if (price) {
            const [min, max] = price.split('-')
            if (min) params.set('priceMin', min)
            if (max) params.set('priceMax', max)
          }
          params.set('page',  page.toString())
          params.set('limit', LIMIT.toString())

          const res  = await fetch(`/api/hotels?${params.toString()}`)
          if (!res.ok) throw new Error('Failed to fetch hotels')
          const data = await res.json()

          setHotels(data.hotels || [])
          setArticles([])
          setTotalCount(data.total      || 0)
          setTotalPages(data.totalPages || 1)
        }
      } catch (err) {
        console.error('SearchPage fetch error:', err)
        setError('Failed to load results. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [query, type, location, page, sortBy, price, rating])

  return (
    <div className="flex flex-col items-center justify-center">
      <SearchHeroSectoion results={hotels} query={query} />
      <SearchCardsSection
        hotels={hotels}
        articles={articles}
        loading={loading}
        error={error}
        currentPage={page}
        totalPages={totalPages}
        totalCount={totalCount}
      />
      <ShalimarWithAboveSection />
    </div>
  )
}
