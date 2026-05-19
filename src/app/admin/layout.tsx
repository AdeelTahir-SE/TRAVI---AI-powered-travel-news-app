'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import Sidebar from '@/components/admin/Sidebar'
import { ToastProvider } from '@/components/admin/Toaster'

type AdminStatus = 'loading' | 'unauthenticated' | 'pending' | 'rejected' | 'verified'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const isPublicAdminRoute = pathname === '/admin/login' || pathname === '/admin/register'

    const [adminStatus, setAdminStatus] = useState<AdminStatus>('loading')

    useEffect(() => {
        let mounted = true

        const checkAuth = async () => {
            // 1. Get current Supabase session
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                if (mounted) setAdminStatus('unauthenticated')
                return
            }

            // 2. Check admin_users table
            const { data: adminUser } = await supabase
                .from('admin_users')
                .select('status')
                .eq('id', session.user.id)
                .single()

            if (!mounted) return

            if (!adminUser) {
                setAdminStatus('unauthenticated')
                return
            }

            setAdminStatus(adminUser.status as AdminStatus)
        }

        checkAuth()

        // Listen for auth state changes (login / logout / token refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
            checkAuth()
        })

        return () => {
            mounted = false
            subscription.unsubscribe()
        }
    }, [pathname])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    // ── Public routes (login / register) — render without sidebar ──────────
    if (isPublicAdminRoute) {
        return <>{children}</>
    }

    // ── Loading ─────────────────────────────────────────────────────────────
    if (adminStatus === 'loading') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#0D7FF2] border-t-transparent" />
                    <p className="mt-4 text-gray-600 font-medium">Loading…</p>
                </div>
            </div>
        )
    }

    // ── Unauthenticated — redirect to login ─────────────────────────────────
    if (adminStatus === 'unauthenticated') {
        router.push('/admin/login')
        return null
    }

    // ── Pending — show waiting screen ───────────────────────────────────────
    if (adminStatus === 'pending') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Access Pending Approval</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        Your admin account has been created. A super admin needs to approve your access before you can use the dashboard.
                    </p>
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 underline"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        )
    }

    // ── Rejected — show rejection screen ────────────────────────────────────
    if (adminStatus === 'rejected') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Access Rejected</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        Your admin access request has been rejected. Please contact the site owner if you believe this is a mistake.
                    </p>
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 underline"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        )
    }

    // ── Verified — render full admin shell ──────────────────────────────────
    return (
        <ToastProvider>
            <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                <Sidebar onLogout={handleLogout} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto pt-16 md:pt-0">
                    {children}
                </main>
            </div>
        </ToastProvider>
    )
}
