'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star } from 'lucide-react'
import { formatPrice } from '@/lib/currency'
import { useFavorites } from '@/hooks/useFavorites'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'
import type { Tour } from '@/types'

export function TourCard({ tour }: { tour: Tour }) {
  const { locale, t } = useLanguage()
  const { isFavorite, toggle } = useFavorites()
  const title = locale === 'ar' ? tour.titleAr : tour.title
  const price = formatPrice(tour, locale)

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative h-44 overflow-hidden">
        <Link href={routes.tour(tour.id)} prefetch>
          <Image
            src={tour.image}
            alt={title}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <button
          type="button"
          aria-label={t('myFavorites')}
          onClick={() => toggle(tour.id)}
          className="absolute end-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-card/90 text-primary shadow-sm"
        >
          <Heart className={`size-4 ${isFavorite(tour.id) ? 'fill-accent text-accent' : ''}`} />
        </button>
      </div>
      <Link href={routes.tour(tour.id)} prefetch className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-sm font-bold leading-snug">{title}</p>
        <p className="text-[11px] text-muted-foreground">
          {tour.days} {t(tour.days === 1 ? 'day' : 'days')}
          {tour.nights ? ` / ${tour.nights} ${t(tour.nights === 1 ? 'night' : 'nights')}` : ''}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="flex min-w-0 items-center gap-1 text-[11px] font-medium">
            <Star className="size-3 shrink-0 fill-gold text-gold" />
            {tour.rating} <span className="text-muted-foreground">({tour.reviews})</span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 text-base font-bold">
            {price.old && <span className="text-[10px] font-medium text-muted-foreground line-through">{price.formattedOld}</span>}
            <span>{price.formatted}</span>
            {price.discount > 0 && <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[9px] font-bold text-accent">-{price.discount}%</span>}
          </span>
        </div>
      </Link>
    </div>
  )
}