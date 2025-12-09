'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check authentication
        const auth = localStorage.getItem('adminAuth')

        if (pathname === '/admin/login') {
            // If already authenticated and on login page, redirect to dashboard
            if (auth === 'true') {
                router.push('/admin')
            } else {
                setLoading(false)
            }
        } else {
            // For all other admin pages, check if authenticated
            if (auth === 'true') {
                setIsAuthenticated(true)
                setLoading(false)
            } else {
                router.push('/admin/login')
            }
        }
    }, [pathname, router])

    const handleLogout = () => {
        localStorage.removeItem('adminAuth')
        router.push('/admin/login')
    }

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#0D7FF2] border-t-transparent"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading...</p>
                </div>
            </div>
        )
    }

    // Login page doesn't need sidebar
    if (pathname === '/admin/login') {
        return <>{children}</>
    }

    // Protected admin pages with sidebar
    if (isAuthenticated) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                <Sidebar onLogout={handleLogout} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    {children}
                </main>
            </div>
        )
    }

    return null
}
