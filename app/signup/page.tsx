'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { 
  Home,
  Loader2,
  Building,
  CheckCircle,
  MapPin,
  DollarSign,
  Users,
  Shield,
  UserPlus
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState<'owner' | 'user'>('user')
  const[checkingUser,setCheckingUser] = useState<boolean>(true)
 

  // Supabase Google OAuth signup
  // const handleGoogleSignup = async () => {
  //   setLoading(true)
  //   try {
  //     // Store user type in localStorage to use after OAuth redirect
  //     localStorage.setItem('signup_user_type', userType)
      
  //     const { error } = await supabase.auth.signInWithOAuth({
  //       provider: 'google',
  //       options: {
  //         redirectTo: `${window.location.origin}/auth/callback?type=${userType}`,
  //          queryParams: {
  //         access_type: 'offline',
  //         prompt: 'consent',
  //       },
  //       },
  //     })


  //     if (error) throw error
  //     // The user will be redirected to Google and then to /auth/callback
      
  //   } catch (error: any) {
  //     console.error('Google signup error:', error)
  //     toast.error(error.message || 'Failed to sign up with Google')
  //     setLoading(false)
  //   }
  // }

  const handleGoogleSignup = async () => {
  setLoading(true)
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Correctly passing the type here
        redirectTo: `${window.location.origin}/auth/callback?type=${userType}`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) throw error
  } catch (error: any) {
    console.error('Google signup error:', error)
    toast.error(error.message || 'Failed to sign up with Google')
    setLoading(false)
  }
}

  // Define benefits arrays
  const userBenefits = [
    { icon: MapPin, text: 'Find rooms in preferred locations' },
    { icon: DollarSign, text: 'Compare prices across properties' },
    { icon: Shield, text: 'Verified and safe properties' },
    { icon: Users, text: 'Connect directly with owners' },
  ]

  const ownerBenefits = [
    { icon: Building, text: 'List unlimited properties for free' },
    { icon: Users, text: 'Reach thousands of potential tenants' },
    { icon: DollarSign, text: 'Set your own rental prices' },
    { icon: Shield, text: 'Verified tenant profiles' },
  ]

  // Get current benefits based on user type
  const currentBenefits = userType === 'user' ? userBenefits : ownerBenefits
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
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Join <span className="text-blue-600">RoomFinder</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sign up to find your perfect rental space or list your property
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Type Selection */}
            <div className="lg:col-span-2 space-y-8">
              {/* User Type Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => setUserType('user')}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    userType === 'user'
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-3 rounded-xl mb-4 ${
                      userType === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Users className={`h-8 w-8 ${
                        userType === 'user' ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Looking for a Room
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Find rental rooms, apartments, and flats
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setUserType('owner')}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    userType === 'owner'
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-3 rounded-xl mb-4 ${
                      userType === 'owner' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Building className={`h-8 w-8 ${
                        userType === 'owner' ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Property Owner
                    </h3>
                    <p className="text-gray-600 text-sm">
                      List and manage your rental properties
                    </p>
                  </div>
                </button>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Benefits for {userType === 'user' ? 'Room Seekers' : 'Property Owners'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentBenefits.map((benefit, index) => {
                    const IconComponent = benefit.icon
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{benefit.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Signup Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                  <UserPlus className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Create Your Account
                </h2>
                <p className="text-gray-600">
                  Sign up as a {userType === 'user' ? 'room seeker' : 'property owner'}
                </p>
              </div>

              {/* Google Sign Up Button */}
              <button
                onClick={handleGoogleSignup}
                disabled={loading}
                className="w-full flex items-center justify-center px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
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
                      Sign up with Google
                    </span>
                  </>
                )}
              </button>

              {/* Terms */}
              <div className="text-center text-sm text-gray-500">
                <p>
                  By signing up, you agree to our{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                    Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Already registered?
                  </span>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-medium"
                >
                  Sign in to existing account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}