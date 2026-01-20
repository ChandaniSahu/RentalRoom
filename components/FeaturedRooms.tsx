'use client'

import { useEffect, useState } from 'react'
import RoomCard from './RoomCard'
import { Room } from '@/types/room'
import { supabase } from '@/lib/supabase'
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
    // Request only 6 rooms for the "Featured" section
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
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchFeaturedRooms}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (rooms.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No rooms available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="my-10">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {rooms.map((room) => (
      <RoomCard key={room.id} room={room} />
    ))}
  </div>

  <div className="mt-12 text-center ">
    <Link
      href="/search" 
      className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-600 hover:text-black transition-all group border-2 border-black p-4 rounded-[40px]"
    >
      View More
      <span className="group-hover:translate-x-1 transition-transform duration-200">
        →
      </span>
    </Link>
  </div>
</div>
  )
}