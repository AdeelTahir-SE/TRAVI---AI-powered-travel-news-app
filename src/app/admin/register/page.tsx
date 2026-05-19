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
        if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
        if (password !== confirm) { setError('Passwords do not match.'); return }
        setLoading(true)
        try {
            const { error: signUpError } = await supabase.auth.signUp({
                email: email.trim(), password,
                options: { data: { full_name: fullName.trim() }, emailRedirectTo: `${window.location.origin}/auth/callback` },
            })
            if (signUpError) {
                setError(signUpError.message.includes('already registered') ? 'This email is already registered. Please sign in instead.' : signUpError.message)
                return
            }
            setStep('check_email')
        } finally { setLoading(false) }
    }

    const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none transition-all text-sm cursor-text font-inter text-gray-800 placeholder:text-gray-400"

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 py-12">
            <div className="z-0 absolute inset-0 overflow-hidden">
                <Image src="/background-images/explore-dubai-background-effect.png" width={1200} height={600} alt="" className="w-full h-full object-cover absolute z-0" />
                <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.97)_0%,rgba(255,255,255,1)_40%,rgba(255,255,255,0)_60%,rgba(255,255,255,1)_100%)]" />
            </div>

            <div className="relative z-10 bg-white rounded-[24px] shadow-[9px_9px_75px_0px_#00000029] w-full max-w-md p-8 sm:p-10">
                {step === 'check_email' ? (
                    <div className="flex flex-col items-center gap-5 text-center py-2">
                        <div className="w-16 h-16 rounded-full bg-[#F8A900]/15 flex items-center justify-center">
                            <svg className="w-8 h-8 text-[#F8A900]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="font-manrope font-extrabold text-[24px] tracking-[-0.03em] text-[#112259] mb-2">Check your inbox</h2>
                            <p className="text-sm text-gray-500 leading-relaxed font-inter">
                                We sent a verification link to <span className="font-semibold text-[#112259]">{email}</span>.
                            </p>
                            <p className="text-sm text-gray-500 leading-relaxed mt-2 font-inter">
                                After clicking the link your account is created with <span className="font-semibold text-amber-600">pending</span> status. A super admin will approve your access.
                            </p>
                        </div>
                        <div className="w-full bg-[#F8A900]/8 border border-[#F8A900]/20 rounded-xl p-4 text-left space-y-2.5">
                            <p className="text-xs font-bold text-[#112259] uppercase tracking-wider font-manrope">What happens next</p>
                            {['Click the link in your email', 'Account created (status: pending)', 'Super admin approves access', 'Sign in to the admin panel'].map((s, i) => (
                                <div key={s} className="flex items-start gap-2.5 text-xs text-gray-600 font-inter">
                                    <span className="w-5 h-5 rounded-full bg-[#F8A900] text-black flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">{i + 1}</span>
                                    {s}
                                </div>
                            ))}
                        </div>
                        <Link href="/admin/login" className="w-full text-center py-3.5 bg-[#F8A900] hover:bg-[#e09800] text-black font-bold rounded-[14px] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm font-manrope">
                            Back to Sign In
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-7">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#F8A900] rounded-[18px] mb-4 shadow-lg">
                                <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </div>
                            <h1 className="font-manrope font-extrabold text-[28px] leading-none tracking-[-0.03em] text-[#112259] mb-1.5">Request Admin Access</h1>
                            <p className="text-gray-500 text-sm font-inter">Create your account — a super admin will approve it</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {[
                                { label: 'Full Name', type: 'text', val: fullName, set: setFullName, ph: 'Jane Smith' },
                                { label: 'Email Address', type: 'email', val: email, set: setEmail, ph: 'jane@example.com' },
                                { label: 'Password', type: 'password', val: password, set: setPassword, ph: 'At least 8 characters' },
                                { label: 'Confirm Password', type: 'password', val: confirm, set: setConfirm, ph: 'Repeat password' },
                            ].map(f => (
                                <div key={f.label}>
                                    <label className="block text-sm font-semibold text-[#112259] mb-1.5 font-inter">{f.label}</label>
                                    <input type={f.type} value={f.val} onChange={e => f.set(e.target.value)} className={inputCls} placeholder={f.ph} required minLength={f.type === 'password' ? 8 : undefined} />
                                </div>
                            ))}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 flex items-start gap-2 font-inter">
                                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {error}
                                </div>
                            )}
                            <button type="submit" disabled={loading}
                                className="w-full bg-[#F8A900] hover:bg-[#e09800] text-black font-bold py-3.5 rounded-[14px] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm font-manrope tracking-wide">
                                {loading ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Creating account…</span> : 'Create Account & Request Access'}
                            </button>
                        </form>
                        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-500 font-inter">Already have access?{' '}
                                <Link href="/admin/login" className="text-[#112259] font-semibold hover:text-[#F8A900] transition-colors">Sign in</Link>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
