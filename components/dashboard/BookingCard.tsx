'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, CalendarCheck, MapPin, Users } from 'lucide-react'
import { useCurrency } from '@/hooks/useCurrency'
import { useLanguage } from '@/hooks/useLanguage'
import { formatDate } from '@/lib/utils'
import { routes } from '@/lib/routes'
import { InvoiceButton } from '@/lib/invoice'
import { tourService } from '@/services/tours/tourService'
import type { Booking, BookingStatus } from '@/types'
import type { MessageKey } from '@/providers/LanguageProvider'

const statusTone: Record<BookingStatus, string> = {
  confirmed: 'bg-accent/20 text-accent-foreground',
  pending: 'bg-gold-soft text-gold-foreground',
  cancelled: 'bg-destructive/10 text-destructive',
}

export function BookingCard({ booking, onCancel }: { booking: Booking; onCancel: (id: string) => void }) {
  const { t, locale } = useLanguage()
  const { format, currency } = useCurrency()
  const tour = tourService.getById(booking.tourId)
  const title = tour ? (locale === 'ar' ? tour.titleAr : tour.title) : booking.tourTitle
  const location = tour ? (locale === 'ar' ? tour.locationAr : tour.location) : undefined

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md sm:flex-row">
      <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-40">
        <Image
          src={tour?.image ?? '/placeholder.svg'}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 160px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="min-w-0">
            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusTone[booking.status]}`}>
              {t(booking.status as MessageKey)}
            </span>
            <h3 className="mt-1.5 truncate text-base font-bold">{title}</h3>
            {location && (
              <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
                <MapPin className="size-3 shrink-0" />
                {location}
              </p>
            )}
          </div>
          <div className="shrink-0 text-end">
            <p className="text-lg font-bold leading-none">{format(booking.total)}</p>
            <p className="text-[11px] text-muted-foreground">{currency}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-x-6 gap-y-2 border-t border-border pt-2.5">
          <Meta icon={Calendar} label={t('travelDate')} value={formatDate(booking.date, locale)} />
          <Meta icon={CalendarCheck} label={t('bookingDate')} value={formatDate(booking.createdAt, locale)} />
          <Meta icon={Users} label={t('travelers')} value={String(booking.travelers)} />
          <div className="ms-auto flex items-center gap-2">
            {booking.status !== 'cancelled' && (
              <button
                type="button"
                onClick={() => onCancel(booking.id)}
                className="rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10"
              >
                {t('cancel')}
              </button>
            )}
            <InvoiceButton booking={booking} locale={locale} label={t('downloadInvoice')} />
            <Link
              href={routes.tour(booking.tourId)}
              className="rounded-lg bg-gold-soft px-3 py-1.5 text-xs font-semibold text-gold-foreground transition-colors hover:bg-gold hover:text-gold-foreground"
            >
              {t('viewDetails')}
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

function Meta({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1 text-xs font-medium">
        <Icon className="size-3 shrink-0 text-muted-foreground" />
        <span className="truncate">{value}</span>
      </p>
      <p className="mt-0.5 text-[10px] text-muted-foreground">{label}</p>
    </div>
  )
}
