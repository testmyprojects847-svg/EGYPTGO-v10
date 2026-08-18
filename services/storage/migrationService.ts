import { storageService } from './storageService'
import { LEGACY_KEYS, STORAGE_KEYS } from './storageKeys'

const CURRENT_VERSION = 3

/** Moves data written by earlier EgyptGo builds onto the current storage keys. */
export function runStorageMigrations() {
  if (typeof window === 'undefined') return
  const version = storageService.get<number>(STORAGE_KEYS.schemaVersion, 1)
  if (version >= CURRENT_VERSION) return

  const pairs: [string, string][] = [
    [LEGACY_KEYS.locale, STORAGE_KEYS.locale],
    [LEGACY_KEYS.role, STORAGE_KEYS.role],
    [LEGACY_KEYS.session, STORAGE_KEYS.session],
  ]

  for (const [legacy, next] of pairs) {
    const value = window.localStorage.getItem(legacy)
    if (value !== null && window.localStorage.getItem(next) === null) window.localStorage.setItem(next, value)
    window.localStorage.removeItem(legacy)
  }
  window.localStorage.removeItem(LEGACY_KEYS.google)

  // v3: the seed catalog (tours, bookings, reviews) was substantially enriched.
  // Clear cached seed collections so the new data surfaces. User-owned data
  // (session, role, favorites) is preserved.
  if (version < 3) {
    window.localStorage.removeItem(STORAGE_KEYS.adminTours)
    window.localStorage.removeItem(STORAGE_KEYS.adminReviews)
    window.localStorage.removeItem(STORAGE_KEYS.bookings)
    window.localStorage.removeItem(STORAGE_KEYS.reviews)
  }

  storageService.set(STORAGE_KEYS.schemaVersion, CURRENT_VERSION)
}
