'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, MapPin, Star } from 'lucide-react'
import { useCurrency } from '@/hooks/useCurrency'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'
import type { Tour } from '@/types'

interface Props {
  id: string
  tour?: Tour
  onRemove: (id: string) => void
}

export function FavoriteCard({ id, tour, onRemove }: Props) {
  const { t, locale } = useLanguage()
  const { format, currency } = useCurrency()
  const title = tour ? (locale === 'ar' ? tour.titleAr : tour.title) : id
  const location = tour ? (locale === 'ar' ? tour.locationAr : tour.location) : undefined

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-28 w-full">
        <Image
          src={tour?.image ?? '/placeholder.svg'}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 220px"
          className="object-cover"
        />
        <button
          type="button"
          onClick={() => onRemove(id)}
          aria-label={t('removeFavorite')}
          title={t('removeFavorite')}
          className="absolute end-2 top-2 grid size-8 place-items-center rounded-full bg-card/90 text-destructive shadow-sm transition-transform hover:scale-105"
        >
          <Heart className="size-4 fill-destructive" />
        </button>
      </div>
      <div className="space-y-1.5 p-3">
        <Link href={routes.tour(id)} className="block truncate text-sm font-bold hover:underline">
          {title}
        </Link>
        {location && (
          <p className="flex items-center gap-1 truncate text-[11px] text-muted-foreground">
            <MapPin className="size-3 shrink-0" />
            {location}
          </p>
        )}
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-2 pt-0.5">
          {tour && (
            <p className="flex min-w-0 items-center gap-1 truncate text-xs font-semibold">
              <Star className="size-3 shrink-0 fill-gold text-gold" />
              {tour.rating}
              <span className="font-normal text-muted-foreground">({tour.reviews})</span>
            </p>
          )}
          {tour && (
            <p className="shrink-0 text-end text-sm font-bold">
              {format(tour.price)}
              <span className="block text-[10px] font-normal text-muted-foreground">{currency}</span>
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
