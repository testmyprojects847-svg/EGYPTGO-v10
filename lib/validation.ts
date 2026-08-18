import { MAX_TRAVELERS } from './constants'
import type { Locale } from '@/types'

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
export const isStrongPassword = (value: string) => value.length >= 8

export function validateCredentials(email: string, password: string, locale: Locale = 'en'): string | null {
  if (!isEmail(email)) return locale === 'ar' ? 'أدخل بريداً إلكترونياً صحيحاً.' : 'Enter a valid email address.'
  if (!password) return locale === 'ar' ? 'أدخل كلمة المرور.' : 'Enter your password.'
  return null
}

export function validateRegistration(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  locale: Locale = 'en',
): string | null {
  if (!name.trim()) return locale === 'ar' ? 'أدخل الاسم الكامل.' : 'Enter your full name.'
  const credentialError = validateCredentials(email, password, locale)
  if (credentialError) return credentialError
  if (!isStrongPassword(password)) return locale === 'ar' ? 'كلمة المرور يجب أن تكون 8 أحرف على الأقل.' : 'Password must be at least 8 characters.'
  if (password !== confirmPassword) return locale === 'ar' ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.'
  return null
}

export function validateBooking(travelers: number, date: string, locale: Locale = 'en', maxTravelers = MAX_TRAVELERS): string | null {
  if (!Number.isInteger(travelers) || travelers < 1 || travelers > maxTravelers)
    return locale === 'ar' ? `عدد المسافرين بين 1 و ${maxTravelers}.` : `Travelers must be between 1 and ${maxTravelers}.`
  if (!date) return locale === 'ar' ? 'اختر تاريخ الرحلة.' : 'Select a travel date.'
  const selected = new Date(`${date}T00:00:00`)
  const today = new Date(); today.setHours(0, 0, 0, 0)
  if (Number.isNaN(selected.getTime()) || selected < today) return locale === 'ar' ? 'اختر تاريخاً مستقبلياً.' : 'Choose a future travel date.'
  return null
}

export function validateReview(text: string, rating: number, locale: Locale = 'en'): string | null {
  if (text.trim().length < 3) return locale === 'ar' ? 'اكتب تقييماً أطول.' : 'Write a slightly longer review.'
  if (rating < 1 || rating > 5) return locale === 'ar' ? 'التقييم بين 1 و 5.' : 'Rating must be between 1 and 5.'
  return null
}
