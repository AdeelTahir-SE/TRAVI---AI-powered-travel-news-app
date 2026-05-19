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
    const [unconfirmed, setUnconfirmed] = useState(false)
    const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackError = searchParams.get('error')

    const resendEmail = async () => {
        setResendStatus('sending')
        await supabase.auth.resend({
            type: 'signup',
            email: email.trim(),
            options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        })
        setResendStatus('sent')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setUnconfirmed(false)
        setResendStatus('idle')
        setLoading(true)

        try {
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
            })

            if (authError) {
                const msg = authError.message.toLowerCase()
                if (msg.includes('email not confirmed') || msg.includes('not confirmed')) {
                    setUnconfirmed(true)
                    setError('Your email address has not been confirmed yet.')
                } else if (msg.includes('invalid login credentials') || msg.includes('invalid credentials')) {
                    setError('Invalid email or password.')
                } else {
                    setError(authError.message)
                }
                return
            }

            if (!authData.user) { setError('Authentication failed. Please try again.'); return }

            const { data: adminUser, error: dbError } = await supabase
                .from('admin_users').select('status, role').eq('id', authData.user.id).single()

            if (dbError || !adminUser) {
                await supabase.auth.signOut()
                setError('Your account is not registered as an admin. Please request access.')
                return
            }
            if (adminUser.status === 'pending') {
                await supabase.auth.signOut()
                setError('Your admin access is pending approval. A super admin must verify your account.')
                return
            }
            if (adminUser.status === 'rejected') {
                await supabase.auth.signOut()
                setError('Your admin access request has been rejected. Contact the site owner.')
                return
            }

            router.push('/admin/dashboard')
            router.refresh()
        } finally {
            setLoading(false)
        }
    }

    const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none transition-all text-sm cursor-text font-inter text-gray-800 placeholder:text-gray-400"

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="z-0 absolute inset-0 overflow-hidden">
                <Image src="/background-images/explore-dubai-background-effect.png" width={1200} height={600} alt=""
                    className="w-full h-full object-cover absolute z-0" />
                <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.97)_0%,rgba(255,255,255,1)_45%,rgba(255,255,255,0)_55%,rgba(255,255,255,1)_100%)]" />
            </div>

            <div className="relative z-10 bg-white rounded-[24px] shadow-[9px_9px_75px_0px_#00000029] w-full max-w-md p-8 sm:p-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-[#F8A900] rounded-[18px] mb-4 shadow-lg">
                        <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                        </svg>
                    </div>
                    <h1 className="font-manrope font-extrabold text-[30px] leading-none tracking-[-0.03em] text-[#112259] mb-1.5">TRAVI Admin</h1>
                    <p className="text-gray-500 text-sm font-inter">Sign in to your admin account</p>
                </div>

                {/* Callback error banner */}
                {callbackError === 'auth_callback_failed' && (
                    <div className="mb-5 bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
                        <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="text-xs font-semibold text-amber-800">Verification link expired or invalid</p>
                            <Link href="/admin/resend-verification" className="text-xs text-[#F8A900] font-semibold hover:underline">
                                Request a new verification email →
                            </Link>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-[#112259] mb-1.5 font-inter">Email Address</label>
                        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                            className={inputCls} placeholder="admin@example.com" required autoComplete="email" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-[#112259] mb-1.5 font-inter">Password</label>
                        <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}
                            className={inputCls} placeholder="••••••••" required autoComplete="current-password" />
                    </div>

                    {/* Unconfirmed card */}
                    {unconfirmed && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-amber-800 font-manrope">Email not verified</p>
                                    <p className="text-xs text-amber-700 mt-0.5 font-inter">Check the inbox for <span className="font-semibold">{email}</span> and click the verification link.</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button type="button" onClick={resendEmail}
                                    disabled={resendStatus === 'sending' || resendStatus === 'sent'}
                                    className="cursor-pointer flex-1 py-2 text-xs font-bold bg-[#F8A900] hover:bg-[#e09800] text-black rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed font-manrope">
                                    {resendStatus === 'sending' ? 'Sending…' : resendStatus === 'sent' ? '✓ Sent — check inbox!' : 'Resend verification'}
                                </button>
                                <Link href="/admin/resend-verification"
                                    className="flex-1 py-2 text-xs font-semibold text-amber-700 border border-amber-300 rounded-lg text-center hover:bg-amber-100 transition-colors font-inter">
                                    Different email
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Other errors */}
                    {error && !unconfirmed && (
                        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 flex items-start gap-2 font-inter">
                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <button type="submit" disabled={loading}
                        className="w-full bg-[#F8A900] hover:bg-[#e09800] active:bg-[#cc8800] text-black font-bold py-3.5 rounded-[14px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm font-manrope tracking-wide">
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

                <div className="mt-6 pt-5 border-t border-gray-100 text-center space-y-2">
                    <p className="text-sm text-gray-500 font-inter">
                        No admin account?{' '}
                        <Link href="/admin/register" className="text-[#112259] font-semibold hover:text-[#F8A900] transition-colors">
                            Request access
                        </Link>
                    </p>
                    <p className="text-xs text-gray-400 font-inter">
                        Need a new verification email?{' '}
                        <Link href="/admin/resend-verification" className="text-[#112259] font-semibold hover:text-[#F8A900] transition-colors">
                            Resend it
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
