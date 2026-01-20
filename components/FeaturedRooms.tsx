'use client'

import { useEffect, useState } from 'react'
import RoomCard from './RoomCard'
import { Room } from '@/types/room'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function FeaturedRooms() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFeaturedRooms()
  }, [])

  const fetchFeaturedRooms = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/generalRooms?limit=6')
      
      if (!response.ok) throw new Error('Failed to fetch')
      
      const data = await response.json()
      setRooms(data)
    } catch (err) {
      setError('Failed to load rooms')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-medium">{error}</p>
        <button
          onClick={fetchFeaturedRooms}
          className="mt-4 px-6 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all font-medium"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (rooms.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No featured rooms available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="my-14">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Featured Properties</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">Handpicked selection of premium rental spaces with verified amenities</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link
          href="/search" 
          className="inline-flex items-center gap-2 font-semibold uppercase tracking-wider text-gray-700 hover:text-purple-700 transition-all group border-2 border-purple-600 px-8 py-3.5 rounded-full hover:bg-purple-50"
        >
          Explore All Properties
          <span className="group-hover:translate-x-1.5 transition-transform duration-300">
            →
          </span>
        </Link>
      </div>
    </div>
  )
}