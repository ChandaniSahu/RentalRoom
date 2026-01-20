'use client'

import RoomCard from '@/components/RoomCard'
import { ArrowLeft } from 'lucide-react'
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
       <button
      onClick={() => router.push('/')}
      className="group flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
    >
      <ArrowLeft
        size={20} 
        className="transform group-hover:-translate-x-1 transition-transform duration-200" 
      />
      <span className="text-sm font-medium">Back to Home</span>
    </button>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find your next home</h1>
          <p className="text-gray-500">Search through verified property listings</p>
        </header>

        {/* Filter Bar */}
        <form onSubmit={handleFilterSubmit} className="bg-white p-4 rounded-2xl shadow-sm border grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end mb-8">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Location</label>
            <input name="location" placeholder="e.g. Mumbai" className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl outline-none focus:ring-2 ring-blue-500 transition" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Max Rent</label>
            <input name="maxPrice" type="number" placeholder="Budget" className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl outline-none focus:ring-2 ring-blue-500" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Type</label>
            <select name="propertyType" className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl outline-none">
              <option value="">Any Type</option>
              {['1 BHK', '2 BHK', '1 Bed', '2 Bed', '3 Bed'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Tenant</label>
            <select name="tenantPreference" className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl outline-none">
              <option value="">Any Tenant</option>
              {['Bachelor', 'Family', 'Girls', 'Working'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <button type="submit" className="lg:col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-200">
            Search Properties
          </button>
        </form>

        {/* Results Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading listings...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.length > 0 ? (
              rooms.map((room: any) => <RoomCard key={room.id} room={room} />)
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed">
                <p className="text-gray-500">No properties found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}