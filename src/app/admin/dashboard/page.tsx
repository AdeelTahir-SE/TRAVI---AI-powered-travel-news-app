'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import Link from 'next/link'

interface Stats { hotels: number; articles: number }

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({ hotels: 0, articles: 0 })
    const [loading, setLoading] = useState(true)
    const [greeting, setGreeting] = useState('')

    useEffect(() => {
        setTimeout(() => {
            const h = new Date().getHours()
            setGreeting(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening')
        }, 0)

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
            icon: (
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            href: '/admin/hotels',
            gradient: 'from-[#2384C8] to-[#112259]',
            accent: '#2384C8',
        },
        {
            label: 'Total Articles',
            value: stats.articles,
            icon: (
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            href: '/admin/articles',
            gradient: 'from-[#F8A900] to-[#e09800]',
            accent: '#F8A900',
        },
    ]

    const quickActions = [
        {
            label: 'Manage Hotels',
            desc: 'Create, edit, and delete hotel listings with image uploads and star ratings.',
            href: '/admin/hotels',
            iconBg: 'bg-[#2384C8]/10',
            iconColor: 'text-[#2384C8]',
            border: 'border-[#2384C8]',
            badge: 'Hotels',
            badgeCls: 'bg-[#2384C8]/10 text-[#2384C8]',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
        },
        {
            label: 'Manage Articles',
            desc: 'Write and publish travel articles with rich content, quotes, and subsections.',
            href: '/admin/articles',
            iconBg: 'bg-[#F8A900]/10',
            iconColor: 'text-[#F8A900]',
            border: 'border-[#F8A900]',
            badge: 'Articles',
            badgeCls: 'bg-[#F8A900]/10 text-[#e09800]',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
        {
            label: 'AI News Generator',
            desc: 'Generate full, structured travel articles instantly using AI.',
            href: '/admin/generate',
            iconBg: 'bg-[#112259]/10',
            iconColor: 'text-[#112259]',
            border: 'border-[#112259]',
            badge: 'AI ✦',
            badgeCls: 'bg-[#112259]/10 text-[#112259]',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
        },
    ]

    return (
        <div className="p-4 sm:p-6 lg:p-8 font-inter">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* ── Page Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-[#2384C8] mb-1">{greeting} 👋</p>
                        <h1 className="font-manrope font-extrabold text-[32px] sm:text-[40px] leading-[100%] tracking-[-0.03em] text-[#112259]">
                            Dashboard
                        </h1>
                        <p className="text-gray-500 text-sm mt-1.5">Here&apos;s an overview of your Travi content.</p>
                    </div>
                    <Link
                        href="/admin/generate"
                        className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#F8A900] hover:bg-[#e09800] text-black font-semibold rounded-[12px] text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        ✦ Generate Article
                    </Link>
                </div>

                {/* ── Stat Cards ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {statCards.map(card => (
                        <Link
                            key={card.label}
                            href={card.href}
                            className="group bg-white rounded-[25px] shadow-[9px_9px_75px_0px_#00000029] hover:shadow-[9px_9px_100px_0px_#00000040] transition-all duration-300 p-7 flex items-center justify-between hover:-translate-y-1.5 overflow-hidden relative"
                        >
                            {/* Subtle tinted bg arc */}
                            <div
                                className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity"
                                style={{ background: card.accent }}
                            />
                            <div className="relative z-10">
                                <p className="text-sm font-semibold text-gray-500 mb-2 tracking-wide uppercase">{card.label}</p>
                                {loading ? (
                                    <div className="h-11 w-20 bg-gray-100 rounded-xl animate-pulse" />
                                ) : (
                                    <p className="font-manrope font-extrabold text-[48px] leading-[100%] tracking-[-0.03em] text-[#112259]">
                                        {card.value}
                                    </p>
                                )}
                            </div>
                            <div className={`relative z-10 bg-gradient-to-br ${card.gradient} p-4 rounded-[18px] shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                {card.icon}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* ── AI Spotlight Banner ── */}
                <div className="rounded-[25px] overflow-hidden shadow-[9px_9px_75px_0px_#00000029]">
                    <div className="bg-gradient-to-r from-[#0A1929] via-[#0D2137] to-[#112259] p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-[#F8A900]/15 border border-[#F8A900]/30 rounded-[14px] flex-shrink-0">
                                    <svg className="w-7 h-7 text-[#F8A900]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className="font-manrope font-extrabold text-white text-[22px] leading-none tracking-tight">AI News Generator</h2>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F8A900] text-black">AI</span>
                                    </div>
                                    <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                                        Generate fully structured travel articles with subsections, quotes, and tips in seconds.
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/admin/generate"
                                className="flex-shrink-0 flex items-center gap-2 bg-[#F8A900] hover:bg-[#e09800] text-black font-semibold px-6 py-3 rounded-[14px] transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Generate Now
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── Quick Actions ── */}
                <div>
                    <h2 className="font-manrope font-extrabold text-[22px] text-[#112259] tracking-tight mb-5">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {quickActions.map(action => (
                            <Link
                                key={action.label}
                                href={action.href}
                                className="group bg-white rounded-[20px] shadow-[9px_9px_75px_0px_#00000029] hover:shadow-[9px_9px_100px_0px_#00000040] p-6 transition-all duration-300 hover:-translate-y-1.5 flex flex-col gap-4 border-t-4 border-transparent hover:border-t-4"
                                style={{ borderTopColor: 'transparent' }}
                                onMouseEnter={e => (e.currentTarget.style.borderTopColor = action.border.replace('border-', '').split('[')[1]?.replace(']', '') || '#F8A900')}
                                onMouseLeave={e => (e.currentTarget.style.borderTopColor = 'transparent')}
                            >
                                <div className="flex items-center justify-between">
                                    <div className={`w-11 h-11 rounded-[14px] ${action.iconBg} ${action.iconColor} flex items-center justify-center`}>
                                        {action.icon}
                                    </div>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${action.badgeCls}`}>{action.badge}</span>
                                </div>
                                <div>
                                    <h3 className="font-manrope font-extrabold text-[16px] text-[#112259] tracking-tight mb-1">{action.label}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">{action.desc}</p>
                                </div>
                                <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-[#F8A900] transition-colors">
                                    Open <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
