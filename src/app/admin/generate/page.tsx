'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/utils/supabase'
import { Article } from '@/utils/types'

const EXAMPLE_PROMPTS = [
    'Top 5 hidden gems to visit in Dubai this winter',
    'Best luxury hotels opening in Dubai in 2025',
    'How to experience Dubai on a budget',
    'Desert safari adventures in the UAE',
    'Dubai food scene: must-try restaurants this season',
    'Family travel guide to Abu Dhabi',
]

// ── Fixed to Ai (best quality) ──────────────────────────────
const FIXED_MODEL = 'gpt-4o'

type GenerateStatus = 'idle' | 'generating' | 'done' | 'saving' | 'saved' | 'error'

const GENERATION_STEPS = [
    { id: 1, label: 'Initialising Model...', duration: 1200 },
    { id: 2, label: 'Analysing your topic…', duration: 2000 },
    { id: 3, label: 'Crafting article structure…', duration: 3000 },
    { id: 4, label: 'Writing paragraphs & quotes…', duration: 5000 },
    { id: 5, label: 'Polishing & formatting…', duration: 3000 },
]

export default function AINewsGeneratorPage() {
    const [prompt, setPrompt] = useState('')
    const [status, setStatus] = useState<GenerateStatus>('idle')
    const [errorMsg, setErrorMsg] = useState('')
    const [generatedArticle, setGeneratedArticle] = useState<Partial<Article> | null>(null)
    const [tokenUsage, setTokenUsage] = useState<{ prompt_tokens?: number; completion_tokens?: number; total_tokens?: number } | null>(null)
    const [currentStep, setCurrentStep] = useState(0)
    const [completedSteps, setCompletedSteps] = useState<number[]>([])
    const stepTimers = useRef<ReturnType<typeof setTimeout>[]>([])

    // Clear timers on unmount
    useEffect(() => () => { stepTimers.current.forEach(clearTimeout) }, [])

    const runStepAnimation = () => {
        setCurrentStep(1)
        setCompletedSteps([])
        let elapsed = 0
        GENERATION_STEPS.forEach((step, i) => {
            const t1 = setTimeout(() => setCurrentStep(step.id), elapsed)
            const t2 = setTimeout(() => setCompletedSteps(prev => [...prev, step.id]), elapsed + step.duration * 0.8)
            stepTimers.current.push(t1, t2)
            elapsed += step.duration
        })
    }

    const clearStepAnimation = () => {
        stepTimers.current.forEach(clearTimeout)
        stepTimers.current = []
    }

    const handleGenerate = async () => {
        if (!prompt.trim()) return
        setStatus('generating')
        setErrorMsg('')
        setGeneratedArticle(null)
        setTokenUsage(null)
        runStepAnimation()

        try {
            const res = await fetch('/api/generate-news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt.trim(), model: FIXED_MODEL }),
            })
            const data = await res.json()
            clearStepAnimation()

            if (!res.ok) {
                setErrorMsg(data.error || 'Failed to generate article. Please try again.')
                setStatus('error')
                return
            }

            setGeneratedArticle(data.article)
            setTokenUsage(data.usage)
            setCurrentStep(0)
            setCompletedSteps(GENERATION_STEPS.map(s => s.id))
            setStatus('done')
        } catch {
            clearStepAnimation()
            setErrorMsg('Network error. Please check your connection and try again.')
            setStatus('error')
        }
    }

    const handleSave = async () => {
        if (!generatedArticle) return
        setStatus('saving')
        const submitData = {
            ...generatedArticle,
            published_date: generatedArticle.published_date || new Date().toISOString().split('T')[0],
            images: generatedArticle.images || [],
        }
        const { error } = await supabase.from('article').insert([submitData])
        if (error) {
            setErrorMsg('Failed to save article: ' + error.message)
            setStatus('error')
        } else {
            setStatus('saved')
        }
    }

    const handleReset = () => {
        setPrompt('')
        setStatus('idle')
        setErrorMsg('')
        setGeneratedArticle(null)
        setTokenUsage(null)
        setCurrentStep(0)
        setCompletedSteps([])
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 font-inter">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-manrope font-extrabold text-[30px] leading-none tracking-[-0.03em] text-[#112259]">AI News Generator</h1>
                    <p className="text-gray-500 text-sm mt-1">Generate full travel articles instantly using Ai.</p>
                </div>

                {/* Generator Card */}
                <div className="bg-white rounded-[25px] shadow-[9px_9px_75px_0px_#00000029] overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-[#0A1929] to-[#112259] px-6 py-5 flex items-center justify-between">
                        <div>
                            <h2 className="font-manrope font-extrabold text-white text-[18px] tracking-tight">Generate New Article</h2>
                            <p className="text-gray-400 text-sm mt-0.5">Enter a topic and let Ai create a full structured article</p>
                        </div>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#F8A900] text-black">Ai</span>
                    </div>

                    <div className="p-6 space-y-5">
                        {/* Prompt Input */}
                        <div>
                            <label className="block text-sm font-semibold text-[#112259] mb-2 font-inter">
                                Topic / Prompt <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={prompt}
                                onChange={e => setPrompt(e.target.value)}
                                disabled={status === 'generating' || status === 'saving'}
                                placeholder="e.g. Top 5 hidden gems to visit in Dubai this winter…"
                                rows={3}
                                maxLength={500}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none resize-none text-gray-800 placeholder-gray-400 transition-all disabled:opacity-60 disabled:bg-gray-50"
                            />
                            <div className="flex justify-between items-center mt-1">
                                <p className="text-xs text-gray-400">Be specific for better results</p>
                                <p className={`text-xs ${prompt.length > 450 ? 'text-orange-500' : 'text-gray-400'}`}>
                                    {prompt.length}/500
                                </p>
                            </div>
                        </div>

                        {/* Example prompts */}
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest font-inter">Quick Examples</p>
                            <div className="flex flex-wrap gap-2">
                                {EXAMPLE_PROMPTS.map(ex => (
                                    <button
                                        key={ex}
                                        type="button"
                                        onClick={() => setPrompt(ex)}
                                        disabled={status === 'generating'}
                                        className="cursor-pointer text-xs px-3 py-1.5 bg-[#F8A900]/10 hover:bg-[#F8A900]/20 text-[#112259] rounded-full border border-[#F8A900]/30 hover:border-[#F8A900]/50 transition-all disabled:opacity-50 font-inter font-medium"
                                    >
                                        {ex}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Error Message */}
                        {status === 'error' && errorMsg && (
                            <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{errorMsg}</span>
                            </div>
                        )}

                        {/* Generate Button */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleGenerate}
                                disabled={!prompt.trim() || status === 'generating' || status === 'saving'}
                                className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-[#F8A900] hover:bg-[#e09800] text-black font-bold py-3 px-6 rounded-[14px] font-manrope transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                            >
                                {status === 'generating' ? (
                                    <>
                                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Generating with AI…
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Generate with AI
                                    </>
                                )}
                            </button>
                            {(status === 'done' || status === 'saved' || status === 'error') && (
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="px-4 py-3 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-all cursor-pointer"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Live Generation Progress ── */}
                {status === 'generating' && (
                    <div className="bg-white rounded-[25px] shadow-[9px_9px_75px_0px_#00000029] overflow-hidden mb-6">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#F8A900] animate-pulse" />
                            <h2 className="font-manrope font-bold text-[#112259]">AI is working…</h2>
                            <span className="ml-auto text-xs text-gray-400 font-mono">This may take ~15s</span>
                        </div>
                        <div className="p-6 space-y-3">
                            {GENERATION_STEPS.map(step => {
                                const isDone = completedSteps.includes(step.id)
                                const isActive = currentStep === step.id && !isDone
                                return (
                                    <div key={step.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 ${isActive ? 'bg-[#F8A900]/8 border border-[#F8A900]/30' : isDone ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-transparent'}`}>
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all duration-300 ${isDone ? 'bg-green-500 text-white' : isActive ? 'bg-[#F8A900] text-black' : 'bg-gray-200 text-gray-400'}`}>
                                            {isDone ? (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : isActive ? (
                                                <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                            ) : step.id}
                                        </div>
                                        <span className={`text-sm font-medium font-inter ${isDone ? 'text-green-700' : isActive ? 'text-[#112259]' : 'text-gray-400'}`}>
                                            {step.label}
                                        </span>
                                        {isActive && (
                                            <span className="ml-auto flex gap-1">
                                                {[0, 1, 2].map(i => (
                                                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#F8A900] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                                                ))}
                                            </span>
                                        )}
                                        {isDone && <span className="ml-auto text-xs text-green-600 font-medium">Done</span>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Generated Preview */}
                {generatedArticle && status !== 'idle' && status !== 'generating' && (
                    <div className="bg-white rounded-[25px] shadow-[9px_9px_75px_0px_#00000029] overflow-hidden">
                        {/* Preview Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <h2 className="font-manrope font-bold text-[#112259]">Generated Article Preview</h2>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-mono">AI</span>
                                {tokenUsage?.total_tokens && (
                                    <span className="text-xs bg-[#F8A900]/10 text-[#112259] border border-[#F8A900]/20 px-2.5 py-1 rounded-full font-inter font-medium">
                                        {tokenUsage.total_tokens.toLocaleString()} tokens
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Title */}
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 font-inter">Title</p>
                                <h3 className="font-manrope font-extrabold text-[20px] text-[#112259] tracking-tight">{generatedArticle.title}</h3>
                            </div>

                            {/* First paragraph preview */}
                            {generatedArticle.paras && generatedArticle.paras.length > 0 && (
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                                        Introduction ({generatedArticle.paras.length} paragraphs)
                                    </p>
                                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                                        {generatedArticle.paras[0]}
                                    </p>
                                </div>
                            )}

                            {/* Subsections */}
                            {generatedArticle.subsections && generatedArticle.subsections.length > 0 && (
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                                        Subsections ({generatedArticle.subsections.length})
                                    </p>
                                    <div className="space-y-2">
                                        {generatedArticle.subsections.map((s, i) => (
                                            <div key={i} className="flex items-center gap-2 text-sm">
                                                <span className="w-6 h-6 rounded-full bg-[#F8A900]/15 text-[#112259] flex items-center justify-center text-xs font-bold flex-shrink-0 font-manrope">
                                                    {i + 1}
                                                </span>
                                                <span className="font-medium text-gray-800">{s.heading}</span>
                                                <span className="text-gray-400">· {s.paras?.length || 0} paragraphs</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quotation */}
                            {generatedArticle.quotation1 && (
                                <div className="bg-[#112259]/5 border-l-4 border-[#F8A900] px-4 py-3 rounded-r-xl">
                                    <p className="text-sm italic text-gray-700 mb-1 font-inter">
                                        &quot;{generatedArticle.quotation1.quote}&quot;
                                    </p>
                                    <p className="text-xs font-semibold text-[#F8A900] font-manrope">
                                        — {generatedArticle.quotation1.person_name}
                                        {generatedArticle.quotation1.person_role && `, ${generatedArticle.quotation1.person_role}`}
                                    </p>
                                </div>
                            )}

                            {/* Tip */}
                            {generatedArticle.tip && (
                                <div className="bg-[#F8A900]/5 border border-[#F8A900]/20 px-4 py-3 rounded-xl">
                                    <p className="text-xs font-bold text-[#F8A900] uppercase tracking-wide mb-1">Traveler Tip</p>
                                    <p className="text-sm text-gray-700">{generatedArticle.tip}</p>
                                </div>
                            )}

                            {/* Content stats */}
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { label: 'Paragraphs', value: generatedArticle.paras?.length || 0 },
                                    { label: 'Subsections', value: generatedArticle.subsections?.length || 0 },
                                    { label: 'Quotations', value: [generatedArticle.quotation1, generatedArticle.quotation2].filter(Boolean).length },
                                ].map(stat => (
                                    <div key={stat.label} className="text-center bg-gray-50 border border-gray-100 rounded-xl p-3">
                                        <p className="font-manrope font-extrabold text-2xl text-[#112259]">{stat.value}</p>
                                        <p className="text-xs text-gray-500 mt-0.5 font-inter">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Save / Actions */}
                            {status === 'saved' ? (
                                <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold">Article saved successfully!</p>
                                        <p className="text-sm opacity-80">It will appear in Articles Management. Add images there before publishing.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        disabled={status === 'saving'}
                                        className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-[#112259] hover:bg-[#0d1b42] text-white font-bold py-3 px-6 rounded-[14px] font-manrope transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {status === 'saving' ? (
                                            <>
                                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Saving…
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                                </svg>
                                                Save to Supabase
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleGenerate}
                                        disabled={status === 'saving'}
                                        className="cursor-pointer px-4 py-3 border-2 border-[#F8A900] text-[#112259] hover:bg-[#F8A900]/10 rounded-[14px] font-bold font-manrope transition-all disabled:opacity-50"
                                    >
                                        Regenerate
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Info Box */}
                <div className="mt-6 bg-gradient-to-br from-[#0A1929] to-[#112259] rounded-[25px] p-6 text-white shadow-[9px_9px_75px_0px_#00000029]">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#F8A900] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="font-semibold text-sm mb-1 text-[#F8A900]">How it works</p>
                            <ul className="text-gray-300 text-sm space-y-1">
                                <li>1. Enter a topic → AI generates a full structured article (~15s)</li>
                                <li>2. Review the preview → Save to database as a draft</li>
                                <li>3. Go to <strong>Articles</strong> to add images &amp; edit before publishing</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
