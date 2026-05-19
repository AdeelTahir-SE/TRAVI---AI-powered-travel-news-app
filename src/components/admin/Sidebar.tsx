'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavItem {
    name: string
    href: string
    icon: React.ReactNode
    badge?: string
}

interface SidebarProps {
    onLogout?: () => void
}

export default function Sidebar({ onLogout }: SidebarProps) {
    const pathname = usePathname()
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    const navItems: NavItem[] = [
        {
            name: 'Dashboard',
            href: '/admin',
            icon: (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            name: 'Hotels',
            href: '/admin/hotels',
            icon: (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            name: 'Articles',
            href: '/admin/articles',
            icon: (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            name: 'AI Generator',
            href: '/admin/generate',
            icon: (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            badge: 'AI'
        },
        {
            name: 'Analytics',
            href: '/admin/analytics',
            icon: (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
        }
    ]

    const isActive = (href: string) => {
        if (href === '/admin') {
            return pathname === '/admin' || pathname === '/admin/dashboard'
        }
        return pathname?.startsWith(href)
    }

    return (
        <>
            {/* Hamburger — only on phones (< md = 768px) */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2.5 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
                aria-label="Toggle menu"
            >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Backdrop — only on phones when open */}
            {isMobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:sticky top-0 left-0 h-screen
                    bg-gradient-to-b from-[#0A1929] to-[#0D2137] text-white
                    w-60 z-40 flex-shrink-0
                    transition-transform duration-300 ease-in-out shadow-2xl
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Brand */}
                    <div className="p-5 border-b border-[#0D7FF2]/20 bg-gradient-to-r from-[#0D7FF2]/10 to-transparent">
                        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-[#0D7FF2] bg-clip-text text-transparent">
                            TRAVI Admin
                        </h1>
                        <p className="text-xs text-gray-400 mt-0.5">Content Management</p>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileOpen(false)}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-sm
                                    ${isActive(item.href)
                                        ? 'bg-[#0D7FF2] text-white shadow-lg shadow-[#0D7FF2]/30'
                                        : 'text-gray-300 hover:bg-[#0D7FF2]/20 hover:text-white hover:translate-x-1'
                                    }
                                `}
                            >
                                {item.icon}
                                <span className="font-medium flex-1 truncate">{item.name}</span>
                                {item.badge && (
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#F8A900] text-black leading-none flex-shrink-0">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Footer / Logout */}
                    <div className="p-3 border-t border-[#0D7FF2]/20 bg-gradient-to-t from-[#0D7FF2]/5 to-transparent">
                        {onLogout && (
                            <button
                                onClick={onLogout}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200 cursor-pointer text-sm"
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="font-medium">Logout</span>
                            </button>
                        )}
                        <p className="text-xs text-gray-500 text-center mt-2">© 2024 TRAVI</p>
                    </div>
                </div>
            </aside>
        </>
    )
}
