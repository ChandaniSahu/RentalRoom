// 'use client'

// import { createContext, useContext, useEffect, useState, useCallback } from 'react'
// import { User } from '@supabase/supabase-js'
// import { createClient } from '@/utils/supabase/client' // Ensure this points to your browser client factory
// import { useRouter } from 'next/navigation'

// type AuthContextType = {
//   user: User | null
//   profile: any | null
//   loading: boolean
//   signOut: () => Promise<void>
//   updateProfile: (data: any) => Promise<void>
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   profile: null,
//   loading: true,
//   signOut: async () => {},
//   updateProfile: async () => {}
// })

// export const useAuth = () => useContext(AuthContext)

// export default function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [profile, setProfile] = useState<any | null>(null)
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()
//   const supabase = createClient()

//   // Reusable function to fetch profile data
//   const fetchProfile = useCallback(async (userId: string) => {
//     const { data, error } = await supabase
//       .from('profiles')
//       .select('*')
//       .eq('id', userId)
//       .single()

//     if (!error) {
//       setProfile(data)
//     }
//   }, [supabase])

//   useEffect(() => {
//     // 1. Initial Session Check
//     const initializeAuth = async () => {
//       const { data: { session } } = await supabase.auth.getSession()
      
//       if (session?.user) {
//         setUser(session.user)
//         await fetchProfile(session.user.id)
//       }
//       setLoading(false)
//     }

//     initializeAuth()

//     // 2. Listen for Auth Changes (Sign In, Sign Out, Token Refresh)
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
//       const currentUser = session?.user ?? null
//       setUser(currentUser)

//       if (currentUser) {
//         await fetchProfile(currentUser.id)
//       } else {
//         setProfile(null)
//       }

//       // Handle programmatic navigation on sign out
//       if (event === 'SIGNED_OUT') {
//         router.push('/')
//         router.refresh() // Clears server-side cache
//       }

//       setLoading(false)
//     })

//     return () => {
//       subscription.unsubscribe()
//     }
//   }, [supabase, fetchProfile, router])

//   const signOut = async () => {
//     try {
//       await supabase.auth.signOut()
//       // Note: onAuthStateChange will handle the state cleanup and redirect
//     } catch (error) {
//       console.error('Error signing out:', error)
//     }
//   }

//   const updateProfile = async (data: any) => {
//     if (!user) return
    
//     try {
//       const { error } = await supabase
//         .from('profiles')
//         .update(data)
//         .eq('id', user.id)

//       if (error) throw error
      
//       // Refresh local profile state
//       await fetchProfile(user.id)
//     } catch (error) {
//       console.error('Error updating profile:', error)
//       throw error
//     }
//   }

//   return (
//     <AuthContext.Provider value={{ user, profile, loading, signOut, updateProfile }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }