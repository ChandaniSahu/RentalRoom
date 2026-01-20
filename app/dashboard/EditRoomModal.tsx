import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';

export default function EditRoomModal({ room, onClose, onSuccess }: { room: any, onClose: () => void, onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: room.title,
    rent_price: room.rent_price,
    location: room.location,
    description: room.description,
    property_type: room.property_type,
    tenant_preference: room.tenant_preference
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();

    const res = await fetch('/api/adminRooms', {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}` 
      },
      body: JSON.stringify({ id: room.id, ...formData })
    });

    if (res.ok) {
      toast.success("Listing updated successfully");
      onSuccess();
      onClose();
    } else {
      toast.error("Update failed");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[2.5rem] w-full max-w-xl p-8 shadow-2xl relative overflow-hidden">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X size={24} className="text-gray-500" />
        </button>
        
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-teal-100 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-medium text-purple-700">Edit Property</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Update Property Details</h2>
          <p className="text-gray-500 text-sm">Make changes to your rental listing</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Property Title</label>
            <input 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
              placeholder="e.g., Spacious 2BHK Apartment" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Monthly Rent (₹)</label>
              <input 
                type="number"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
                placeholder="e.g., 15000" 
                value={formData.rent_price} 
                onChange={e => setFormData({...formData, rent_price: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Location</label>
              <input 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
                placeholder="e.g., Bandra, Mumbai" 
                value={formData.location} 
                onChange={e => setFormData({...formData, location: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <textarea 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-32 resize-none" 
              placeholder="Describe your property's features, amenities, and neighborhood..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-teal-500 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Property Listing'
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Changes will be reflected immediately after update
        </p>
      </div>
    </div>
  );
}