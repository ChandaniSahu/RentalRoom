import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import postgres from 'postgres'

// 1. Initialize DB client
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // 2. Get the type from the URL we set in the frontend
  const userType = searchParams.get('type') || 'user' 
  
  if (code) {
    const cookieStore = await cookies()
    const response = NextResponse.redirect(`${origin}/dashboard`)

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value },
          set(name: string, value: string, options: CookieOptions) {
            response.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            response.cookies.set({ name, value: '', ...options })
          },
        },
      }
    )

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data?.user) {
      try {
        // 3. Perform the INSERT
        // ON CONFLICT (id) DO NOTHING ensures this code only has an effect 
        // the very first time the user signs up.
        await sql`
          INSERT INTO users (id, email, full_name, user_type)
          VALUES (
            ${data.user.id}, 
            ${data.user.email}, 
            ${data.user.user_metadata.full_name || 'New User'}, 
            ${userType}
          )
          ON CONFLICT (id) DO NOTHING
        `;
        
        return response;
      } catch (dbError) {
        console.error('Database Sync Error:', dbError);
        // We still return response so the user isn't stuck on a white screen
        return response;
      }
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}