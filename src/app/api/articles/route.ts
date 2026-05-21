import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase'

export async function GET(request: NextRequest) {
    try {
        const sp = request.nextUrl.searchParams
        const query    = sp.get('q')        || ''
        const limit    = Math.min(parseInt(sp.get('limit') || '12'), 50)
        const page     = Math.max(parseInt(sp.get('page')  || '1'), 1)
        const offset   = (page - 1) * limit
        const sortBy   = sp.get('sortBy')   || ''
        const category = sp.get('category') || ''

        // ── count query ───────────────────────────────────────────────
        let countQ = supabase.from('article').select('article_id', { count: 'exact', head: true })
        if (query)    countQ = countQ.or(`title.ilike.%${query}%`)
        if (category) countQ = countQ.eq('category', category)

        const { count } = await countQ

        // ── data query ────────────────────────────────────────────────
        let dataQ = supabase.from('article').select('*')

        if (query)    dataQ = dataQ.or(`title.ilike.%${query}%`)
        if (category) dataQ = dataQ.eq('category', category)

        // Sorting
        switch (sortBy) {
            case 'oldest': dataQ = dataQ.order('published_date', { ascending: true  }); break
            default:       dataQ = dataQ.order('published_date', { ascending: false }); break
        }

        dataQ = dataQ.range(offset, offset + limit - 1)

        const { data, error } = await dataQ

        if (error) {
            console.error('[articles API] error:', error)
            return NextResponse.json({ error: 'Failed to fetch articles', details: error.message }, { status: 500 })
        }

        const total      = count ?? 0
        const totalPages = Math.max(Math.ceil(total / limit), 1)

        return NextResponse.json({ articles: data || [], total, limit, offset, page, totalPages })
    } catch (error) {
        console.error('[articles API] unexpected error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
