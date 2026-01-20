import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // This client is specifically designed for Next.js Browser usage
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}