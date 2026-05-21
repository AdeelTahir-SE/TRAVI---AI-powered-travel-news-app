import { NextRequest, NextResponse } from 'next/server'

// ─── Model priority list (tried in order until one succeeds) ────────────────
// gpt-image-1  → OpenAI's latest image model (higher quality, native multimodal)
// dall-e-3     → Proven fallback
const IMAGE_MODELS = ['gpt-image-1', 'dall-e-3'] as const
type ImageModel = (typeof IMAGE_MODELS)[number]

const OPENAI_IMAGE_URL = 'https://api.openai.com/v1/images/generations'

// Model-specific payload differences
function buildPayload(model: ImageModel, enhancedPrompt: string) {
    if (model === 'gpt-image-1') {
        return {
            model,
            prompt: enhancedPrompt,
            n: 1,
            size: '1536x1024',     // native 3:2 landscape for gpt-image-1
            quality: 'high',        // gpt-image-1 supports "low" | "medium" | "high"
            // response_format defaults to b64_json for gpt-image-1
        }
    }
    // dall-e-3
    return {
        model,
        prompt: enhancedPrompt,
        n: 1,
        size: '1792x1024',
        quality: 'standard',
        response_format: 'url',
    }
}

// Extract image URL/b64 from response depending on model
function extractImageUrl(model: ImageModel, data: { data?: { url?: string; b64_json?: string }[] }): string | null {
    const item = data?.data?.[0]
    if (!item) return null

    if (model === 'gpt-image-1' && item.b64_json) {
        // Return as a data URI so it can be previewed / uploaded downstream
        return `data:image/png;base64,${item.b64_json}`
    }
    return item.url ?? null
}

export async function POST(request: NextRequest) {
    try {
        const apiKey = process.env.OPENAI_API_KEY
        if (!apiKey) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured.' },
                { status: 500 }
            )
        }

        const body = await request.json()
        const { prompt, context } = body

        if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
            return NextResponse.json(
                { error: 'A prompt is required.' },
                { status: 400 }
            )
        }
        if (prompt.trim().length > 800) {
            return NextResponse.json(
                { error: 'Prompt must be under 800 characters.' },
                { status: 400 }
            )
        }

        // Enhanced prompt — keeps the photorealistic travel style regardless of model
        const enhancedPrompt = `High-quality professional travel photography. ${context ? `${context}. ` : ''}${prompt.trim()}. Photorealistic, editorial-quality, vibrant colors, wide angle, 16:9 composition.`

        let lastError: string = 'Image generation failed.'

        // ── Try each model in priority order ──────────────────────────────────
        for (const model of IMAGE_MODELS) {
            const openaiResponse = await fetch(OPENAI_IMAGE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify(buildPayload(model, enhancedPrompt)),
            })

            // Hard-stop errors — no point retrying other models
            if (openaiResponse.status === 401) {
                return NextResponse.json({ error: 'Invalid OpenAI API key.' }, { status: 401 })
            }
            if (openaiResponse.status === 402) {
                return NextResponse.json(
                    { error: 'OpenAI quota exceeded. Check billing at platform.openai.com.' },
                    { status: 402 }
                )
            }
            if (openaiResponse.status === 429) {
                return NextResponse.json(
                    { error: 'Rate limit exceeded. Please wait a moment.' },
                    { status: 429 }
                )
            }

            if (!openaiResponse.ok) {
                const errorData = await openaiResponse.json().catch(() => ({}))
                const detail = (errorData as { error?: { message?: string } })?.error?.message || openaiResponse.statusText
                console.warn(`[generate-image] ${model} failed (${openaiResponse.status}): ${detail}`)
                lastError = detail
                // Try next model
                continue
            }

            const data = await openaiResponse.json()
            const imageUrl = extractImageUrl(model, data)

            if (!imageUrl) {
                console.warn(`[generate-image] ${model} returned no image data.`)
                lastError = 'No image returned from model.'
                continue
            }

            console.info(`[generate-image] Success via model: ${model}`)
            return NextResponse.json({ success: true, url: imageUrl })
        }

        // All models exhausted
        return NextResponse.json({ error: lastError }, { status: 500 })

    } catch (error) {
        console.error('[generate-image] Unexpected error:', error)
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
    }
}
