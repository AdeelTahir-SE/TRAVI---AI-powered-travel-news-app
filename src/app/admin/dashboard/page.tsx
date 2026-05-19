'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import Link from 'next/link'

interface Stats {
    hotels: number
    articles: number
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({ hotels: 0, articles: 0 })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
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

    const statCards = [
        {
            label: 'Total Hotels',
            value: stats.hotels,
            color: 'from-[#0D7FF2] to-[#0B5FC9]',
            icon: (
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            href: '/admin/hotels',
        },
        {
            label: 'Total Articles',
            value: stats.articles,
            color: 'from-emerald-500 to-emerald-700',
            icon: (
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            href: '/admin/articles',
        },
    ]

    const quickActions = [
        {
            label: 'Manage Hotels',
            desc: 'Create, edit, and delete hotel listings with image uploads.',
            href: '/admin/hotels',
            accent: 'border-[#0D7FF2]',
            badgeBg: 'bg-blue-50 text-[#0D7FF2]',
            badge: 'Hotels',
        },
        {
            label: 'Manage Articles',
            desc: 'Write and publish travel articles with rich content.',
            href: '/admin/articles',
            accent: 'border-emerald-500',
            badgeBg: 'bg-emerald-50 text-emerald-700',
            badge: 'Articles',
        },
        {
            label: 'AI News Generator',
            desc: 'Generate full travel news articles instantly using AI.',
            href: '/admin/generate',
            accent: 'border-[#F8A900]',
            badgeBg: 'bg-amber-50 text-amber-700',
            badge: 'AI ✦',
        },
    ]

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1">Welcome back — here&apos;s an overview of your content.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                    {statCards.map(card => (
                        <Link
                            key={card.label}
                            href={card.href}
                            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex items-center justify-between border border-gray-100 hover:-translate-y-1"
                        >
                            <div>
                                <p className="text-sm text-gray-500 font-medium mb-1">{card.label}</p>
                                {loading ? (
                                    <div className="h-9 w-16 bg-gray-100 rounded-lg animate-pulse" />
                                ) : (
                                    <p className="text-4xl font-bold text-gray-900">{card.value}</p>
                                )}
                            </div>
                            <div className={`bg-gradient-to-br ${card.color} p-3.5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                {card.icon}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* AI News Spotlight */}
                <div className="mb-8 rounded-2xl overflow-hidden shadow-md">
                    <div className="bg-gradient-to-r from-[#0A1929] via-[#0D2137] to-[#112259] p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-[#F8A900]/15 border border-[#F8A900]/30 rounded-xl flex-shrink-0">
                                    <svg className="w-7 h-7 text-[#F8A900]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className="text-white font-bold text-lg">AI News Generator</h2>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F8A900] text-black">NEW</span>
                                    </div>
                                    <p className="text-gray-400 text-sm max-w-md">
                                        Generate full, structured travel articles instantly.
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/admin/generate"
                                className="flex-shrink-0 flex items-center gap-2 bg-[#F8A900] hover:bg-[#e09800] text-black font-semibold px-5 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Generate Now
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-5">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {quickActions.map(action => (
                            <Link
                                key={action.label}
                                href={action.href}
                                className={`group block border-l-4 ${action.accent} bg-gray-50 hover:bg-white rounded-r-xl pl-4 pr-4 py-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
                            >
                                <div className="flex items-center gap-2 mb-1.5">
                                    <h3 className="font-semibold text-gray-900 text-sm">{action.label}</h3>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${action.badgeBg}`}>
                                        {action.badge}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed">{action.desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
