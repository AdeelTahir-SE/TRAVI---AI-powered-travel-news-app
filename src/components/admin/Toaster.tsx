'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { JSX } from 'react'
// ── Types ──────────────────────────────────────────────────────────────────────
type ToastType = 'success' | 'error' | 'info'

interface Toast {
    id: string
    type: ToastType
    message: string
}

interface ToastContextValue {
    toast: (message: string, type?: ToastType) => void
}

// ── Context ────────────────────────────────────────────────────────────────────
const ToastContext = createContext<ToastContextValue>({ toast: () => { } })

export function useToast() {
    return useContext(ToastContext)
}

// ── Provider + Renderer ────────────────────────────────────────────────────────
export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const toast = useCallback((message: string, type: ToastType = 'info') => {
        const id = crypto.randomUUID()
        setToasts(prev => [...prev, { id, type, message }])
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, 4000)
    }, [])

    const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id))

    const icons: Record<ToastType, JSX.Element> = {
        success: (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        error: (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        info: (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    }

    const colors: Record<ToastType, string> = {
        success: 'bg-emerald-600 text-white',
        error: 'bg-red-600 text-white',
        info: 'bg-[#0D7FF2] text-white',
    }

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            {/* Toast container — bottom-right */}
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
                {toasts.map(t => (
                    <div
                        key={t.id}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl pointer-events-auto
                            text-sm font-medium max-w-sm w-full
                            animate-[slideUp_0.25s_ease-out]
                            ${colors[t.type]}`}
                        style={{ animation: 'slideUp 0.25s ease-out' }}
                    >
                        {icons[t.type]}
                        <span className="flex-1 leading-snug">{t.message}</span>
                        <button
                            onClick={() => dismiss(t.id)}
                            className="cursor-pointer ml-1 opacity-70 hover:opacity-100 transition-opacity"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </ToastContext.Provider>
    )
}
