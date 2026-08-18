import { Hero } from '@/components/home/Hero'
import { PopularDestinations } from '@/components/home/PopularDestinations'
import { FeaturedTours } from '@/components/home/FeaturedTours'
import { TrustBar } from '@/components/home/TrustBar'

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularDestinations />
      <FeaturedTours />
      <TrustBar />
    </>
  )
}
