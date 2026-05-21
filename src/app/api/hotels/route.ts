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
        const priceMin = parseInt(sp.get('priceMin') || '0')
        const priceMax = parseInt(sp.get('priceMax') || '0')
        const minRating = parseFloat(sp.get('rating') || '0')
        const location  = sp.get('location') || ''

        // ── count query (no range) ──────────────────────────────────────
        let countQ = supabase.from('hotel').select('hotel_id', { count: 'exact', head: true })
        if (query)     countQ = countQ.or(`title.ilike.%${query}%,location.ilike.%${query}%,tagline.ilike.%${query}%`)
        if (location)  countQ = countQ.ilike('location', `%${location}%`)
        if (priceMin)  countQ = countQ.gte('price', priceMin)
        if (priceMax)  countQ = countQ.lte('price', priceMax)
        if (minRating) countQ = countQ.gte('rating', minRating)

        const { count } = await countQ

        // ── data query ─────────────────────────────────────────────────
        let dataQ = supabase.from('hotel').select('*')

        if (query)     dataQ = dataQ.or(`title.ilike.%${query}%,location.ilike.%${query}%,tagline.ilike.%${query}%`)
        if (location)  dataQ = dataQ.ilike('location', `%${location}%`)
        if (priceMin)  dataQ = dataQ.gte('price', priceMin)
        if (priceMax)  dataQ = dataQ.lte('price', priceMax)
        if (minRating) dataQ = dataQ.gte('rating', minRating)

        // Sorting
        switch (sortBy) {
            case 'price-low':  dataQ = dataQ.order('price',      { ascending: true  }); break
            case 'price-high': dataQ = dataQ.order('price',      { ascending: false }); break
            case 'rating':     dataQ = dataQ.order('rating',     { ascending: false }); break
            case 'popular':    dataQ = dataQ.order('reviews',    { ascending: false }); break
            default:           dataQ = dataQ.order('created_at', { ascending: false }); break
        }

        dataQ = dataQ.range(offset, offset + limit - 1)

        const { data, error } = await dataQ

        if (error) {
            console.error('[hotels API] error:', error)
            return NextResponse.json({ error: 'Failed to fetch hotels', details: error.message }, { status: 500 })
        }

        const total      = count ?? 0
        const totalPages = Math.max(Math.ceil(total / limit), 1)

        return NextResponse.json({ hotels: data || [], total, limit, offset, page, totalPages })
    } catch (error) {
        console.error('[hotels API] unexpected error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
