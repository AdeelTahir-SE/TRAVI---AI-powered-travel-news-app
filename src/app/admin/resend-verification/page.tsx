'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/utils/supabase'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const COOLDOWN_SECONDS = 60

export default function ResendVerificationPage() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<Status>('idle')
    const [errorMsg, setErrorMsg] = useState('')
    const [cooldown, setCooldown] = useState(0)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    // Cooldown countdown
    useEffect(() => {
        if (cooldown <= 0) {
            if (timerRef.current) clearInterval(timerRef.current)
            return
        }
        timerRef.current = setInterval(() => {
            setCooldown(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(timerRef.current!)
    }, [cooldown])

    const handleResend = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email.trim() || cooldown > 0) return

        setStatus('sending')
        setErrorMsg('')

        const { error } = await supabase.auth.resend({
            type: 'signup',
            email: email.trim(),
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            // Supabase returns an error for unregistered emails — treat it as success
            // to avoid leaking whether an email exists
            if (error.message.toLowerCase().includes('rate limit')) {
                setErrorMsg('Too many attempts. Please wait a few minutes before trying again.')
                setStatus('error')
                return
            }
        }

        // Always show success (security best practice — don't confirm if email exists)
        setStatus('sent')
        setCooldown(COOLDOWN_SECONDS)
    }

    const canResend = status !== 'sending' && cooldown === 0

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
                <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.95)_0%,rgba(255,255,255,1)_45%,rgba(255,255,255,0)_55%,rgba(255,255,255,1)_100%)]" />
            </div>

            <div className="relative z-10 bg-white rounded-[24px] shadow-[9px_9px_75px_0px_#00000029] w-full max-w-md p-8 sm:p-10">

                {status === 'sent' ? (
                    /* ── Success state ─────────────────────────────────────── */
                    <div className="flex flex-col items-center gap-5 text-center py-2">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>

                        <div>
                            <h2 className="font-manrope font-extrabold text-[24px] tracking-tight text-[#112259] mb-2">
                                Verification Email Sent
                            </h2>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                If <span className="font-semibold text-gray-700">{email}</span> is registered, a new verification link has been sent. Check your inbox and spam folder.
                            </p>
                        </div>

                        {/* Steps */}
                        <div className="w-full bg-blue-50 border border-blue-100 rounded-xl p-4 text-left space-y-2">
                            {[
                                'Click the link in the email',
                                'Your email will be confirmed automatically',
                                'Return here to sign in',
                            ].map((step, i) => (
                                <div key={step} className="flex items-start gap-2.5 text-xs text-blue-700">
                                    <span className="w-5 h-5 rounded-full bg-[#2384C8] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                                        {i + 1}
                                    </span>
                                    {step}
                                </div>
                            ))}
                        </div>

                        {/* Resend again with cooldown */}
                        <div className="flex flex-col items-center gap-2 w-full">
                            {cooldown > 0 ? (
                                <p className="text-xs text-gray-400">
                                    Resend available in <span className="font-semibold text-[#112259]">{cooldown}s</span>
                                </p>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setStatus('idle')}
                                    className="cursor-pointer text-xs text-[#2384C8] hover:underline font-medium"
                                >
                                    Didn&apos;t receive it? Send again
                                </button>
                            )}
                            <Link
                                href="/admin/login"
                                className="w-full text-center py-3 bg-[#F8A900] hover:bg-[#e09800] text-black font-bold rounded-[14px] text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 font-manrope"
                            >
                                Back to Sign In
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* ── Form state ────────────────────────────────────────── */
                    <>
                        <div className="text-center mb-7">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#F8A900] rounded-[18px] mb-4 shadow-lg">
                                <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h1 className="font-manrope font-extrabold text-[26px] leading-none tracking-[-0.03em] text-[#112259] mb-1.5">
                                Resend Verification
                            </h1>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Enter your email address and we&apos;ll send a new verification link.
                            </p>
                        </div>

                        <form onSubmit={handleResend} className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={e => { setEmail(e.target.value); setStatus('idle') }}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F8A900] focus:border-transparent transition-all text-sm cursor-text"
                                    placeholder="you@example.com"
                                    required
                                    autoComplete="email"
                                />
                            </div>

                            {/* Error */}
                            {status === 'error' && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {errorMsg}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={!canResend || !email.trim()}
                                className="w-full flex items-center justify-center gap-2 bg-[#F8A900] hover:bg-[#e09800] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 rounded-[14px] transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm font-manrope"
                            >
                                {status === 'sending' ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Sending…
                                    </>
                                ) : cooldown > 0 ? (
                                    `Resend in ${cooldown}s`
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        Send Verification Email
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="text-center text-sm text-gray-500 mt-6">
                            Remember your password?{' '}
                            <Link href="/admin/login" className="text-[#2384C8] font-semibold hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}
