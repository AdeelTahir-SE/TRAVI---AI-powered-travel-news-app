import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const query = searchParams.get('q') || ''
        const limit = parseInt(searchParams.get('limit') || '10')
        const offset = parseInt(searchParams.get('offset') || '0')

        let supabaseQuery = supabase
            .from('hotel')
            .select('*')
            .order('created_at', { ascending: false })

        // If there's a search query, filter by title or location
        if (query) {
            supabaseQuery = supabaseQuery.or(`title.ilike.%${query}%,location.ilike.%${query}%,tagline.ilike.%${query}%`)
        }

        // Apply pagination
        supabaseQuery = supabaseQuery.range(offset, offset + limit - 1)

        const { data, error, count } = await supabaseQuery

        if (error) {
            console.error('Error fetching hotels:', error)
            return NextResponse.json(
                { error: 'Failed to fetch hotels', details: error.message },
                { status: 500 }
            )
        }

        return NextResponse.json({
            hotels: data || [],
            total: count || 0,
            limit,
            offset
        })
    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
