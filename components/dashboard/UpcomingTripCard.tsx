'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, Eye, Plane, Users } from 'lucide-react'
import { InvoiceButton } from '@/lib/invoice'
import { useLanguage } from '@/hooks/useLanguage'
import { formatDate } from '@/lib/utils'
import { routes } from '@/lib/routes'
import { tourService } from '@/services/tours/tourService'
import type { Booking, Locale } from '@/types'

export function UpcomingTripCard({ bookings }: { bookings: Booking[] }) {
  const { t, locale, dir } = useLanguage()

  const today = new Date().toISOString().slice(0, 10)
  const upcoming = bookings
    .filter((booking) => booking.status !== 'cancelled' && booking.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0]

  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2 text-sm font-bold">
        <Plane className="size-4 text-gold" />
        {t('upcomingTrip')}
      </div>

      {!upcoming ? (
        <p className="rounded-2xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
          {t('noUpcomingTrip')}
        </p>
      ) : (
        <UpcomingTripBody booking={upcoming} locale={locale} dir={dir} />
      )}
    </section>
  )
}

function UpcomingTripBody({ booking, locale, dir }: { booking: Booking; locale: Locale; dir: 'ltr' | 'rtl' }) {
  const { t } = useLanguage()
  const tour = tourService.getById(booking.tourId)
  const title = tour ? (locale === 'ar' ? tour.titleAr : tour.title) : booking.tourTitle
  const location = tour ? (locale === 'ar' ? tour.locationAr : tour.location) : undefined

  return (
    <div dir={dir} className="grid gap-4 sm:grid-cols-[1.1fr_1fr]">
      <div className="relative h-44 w-full overflow-hidden rounded-2xl sm:h-full">
        <Image src={tour?.image ?? '/placeholder.svg'} alt={title} fill sizes="(max-width: 640px) 100vw, 420px" className="object-cover" />
      </div>

      <div className="flex flex-col">
        <span className="inline-flex w-fit rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-bold text-accent">
          {t(booking.status as 'confirmed' | 'pending' | 'cancelled')}
        </span>
        <h3 className="mt-2 text-lg font-bold">{title}</h3>
        {location && <p className="text-xs text-muted-foreground">{location}</p>}

        <div className="mt-3 flex flex-col gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar className="size-3.5 shrink-0" />
            {formatDate(booking.date, locale)}
          </span>
          <span className="flex items-center gap-2">
            <Users className="size-3.5 shrink-0" />
            {booking.travelers} {t('travelers')}
          </span>
          {booking.tourDuration && (
            <span className="flex items-center gap-2">
              <Clock className="size-3.5 shrink-0" />
              {booking.tourDuration}
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <Link
            href={routes.tour(booking.tourId)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-ink-foreground"
          >
            <Eye className="size-3.5" />
            {t('viewTrip')}
          </Link>
          <InvoiceButton booking={booking} locale={locale} label={t('downloadInvoice')} />
        </div>
      </div>
    </div>
  )
}