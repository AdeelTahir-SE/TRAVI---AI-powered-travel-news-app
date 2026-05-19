'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/utils/supabase'

type Step = 'form' | 'check_email'

export default function AdminRegisterPage() {
    const [step, setStep] = useState<Step>('form')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (password.length < 8) {
            setError('Password must be at least 8 characters.')
            return
        }
        if (password !== confirm) {
            setError('Passwords do not match.')
            return
        }

        setLoading(true)
        try {
            const { error: signUpError } = await supabase.auth.signUp({
                email: email.trim(),
                password,
                options: {
                    data: { full_name: fullName.trim() },
                    // Supabase will send a confirmation email with a link
                    // pointing to /auth/callback?code=... which exchanges it for a session
                    // and the DB trigger will insert into admin_users on confirmation
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            })

            if (signUpError) {
                if (signUpError.message.includes('already registered')) {
                    setError('This email is already registered. Please sign in instead.')
                } else {
                    setError(signUpError.message)
                }
                return
            }

            setStep('check_email')
        } finally {
            setLoading(false)
        }
    }

    const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent transition-all text-sm cursor-text"

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4">
            {/* Background */}
            <div className="z-0 absolute inset-0 overflow-hidden">
                <Image
                    src="/background-images/explore-dubai-background-effect.png"
                    width={1200}
                    height={600}
                    alt=""
                    className="w-full h-full object-cover absolute z-0"
                />
                <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.95)_0%,rgba(255,255,255,1)_40%,rgba(255,255,255,0)_60%,rgba(255,255,255,1)_100%)]" />
            </div>

            <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 sm:p-10">

                {step === 'check_email' ? (
                    /* ── Success / check email state ── */
                    <div className="flex flex-col items-center gap-5 text-center py-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Check your inbox</h2>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                We sent a verification link to <span className="font-semibold text-gray-800">{email}</span>.
                            </p>
                            <p className="text-sm text-gray-500 leading-relaxed mt-2">
                                After clicking the link, your account will be created with <span className="font-semibold text-amber-600">pending</span> status. A super admin will review and approve your access.
                            </p>
                        </div>

                        {/* What happens next */}
                        <div className="w-full bg-blue-50 border border-blue-100 rounded-xl p-4 text-left space-y-2">
                            <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">What happens next</p>
                            {[
                                '1. Click the link in your email',
                                '2. Your account is created (status: pending)',
                                '3. Super admin approves your access',
                                '4. You can sign in to the admin panel',
                            ].map(s => (
                                <p key={s} className="text-xs text-blue-600 flex items-start gap-1.5">
                                    <svg className="w-3 h-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    {s}
                                </p>
                            ))}
                        </div>

                        <Link href="/admin/login" className="text-sm text-[#0D7FF2] font-semibold hover:underline">
                            Back to Sign In
                        </Link>
                    </div>
                ) : (
                    /* ── Registration form ── */
                    <>
                        <div className="text-center mb-7">
                            <div className="inline-block p-3 bg-gradient-to-br from-[#0D7FF2] to-[#0B6FD9] rounded-2xl mb-3">
                                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">Request Admin Access</h1>
                            <p className="text-gray-500 text-sm">Create your account — a super admin will approve it</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    className={inputClass}
                                    placeholder="Jane Smith"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className={inputClass}
                                    placeholder="jane@example.com"
                                    required
                                    autoComplete="email"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className={inputClass}
                                    placeholder="At least 8 characters"
                                    required
                                    minLength={8}
                                    autoComplete="new-password"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirm}
                                    onChange={e => setConfirm(e.target.value)}
                                    className={inputClass}
                                    placeholder="Repeat password"
                                    required
                                    autoComplete="new-password"
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
                                className="w-full bg-[#0D7FF2] hover:bg-[#0B6FD9] text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Creating account…
                                    </span>
                                ) : 'Create Account & Request Access'}
                            </button>
                        </form>

                        <p className="text-center text-sm text-gray-500 mt-5">
                            Already have access?{' '}
                            <Link href="/admin/login" className="text-[#0D7FF2] font-semibold hover:underline">Sign in</Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}
