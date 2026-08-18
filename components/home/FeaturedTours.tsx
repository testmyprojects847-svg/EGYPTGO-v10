'use client'

import Link from 'next/link'
import { TourCard } from '@/components/tours/TourCard'
import { Reveal } from '@/components/ui/Reveal'
import { useLanguage } from '@/hooks/useLanguage'
import { useTours } from '@/hooks/useTours'
import { routes } from '@/lib/routes'

export function FeaturedTours() {
  const { t, dir } = useLanguage()
  const { published } = useTours()
  const featuredTours = published.filter((tour) => tour.featured === true)
  const displayTours = (featuredTours.length ? featuredTours : published).slice(0, 4)

  return (
    <section dir={dir} className="mx-3 mb-12 mt-10 sm:mx-4 lg:mx-10">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold sm:text-2xl">{t('featuredTours')}</h2>
        <Link href={routes.tours} prefetch className="shrink-0 text-xs font-semibold text-accent">
          {t('viewAll')}
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {displayTours.map((tour, index) => (
          <Reveal key={tour.id} delay={index * 60}>
            <TourCard tour={tour} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}