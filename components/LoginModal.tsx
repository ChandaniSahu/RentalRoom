'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { 
  Loader2, 
  LogIn, 
  X, 
  CheckCircle, 
  Home, 
  ShieldCheck, 
  Zap 
} from 'lucide-react'
import toast from 'react-hot-toast'

interface LoginModalProps {
  isOpen: boolean
  state:string 
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose , state }: LoginModalProps) {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
           queryParams: {
          access_type: 'online',
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

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Brand/Visual Accent (Hidden on mobile) */}
        <div className="hidden md:flex w-2/5 bg-blue-600 p-10 flex-col justify-between text-white">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Home className="h-6 w-6" />
              <span className="font-bold text-xl tracking-tight">RoomFinder</span>
            </div>
            <h2 className="text-3xl font-bold leading-tight mb-4">
              Find your next home with us.
            </h2>
            <p className="text-blue-100 text-sm">
              Join 10k+ users searching for verified properties daily.
            </p>
          </div>
          
          <div className="space-y-4">
             <div className="flex items-center gap-3 text-sm font-medium">
                <ShieldCheck className="h-5 w-5 text-blue-200" /> Verified Listings
             </div>
             <div className="flex items-center gap-3 text-sm font-medium">
                <Zap className="h-5 w-5 text-blue-200" /> Instant Alerts
             </div>
          </div>
        </div>

        {/* Right Side: Login Content */}
        <div className="flex-1 p-8 md:p-12 bg-white">
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-500">{state == 'signup'?'Please create account':'Please sign in to your account'}</p>
          </div>

          <div className="space-y-6">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-100 rounded-2xl hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-sm transition-all disabled:opacity-50 group"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              ) : (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-gray-700 font-bold">Continue with Google</span>
                </>
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Secure OAuth2 Login</span></div>
            </div>

            <div className="space-y-3">
              {[
                'Sync your favorites across devices',
                'Message property owners directly'
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-gray-400 px-4">
            By continuing, you agree to RoomFinder's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}