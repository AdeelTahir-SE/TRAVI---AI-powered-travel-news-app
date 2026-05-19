import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/admin/dashboard'

    if (code) {
        // Exchange the code for a session using the service-role client so
        // we can also inspect/upsert admin_users without RLS friction here.
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    // Auth callback failed — redirect to login with error hint
    return NextResponse.redirect(`${origin}/admin/login?error=auth_callback_failed`)
}
