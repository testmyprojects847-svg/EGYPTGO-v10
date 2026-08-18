import { SERVICE_FEE_RATE } from './constants'
import type { Currency, Locale, PriceBreakdown, Tour } from '@/types'

export function selectCurrency(locale: Locale): Currency {
  return locale === 'ar' ? 'EGP' : 'USD'
}

export function getTourPrices(tour: Tour, currency: Currency) {
  const current = currency === 'EGP' ? (tour.priceEgp ?? Math.round(tour.price * 31)) : (tour.priceUsd ?? tour.price)
  const old = currency === 'EGP' ? (tour.oldPriceEgp ?? (tour.oldPrice ? Math.round(tour.oldPrice * 31) : undefined)) : (tour.oldPriceUsd ?? tour.oldPrice)
  const discount = old && old > current ? Math.round(((old - current) / old) * 100) : 0
  return { current, old: discount ? old : undefined, discount }
}

export function formatAmount(amount: number, currency: Currency): string {
  return currency === 'EGP' ? `${Math.round(amount).toLocaleString('ar-EG')} ج.م` : `$${Math.round(amount).toLocaleString('en-US')}`
}

export function formatPrice(tour: Tour, locale: Locale) {
  const currency = selectCurrency(locale)
  const prices = getTourPrices(tour, currency)
  return { ...prices, currency, formatted: formatAmount(prices.current, currency), formattedOld: prices.old ? formatAmount(prices.old, currency) : undefined }
}

export function calculatePrice(pricePerPerson: number, travelers: number, currency: Currency): PriceBreakdown {
  const base = pricePerPerson * Math.max(1, travelers)
  const serviceFee = Math.round(base * SERVICE_FEE_RATE)
  return { base, serviceFee, total: base + serviceFee, currency }
}

export function calculateTourTotal(tour: Tour, travelers: number, locale: Locale) {
  const selected = formatPrice(tour, locale)
  return { ...selected, total: selected.current * Math.max(1, travelers) }
}

export function convertPrice(amountUsd: number, currency: Currency) {
  return currency === 'EGP' ? amountUsd * 31 : amountUsd
}

export function formatLegacyPrice(amountUsd: number, currency: Currency = 'USD') {
  return formatAmount(Math.round(convertPrice(amountUsd, currency)), currency)
}

export const formatPriceBreakdown = calculatePrice
