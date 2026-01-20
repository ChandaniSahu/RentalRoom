// app/page.tsx
import Header from '@/components/Header'
import SearchFilters from '@/components/SearchFilters'
import FeaturedRooms from '@/components/FeaturedRooms'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <SearchFilters />
      <FeaturedRooms />
      <Footer />
    </main>
  )
}