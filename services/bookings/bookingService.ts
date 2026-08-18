import { bookings as seedBookings } from '@/data/bookings'
import { calculateTourTotal, selectCurrency } from '@/lib/currency'
import { createId } from '@/lib/utils'
import { storageService } from '../storage/storageService'
import { STORAGE_KEYS } from '../storage/storageKeys'
import type { Booking, BookingStatus, Locale, Tour, User } from '@/types'
import type { Country } from '@/data/countries'

function makeReference() {
  const year = new Date().getFullYear()
  const suffix = String(Math.floor(10000 + Math.random() * 90000))
  return `EGY-${year}-${suffix}`
}

export const bookingService = {
  list(): Booking[] {
    return storageService.get<Booking[]>(STORAGE_KEYS.bookings, seedBookings).map((booking) => ({ ...booking, reference: booking.reference ?? booking.id }))
  },
  listForUser(email: string) { return bookingService.list().filter((booking) => booking.customerEmail === email) },
  create(tour: Tour, user: Pick<User, 'name' | 'email'> & { phone: string; phoneCountryCode: string }, date: string, travelers: number, locale: Locale = 'en', country?: Country): Booking {
    const selected = calculateTourTotal(tour, travelers, locale)
    const booking: Booking = {
      id: createId('b'), reference: makeReference(), tourId: tour.id,
      tourTitle: locale === 'ar' ? tour.titleAr : tour.title,
      tourDuration: `${tour.days} ${tour.days === 1 ? 'day' : 'days'}${tour.nights ? ` / ${tour.nights} nights` : ''}`,
      meetingPoint: locale === 'ar' ? tour.meetingPointAr ?? tour.meetingPoint : tour.meetingPoint,
      cancellationPolicy: locale === 'ar' ? tour.cancellationAr ?? tour.cancellation : tour.cancellation,
      date, travelers, customerName: user.name, customerEmail: user.email, phone: user.phone, phoneCountryCode: user.phoneCountryCode,
      countryCode: country?.code, countryNameAr: country?.nameAr, countryNameEn: country?.nameEn,
      unitPrice: selected.current, total: selected.total, currency: selectCurrency(locale), locale,
      status: 'pending', createdAt: new Date().toISOString(),
    }
    storageService.set(STORAGE_KEYS.bookings, [...bookingService.list(), booking])
    return booking
  },
  updateStatus(id: string, status: BookingStatus) {
    const updated = bookingService.list().map((booking) => booking.id === id ? { ...booking, status } : booking)
    storageService.set(STORAGE_KEYS.bookings, updated); return updated
  },
  cancel(id: string) { return bookingService.updateStatus(id, 'cancelled') },
  remove(id: string) { const updated = bookingService.list().filter((booking) => booking.id !== id); storageService.set(STORAGE_KEYS.bookings, updated); return updated },
  stats() { const all = bookingService.list(); return { total: all.length, confirmed: all.filter((b) => b.status === 'confirmed').length, revenue: all.filter((b) => b.status !== 'cancelled').reduce((sum, b) => sum + b.total, 0) } },
}

export function exportBookingsCsv(bookings: Booking[]) {
  const header = ['Reference', 'Customer', 'Email', 'Phone', 'Country', 'Tour', 'Date', 'Travelers', 'Total', 'Currency', 'Status']
  const rows = bookings.map((b) => [b.reference ?? b.id, b.customerName, b.customerEmail, `${b.phoneCountryCode ?? ''} ${b.phone ?? ''}`.trim(), b.countryNameEn ?? b.countryCode ?? '', b.tourTitle, b.date, b.travelers, b.total, b.currency ?? 'USD', b.status])
  return [header, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n')
}

export type { BookingStatus }
