'use client'

import { useState } from 'react'
import { Search, Filter, DollarSign, Home, Users, MapPin, Sliders } from 'lucide-react'
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

  const propertyTypes = ['Any', '1 BHK', '2 BHK', '1 Bed', '2 Bed', '3 Bed', 'Studio', 'Apartment']
  const tenantPreferences = ['Any', 'Bachelor', 'Family', 'Girls', 'Working', 'Students']

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
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center mb-8">
        <div className="bg-gradient-to-br from-purple-600 to-teal-500 p-3 rounded-xl mr-4">
          <Filter className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Refine Your Search</h2>
          <p className="text-gray-500 text-sm">Find properties matching your preferences</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="space-y-8">
        {/* Location */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <label className="flex items-center text-sm font-semibold mb-4 text-gray-700">
            <MapPin className="h-5 w-5 mr-3 text-purple-600" />
            Location
          </label>
          <input
            type="text"
            placeholder="Search city, area, or landmark..."
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Price Range */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <label className="flex items-center text-sm font-semibold mb-4 text-gray-700">
              <DollarSign className="h-5 w-5 mr-3 text-teal-600" />
              Price Range (₹)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                />
                <p className="text-xs text-gray-400 mt-1">Minimum price</p>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                />
                <p className="text-xs text-gray-400 mt-1">Maximum price</p>
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <label className="flex items-center text-sm font-semibold mb-4 text-gray-700">
              <Home className="h-5 w-5 mr-3 text-purple-600" />
              Property Type
            </label>
            <select
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
              value={filters.propertyType}
              onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
            >
              {propertyTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tenant Preference */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <label className="flex items-center text-sm font-semibold mb-4 text-gray-700">
              <Users className="h-5 w-5 mr-3 text-teal-600" />
              Tenant Preference
            </label>
            <select
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
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
              className="w-full bg-gradient-to-r from-purple-600 to-teal-500 text-white py-5 rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Search className="h-6 w-6" />
              Find Properties
            </button>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex justify-center mt-4">
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-700 transition-colors"
            onClick={() => router.push('/search')}
          >
            <Sliders className="h-4 w-4" />
            Show Advanced Filters
          </button>
        </div>
      </form>
    </div>
  )
}