'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'

interface ContentStats {
    hotels: number
    articles: number
}

interface GAMetric {
    label: string
    value: string
    color: string
    icon: React.ReactNode
}

const PLACEHOLDER_METRICS: GAMetric[] = [
    {
        label: 'Active Users (7d)',
        value: '—',
        color: 'from-[#0D7FF2] to-[#0B5FC9]',
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        label: 'Page Views (7d)',
        value: '—',
        color: 'from-emerald-500 to-emerald-700',
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        ),
    },
    {
        label: 'Avg. Session Duration',
        value: '—',
        color: 'from-violet-500 to-violet-700',
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        label: 'Bounce Rate',
        value: '—',
        color: 'from-amber-500 to-orange-600',
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
        ),
    },
]

export default function AnalyticsDashboard() {
    const [stats, setStats] = useState<ContentStats>({ hotels: 0, articles: 0 })
    const [loading, setLoading] = useState(true)
    const [gaConnected, setGaConnected] = useState(false)
    const [gaId, setGaId] = useState<string | null>(null)

    useEffect(() => {
        const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
        if (id && id !== 'G-XXXXXXXXXX') {
            setGaId(id)
            setGaConnected(true)
        }
        const fetchStats = async () => {
            const [{ count: hotels }, { count: articles }] = await Promise.all([
                supabase.from('hotel').select('*', { count: 'exact', head: true }),
                supabase.from('article').select('*', { count: 'exact', head: true }),
            ])
            setStats({ hotels: hotels ?? 0, articles: articles ?? 0 })
            setLoading(false)
        }
        fetchStats()
    }, [])

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Page Header */}
                <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Analytics</h1>
                        <p className="text-gray-500 text-sm mt-1">Google Analytics 4 overview &amp; content performance</p>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${gaConnected ? 'bg-green-50 border-green-200 text-green-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
                        <span className={`w-2 h-2 rounded-full ${gaConnected ? 'bg-green-500 animate-pulse' : 'bg-amber-400'}`} />
                        {gaConnected ? `GA4 Connected · ${gaId}` : 'GA4 Not Connected'}
                    </div>
                </div>

                {/* GA4 Not Connected Notice */}
                {!gaConnected && (
                    <div className="mb-8 bg-white rounded-2xl shadow-md border border-amber-100 p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex-shrink-0">
                                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="font-bold text-gray-900 mb-1">Google Analytics 4 Not Connected</h2>
                                <p className="text-gray-500 text-sm">
                                    Live traffic metrics are not available yet. Metrics below will show real data once GA4 is configured for this project.
                                </p>
                            </div>
                            <a
                                href="https://analytics.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 flex items-center gap-2 bg-[#0D7FF2] hover:bg-[#0B6FD9] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                            >
                                Open GA4
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>
                )}

                {/* GA4 Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {PLACEHOLDER_METRICS.map((metric) => (
                        <div key={metric.label} className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex items-center justify-between hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                            <div>
                                <p className="text-xs text-gray-500 font-medium mb-1">{metric.label}</p>
                                <p className={`text-3xl font-bold text-gray-900 mb-1 ${!gaConnected ? 'opacity-25' : ''}`}>{metric.value}</p>
                                <p className="text-xs text-amber-500">
                                    {gaConnected ? 'Live data' : 'Awaiting GA4'}
                                </p>
                            </div>
                            <div className={`bg-gradient-to-br ${metric.color} p-3 rounded-2xl shadow-lg flex-shrink-0 ${!gaConnected ? 'opacity-50' : ''}`}>
                                {metric.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Performance — Supabase */}
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Content Performance</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { label: 'Hotel Listings', value: stats.hotels, color: 'bg-[#0D7FF2]', icon: (
                                <svg className="w-5 h-5 text-[#0D7FF2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            )},
                            { label: 'Published Articles', value: stats.articles, color: 'bg-emerald-500', icon: (
                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            )},
                        ].map(item => (
                            <div key={item.label} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-50 rounded-xl border border-gray-100">
                                            {item.icon}
                                        </div>
                                        <p className="text-sm font-semibold text-gray-700">{item.label}</p>
                                    </div>
                                    {loading ? (
                                        <div className="h-8 w-12 bg-gray-100 animate-pulse rounded-lg" />
                                    ) : (
                                        <span className="text-3xl font-bold text-gray-900">{item.value}</span>
                                    )}
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-2 ${item.color} rounded-full transition-all duration-1000`}
                                        style={{ width: loading ? '0%' : `${Math.min((item.value / 20) * 100, 100)}%` }}
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-2">{item.value} total</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Open GA4 CTA */}
                <div className="bg-gradient-to-br from-[#0A1929] to-[#0D2137] rounded-2xl p-6 text-white">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[#0D7FF2]/20 border border-[#0D7FF2]/30 rounded-xl flex-shrink-0">
                                <svg className="w-6 h-6 text-[#0D7FF2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">View Full Analytics in GA4</h3>
                                <p className="text-gray-400 text-sm">Real-time users, acquisition reports, page performance, conversions and more — all in your GA4 dashboard.</p>
                            </div>
                        </div>
                        <a
                            href="https://analytics.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 flex items-center gap-2 bg-[#0D7FF2] hover:bg-[#0B6FD9] text-white font-semibold px-5 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl text-sm"
                        >
                            Open GA4 Dashboard
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}
