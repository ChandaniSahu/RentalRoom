'use client'
import Link from 'next/link'
import { ArrowRight, Shield, Star, Clock, Home, Key, Building } from 'lucide-react'
import LoginModal from './LoginModal'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [user, setUser] = useState('')
  const router = useRouter()
  
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      }
    }
    checkUserLoggedIn()
  }, [])

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-500 to-teal-500"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${15 + Math.random() * 20}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover Your <span className="bg-gradient-to-r from-purple-400 to-teal-300 bg-clip-text text-transparent">Dream</span> Rental
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-10 text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Thousands of verified rooms, flats, and apartments. Experience safe, 
            secure, and seamless renting.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { value: "10K+", label: "Active Listings", icon: <Home className="h-6 w-6" /> },
              { value: "98%", label: "Verified Owners", icon: <Shield className="h-6 w-6" /> },
              { value: "24/7", label: "Support", icon: <Clock className="h-6 w-6" /> },
              { value: "50+", label: "Cities", icon: <Building className="h-6 w-6" /> }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all">
                <div className="flex justify-center mb-3 text-purple-400">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-teal-500 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-purple-500/30 transition-all transform hover:-translate-y-1 text-lg group"
            >
              <Key className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              Find a Room
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <div
              onClick={() => { 
                if (user) { 
                  router.push('/dashboard') 
                } else { 
                  setIsLoginModalOpen(true) 
                }
              }}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 hover:border-white/40 transition-all cursor-pointer text-lg group"
            >
              <Star className="h-6 w-6 group-hover:scale-110 transition-transform" />
              List Your Property
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { text: "Verified Owners Only", icon: <Shield className="h-5 w-5" />, color: "text-green-400" },
              { text: "Premium Listings", icon: <Star className="h-5 w-5" />, color: "text-yellow-400" },
              { text: "Instant Search", icon: <Clock className="h-5 w-5" />, color: "text-teal-400" }
            ].map((feature, index) => (
              <div key={index} className="flex items-center justify-center gap-3 bg-white/5 p-4 rounded-xl">
                <div className={`${feature.color}`}>
                  {feature.icon}
                </div>
                <span className="text-slate-300">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#FFFFFF"
            fillOpacity="1"
            d="M0,96L80,85.3C160,75,320,53,480,48C640,43,800,53,960,58.7C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -20px) rotate(5deg); }
          50% { transform: translate(-15px, 15px) rotate(-5deg); }
          75% { transform: translate(10px, -10px) rotate(3deg); }
        }
      `}</style>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} state='login' />
    </section>
  )
}