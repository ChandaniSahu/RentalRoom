'use client'

import Link from 'next/link'
// import { useAuth } from './AuthProvider'
import { Home, Search, UserPlus, LogIn, User, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import LoginModal from './LoginModal'

export default function Header() {
  // const { user, loading, signOut } = useAuth()
  const[user,setUser] = useState('')
  const[isLoginModalOpen , setIsLoginModalOpen] = useState(false)
  const[loading,setLoading] = useState(true)
  const[state,setState] = useState<'login' | 'signup'>('login')
  const signOut = ()=>{console.log('')}
  const router = useRouter()

  useEffect(()=>{
 
    const auth = async () =>{

      const { data: { user }, error } = await supabase.auth.getUser()
      console.log('user',user)
      setUser(user)
      setLoading(false)
    }

    auth()
  },[])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser('')
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Home className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-blue-600">RoomFinder</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* <Link href="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <Search className="h-4 w-4" />
              <span>Find Rooms</span>
            </Link> */}
            
            {/* {user && (
              <Link href="/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <User className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            )} */}
            
            {/* <Link href="/search" className="text-gray-700 hover:text-blue-600">
              Advanced Search
            </Link> */}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="animate-pulse h-10 w-24 bg-gray-200 rounded"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 hidden md:inline">
                  Hi, {user?.user_metadata?.full_name?.split('@')[0]}
                </span>

                <img src={user?.user_metadata?.picture} referrerPolicy="no-referrer" className='w-10 rounded-full'/>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <div
                  // href="/signup"
                  className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={()=>{setState('signup');setIsLoginModalOpen(true)}}

                >
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden md:inline">Sign Up</span>
                </div>
                <div
                  // href="/login"
                  className="flex items-center space-x-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
                  onClick={()=>{setState('login');setIsLoginModalOpen(true)}}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={()=>{setIsLoginModalOpen(false)}} state={state}/>
    </header>
  )
}