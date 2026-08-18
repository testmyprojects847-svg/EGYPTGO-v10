export const STORAGE_KEYS = {
  locale: 'egyptgo_locale',
  currency: 'egyptgo_currency',
  session: 'egyptgo_session',
  role: 'egyptgo_role',
  favorites: 'egyptgo_favorites',
  bookings: 'egyptgo_bookings',
  reviews: 'egyptgo_reviews',
  notifications: 'egyptgo_notifications',
  adminTours: 'egyptgo_admin_tours',
  adminGuides: 'egyptgo_admin_guides',
  adminSettings: 'egyptgo_admin_settings',
  adminReviews: 'egyptgo_admin_reviews',
  adminUsers: 'egyptgo_admin_users',
  schemaVersion: 'egyptgo_schema_version',
} as const

export const LEGACY_KEYS = {
  locale: 'egyptgo_lang',
  role: 'egyptgo_auth',
  session: 'egyptgo_auth_user',
  google: 'egyptgo_google_session',
} as const

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]
