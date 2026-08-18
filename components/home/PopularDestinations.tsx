'use client'

import Link from 'next/link'
import { destinations } from '@/data/destinations'
import { DestinationCard } from '@/components/destinations/DestinationCard'
import { Reveal } from '@/components/ui/Reveal'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'

export function PopularDestinations() {
  const { t, dir } = useLanguage()
  return (
    <section dir={dir} className="mx-3 mt-10 sm:mx-4 lg:mx-10">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold sm:text-2xl">{t('popularDestinations')}</h2>
        <Link href={routes.destinations} prefetch className="shrink-0 text-xs font-semibold text-accent">
          {t('viewAll')}
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {destinations.slice(0, 5).map((destination, index) => (
          <Reveal key={destination.id} delay={index * 60}>
            <DestinationCard destination={destination} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}