'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageGeneratorProps {
    /** Prepopulated context fed to the API (e.g. "Main image for Atlantis Hotel Dubai") */
    context?: string
    /** Called with the DALL-E URL once generation succeeds */
    onGenerated: (url: string) => void
    /** Optional label shown above the panel */
    label?: string
}

export default function ImageGenerator({ context, onGenerated, label }: ImageGeneratorProps) {
    const [open, setOpen] = useState(false)
    const [prompt, setPrompt] = useState('')
    const [status, setStatus] = useState<'idle' | 'generating' | 'done' | 'error'>('idle')
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [errorMsg, setErrorMsg] = useState('')

    const generate = async () => {
        if (!prompt.trim()) return
        setStatus('generating')
        setErrorMsg('')
        setPreviewUrl(null)

        try {
            const res = await fetch('/api/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt.trim(), context }),
            })
            const data = await res.json()

            if (!res.ok || !data.url) {
                setErrorMsg(data.error || 'Image generation failed.')
                setStatus('error')
                return
            }

            setPreviewUrl(data.url)
            setStatus('done')
        } catch {
            setErrorMsg('Network error. Please try again.')
            setStatus('error')
        }
    }

    const useImage = () => {
        if (previewUrl) {
            onGenerated(previewUrl)
            setOpen(false)
            setPrompt('')
            setPreviewUrl(null)
            setStatus('idle')
        }
    }

    const reset = () => {
        setPreviewUrl(null)
        setStatus('idle')
        setErrorMsg('')
    }

    return (
        <div className="mt-2">
            {/* Toggle button */}
            {!open ? (
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#F8A900] border border-[#F8A900]/40 rounded-lg bg-[#F8A900]/5 hover:bg-[#F8A900]/15 transition-all duration-200"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    ✦ AI Generate Image
                </button>
            ) : (
                <div className="border border-[#F8A900]/30 rounded-xl bg-gradient-to-br from-amber-50/60 to-white p-4 space-y-3 shadow-sm">
                    {/* Panel header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#F8A900] text-black">AI</span>
                            <span className="text-sm font-semibold text-gray-700">{label || 'Generate Image with DALL·E 3'}</span>
                        </div>
                        <button type="button" onClick={() => { setOpen(false); reset() }} className="cursor-pointer text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
                    </div>

                    {/* Prompt input */}
                    {status !== 'done' && (
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={prompt}
                                onChange={e => setPrompt(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && generate()}
                                placeholder={context ? `e.g. rooftop pool at sunset…` : `Describe the image you need…`}
                                disabled={status === 'generating'}
                                className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F8A900] focus:border-transparent disabled:opacity-50"
                            />
                            <button
                                type="button"
                                onClick={generate}
                                disabled={status === 'generating' || !prompt.trim()}
                                className="cursor-pointer flex items-center gap-1.5 px-3 py-2 bg-[#F8A900] hover:bg-[#e09800] disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
                            >
                                {status === 'generating' ? (
                                    <>
                                        <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                        </svg>
                                        Generating…
                                    </>
                                ) : 'Generate'}
                            </button>
                        </div>
                    )}

                    {/* Context hint */}
                    {context && status !== 'done' && (
                        <p className="text-[11px] text-gray-400 leading-snug">
                            <span className="font-medium text-gray-500">Context:</span> {context}
                        </p>
                    )}

                    {/* Generating state */}
                    {status === 'generating' && (
                        <div className="flex items-center gap-3 py-3">
                            <div className="flex gap-1">
                                {[0, 1, 2].map(i => (
                                    <div
                                        key={i}
                                        className="w-2 h-2 rounded-full bg-[#F8A900] animate-bounce"
                                        style={{ animationDelay: `${i * 0.15}s` }}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-gray-500">DALL·E 3 is creating your image… (~15s)</span>
                        </div>
                    )}

                    {/* Error */}
                    {status === 'error' && (
                        <div className="flex items-start gap-2 p-2.5 bg-red-50 border border-red-200 rounded-lg">
                            <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="flex-1">
                                <p className="text-xs text-red-700">{errorMsg}</p>
                                <button type="button" onClick={reset} className="cursor-pointer text-xs text-red-500 underline mt-1">Try again</button>
                            </div>
                        </div>
                    )}

                    {/* Preview */}
                    {status === 'done' && previewUrl && (
                        <div className="space-y-3">
                            <div className="relative rounded-xl overflow-hidden border-2 border-[#F8A900]/30 shadow-sm">
                                <Image
                                    src={previewUrl}
                                    alt="AI generated preview"
                                    width={800}
                                    height={450}
                                    className="w-full h-48 object-cover"
                                    unoptimized
                                />
                                <div className="absolute top-2 left-2">
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F8A900] text-black shadow">DALL·E 3</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={useImage}
                                    className="cursor-pointer flex-1 py-2 bg-[#F8A900] hover:bg-[#e09800] text-black text-xs font-bold rounded-lg transition-colors"
                                >
                                    ✓ Use This Image
                                </button>
                                <button
                                    type="button"
                                    onClick={reset}
                                    className="cursor-pointer px-4 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Regenerate
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-400">
                                ⚠ DALL·E URLs expire after ~1 hour. Use this image immediately or it will need to be regenerated.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
