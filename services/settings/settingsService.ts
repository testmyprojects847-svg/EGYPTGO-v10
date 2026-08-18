import { storageService } from '@/services/storage/storageService'
import { STORAGE_KEYS } from '@/services/storage/storageKeys'

export interface AdminSettings {
  siteName: string
  siteNameAr: string
  defaultLocale: 'en' | 'ar'
  defaultCurrency: 'USD' | 'EGP'
  bookingEnabled: boolean
  registrationEnabled: boolean
  cancellationWindowHours: number
  contactEmail: string
  navigation: Array<{ id: string; label: string; labelAr: string; href: string; visible: boolean; order: number }>
}

const defaults: AdminSettings = {
  siteName: 'EgyptGO', siteNameAr: 'إيجيبت جو', defaultLocale: 'en', defaultCurrency: 'USD',
  bookingEnabled: true, registrationEnabled: true, cancellationWindowHours: 48,
  contactEmail: 'hello@egyptgo.com',
  navigation: [
    { id: 'tours', label: 'Tours', labelAr: 'الجولات', href: '/tours', visible: true, order: 1 },
    { id: 'destinations', label: 'Destinations', labelAr: 'الوجهات', href: '/destinations', visible: true, order: 2 },
    { id: 'guides', label: 'Guides', labelAr: 'المرشدون', href: '/guides', visible: true, order: 3 },
  ],
}

export const settingsService = {
  get(): AdminSettings {
    return storageService.get<AdminSettings>(STORAGE_KEYS.adminSettings, defaults)
  },
  save(patch: Partial<AdminSettings>): AdminSettings {
    const next = { ...settingsService.get(), ...patch }
    storageService.set(STORAGE_KEYS.adminSettings, next)
    return next
  },
  reset(): AdminSettings {
    storageService.set(STORAGE_KEYS.adminSettings, defaults)
    return defaults
  },
}
