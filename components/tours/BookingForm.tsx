'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, ChevronDown, MapPin, Search } from 'lucide-react'
import { getCountryCallingCode, type CountryCode } from 'libphonenumber-js'
import { countries, searchCountries, type Country } from '@/data/countries'
import { useBookings } from '@/hooks/useBookings'
import { useLanguage } from '@/hooks/useLanguage'
import { calculateTourTotal, formatAmount } from '@/lib/currency'
import { validateBooking } from '@/lib/validation'
import { routes } from '@/lib/routes'
import { InvoiceButton } from '@/lib/invoice'
import type { Tour } from '@/types'

export function BookingForm({ tour }: { tour: Tour }) {
  const { t, locale, dir } = useLanguage()
  const { create } = useBookings()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneCountry, setPhoneCountry] = useState<Country>(countries.find((item) => item.code === 'EG') ?? countries[0])
  const [travelers, setTravelers] = useState(1)
  const [date, setDate] = useState('')
  const [country, setCountry] = useState<Country | null>(null)
  const [countryQuery, setCountryQuery] = useState('')
  const [countryOpen, setCountryOpen] = useState(false)
  const [error, setError] = useState('')
  const [booking, setBooking] = useState<ReturnType<typeof create> | null>(null)
  const price = calculateTourTotal(tour, travelers, locale)
  const max = tour.maxTravelers ?? Number.parseInt(tour.groupSize?.match(/\d+/)?.[0] ?? '20', 10)

  if (booking) {
    return (
      <div dir={dir} className="grid min-h-[560px] place-items-center px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-accent text-accent-foreground">
            <Check className="size-7" />
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-accent">EgyptGo</p>
          <h1 className="mt-2 text-3xl font-bold">{t('bookingConfirmed')}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {locale === 'ar' ? 'تم حفظ حجزك بنجاح.' : 'Your reservation has been saved successfully.'}
          </p>

          <div className="mt-6 rounded-2xl border border-border bg-card p-5 text-start text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">{locale === 'ar' ? 'المرجع' : 'Reference'}</span>
              <strong>{booking.reference}</strong>
            </div>
            <div className="mt-3 flex justify-between gap-4">
              <span className="text-muted-foreground">{locale === 'ar' ? 'الإجمالي' : 'Total'}</span>
              <strong>{formatAmount(booking.total, booking.currency ?? 'USD')}</strong>
            </div>
            <div className="mt-3 grid gap-2 text-start text-xs text-muted-foreground">
              <div className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-accent" />{booking.meetingPoint}</div>
              <div>{locale === 'ar' ? 'السائح' : 'Traveler'}: {booking.customerName}</div>
              <div>{booking.customerEmail}</div>
              <div>{booking.phone ? `${booking.phoneCountryCode ?? ''} ${booking.phone}`.trim() : (locale === 'ar' ? 'الهاتف غير متوفر' : 'Phone not provided')}</div>
            </div>
          </div>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <InvoiceButton
              booking={booking}
              locale={locale}
              label={locale === 'ar' ? 'تحميل الفاتورة (PDF)' : 'Download Invoice (PDF)'}
            />
            <Link
              href={routes.dashboard}
              className="inline-block rounded-xl bg-primary px-5 py-3 text-xs font-bold text-primary-foreground"
            >
              {t('goToDashboard')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div dir={dir} className="rounded-3xl border border-border bg-card p-6">
      <h1 className="text-2xl font-bold">{t('personalInfo')}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {locale === 'ar' ? 'اختر تاريخاً وعدد المسافرين.' : 'Choose your date and number of travelers.'}
      </p>

      {error && <p role="alert" className="mt-4 rounded-xl bg-destructive/10 p-3 text-xs font-semibold text-destructive">{error}</p>}

      <form
        className="mt-6 grid gap-4 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault()
          const dialCode = getCountryCallingCode(phoneCountry.code as CountryCode)
          const message = validateBooking(travelers, date, locale, max, country?.code, fullName, email, phone)
          if (message) return setError(message)
          setBooking(create(tour, date, travelers, locale, country as Country, { name: fullName.trim(), email: email.trim(), phone: phone.replace(/[\s()-]/g, ''), phoneCountryCode: `+${dialCode}` }))
        }}
      >
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-xs font-semibold">{locale === 'ar' ? 'الاسم الكامل' : 'Full name'} *</span>
          <input required value={fullName} onChange={(event) => { setFullName(event.target.value); setError('') }} autoComplete="name" placeholder={locale === 'ar' ? 'اكتب اسمك كما يظهر في جواز السفر' : 'Name as shown on your passport'} className="w-full rounded-xl border border-border bg-background px-3 py-3 text-xs" />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold">{locale === 'ar' ? 'البريد الإلكتروني' : 'Email address'} *</span>
          <input required type="email" value={email} onChange={(event) => { setEmail(event.target.value); setError('') }} autoComplete="email" placeholder="name@example.com" className="w-full rounded-xl border border-border bg-background px-3 py-3 text-xs" />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold">{locale === 'ar' ? 'رقم الهاتف' : 'Phone number'} *</span>
          <div className="flex gap-2">
            <select aria-label={locale === 'ar' ? 'رمز دولة الهاتف' : 'Phone country code'} value={phoneCountry.code} onChange={(event) => { const next = countries.find((item) => item.code === event.target.value); if (next) setPhoneCountry(next); setError('') }} className="w-28 rounded-xl border border-border bg-background px-2 py-3 text-xs">
              {countries.map((item) => <option key={item.code} value={item.code}>+{getCountryCallingCode(item.code as CountryCode)} {locale === 'ar' ? item.nameAr : item.nameEn}</option>)}
            </select>
            <input required type="tel" inputMode="tel" value={phone} onChange={(event) => { setPhone(event.target.value); setError('') }} autoComplete="tel-national" placeholder={locale === 'ar' ? 'رقم الهاتف' : 'Local number'} className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-3 text-xs" />
          </div>
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold">{t('travelDate')}</span>
          <input
            required
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            value={date}
            onChange={(event) => {
              setDate(event.target.value)
              setError('')
            }}
            className="w-full rounded-xl border border-border bg-background px-3 py-3 text-xs"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold">
            {t('travelers')} <span className="font-normal text-muted-foreground">(1–{max})</span>
          </span>
          <input
            required
            type="number"
            min={1}
            max={max}
            value={travelers}
            onChange={(event) => {
              setTravelers(Number(event.target.value))
              setError('')
            }}
            className="w-full rounded-xl border border-border bg-background px-3 py-3 text-xs"
          />
        </label>

        <div className="relative sm:col-span-2">
          <span className="mb-2 block text-xs font-semibold">{locale === 'ar' ? 'الدولة' : 'Country'} <span className="font-normal text-muted-foreground">*</span></span>
          <button type="button" aria-expanded={countryOpen} onClick={() => setCountryOpen((open) => !open)} className="flex w-full items-center justify-between rounded-xl border border-border bg-background px-3 py-3 text-start text-xs">
            <span className={country ? 'text-foreground' : 'text-muted-foreground'}>{country ? (locale === 'ar' ? country.nameAr : country.nameEn) : (locale === 'ar' ? 'ابحث واختر دولتك' : 'Search and select your country')}</span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </button>
          {countryOpen && <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            <div className="flex items-center gap-2 border-b border-border px-3"><Search className="size-4 text-muted-foreground" /><input autoFocus value={countryQuery} onChange={(event) => setCountryQuery(event.target.value)} placeholder={locale === 'ar' ? 'اكتب اسم الدولة...' : 'Type a country name...'} className="w-full bg-transparent py-3 text-xs outline-none" /></div>
            <div className="max-h-60 overflow-y-auto p-1">{searchCountries(countryQuery, locale).map((item) => <button key={item.code} type="button" onClick={() => { setCountry(item); setCountryQuery(''); setCountryOpen(false); setError('') }} className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-start text-xs hover:bg-muted"><span>{locale === 'ar' ? item.nameAr : item.nameEn}</span><span className="text-[10px] text-muted-foreground">{locale === 'ar' ? item.nameEn : item.nameAr}</span></button>)}{searchCountries(countryQuery, locale).length === 0 && <p className="px-3 py-4 text-center text-xs text-muted-foreground">{locale === 'ar' ? 'لا توجد نتائج' : 'No countries found'}</p>}</div>
          </div>}
        </div>

        <div className="mt-6 border-t border-border pt-6 sm:col-span-2">
          <h2 className="text-sm font-bold">{locale === 'ar' ? 'ملخص الحجز' : 'Reservation summary'}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {locale === 'ar' ? tour.titleAr : tour.title} · {travelers} {t('travelers')}
          </p>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-xs text-muted-foreground">{locale === 'ar' ? 'الإجمالي' : 'Total'}</span>
            <span className="text-2xl font-bold">
              {price.formatted} <span className="text-sm">× {travelers}</span>
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatAmount(price.total, price.currency)} ·{' '}
            {locale === 'ar' ? tour.cancellationAr ?? tour.cancellation : tour.cancellation}
          </p>
        </div>

        <button type="submit" className="mt-4 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground sm:col-span-2">
          {locale === 'ar' ? 'تأكيد الحجز' : 'Confirm reservation'}
        </button>
      </form>
    </div>
  )
}
