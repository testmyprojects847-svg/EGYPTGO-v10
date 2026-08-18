export const routes = {
  home: '/',
  destinations: '/destinations',
  destination: (id: string) => `/destinations/${id}`,
  tours: '/tours',
  tour: (id: string) => `/tours/${id}`,
  guides: '/guides',
  guide: (id: string) => `/guides/${id}`,
  about: '/about',
  contact: '/contact',
  booking: (tourId: string) => `/booking/${tourId}`,
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  dashboard: '/dashboard',
  adminSignIn: '/admin/sign-in',
  admin: '/admin',
} as const

export const mainNav = [
  { href: routes.home, key: 'explore' },
  { href: routes.destinations, key: 'destinations' },
  { href: routes.tours, key: 'tours' },
  { href: routes.guides, key: 'guides' },
  { href: routes.about, key: 'about' },
] as const
