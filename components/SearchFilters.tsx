'use client'

import { useState } from 'react'
import { Search, Filter, DollarSign, Home, Users, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SearchFilters() {
  const router = useRouter()
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    tenantPreference: ''
  })

  const propertyTypes = ['Any', '1 BHK', '2 BHK', '1 Bed', '2 Bed', '3 Bed']
  const tenantPreferences = ['Any', 'Bachelor', 'Family', 'Girls', 'Working']

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    
    if (filters.location) params.append('location', filters.location)
    if (filters.minPrice) params.append('minPrice', filters.minPrice)
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
    if (filters.propertyType && filters.propertyType !== 'Any') params.append('propertyType', filters.propertyType)
    if (filters.tenantPreference && filters.tenantPreference !== 'Any') params.append('tenantPreference', filters.tenantPreference)
    
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {/* <button
      onClick={() => router.push('/')}
      className="group flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
    >
      <ArrowLeft
        size={20} 
        className="transform group-hover:-translate-x-1 transition-transform duration-200" 
      />
      <span className="text-sm font-medium">Back to Home</span>
    </button> */}

      <div className="flex items-center mb-6">
        <Filter className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold">Find Your Perfect Room</h2>
      </div>

      <form onSubmit={handleSearch} className="space-y-6">
        {/* Location */}
        <div>
          <label className="flex items-center text-sm font-medium mb-2">
            <Search className="h-4 w-4 mr-2" />
            Location
          </label>
          <input
            type="text"
            placeholder="Enter city, area, or landmark"
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price Range */}
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <DollarSign className="h-4 w-4 mr-2" />
              Price Range
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Min Price"
                className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              />
              <input
                type="number"
                placeholder="Max Price"
                className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              />
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <Home className="h-4 w-4 mr-2" />
              Property Type
            </label>
            <select
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.propertyType}
              onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
            >
              {propertyTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tenant Preference */}
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <Users className="h-4 w-4 mr-2" />
              Tenant Preference
            </label>
            <select
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.tenantPreference}
              onChange={(e) => setFilters({...filters, tenantPreference: e.target.value})}
            >
              {tenantPreferences.map((pref) => (
                <option key={pref} value={pref}>{pref}</option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center justify-center"
            >
              <Search className="h-5 w-5 mr-2" />
              Search Rooms
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}