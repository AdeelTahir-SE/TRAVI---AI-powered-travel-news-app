import { MetadataRoute } from 'next'
import { supabase } from '@/utils/supabase'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://travi-ai-powered-travel-news-app.vercel.app'

export const revalidate = 3600 // regenerate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // ── Static routes ──────────────────────────────────────────────
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/comparison`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/category`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/location`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/search`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/tag`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
    ]

    // ── Dynamic article routes ─────────────────────────────────────
    const { data: articles } = await supabase
        .from('article')
        .select('title, updated_at, created_at')
        .order('created_at', { ascending: false })

    const articleRoutes: MetadataRoute.Sitemap = (articles ?? []).map((article) => ({
        url: `${BASE_URL}/article/${encodeURIComponent(article.title.split(' ').join('-'))}`,
        lastModified: new Date(article.updated_at || article.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    // ── Dynamic hotel routes ───────────────────────────────────────
    const { data: hotels } = await supabase
        .from('hotel')
        .select('hotel_id, title, created_at')
        .order('created_at', { ascending: false })

    const hotelRoutes: MetadataRoute.Sitemap = (hotels ?? []).map((hotel) => ({
        url: `${BASE_URL}/hotel/${encodeURIComponent(hotel.title.split(' ').join('-'))}`,
        lastModified: new Date(hotel.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.85,
    }))

    return [...staticRoutes, ...articleRoutes, ...hotelRoutes]
}
