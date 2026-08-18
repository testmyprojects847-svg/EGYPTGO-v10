import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Locale } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isRtl = (locale: Locale) => locale === 'ar'
export const dirOf = (locale: Locale) => (isRtl(locale) ? 'rtl' : 'ltr')
export const localized = (locale: Locale, english: string, arabic: string) => (locale === 'ar' ? arabic : english)
export const createId = (prefix: string) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
export const formatDate = (value: string, locale: Locale = 'en') =>
  new Date(value).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })
