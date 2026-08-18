import type { Currency, Locale } from '@/types'

export const APP_NAME = 'EgyptGo'
export const APP_NAME_AR = 'مصر جو'
export const SUPPORT_EMAIL = 'support@egyptgo.com'
export const SUPPORT_PHONE = '+20 (0)2 1234 5678'

export const LOCALES: Locale[] = ['en', 'ar']
export const DEFAULT_LOCALE: Locale = 'en'
export const CURRENCIES: Currency[] = ['USD', 'EGP']
export const DEFAULT_CURRENCY: Currency = 'USD'

export const EGP_PER_USD = 50
export const SERVICE_FEE_RATE = 0.08
export const MAX_TRAVELERS = 20

export const DEMO_CUSTOMER = { email: 'ahmed@example.com', password: 'password123', name: 'Ahmed Hassan' }
export const DEMO_ADMIN = { email: 'admin@egyptgo.com', password: 'admin123', name: 'EgyptGo Admin' }
