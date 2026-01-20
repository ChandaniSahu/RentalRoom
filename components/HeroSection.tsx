'use client'
import Link from 'next/link'
import { ArrowRight, Shield, Star, Clock } from 'lucide-react'
import LoginModal from './LoginModal'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const[isLoginModalOpen,setIsLoginModalOpen] = useState(false)
  const[user,setUser] = useState('')
  const router = useRouter()
  useEffect(()=>{
     const checkUserLoggedIn = async () =>{
         const { data: { user } } = await supabase.auth.getUser();
         if(user){
          setUser(user)
         }
     }

     checkUserLoggedIn()
  },[])

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.2) 2%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your <span className="text-yellow-400">Perfect</span> Rental Room
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Browse thousands of verified rooms, flats, and apartments. 
            Safe, secure, and hassle-free renting experience.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-blue-200">Listings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">98%</div>
              <div className="text-blue-200">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-blue-200">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-blue-200">Cities</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/search"
              className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-blue-900 font-bold rounded-xl hover:bg-yellow-400 transition-colors text-lg"
            >
              Find a Room
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <div
              // href="/dashboard"
              onClick={()=>{if(user){router.push('/dashboard')}else{setIsLoginModalOpen(true)}}}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/30 transition-colors text-lg"
            >
              List Your Property
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center space-x-3">
              <Shield className="h-6 w-6 text-green-400" />
              <span className="text-lg">Verified Owners</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Star className="h-6 w-6 text-yellow-400" />
              <span className="text-lg">Premium Listings</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Clock className="h-6 w-6 text-blue-300" />
              <span className="text-lg">Quick Search</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#FFFFFF"
            fillOpacity="1"
            d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={()=>{setIsLoginModalOpen(false)}} state='login' />
    </section>
  )
}