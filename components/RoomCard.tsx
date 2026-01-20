// import Image from "next/image";
// import Link from "next/link";
// import { Bed, MapPin, Users, Phone, Star, Wifi, Car, Wind } from "lucide-react";
// import { Room } from "@/types/room";

// interface RoomCardProps {
//   room: Room;
//   featured?: boolean;
// }

// export default function RoomCard({ room, featured = false }: RoomCardProps) {
//   // Format price with commas
//   const formattedPrice = new Intl.NumberFormat("en-IN").format(room.rent_price);
//   const fallbackImage =
//     "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80";

//   // Check for popular amenities
//   const hasWifi = room.amenities?.includes("WiFi");
//   const hasParking = room.amenities?.includes("Parking");
//   const hasAC = room.amenities?.includes("AC");

//   return (
//     <div
//       className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${featured ? "border-2 border-yellow-400" : ""}`}
//     >
//       {/* Image Section */}
//       <div className="relative h-64">
//        <Image
//   src={room.images?.[0] || fallbackImage}
//   alt={room.title}
//   fill
//   unoptimized
//   sizes="100vw"
//   className="object-cover"
//   onError={(e) => {
//     const img = e.currentTarget as HTMLImageElement;
//     img.src = fallbackImage;
//   }}
// />

//         {/* Status Badge */}
//         <div className="absolute top-4 left-4">
//           <span
//             className={`px-3 py-1.5 rounded-full text-xs font-semibold ${room.is_available ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
//           >
//             {room.is_available ? "Available Now" : "Rented"}
//           </span>
//         </div>

//         {/* Price Badge */}
//         <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md">
//           <div className="text-xl font-bold text-blue-600">
//             ₹{formattedPrice}
//           </div>
//           <div className="text-xs text-gray-600">per month</div>
//         </div>

//         {/* Featured Badge */}
//         {featured && (
//           <div className="absolute bottom-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
//             <Star className="h-3 w-3 mr-1" />
//             Featured
//           </div>
//         )}
//       </div>

//       {/* Content Section */}
//       <div className="p-6">
//         {/* Title and Location */}
//         <div className="mb-4">
//           <h3 className="text-xl font-bold mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
//             <Link href={`/rooms/${room.id}`}>{room.title}</Link>
//           </h3>
//           <div className="flex items-center text-gray-600">
//             <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
//             <span className="line-clamp-1">{room.location}</span>
//           </div>
//         </div>

//         {/* Property Details */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div className="flex items-center">
//             <div className="bg-blue-100 p-2 rounded-lg mr-3">
//               <Bed className="h-5 w-5 text-blue-600" />
//             </div>
//             <div>
//               <div className="text-sm text-gray-500">Type</div>
//               <div className="font-medium">{room.property_type}</div>
//             </div>
//           </div>

//           <div className="flex items-center">
//             <div className="bg-blue-100 p-2 rounded-lg mr-3">
//               <Users className="h-5 w-5 text-blue-600" />
//             </div>
//             <div>
//               <div className="text-sm text-gray-500">For</div>
//               <div className="font-medium">{room.tenant_preference}</div>
//             </div>
//           </div>
//         </div>

//         {/* Amenities Icons */}
//         <div className="flex items-center space-x-4 mb-6">
//           {hasWifi && (
//             <div className="flex items-center text-gray-600">
//               <Wifi className="h-4 w-4 mr-1" />
//               <span className="text-sm">WiFi</span>
//             </div>
//           )}
//           {hasParking && (
//             <div className="flex items-center text-gray-600">
//               <Car className="h-4 w-4 mr-1" />
//               <span className="text-sm">Parking</span>
//             </div>
//           )}
//           {hasAC && (
//             <div className="flex items-center text-gray-600">
//               <Wind className="h-4 w-4 mr-1" />
//               <span className="text-sm">AC</span>
//             </div>
//           )}
//           {room.amenities?.length > 3 && (
//             <div className="text-sm text-gray-500">
//               +{room.amenities.length - 3} more
//             </div>
//           )}
//         </div>

//         {/* Contact & Actions */}
//         <div className="flex items-center justify-between pt-4 border-t">
//           <div className="flex items-center">
//             <div className="bg-green-100 p-2 rounded-lg mr-3">
//               <Phone className="h-4 w-4 text-green-600" />
//             </div>
//             <div>
//               <div className="text-sm text-gray-500">Contact</div>
//               <div className="font-medium">{room.contact_number}</div>
//             </div>
//           </div>

//           <div className="flex space-x-3">
//             <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
//               <svg
//                 className="h-5 w-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                 />
//               </svg>
//             </button>
//             <Link
//               href={`/rooms/${room.id}`}
//               className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors font-medium"
//             >
//               View Details
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import Image from "next/image";
import Link from "next/link";
// Added Check for the generic amenity tick
import { Bed, MapPin, Users, Phone, Star, Check } from "lucide-react";
import { Room } from "@/types/room";

interface RoomCardProps {
  room: Room;
  featured?: boolean;
}

export default function RoomCard({ room, featured = false }: RoomCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-IN").format(room.rent_price);
  const fallbackImage = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80";

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
        featured ? "border-2 border-yellow-400" : ""
      }`}
    >
      {/* Image Section */}
      <div className="relative h-64">
        <Image
          src={room.images?.[0] || fallbackImage}
          alt={room.title}
          fill
          unoptimized
          sizes="100vw"
          className="object-cover"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.srcset = ""; // Clear srcset for Next.js consistency
            img.src = fallbackImage;
          }}
        />

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
              room.is_available ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {room.is_available ? "Available Now" : "Rented"}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md">
          <div className="text-xl font-bold text-blue-600">₹{formattedPrice}</div>
          <div className="text-xs text-gray-600">per month</div>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute bottom-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
            <Link href={`/rooms/${room.id}`}>{room.title}</Link>
          </h3>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{room.location}</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <Bed className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Type</div>
              <div className="font-medium">{room.property_type}</div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">For</div>
              <div className="font-medium">{room.tenant_preference}</div>
            </div>
          </div>
        </div>

        {/* DYNAMIC AMENITIES LIST */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6 h-12 overflow-hidden">
          {room.amenities?.slice(0, 4).map((amenity, index) => (
            <div key={index} className="flex items-center text-gray-600">
              <Check className="h-3.5 w-3.5 mr-1 text-green-500 stroke-[3px]" />
              <span className="text-xs font-medium">{amenity}</span>
            </div>
          ))}
          {room.amenities?.length > 4 && (
            <div className="text-xs text-gray-400 self-center">
              +{room.amenities.length - 4} more
            </div>
          )}
        </div>

        {/* Contact & Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <Phone className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Contact</div>
              <div className="font-medium text-xs">{room.contact_number}</div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Link
              href={`/rooms/${room.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}