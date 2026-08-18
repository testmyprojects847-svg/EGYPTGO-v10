'use client'

import { PageHeader } from '@/components/layout/PageHeader'
import { DestinationCard } from '@/components/destinations/DestinationCard'
import { Reveal } from '@/components/ui/Reveal'
import { destinations } from '@/data/destinations'
import { useLanguage } from '@/hooks/useLanguage'

export default function DestinationsPage() {
  const { t, dir, locale } = useLanguage()
  return (
    <div dir={dir} className="mx-auto mb-20 max-w-6xl px-4 py-8 lg:px-10">
      <PageHeader
        eyebrow={locale === 'ar' ? 'استكشف مصر' : 'Explore Egypt'}
        title={t('destinations')}
        description={locale === 'ar' ? 'مدن ومواقع لا تُنسى.' : 'Unforgettable cities and heritage sites.'}
      />
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {destinations.map((destination, index) => (
          <Reveal key={destination.id} delay={index * 60}>
            <DestinationCard destination={destination} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}