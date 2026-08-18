'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CalendarDays, MapPin, Users } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'

export function Hero() {
  const { t, locale, isRtl } = useLanguage()
  const router = useRouter()
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [travelers, setTravelers] = useState('2')

  const search = () => {
    const params = new URLSearchParams()
    if (destination.trim()) params.set('q', destination.trim())
    router.push(params.toString() ? `${routes.tours}?${params}` : routes.tours)
  }

  return (
    <section className="relative mx-3 mt-3 overflow-hidden rounded-3xl sm:mx-4 lg:mx-10 lg:mt-5">
      <img
        src="/images/hero/hero.png"
        alt="Egypt landscape"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/25" />
      <div
        className={`relative flex min-h-[420px] flex-col justify-center px-5 py-12 sm:px-8 lg:min-h-[500px] lg:px-14 ${isRtl ? 'text-right' : 'text-left'}`}
      >
        <h1 className="max-w-2xl text-balance text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
          {t('welcome')}
          <br />
          {t('tagline')}
        </h1>
        <p className="mt-4 max-w-md text-sm leading-6 text-white/85 sm:text-base">
          {locale === 'ar'
            ? 'اعثر على أفضل الجولات والفنادق والتجارب واحجز رحلتك القادمة.'
            : 'Find the best tours, hotels and experiences and book your next adventure.'}
        </p>

        <div className="mt-8 w-full max-w-3xl rounded-2xl bg-card p-2.5 shadow-xl">
          <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
            <Field icon={<MapPin className="size-4" />} label={t('destinations')}>
              <input
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && search()}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </Field>
            <Field icon={<CalendarDays className="size-4" />} label={t('travelDate')}>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="w-full bg-transparent text-sm outline-none"
              />
            </Field>
            <Field icon={<Users className="size-4" />} label={t('travelers')}>
              <select
                value={travelers}
                onChange={(event) => setTravelers(event.target.value)}
                className="w-full bg-transparent text-sm outline-none"
              >
                {[1, 2, 3, 4, 5, 6].map((count) => (
                  <option key={count} value={String(count)}>
                    {count} {t(count === 1 ? 'traveler' : 'travelers')}
                  </option>
                ))}
              </select>
            </Field>
            <button
              type="button"
              onClick={search}
              className="rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
            >
              {t('searchTours')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 rounded-xl px-3 py-2">
      <span className="shrink-0 text-muted-foreground">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold text-foreground">{label}</p>
        {children}
      </div>
    </div>
  )
}
