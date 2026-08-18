'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { formatDate } from '@/lib/utils'
import { routes } from '@/lib/routes'
import { tourService } from '@/services/tours/tourService'
import type { Review } from '@/types'

export function ReviewCard({ review }: { review: Review }) {
  const { locale } = useLanguage()
  const tour = tourService.getById(review.tourId)
  const title = tour ? (locale === 'ar' ? tour.titleAr : tour.title) : review.tourId

  return (
    <article className="flex gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
        <Image src={tour?.image ?? '/placeholder.svg'} alt={title} fill sizes="64px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <Link href={routes.tour(review.tourId)} className="block truncate text-sm font-bold hover:underline">
          {title}
        </Link>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={index < review.rating ? 'size-3 fill-gold text-gold' : 'size-3 text-border'}
              />
            ))}
          </span>
          <span className="text-[11px] text-muted-foreground">{formatDate(review.createdAt, locale)}</span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">{review.text}</p>
      </div>
    </article>
  )
}
