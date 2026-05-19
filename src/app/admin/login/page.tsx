'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const ADMIN_USERNAME = 'admin'
        const ADMIN_PASSWORD = 'admin123'

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            localStorage.setItem('adminAuth', 'true')
            router.push('/admin/dashboard')
        } else {
            setError('Invalid username or password')
        }

        setLoading(false)
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 sm:p-10">
                <div className="text-center mb-8">
                    <div className="inline-block p-3 bg-gradient-to-br from-[#0D7FF2] to-[#0B6FD9] rounded-2xl mb-4">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">TRAVI Admin</h1>
                    <p className="text-gray-600">Sign in to access the admin panel</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent transition-all cursor-text"
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent transition-all cursor-text"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0D7FF2] hover:bg-[#0B6FD9] active:bg-[#0956B8] text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </span>
                        ) : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-700 mb-1">Default credentials:</p>
                    <p className="font-mono text-xs">Username: <span className="text-[#0D7FF2] font-semibold">admin</span></p>
                    <p className="font-mono text-xs">Password: <span className="text-[#0D7FF2] font-semibold">admin123</span></p>
                </div>
            </div>

            <div className="z-0 absolute inset-0 w-full min-h-screen overflow-hidden">
                <Image
                    src="/background-images/explore-dubai-background-effect.png"
                    width={1200}
                    height={600}
                    alt=""
                    className="w-full h-full object-cover absolute bottom-0 z-0"
                />
                <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.9)_0%,rgba(255,255,255,1)_45%,rgba(255,255,255,0)_50%,rgba(255,255,255,1)_100%)]"></div>
            </div>
        </div>
    )
}
