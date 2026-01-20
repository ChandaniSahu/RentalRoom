'use client'

import RoomCard from '@/components/RoomCard'
import { ArrowLeft, Search, Filter, MapPin, DollarSign, Home, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

// --- MAIN PAGE COMPONENT ---
export default function SearchUI() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  
  const fetchRooms = async (filters = {}) => {
    setLoading(true)
    const params = new URLSearchParams(filters as any).toString()
    const res = await fetch(`/api/generalRooms?${params}`)
    const data = await res.json()
    setRooms(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { fetchRooms() }, [])

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    fetchRooms(Object.fromEntries(formData.entries()))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4 md:p-8">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={() => router.push('/')}
          className="group flex items-center gap-3 text-slate-700 hover:text-purple-700 transition-colors duration-300"
        >
          <div className="p-2.5 bg-white border border-gray-200 rounded-xl group-hover:border-purple-300 group-hover:bg-purple-50 transition-all">
            <ArrowLeft
              size={20}
              className="transform group-hover:-translate-x-1 transition-transform duration-300"
            />
          </div>
          <span className="font-medium">Back to Home</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-teal-100 px-6 py-3 rounded-full mb-4">
            <Search className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Advanced Search</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Find Your <span className="bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">Perfect</span> Space
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse thousands of verified rental properties tailored to your needs
          </p>
        </header>

        {/* Filter Bar */}
        <form 
          onSubmit={handleFilterSubmit} 
          className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end mb-12"
        >
          {/* Location */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <MapPin className="h-4 w-4 mr-2 text-purple-600" />
              Location
            </label>
            <input 
              name="location" 
              placeholder="e.g. Mumbai, Bangalore" 
              className="w-full p-3.5 bg-gray-50 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Max Rent */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <DollarSign className="h-4 w-4 mr-2 text-teal-600" />
              Max Budget (₹)
            </label>
            <input 
              name="maxPrice" 
              type="number" 
              placeholder="Enter your budget" 
              className="w-full p-3.5 bg-gray-50 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Home className="h-4 w-4 mr-2 text-purple-600" />
              Property Type
            </label>
            <select 
              name="propertyType" 
              className="w-full p-3.5 bg-gray-50 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">Any Type</option>
              {['1 BHK', '2 BHK', '1 Bed', '2 Bed', '3 Bed', 'Studio', 'Apartment'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Tenant Preference */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Users className="h-4 w-4 mr-2 text-teal-600" />
              Tenant Preference
            </label>
            <select 
              name="tenantPreference" 
              className="w-full p-3.5 bg-gray-50 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">Any Tenant</option>
              {['Bachelor', 'Family', 'Girls', 'Working', 'Students', 'Couples'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button 
            type="submit" 
            className="lg:col-span-4 w-full py-4 bg-gradient-to-r from-purple-600 to-teal-500 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-purple-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
          >
            <Search className="h-5 w-5" />
            Search Properties
          </button>

          
        </form>

        {/* Results Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Available Properties <span className="text-purple-600">({rooms.length})</span>
              </h2>
              <p className="text-gray-500 text-sm">Verified listings matching your criteria</p>
            </div>
            <div className="text-sm text-gray-500">
              Sorted by: <span className="text-purple-700 font-medium">Relevance</span>
            </div>
          </div>

          {/* Results Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-10 bg-gray-200 rounded"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : rooms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room: any) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-teal-100 rounded-2xl flex items-center justify-center">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">No Properties Found</h3>
                <p className="text-gray-500 mb-6">
                  We couldn't find any properties matching your search criteria. Try adjusting your filters.
                </p>
                <button
                  onClick={() => {
                    const form = document.querySelector('form')
                    form?.reset()
                    fetchRooms()
                  }}
                  className="px-6 py-3 border-2 border-purple-600 text-purple-700 font-medium rounded-xl hover:bg-purple-50 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}