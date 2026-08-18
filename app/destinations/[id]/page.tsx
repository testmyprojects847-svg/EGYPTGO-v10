'use client'

import { notFound, useParams } from 'next/navigation'
import { BackLink } from '@/components/layout/BackLink'
import { TourGrid } from '@/components/tours/TourGrid'
import { getDestinationById } from '@/data/destinations'
import { tours } from '@/data/tours'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'

export default function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { locale, dir, t } = useLanguage()
  const destination = getDestinationById(id)
  if (!destination) notFound()

  const related = tours.filter((tour) => tour.location.toLowerCase().includes(destination.name.toLowerCase()))

  return (
    <div dir={dir} className="mx-auto mb-20 max-w-6xl px-4 py-8 lg:px-10">
      <BackLink href={routes.destinations} />
      <img src={destination.image} alt={destination.name} className="h-72 w-full rounded-3xl object-cover" />
      <h1 className="mt-6 text-3xl font-bold">{locale === 'ar' ? destination.nameAr : destination.name}</h1>
      <p className="mt-2 text-muted-foreground">{locale === 'ar' ? destination.descriptionAr ?? destination.description : destination.description}</p>
      <h2 className="mt-10 text-2xl font-bold">{t('featuredTours')}</h2>
      <TourGrid tours={related.length ? related : tours} />
    </div>
  )
}
