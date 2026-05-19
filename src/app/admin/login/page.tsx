'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/utils/supabase'

export default function AdminLoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackError = searchParams.get('error')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // 1. Sign in with Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
            })

            if (authError) {
                if (authError.message.includes('Email not confirmed')) {
                    setError('Please verify your email first. Check your inbox for the confirmation link.')
                } else if (authError.message.includes('Invalid login credentials')) {
                    setError('Invalid email or password.')
                } else {
                    setError(authError.message)
                }
                return
            }

            if (!authData.user) {
                setError('Authentication failed. Please try again.')
                return
            }

            // 2. Check admin_users table — must exist and be verified
            const { data: adminUser, error: dbError } = await supabase
                .from('admin_users')
                .select('status, role')
                .eq('id', authData.user.id)
                .single()

            if (dbError || !adminUser) {
                await supabase.auth.signOut()
                setError('Your account is not registered as an admin. Please request access.')
                return
            }

            if (adminUser.status === 'pending') {
                await supabase.auth.signOut()
                setError('Your admin access is pending approval. Please wait for a super admin to verify your account.')
                return
            }

            if (adminUser.status === 'rejected') {
                await supabase.auth.signOut()
                setError('Your admin access request has been rejected. Contact the site owner.')
                return
            }

            // 3. status === 'verified' — grant access
            router.push('/admin/dashboard')
            router.refresh()

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4">
            {/* Background */}
            <div className="z-0 absolute inset-0 w-full min-h-screen overflow-hidden">
                <Image
                    src="/background-images/explore-dubai-background-effect.png"
                    width={1200}
                    height={600}
                    alt=""
                    className="w-full h-full object-cover absolute bottom-0 z-0"
                />
                <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.95)_0%,rgba(255,255,255,1)_45%,rgba(255,255,255,0)_50%,rgba(255,255,255,1)_100%)]" />
            </div>

            <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 sm:p-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-block p-3 bg-gradient-to-br from-[#0D7FF2] to-[#0B6FD9] rounded-2xl mb-4">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">TRAVI Admin</h1>
                    <p className="text-gray-500 text-sm">Sign in to your admin account</p>
                </div>

                {/* Callback error banner */}
                {callbackError === 'auth_callback_failed' && (
                    <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg text-sm">
                        Email verification link expired or invalid. Please sign in and request a new one.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent transition-all cursor-text text-sm"
                            placeholder="admin@example.com"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent transition-all cursor-text text-sm"
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0D7FF2] hover:bg-[#0B6FD9] active:bg-[#0956B8] text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Signing in…
                            </span>
                        ) : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Don&apos;t have admin access?{' '}
                        <Link href="/admin/register" className="text-[#0D7FF2] font-semibold hover:underline">
                            Request access
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
