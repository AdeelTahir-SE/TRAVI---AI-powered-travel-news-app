import { NextRequest, NextResponse } from 'next/server'

const OPENAI_IMAGE_URL = 'https://api.openai.com/v1/images/generations'

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

        // Build an enhanced prompt — always keep it photorealistic travel imagery
        const enhancedPrompt = `High-quality professional travel photography. ${context ? `${context}. ` : ''}${prompt.trim()}. Photorealistic, editorial-quality, vibrant colors, wide angle, 16:9 composition.`

        const openaiResponse = await fetch(OPENAI_IMAGE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'dall-e-3',
                prompt: enhancedPrompt,
                n: 1,
                size: '1792x1024',
                quality: 'standard',
                response_format: 'url',
            }),
        })

        if (!openaiResponse.ok) {
            const errorData = await openaiResponse.json().catch(() => ({}))
            console.error('DALL-E API error:', openaiResponse.status, errorData)

            if (openaiResponse.status === 401) {
                return NextResponse.json({ error: 'Invalid OpenAI API key.' }, { status: 401 })
            }
            if (openaiResponse.status === 429) {
                return NextResponse.json({ error: 'Rate limit exceeded. Please wait a moment.' }, { status: 429 })
            }
            if (openaiResponse.status === 402) {
                return NextResponse.json({ error: 'OpenAI quota exceeded. Check billing at platform.openai.com.' }, { status: 402 })
            }
            const detail = (errorData as { error?: { message?: string } })?.error?.message || openaiResponse.statusText
            return NextResponse.json({ error: `OpenAI error: ${detail}` }, { status: openaiResponse.status })
        }

        const data = await openaiResponse.json()
        const imageUrl: string = data?.data?.[0]?.url

        if (!imageUrl) {
            return NextResponse.json({ error: 'No image returned from DALL-E.' }, { status: 500 })
        }

        return NextResponse.json({ success: true, url: imageUrl })
    } catch (error) {
        console.error('generate-image API error:', error)
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
    }
}
