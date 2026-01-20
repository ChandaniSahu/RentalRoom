'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Loader2, LogIn, X, CheckCircle, Key, Shield, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

interface LoginModalProps {
  isOpen: boolean
  state: string 
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose, state }: LoginModalProps) {
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-lg animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Brand/Visual Accent */}
        <div className="hidden md:flex w-2/5 bg-gradient-to-b from-purple-900 to-slate-900 p-10 flex-col justify-between text-white">
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <div className="bg-gradient-to-br from-purple-500 to-teal-400 p-2 rounded-xl">
                <Key className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">Rental Room</span>
            </div>
            <h2 className="text-3xl font-bold leading-tight mb-4">
              Your key to perfect rentals
            </h2>
            <p className="text-purple-200/70 text-sm leading-relaxed">
              Join thousands finding their perfect space with verified listings.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm font-medium bg-white/5 p-3 rounded-xl">
              <Shield className="h-5 w-5 text-teal-300" /> 
              <span>Verified Properties</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium bg-white/5 p-3 rounded-xl">
              <Sparkles className="h-5 w-5 text-purple-300" /> 
              <span>Instant Access</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Content */}
        <div className="flex-1 p-10 bg-gradient-to-br from-white to-slate-50">
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 mb-3 bg-gradient-to-r from-purple-100 to-teal-100 px-4 py-2 rounded-full">
              <Key className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Secure Login</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {state === 'signup' ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600">
              {state === 'signup' 
                ? 'Join Rental Room to list or find properties'
                : 'Sign in to manage your properties and favorites'
              }
            </p>
          </div>

          <div className="space-y-7">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-4 px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl hover:border-purple-400 hover:shadow-lg transition-all disabled:opacity-50 group hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
              ) : (
                <>
                  <svg className="h-6 w-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-gray-800 font-bold text-lg">
                    Continue with Google
                  </span>
                </>
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gradient-to-br from-white to-slate-50 px-4 text-gray-500">
                  Quick & Secure Access
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {[
                'Access all your saved properties',
                'Message property owners directly',
                'Get instant booking updates'
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-gray-500 px-4">
            By continuing, you agree to Rental Room's{" "}
            <span className="text-purple-600 font-medium cursor-pointer">Terms of Service</span>{" "}
            and{" "}
            <span className="text-purple-600 font-medium cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  )
}