'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { 
  Home,
  Loader2,
  Building,
  Shield,
  Star,
  Users,
  MapPin,
  CheckCircle,
  LogIn
} from 'lucide-react'
import toast from 'react-hot-toast'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const[checkingUser,setCheckingUser] = useState(true)
  // Supabase Google OAuth login

  useEffect(()=>{
   
    const verifyLoggedIn = async () =>{
      setCheckingUser(true)
        const { data: { user }, error } = await supabase.auth.getUser()
        if(user){
           router.push('/dashboard')
        }else{
          setCheckingUser(false)
        }

    }

    verifyLoggedIn()

  },[])

const handleGoogleLogin = async () => {
  const supabase = createClient() // Initialize here
  setLoading(true)
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    if (error) throw error
  } catch (error: any) {
    toast.error(error.message)
    setLoading(false)
  }
}

if(checkingUser)return
  <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-20 scale-150"></div>
        
        {/* Main Icon Container */}
        <div className="relative bg-white p-6 rounded-3xl shadow-xl border border-blue-50">
          <Home className="h-12 w-12 text-blue-600 animate-pulse" />
        </div>
      </div>
      
      {/* Loading Text */}
      <div className="mt-8 text-center">
        <h3 className="text-xl font-bold text-gray-900">RoomFinder</h3>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
          <p className="text-gray-500 font-medium text-sm tracking-wide uppercase">
            Securing your session...
          </p>
        </div>
      </div>
    </div>
 
 return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-blue-600 p-2 rounded-xl group-hover:scale-105 transition-transform">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-blue-600">
                RoomFinder
              </span>
            </Link>
            <div className="text-sm text-gray-600">
              New user?{' '}
              <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info & Features */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Welcome to <span className="text-blue-600">RoomFinder</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Find your perfect rental space or list your property. 
                Join thousands of satisfied users today.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Shield className="h-6 w-6" />,
                  title: 'Verified Listings',
                  desc: 'All properties are thoroughly verified'
                },
                {
                  icon: <Star className="h-6 w-6" />,
                  title: 'Premium Quality',
                  desc: 'High-quality rooms with modern amenities'
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: 'Safe Community',
                  desc: 'Connect with verified owners and tenants'
                },
                {
                  icon: <MapPin className="h-6 w-6" />,
                  title: 'Smart Search',
                  desc: 'Find properties in your preferred location'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <div className="text-blue-600">{feature.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-sm text-blue-100">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">25K+</div>
                  <div className="text-sm text-blue-100">Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm text-blue-100">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                  <LogIn className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Sign In to RoomFinder
                </h2>
                <p className="text-gray-600">
                  Login with your Google account to get started
                </p>
              </div>

              {/* Google Sign In Button */}
              <div className="space-y-6">
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <svg className="h-6 w-6 mr-3" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-gray-700 font-medium">
                        Continue with Google
                      </span>
                    </>
                  )}
                </button>

                {/* Benefits */}
                <div className="space-y-4">
                  {[
                    'Access your dashboard',
                    'Save favorite rooms',
                    'Connect directly with owners/tenants',
                    'Get instant notifications',
                    'Manage your listings'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Sign Up Link */}
                <div className="text-center pt-6">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link 
                      href="/signup" 
                      className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}