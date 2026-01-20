"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Edit,
  Trash2,
  MapPin,
  AlertTriangle,
  Loader2,
  Plus,
  Home,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import EditRoomModal from "./EditRoomModal";

export default function Dashboard() {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editRoom, setEditRoom] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchRooms = async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      router.push("/login");
      return;
    }
    const headers: any = {};

    if (session?.access_token) {
      headers["Authorization"] = `Bearer ${session.access_token}`;
    }

    try {
      const res = await fetch("/api/adminRooms", {
        method: "GET",
        headers: headers,
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      toast.error("Could not load listings");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const res = await fetch(`/api/adminRooms?id=${deleteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session?.access_token}` },
    });
    if (res.ok) {
      toast.success("Listing removed successfully");
      fetchRooms();
    }
    setDeleteId(null);
  };

  if (loading)
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
        <p className="text-gray-500 font-medium animate-pulse">
          Loading your listings...
        </p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 md:py-12">
      {/* Navigation & Header */}
    <div className="flex flex-col gap-6 mb-12">
  <button
    onClick={() => router.push("/")}
    className="group flex items-center gap-2 text-gray-500 hover:text-purple-700 transition-colors w-fit"
  >
    <div className="p-2 rounded-full group-hover:bg-purple-50 transition-colors">
      <ArrowLeft size={20} className="group-hover:text-purple-600" />
    </div>
    <span className="font-semibold text-sm">Back</span>
  </button>

  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
        My <span className="bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">Listings</span>
      </h1>
      <p className="text-gray-500 mt-1">
        Manage and monitor your property performance
      </p>
    </div>
    <Link
      href="/dashboard/add-room"
      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-teal-500 text-white px-6 py-3.5 rounded-2xl font-bold hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all"
    >
      <Plus size={20} />
      <span>Add New Room</span>
    </Link>
  </div>
</div>

      {/* Grid / List Section */}
      {rooms.length > 0 ? (
        <div className="grid gap-5">
          {rooms.map((room: any) => (
            <div
              key={room.id}
              className="group bg-white border border-gray-100 p-4 rounded-[2.5rem] flex flex-col sm:flex-row items-center transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-gray-100"
            >
              <div className="relative w-full sm:w-32 h-32 mb-4 sm:mb-0 overflow-hidden rounded-[1.8rem]">
                <img
                  src={room.images[0]}
                  alt={room.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.onerror = null; // prevents infinite loops if fallback also fails
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1493809842364-78817add7ffb";
                  }}
                />
              </div>

              <div className="sm:ml-8 flex-1 w-full text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                    Active
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {room.title}
                </h3>
                <div className="flex items-center justify-center sm:justify-start text-gray-500 text-sm mt-1.5">
                  <MapPin size={14} className="mr-1 text-gray-400" />{" "}
                  {room.location}
                </div>
                <p className="text-2xl font-black text-gray-900 mt-2">
                  ₹{room.rent_price}
                  <span className="text-sm font-medium text-gray-400">
                    /month
                  </span>
                </p>
              </div>

              <div className="flex gap-3 mt-6 sm:mt-0 w-full sm:w-auto">
                <button
                  onClick={() => setEditRoom(room)}
                  className="flex-1 sm:flex-none p-4 bg-gray-50 text-gray-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  title="Edit Listing"
                >
                  <Edit size={20} className="mx-auto" />
                </button>
                <button
                  onClick={() => setDeleteId(room.id)}
                  className="flex-1 sm:flex-none p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
                  title="Delete Listing"
                >
                  <Trash2 size={20} className="mx-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Home className="text-gray-300" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No listings yet</h3>
          <p className="text-gray-500 max-w-xs mx-auto mt-2 mb-8">
            You haven't added any rooms to the platform yet. Start by creating
            your first listing.
          </p>
          <Link
            href="/dashboard/add-room"
            className="text-blue-600 font-bold hover:underline inline-flex items-center gap-2"
          >
            Create my first listing <Plus size={16} />
          </Link>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
              <AlertTriangle size={40} />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              Delete Listing?
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              This action is permanent. All data associated with this room will
              be removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editRoom && (
        <EditRoomModal
          room={editRoom}
          onClose={() => setEditRoom(null)}
          onSuccess={fetchRooms}
        />
      )}
    </div>
  );
}
