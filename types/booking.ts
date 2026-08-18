import type { Currency } from './index'

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Booking {
  id: string
  reference?: string
  tourId: string
  tourTitle: string
  tourDuration?: string
  meetingPoint?: string
  cancellationPolicy?: string
  date: string
  travelers: number
  customerName: string
  customerEmail: string
  phone?: string
  destination?: string
  saved?: number
  unitPrice?: number
  total: number
  currency?: Currency
  locale?: 'en' | 'ar'
  status: BookingStatus
  createdAt: string
}

export interface PriceBreakdown {
  base: number
  serviceFee: number
  total: number
  currency: Currency
}

export interface PaymentRecord {
  id: string
  bookingId: string
  amount: number
  method: 'card' | 'wallet'
  status: 'paid' | 'refunded' | 'failed'
  createdAt: string
}
