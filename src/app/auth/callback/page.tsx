'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/utils/supabase'

export default function AuthCallbackPage() {
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const handle = async () => {
            const code = searchParams.get('code')

            // ── PKCE flow: ?code= present — exchange it for a session ──────────
            if (code) {
                const { error } = await supabase.auth.exchangeCodeForSession(code)
                if (error) {
                    console.error('[auth/callback] code exchange failed:', error.message)
                    router.replace('/admin/login?error=auth_callback_failed')
                    return
                }
            }
            // ── Implicit flow: #access_token in hash ──────────────────────────
            // detectSessionInUrl:true means the SDK has already parsed it by now.
            // We just read the session that was set automatically.

            // Give the SDK a tick to set the session from the hash if needed
            await new Promise(r => setTimeout(r, 300))

            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                router.replace('/admin/login?error=auth_callback_failed')
                return
            }

            // Check admin_users table
            const { data: adminUser } = await supabase
                .from('admin_users')
                .select('status')
                .eq('id', session.user.id)
                .single()

            if (adminUser?.status === 'verified') {
                router.replace('/admin/dashboard')
            } else {
                // Pending / not yet in table — login page will show the right state
                router.replace('/admin/login')
            }
        }

        handle()
    }, [router, searchParams])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#F8A900] border-t-transparent mb-4" />
                <p className="font-manrope font-semibold text-[#112259] text-lg">Verifying your account…</p>
                <p className="text-gray-500 text-sm mt-1">Please wait a moment</p>
            </div>
        </div>
    )
}
