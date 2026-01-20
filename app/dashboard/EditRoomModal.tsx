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
        
        <h2 className="text-2xl font-black mb-6">Edit Property Details</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input 
            className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Title" 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="number"
              className="w-full p-4 bg-gray-50 rounded-2xl border-none" 
              placeholder="Rent" 
              value={formData.rent_price} 
              onChange={e => setFormData({...formData, rent_price: e.target.value})}
            />
            <input 
              className="w-full p-4 bg-gray-50 rounded-2xl border-none" 
              placeholder="Location" 
              value={formData.location} 
              onChange={e => setFormData({...formData, location: e.target.value})}
            />
          </div>
          <textarea 
            className="w-full p-4 bg-gray-50 rounded-2xl border-none h-32" 
            placeholder="Description"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Update Listing"}
          </button>
        </form>
      </div>
    </div>
  );
}