'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function AddRoomPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  // Stores the Cloudinary URLs after instant upload
  const [imageUrls, setImageUrls] = useState<string[]>([
  ])
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    rent_price: '',
    property_type: '',
    tenant_preference: '',
    contact_number: '',
    amenities: [] as string[],
    is_available: true,
  })

  // Console log credentials for debugging
  useEffect(() => {
    console.log('--- Cloudinary Config ---');
    console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    console.log('Upload Preset:', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    console.log('Folder:', process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME);
    console.log('-------------------------');
  }, []);

  const propertyTypes = ['1 BHK', '2 BHK', '1 Bed', '2 Bed', '3 Bed']
  const tenantPreferences = ['Bachelor', 'Family', 'Girls', 'Working', 'Any']
  const amenitiesList = [
    'WiFi', 'AC', 'Parking', 'Kitchen', 'Laundry', 
    'Security', 'Furnished', 'Gym', 'Pool', 'Lift',
    'Power Backup', 'Water Supply', 'Gas Pipeline', 'TV', 'Refrigerator'
  ]

  // Cloudinary Upload Logic
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)
    if (process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME) {
        data.append('folder', process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME)
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: data }
    )

    if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`)
    const result = await response.json()
    return result.secure_url
  }

  // Handle image selection and IMMEDIATE upload
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    if (imageUrls.length + files.length > 10) {
      toast.error('Maximum 10 images allowed')
      return
    }

    setIsUploading(true)
    const toastId = toast.loading('Uploading to Cloudinary...')

    try {
      const uploadPromises = files.map(file => uploadToCloudinary(file))
      const newlyUploadedUrls = await Promise.all(uploadPromises)
      
      setImageUrls(prev => [...prev, ...newlyUploadedUrls])
      toast.success('Images uploaded successfully', { id: toastId })
    } catch (error) {
      console.error('Cloudinary upload error:', error)
      toast.error('Failed to upload images. Check console for details.', { id: toastId })
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = (indexToRemove: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== indexToRemove))
  }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (isUploading) return toast.error('Please wait for images to finish uploading')
    
//     setLoading(true)

//     try {
//       const { data: { user }, error: userError } = await supabase.auth.getUser()
//       if (userError || !user) {
//         toast.error('Please login to add room')
//         router.push('/login')
//         return
//       }

//       const { error: insertError } = await supabase
//         .from('rooms')
//         .insert({
//           owner_id: user.id,
//           title: formData.title,
//           description: formData.description,
//           location: formData.location,
//           rent_price: parseFloat(formData.rent_price),
//           property_type: formData.property_type,
//           tenant_preference: formData.tenant_preference,
//           contact_number: formData.contact_number,
//           amenities: formData.amenities,
//           images: imageUrls, // Now using the state array of URLs
//           is_available: formData.is_available,
//           created_at: new Date().toISOString(),
//           updated_at: new Date().toISOString()
//         })

//       if (insertError) throw insertError

//       toast.success('Room added successfully!')
//       router.push('/dashboard')
      
//     } catch (error: any) {
//       console.error('Database error:', error)
//       toast.error(error.message || 'Failed to add room')
//     } finally {
//       setLoading(false)
//     }
//   }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (isUploading) return toast.error('Please wait for images to finish uploading')
  
  setLoading(true)

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    // Call your internal API instead of Supabase directly
    const response = await fetch('/api/adminRooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        owner_id: user.id,
        title: formData.title,
        description: formData.description,
        location: formData.location,
        rent_price: parseFloat(formData.rent_price),
        property_type: formData.property_type,
        tenant_preference: formData.tenant_preference,
        contact_number: formData.contact_number,
        amenities: formData.amenities,
        images: imageUrls,
        is_available: formData.is_available,
        created_at: new Date().toISOString(),
      }),
    })

    const result = await response.json()

    if (!response.ok) throw new Error(result.error)

    toast.success('Room added successfully!')
    router.push('/dashboard')
    
  } catch (error: any) {
    console.error('Server error:', error)
    toast.error(error.message || 'Failed to add room')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold">Add New Room</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          
          {/* Room Information Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Room Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Title *</label>
                <input
                  type="text" required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Spacious 2BHK near Metro Station"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the room, neighborhood, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Location *</label>
                  <input
                    type="text" required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full address"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Rent Price (₹) *</label>
                  <input
                    type="number" required min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    value={formData.rent_price}
                    onChange={(e) => setFormData({...formData, rent_price: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Property Type *</label>
                  <select
                    required className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white"
                    value={formData.property_type}
                    onChange={(e) => setFormData({...formData, property_type: e.target.value})}
                  >
                    <option value="">Select type</option>
                    {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Tenant Preference *</label>
                  <select
                    required className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white"
                    value={formData.tenant_preference}
                    onChange={(e) => setFormData({...formData, tenant_preference: e.target.value})}
                  >
                    <option value="">Select preference</option>
                    {tenantPreferences.map(pref => <option key={pref} value={pref}>{pref}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Contact Number *</label>
                  <input
                    type="tel" required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    value={formData.contact_number}
                    onChange={(e) => setFormData({...formData, contact_number: e.target.value})}
                  />
                </div>
                <div className="flex items-center space-x-4 pt-8">
                   <label className="flex items-center cursor-pointer">
                      <input type="radio" checked={formData.is_available} onChange={() => setFormData({...formData, is_available: true})} className="h-4 w-4 text-blue-600" />
                      <span className="ml-2 text-sm">Available</span>
                   </label>
                   <label className="flex items-center cursor-pointer">
                      <input type="radio" checked={!formData.is_available} onChange={() => setFormData({...formData, is_available: false})} className="h-4 w-4 text-blue-600" />
                      <span className="ml-2 text-sm">Rented</span>
                   </label>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {amenitiesList.map(amenity => (
                <div key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`amenity-${amenity}`}
                    checked={formData.amenities.includes(amenity)}
                    onChange={(e) => {
                      const updated = e.target.checked 
                        ? [...formData.amenities, amenity]
                        : formData.amenities.filter(a => a !== amenity);
                      setFormData({...formData, amenities: updated});
                    }}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`amenity-${amenity}`} className="ml-3 text-gray-700 cursor-pointer">{amenity}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Instant Image Upload Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Room Images</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors relative">
                <input
                  type="file" multiple accept="image/*"
                  onChange={handleImageSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isUploading}
                />
                <div className="flex flex-col items-center">
                  {isUploading ? (
                    <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
                  ) : (
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  )}
                  <p className="text-gray-600 mb-2 font-medium">
                    {isUploading ? 'Uploading to Cloudinary...' : 'Click or Drag & Drop to Upload'}
                  </p>
                  <p className="text-gray-500 text-sm">Maximum 10 images</p>
                </div>
            </div>
            
            {imageUrls.length > 0 && (
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {imageUrls.map((url, index) => (
                  <div key={url} className="relative group aspect-square rounded-xl overflow-hidden border">
                    <img src={url} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="px-8 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || isUploading}
              className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 transition-all flex items-center"
            >
              {loading ? (
                <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Saving...</>
              ) : 'Publish Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}