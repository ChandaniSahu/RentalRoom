'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import LoginModal from './LoginModal'
import { Building2, UserPlus, LogIn, User, LogOut, Menu, X, Search } from 'lucide-react'

export default function Header() {
  const [user, setUser] = useState('')
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState<'login' | 'signup'>('login')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      console.log('user', user)
      setUser(user)
      setLoading(false)
    }

    auth()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser('')
    router.push('/')
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-purple-600 to-teal-500 p-2.5 rounded-xl group-hover:shadow-lg transition-all duration-300">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-teal-600 bg-clip-text text-transparent">
                  Rental Room
                </span>
                <span className="text-xs text-gray-500 -mt-1">Find your perfect space</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/search" 
                className="flex items-center space-x-2 text-gray-700 hover:text-purple-700 transition-colors group"
              >
                <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-purple-100 transition-colors">
                  <Search className="h-4 w-4" />
                </div>
                <span className="font-medium">Search Rooms</span>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {loading ? (
                <div className="flex space-x-4">
                  <div className="animate-pulse h-10 w-28 bg-gray-200 rounded-lg"></div>
                  <div className="animate-pulse h-10 w-28 bg-gray-200 rounded-lg"></div>
                </div>
              ) : user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-xl">
                    <img 
                      src={user?.user_metadata?.picture} 
                      referrerPolicy="no-referrer" 
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                      alt="Profile"
                    />
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">
                        {user?.user_metadata?.full_name?.split('@')[0]}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2.5 rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <>
                  <div
                    onClick={() => { setState('signup'); setIsLoginModalOpen(true) }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-teal-500 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all cursor-pointer font-medium"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </div>
                  <div
                    onClick={() => { setState('login'); setIsLoginModalOpen(true) }}
                    className="flex items-center space-x-2 border-2 border-purple-600 text-purple-700 px-5 py-2.5 rounded-xl hover:bg-purple-50 transition-all cursor-pointer font-medium"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-100 bg-white rounded-xl shadow-lg">
              <div className="space-y-3">
                <Link
                  href="/search"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Search className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Search Rooms</span>
                </Link>

                {user && (
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                    <img 
                      src={user?.user_metadata?.picture} 
                      referrerPolicy="no-referrer" 
                      className="w-10 h-10 rounded-full"
                      alt="Profile"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {user?.user_metadata?.full_name?.split('@')[0]}
                      </p>
                      <p className="text-sm text-gray-500">Logged in</p>
                    </div>
                  </div>
                )}

                {!user ? (
                  <>
                    <div
                      onClick={() => { 
                        setState('signup'); 
                        setIsLoginModalOpen(true); 
                        setMobileMenuOpen(false) 
                      }}
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-teal-500 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all cursor-pointer font-medium"
                    >
                      <UserPlus className="h-5 w-5" />
                      <span>Sign Up</span>
                    </div>
                    <div
                      onClick={() => { 
                        setState('login'); 
                        setIsLoginModalOpen(true); 
                        setMobileMenuOpen(false) 
                      }}
                      className="flex items-center justify-center space-x-2 border-2 border-purple-600 text-purple-700 px-4 py-3 rounded-xl hover:bg-purple-50 transition-all cursor-pointer font-medium"
                    >
                      <LogIn className="h-5 w-5" />
                      <span>Login</span>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Render LoginModal separately at root level */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} state={state} />
    </>
  )
}