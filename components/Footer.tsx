import Link from 'next/link'
import { Building2, Mail, Phone, MapPin, Heart, Globe, Shield, Building } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-slate-950 text-white">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-purple-600 to-teal-500 p-2.5 rounded-xl">
                <Building2 className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-teal-300 bg-clip-text text-transparent">
                Rental Room
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your premier destination for finding perfect rental spaces. 
              We connect verified tenants with trusted property owners.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2.5 rounded-lg hover:bg-purple-600 transition-all">
                <Heart className="h-5 w-5 text-gray-300 hover:text-white" />
              </a>
              <a href="#" className="bg-gray-800 p-2.5 rounded-lg hover:bg-purple-600 transition-all">
                <Globe className="h-5 w-5 text-gray-300 hover:text-white" />
              </a>
              <a href="#" className="bg-gray-800 p-2.5 rounded-lg hover:bg-purple-600 transition-all">
                <Shield className="h-5 w-5 text-gray-300 hover:text-white" />
              </a>
              <a href="#" className="bg-gray-800 p-2.5 rounded-lg hover:bg-purple-600 transition-all">
                <Building className="h-5 w-5 text-gray-300 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white border-l-4 border-purple-500 pl-3">Quick Links</h3>
            <ul className="space-y-3.5">
              {[
                { href: "/", label: "Find Rooms" },
                { href: "/dashboard", label: "List Property" },
                { href: "/search", label: "Advanced Search" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" }
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-purple-300 transition-colors flex items-center gap-2 group">
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white border-l-4 border-teal-500 pl-3">Popular Cities</h3>
            <ul className="grid grid-cols-2 gap-3">
              {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'].map((city) => (
                <li key={city}>
                  <Link 
                    href={`/search?location=${city}`} 
                    className="text-gray-400 hover:text-teal-300 transition-colors text-sm bg-gray-800/50 px-3 py-2 rounded-lg block hover:bg-gray-800"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-7">
            <div>
              <h3 className="text-lg font-semibold mb-5 text-white border-l-4 border-purple-500 pl-3">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 bg-gray-800/30 p-3 rounded-lg">
                  <Phone className="h-5 w-5 text-teal-400" />
                  <span className="text-gray-300">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 bg-gray-800/30 p-3 rounded-lg">
                  <Mail className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-300">support@rentalroom.com</span>
                </div>
                <div className="flex items-center space-x-3 bg-gray-800/30 p-3 rounded-lg">
                  <MapPin className="h-5 w-5 text-yellow-400" />
                  <span className="text-gray-300">123 MG Road, Bangalore</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 text-white py-3 rounded-lg font-medium transition-all"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-10"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} <span className="text-purple-400 font-medium">Rental Room</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-5 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Safety Tips', 'FAQ'].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase().replace(' ', '')}`} 
                className="text-gray-500 hover:text-white text-sm transition-colors hover:underline"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}