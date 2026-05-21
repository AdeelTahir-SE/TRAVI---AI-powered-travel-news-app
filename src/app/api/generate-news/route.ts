import { NextRequest, NextResponse } from 'next/server'

// ─── Model priority list (tried in order until one succeeds) ────────────────
// gpt-4.5-preview → GPT-4.5, OpenAI's most capable frontier model for nuanced writing
// gpt-4o          → Rock-solid fallback with full JSON mode support
const TEXT_MODELS = ['gpt-4.5-preview', 'gpt-4o'] as const
type TextModel = (typeof TEXT_MODELS)[number]

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

const SYSTEM_PROMPT = `You are an expert travel journalist specializing in Dubai and global travel destinations. 
Your task is to generate a well-structured, engaging travel news article in JSON format.

The article MUST follow this exact JSON structure:
{
  "title": "compelling article headline (string)",
  "published_date": "YYYY-MM-DD (today's date)",
  "paras": [
    "paragraph 1 (string, 100-150 words)",
    "paragraph 2 (string, 100-150 words)",
    "paragraph 3 (string, 100-150 words)",
    "paragraph 4 (string, 100-150 words)",
    "paragraph 5 (string, 100-150 words)"
  ],
  "subsections": [
    {
      "heading": "subsection heading 1",
      "paras": [
        "paragraph 1",
        "paragraph 2",
        "paragraph 3",
        "paragraph 4",
        "paragraph 5"
      ]
    },
    {
      "heading": "subsection heading 2",
      "paras": [
        "paragraph 1",
        "paragraph 2",
        "paragraph 3",
        "paragraph 4",
        "paragraph 5"
      ]
    }
  ],
  "quotation1": {
    "quote": "an inspiring travel quote relevant to the article (50-80 words)",
    "person_name": "Full Name",
    "person_role": "their title/role (e.g. Travel Blogger, Tourism Expert)",
    "person_image": "/images/comment-avatar.jpg"
  },
  "quotation2": {
    "quote": "a shorter inspiring quote (20-40 words)",
    "person_name": "Full Name"
  },
  "tip": "A practical traveler tip directly related to the article topic (50-80 words)"
}

Write in a professional, engaging travel journalism style. Content must be factually accurate and inspiring.
Return ONLY the JSON object, no markdown code blocks, no additional text.`

// Model-specific request params
function buildRequestBody(model: TextModel, userPrompt: string) {
    const base = {
        model,
        messages: [
            { role: 'system' as const, content: SYSTEM_PROMPT },
            { role: 'user' as const, content: `Generate a travel news article about: ${userPrompt}` },
        ],
        temperature: 0.7,
    }

    if (model === 'gpt-4.5-preview') {
        return {
            ...base,
            // gpt-4.5 supports a larger context — use more tokens for richer articles
            max_completion_tokens: 6000,
            // gpt-4.5-preview supports json_object response format
            response_format: { type: 'json_object' as const },
        }
    }

    // gpt-4o
    return {
        ...base,
        max_tokens: 4000,
        response_format: { type: 'json_object' as const },
    }
}

export async function POST(request: NextRequest) {
    try {
        const apiKey = process.env.OPENAI_API_KEY
        if (!apiKey) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured. Set OPENAI_API_KEY in environment variables.' },
                { status: 500 }
            )
        }

        const body = await request.json()
        const { prompt } = body

        if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
            return NextResponse.json(
                { error: 'A prompt is required to generate a news article.' },
                { status: 400 }
            )
        }
        if (prompt.trim().length > 500) {
            return NextResponse.json(
                { error: 'Prompt must be under 500 characters.' },
                { status: 400 }
            )
        }

        let lastError = 'Generation failed.'

        // ── Try each model in priority order ──────────────────────────────────
        for (const model of TEXT_MODELS) {
            const openaiResponse = await fetch(OPENAI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify(buildRequestBody(model, prompt.trim())),
            })

            // Hard-stop errors — no point retrying other models
            if (openaiResponse.status === 401) {
                return NextResponse.json(
                    { error: 'Invalid OpenAI API key. Please check your OPENAI_API_KEY.' },
                    { status: 401 }
                )
            }
            if (openaiResponse.status === 402) {
                return NextResponse.json(
                    { error: 'OpenAI quota exceeded. Please check your billing at platform.openai.com.' },
                    { status: 402 }
                )
            }
            if (openaiResponse.status === 429) {
                return NextResponse.json(
                    { error: 'OpenAI rate limit exceeded. Please wait a moment and try again.' },
                    { status: 429 }
                )
            }

            if (!openaiResponse.ok) {
                const errorData = await openaiResponse.json().catch(() => ({}))
                const detail = (errorData as { error?: { message?: string } })?.error?.message || openaiResponse.statusText
                console.warn(`[generate-news] ${model} failed (${openaiResponse.status}): ${detail}`)
                lastError = detail
                // Try next model
                continue
            }

            const openaiData = await openaiResponse.json()
            const content: string | undefined = openaiData.choices?.[0]?.message?.content

            if (!content) {
                console.warn(`[generate-news] ${model} returned no content.`)
                lastError = 'No content returned from model.'
                continue
            }

            let article
            try {
                article = JSON.parse(content)
            } catch {
                console.warn(`[generate-news] ${model} returned non-JSON content.`)
                lastError = 'Model returned invalid JSON. Trying fallback…'
                continue
            }

            // Validate required fields
            if (!article.title || !Array.isArray(article.paras) || !Array.isArray(article.subsections)) {
                console.warn(`[generate-news] ${model} returned incomplete article structure.`)
                lastError = 'Generated article is missing required fields.'
                continue
            }

            // Normalise paras to exactly 5 entries
            while (article.paras.length < 5) article.paras.push('')

            // Normalise subsection paras to exactly 5 entries each
            article.subsections = article.subsections.map(
                (sub: { heading: string; paras: string[] }) => ({
                    ...sub,
                    paras: sub.paras?.length >= 5
                        ? sub.paras
                        : [...(sub.paras || []), ...Array(5 - (sub.paras?.length || 0)).fill('')],
                })
            )

            console.info(`[generate-news] Success via model: ${model}`)
            return NextResponse.json({
                success: true,
                article,
                usage: openaiData.usage,
            })
        }

        // All models exhausted
        return NextResponse.json(
            { error: lastError },
            { status: 500 }
        )

    } catch (error) {
        console.error('[generate-news] Unexpected error:', error)
        return NextResponse.json(
            { error: 'Internal server error. Please try again.' },
            { status: 500 }
        )
    }
}
