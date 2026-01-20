// import { createServerClient, type CookieOptions } from '@supabase/ssr'
// import { cookies } from 'next/headers'
// import { NextResponse } from 'next/server'

// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url)
//   const code = searchParams.get('code')
  
//   if (code) {
//     const cookieStore = await cookies()
//     // Create the response object first so we can attach cookies to it
//     const response = NextResponse.redirect(`${origin}/dashboard`)

//     const supabase = createServerClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//       {
//         cookies: {
//           get(name: string) { return cookieStore.get(name)?.value },
//           set(name: string, value: string, options: CookieOptions) {
//             response.cookies.set({ name, value, ...options })
//           },
//           remove(name: string, options: CookieOptions) {
//             response.cookies.set({ name, value: '', ...options })
//           },
//         },
//       }
//     )

//     const { error } = await supabase.auth.exchangeCodeForSession(code)

//     if (!error) {
//       return response
//     }
//   }

//   // Return to login if things go wrong
//   return NextResponse.redirect(`${origin}/login?error=auth_failed`)
// }



import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import postgres from 'postgres'

// Initialize SQL
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require', connect_timeout: 10 });

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const userType = searchParams.get('type') || 'user'
  
  console.log("1. Callback hit! Type:", userType); // DEBUG LOG

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

    if (error) {
      console.error("2. Supabase Auth Error:", error.message);
      return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }

    if (data?.user) {
      console.log("3. User authenticated:", data.user.email);

      try {
        // CRITICAL: Try the insert and wait for it
        const result = await sql`
          INSERT INTO profiles (id, email, full_name, user_type)
          VALUES (
            ${data.user.id}, 
            ${data.user.email}, 
            ${data.user.user_metadata.full_name || 'New User'}, 
            ${userType}
          )
          ON CONFLICT (id) DO NOTHING
          RETURNING *;
        `;
        
        console.log("4. DB Insert Success! Result:", result);
        return response;

      } catch (dbError: any) {
        // THIS WILL SHOW YOU IF YOUR DATABASE_URL IS WRONG OR CONNECTION IS REFUSED
        console.error('5. DATABASE INSERT FAILED:', dbError.message);
        console.error('Full Error Object:', dbError);
        return response; // Still redirect so user isn't stuck
      }
    }
  }

  console.log("6. No code found in URL");
  return NextResponse.redirect(`${origin}/login?error=no_code`)
}