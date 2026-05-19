import { NextRequest, NextResponse } from 'next/server'

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
        // Always use gpt-4o for maximum quality — model cannot be overridden by client
        const model = 'gpt-4o'

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

        const openaiResponse = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    {
                        role: 'system',
                        content: SYSTEM_PROMPT,
                    },
                    {
                        role: 'user',
                        content: `Generate a travel news article about: ${prompt.trim()}`,
                    },
                ],
                temperature: 0.7,
                max_tokens: 4000,
                response_format: { type: 'json_object' },
            }),
        })

        if (!openaiResponse.ok) {
            const errorData = await openaiResponse.json().catch(() => ({}))
            console.error('OpenAI API error:', openaiResponse.status, errorData)

            if (openaiResponse.status === 401) {
                return NextResponse.json(
                    { error: 'Invalid OpenAI API key. Please check your OPENAI_API_KEY.' },
                    { status: 401 }
                )
            }
            if (openaiResponse.status === 429) {
                return NextResponse.json(
                    { error: 'OpenAI rate limit exceeded. Please wait a moment and try again.' },
                    { status: 429 }
                )
            }
            if (openaiResponse.status === 402) {
                return NextResponse.json(
                    { error: 'OpenAI quota exceeded. Please check your billing at platform.openai.com.' },
                    { status: 402 }
                )
            }

            return NextResponse.json(
                { error: `OpenAI API error: ${openaiResponse.statusText}` },
                { status: openaiResponse.status }
            )
        }

        const openaiData = await openaiResponse.json()
        const content = openaiData.choices?.[0]?.message?.content

        if (!content) {
            return NextResponse.json(
                { error: 'No content returned from OpenAI.' },
                { status: 500 }
            )
        }

        let article
        try {
            article = JSON.parse(content)
        } catch {
            console.error('Failed to parse OpenAI response as JSON:', content)
            return NextResponse.json(
                { error: 'OpenAI returned invalid JSON. Please try again.' },
                { status: 500 }
            )
        }

        // Validate required fields
        if (!article.title || !Array.isArray(article.paras) || !Array.isArray(article.subsections)) {
            return NextResponse.json(
                { error: 'Generated article is missing required fields. Please try again.' },
                { status: 500 }
            )
        }

        // Ensure paras has exactly 5 entries
        while (article.paras.length < 5) {
            article.paras.push('')
        }

        // Ensure subsections have exactly 5 paras each
        article.subsections = article.subsections.map((sub: { heading: string; paras: string[] }) => ({
            ...sub,
            paras: sub.paras?.length >= 5 ? sub.paras : [
                ...(sub.paras || []),
                ...Array(5 - (sub.paras?.length || 0)).fill('')
            ]
        }))

        return NextResponse.json({
            success: true,
            article,
            model: openaiData.model,
            usage: openaiData.usage,
        })
    } catch (error) {
        console.error('Generate news API error:', error)
        return NextResponse.json(
            { error: 'Internal server error. Please try again.' },
            { status: 500 }
        )
    }
}
