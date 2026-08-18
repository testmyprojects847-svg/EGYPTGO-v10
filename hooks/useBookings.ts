'use client'

import { useCallback, useEffect, useState } from 'react'
import { bookingService } from '@/services/bookings/bookingService'
import { useAuth } from './useAuth'
import type { Booking, Locale, Tour } from '@/types'

export function useBookings() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setBookings(bookingService.list())
    setIsReady(true)
  }, [])

  const mine = user ? bookings.filter((booking) => booking.customerEmail === user.email) : []

  const create = useCallback(
    (tour: Tour, date: string, travelers: number, locale: Locale = 'en', country: { code: string; nameAr: string; nameEn: string }, customer: { name: string; email: string; phone: string; phoneCountryCode: string }) => {
      const booking = bookingService.create(tour, customer, date, travelers, locale, country)
      setBookings(bookingService.list())
      return booking
    },
    [user],
  )

  const cancel = useCallback((id: string) => setBookings(bookingService.cancel(id)), [])

  return { bookings, mine, create, cancel, isReady }
}
