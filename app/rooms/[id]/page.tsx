"use client";

import {
  MapPin,
  Shield,
  ArrowLeft,
  Share2,
  Heart,
  Star,
  Bath,
  Bed,
  Square,
  ChevronRight,
  Phone,
  Mail,
  Wifi,
  Car,
  Droplets,
  Wind,
  Tv,
  Utensils,
  ShieldCheck,
  Clock,
  Home,
  Users,
  Zap,
  Calendar,
  CheckCircle,
  Eye,
  Building,
  Key,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

// Simplified interface based on actual data
interface RoomData {
  id: string;
  title: string;
  description: string;
  rent_price: string;
  location: string;
  property_type: string;
  tenant_preference: string;
  amenities: string[];
  images: string[];
  contact_number: string;
  is_available: boolean;
  created_at: string;
}

export default function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [room, setRoom] = useState<RoomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const fallbackImage =
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80";
  useEffect(() => {
    console.log("room", room);
  }, [room?.images]);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { id } = await params;
        const res = await fetch(
          `/api/generalRooms/${id}`,
          { cache: "no-store" },
        );
        if (!res.ok) return setLoading(false);
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [params]);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url,
        });
      } catch (err) {
        console.error("Share cancelled or failed", err);
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-white flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-blue-100" />
        </div>
      </div>
    );

  if (!room) return notFound();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getBedroomsFromType = (type: string) => {
    const match = type.match(/(\d+)\s*BHK/);
    return match ? match[1] : "2";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
      {/* Simple Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-blue-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Link
            href="/"
            className="group flex items-center gap-3 text-blue-700 hover:text-blue-900 transition-all duration-300"
          >
            <div className="p-2 rounded-xl bg-blue-50 group-hover:bg-blue-100 shadow-sm group-hover:shadow-md group-hover:-translate-x-1 transition-all">
              <ArrowLeft size={20} />
            </div>
            <span className="font-medium">Back to home</span>
          </Link>
        </div>
      </nav>

      <main className="pt-16">
        {/* Main Image Section */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-blue-700/30 to-blue-500/20 z-10" />
          {room.images.length > 0 ? (
            <Image
              src={room.images[activeImageIndex]}
              alt={room.title}
              fill
              className="object-cover transition-transform duration-700"
              priority
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.srcset = "";
                img.src = fallbackImage
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Building size={64} className="text-white/50" />
            </div>
          )}

          {/* Image Navigation Dots */}
          {room.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
              {room.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeImageIndex === index
                      ? "bg-white w-8"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Property Badge */}
          <div className="absolute top-6 right-6 z-20">
            <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
              <span className="text-sm font-bold text-blue-700">
                {room.property_type}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Property Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full">
                <ShieldCheck size={14} className="text-white" />
                <span className="text-sm font-bold text-white">Verified</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <Clock size={16} />
                <span className="text-sm">
                  Posted {formatDate(room.created_at)}
                </span>
              </div>
              <div
                className={`px-3 py-1 rounded-full ${
                  room.is_available
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                <span className="text-sm font-medium">
                  {room.is_available ? "Available Now" : "Rented"}
                </span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">
              {room.title}
            </h1>

            <div className="flex items-center gap-2 text-blue-700">
              <MapPin size={20} className="text-blue-500" />
              <span className="text-lg">{room.location}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Price & Quick Info */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-900 mb-1">
                      ₹{parseInt(room.rent_price).toLocaleString("en-IN")}
                    </div>
                    <div className="text-sm text-blue-500">Monthly Rent</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-900 mb-1 flex items-center justify-center">
                      <Bed size={20} className="mr-2" />
                      {getBedroomsFromType(room.property_type)}
                    </div>
                    <div className="text-sm text-blue-500">Bedrooms</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-900 mb-1 flex items-center justify-center">
                      <User size={20} className="mr-2" />
                      {room.tenant_preference}
                    </div>
                    <div className="text-sm text-blue-500">
                      Preferred Tenants
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-900 mb-1 flex items-center justify-center">
                      <Key size={20} className="mr-2" />
                      {room.is_available ? "Yes" : "No"}
                    </div>
                    <div className="text-sm text-blue-500">Available</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-500 rounded-full" />
                  About this property
                </h2>
                <p className="text-blue-700 leading-relaxed">
                  {room.description}
                </p>
              </div>

              {/* Amenities */}
              {room.amenities.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                  <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-emerald-500 rounded-full" />
                    Amenities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {room.amenities.map((amenity, index) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        <div className="p-2 bg-white rounded-lg">
                          {amenity.toLowerCase().includes("wifi") && (
                            <Wifi size={18} className="text-blue-600" />
                          )}
                          {amenity.toLowerCase().includes("parking") && (
                            <Car size={18} className="text-emerald-600" />
                          )}
                          {amenity.toLowerCase().includes("gym") && (
                            <Droplets size={18} className="text-amber-600" />
                          )}
                          {amenity.toLowerCase().includes("security") && (
                            <Shield size={18} className="text-rose-600" />
                          )}
                          {!["wifi", "parking", "gym", "security"].some(
                            (word) => amenity.toLowerCase().includes(word),
                          ) && (
                            <CheckCircle size={18} className="text-blue-600" />
                          )}
                        </div>
                        <span className="font-medium text-blue-800">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
            </div>

            {/* Right Column - Contact & Actions */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4">
                  Interested in this property?
                </h3>

                <div className="space-y-4 mb-6">
                  <a
                    href={`tel:${room.contact_number}`}
                    className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Phone size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">Call Now</div>
                        <div className="text-sm text-blue-200">
                          {room.contact_number}
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-white/20 rounded-lg text-sm text-white">
                      Call
                    </div>
                  </a>

                  {/* <button className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all group text-left">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Mail size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          Send Message
                        </div>
                        <div className="text-sm text-blue-200">
                          Get instant response
                        </div>
                      </div>
                    </div>
                  </button> */}
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 font-bold rounded-xl hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 mb-4">
                  Schedule a Visit
                </button>

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-blue-200 text-sm">
                    <ShieldCheck size={16} />
                    <span>Verified contact & property</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                <div className="flex gap-3 mb-6">
                  {/* 
                  <button className="flex-1 py-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-all flex items-center justify-center gap-2">
                    <Share2 size={20} />
                    Share
                  </button> */}

                  <button
                    onClick={handleShare}
                    className="flex-1 py-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Share2 size={20} />
                    Share
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                    <span className="text-blue-600">Listed on</span>
                    <span className="font-semibold text-blue-800">
                      {formatDate(room.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                    <span className="text-blue-600">Status</span>
                    <span
                      className={`font-semibold ${
                        room.is_available ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {room.is_available ? "Available" : "Rented"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Safety Info */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck size={24} className="text-emerald-600" />
                  <h4 className="font-bold text-emerald-900">Safety First</h4>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-emerald-700">
                    <CheckCircle size={16} className="text-emerald-500" />
                    Verified property details
                  </li>
                  <li className="flex items-center gap-2 text-sm text-emerald-700">
                    <CheckCircle size={16} className="text-emerald-500" />
                    Safe neighborhood
                  </li>
                  <li className="flex items-center gap-2 text-sm text-emerald-700">
                    <CheckCircle size={16} className="text-emerald-500" />
                    Legal documentation verified
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button for Mobile */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <a
          href={`tel:${room.contact_number}`}
          className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center"
        >
          <Phone size={24} />
        </a>
      </div>
    </div>
  );
}
