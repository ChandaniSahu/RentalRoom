import Image from "next/image";
import Link from "next/link";
import { Bed, MapPin, Users, Phone, Star, Check, Home, Bath, Square } from "lucide-react";
import { Room } from "@/types/room";

interface RoomCardProps {
  room: Room;
  featured?: boolean;
}

export default function RoomCard({ room, featured = false }: RoomCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-IN").format(room.rent_price);
  const fallbackImage = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:border-purple-200">
      {/* Image Section */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={room.images?.[0] || fallbackImage}
          alt={room.title}
          fill
          unoptimized
          sizes="100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.srcset = "";
            img.src = fallbackImage;
          }}
        />

        {/* Status Badge */}
        <div className="absolute top-5 left-5">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              room.is_available 
                ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg" 
                : "bg-gradient-to-r from-red-500 to-orange-500 text-white"
            }`}
          >
            {room.is_available ? "Available" : "Rented"}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg">
          <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
            ₹{formattedPrice}
          </div>
          <div className="text-xs text-gray-500">per month</div>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-5 right-5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg">
            <Star className="h-4 w-4 mr-2 fill-white" />
            Featured
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-7">
        <div className="mb-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2.5 line-clamp-1 group-hover:text-purple-700 transition-colors">
            <Link href={`/rooms/${room.id}`}>{room.title}</Link>
          </h3>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-purple-500" />
            <span className="line-clamp-1 text-sm">{room.location}</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-2 gap-5 mb-6">
          <div className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors">
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-2.5 rounded-lg mr-3">
              <Home className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Type</div>
              <div className="font-semibold text-gray-800">{room.property_type}</div>
            </div>
          </div>

          <div className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-teal-50 transition-colors">
            <div className="bg-gradient-to-br from-teal-100 to-teal-50 p-2.5 rounded-lg mr-3">
              <Users className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">For</div>
              <div className="font-semibold text-gray-800">{room.tenant_preference}</div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-7">
          {room.amenities?.slice(0, 4).map((amenity, index) => (
            <div 
              key={index} 
              className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-full text-xs font-medium"
            >
              <Check className="h-3 w-3 mr-1.5 text-green-500 stroke-[3px]" />
              {amenity}
            </div>
          ))}
          {room.amenities?.length > 4 && (
            <div className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-500 rounded-full text-xs">
              +{room.amenities.length - 4} more
            </div>
          )}
        </div>

        {/* Contact & Actions */}
        <div className="flex items-center justify-between pt-5 border-t border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-2.5 rounded-lg mr-3">
              <Phone className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Contact</div>
              <div className="font-semibold text-sm text-gray-800">{room.contact_number}</div>
            </div>
          </div>

          <Link
            href={`/rooms/${room.id}`}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all font-medium hover:scale-105 active:scale-95"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}