'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useBookings } from '@/hooks/useBookings'
import { useFavorites } from '@/hooks/useFavorites'
import { useLanguage } from '@/hooks/useLanguage'
import { useReviews } from '@/hooks/useReviews'
import { membershipKey, membershipTier } from '@/lib/membership'
import { routes } from '@/lib/routes'
import { tourService } from '@/services/tours/tourService'
import { BookingCard } from './BookingCard'
import { FavoriteCard } from './FavoriteCard'
import { ProfileForm } from './ProfileForm'
import { ProfileHeroCard } from './ProfileHeroCard'
import { QuickActionsGrid } from './QuickActionsGrid'
import { ReviewCard } from './ReviewCard'
import { SectionHeader } from './SectionHeader'
import { SettingsPanel } from './SettingsPanel'
import { SupportBanner } from './SupportBanner'
import { UpcomingTripCard } from './UpcomingTripCard'
import type { DashboardSection } from './sections'

type View = 'overview' | DashboardSection

export function CustomerDashboard() {
  const { t, locale, dir } = useLanguage()
  const { user, signOut } = useAuth()
  const { mine, cancel } = useBookings()
  const { favorites, toggle } = useFavorites()
  const { reviews } = useReviews()
  const router = useRouter()
  const [view, setView] = useState<View>('overview')

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('section')
    const allowed: View[] = ['trips', 'favorites', 'reviews', 'profile', 'settings']
    if (requested && (allowed as string[]).includes(requested)) setView(requested as View)
  }, [])

  const myReviews = useMemo(() => reviews.filter((review) => review.userId === user?.id), [reviews, user?.id])
  const activeTrips = mine.filter((booking) => booking.status !== 'cancelled')
  const tier = membershipTier(mine)
  const name = (locale === 'ar' && user?.nameAr) || user?.name || ''

  const handleSignOut = () => {
    signOut()
    router.push(routes.home)
  }

  const stats = [
    { key: 'trips', label: 'myTrips' as const, value: activeTrips.length, icon: '/assets/icons/trips.png' },
    { key: 'bookings', label: 'myBookings' as const, value: mine.length, icon: '/assets/icons/bookings.png' },
    { key: 'favorites', label: 'myFavorites' as const, value: favorites.length, icon: '/assets/icons/favorites.png' },
    { key: 'reviews', label: 'myReviews' as const, value: myReviews.length, icon: '/assets/icons/reviews.png' },
  ]

  return (
    <div dir={dir} className="min-h-screen bg-surface pb-16">
      <div className="mx-auto max-w-6xl space-y-4 px-3 py-4 sm:px-4 sm:py-6 lg:space-y-6 lg:px-8 lg:py-8">
        <ProfileHeroCard name={name} tierLabel={t(membershipKey(tier))} stats={stats} onEditProfile={() => setView('profile')} />

        {view === 'overview' && (
          <>
            <div className="grid items-start gap-4 lg:grid-cols-[1.5fr_1fr] lg:gap-6">
              <UpcomingTripCard bookings={mine} />
              <QuickActionsGrid onOpenProfile={() => setView('profile')} />
            </div>

            <div className="grid items-start gap-4 lg:grid-cols-[1.5fr_1fr] lg:gap-6">
              <Panel>
                <SectionHeader title={t('myFavorites')} href="#" action={t('viewAll')} onAction={() => setView('favorites')} />
                <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                  {favorites.length === 0 && <Empty message={t('noFavoritesYet')} href={routes.tours} cta={t('browseTours')} />}
                  {favorites.slice(0, 4).map((id) => (
                    <FavoriteCard key={id} id={id} tour={tourService.getById(id)} onRemove={toggle} />
                  ))}
                </div>
              </Panel>

              <Panel>
                <SectionHeader title={t('recentReviews')} href="#" action={t('viewAll')} onAction={() => setView('reviews')} />
                <div className="space-y-3">
                  {myReviews.length === 0 && <Empty message={t('noReviewsYet')} href={routes.tours} cta={t('browseTours')} />}
                  {myReviews.slice(0, 2).map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </Panel>
            </div>

            <SupportBanner />
          </>
        )}

        {view !== 'overview' && (
          <button
            type="button"
            onClick={() => setView('overview')}
            className="text-xs font-semibold text-gold hover:underline"
          >
            ← {t('backToOverview')}
          </button>
        )}

        {view === 'trips' && (
          <Panel>
            <SectionHeader title={t('myTrips')} href={routes.tours} action={t('browseTours')} />
            <div className="space-y-3">
              {mine.length === 0 && <Empty message={t('noTripsYet')} href={routes.tours} cta={t('browseTours')} />}
              {mine.map((booking) => (
                <BookingCard key={booking.id} booking={booking} onCancel={cancel} />
              ))}
            </div>
          </Panel>
        )}

        {view === 'favorites' && (
          <Panel>
            <SectionHeader title={t('myFavorites')} href={routes.tours} action={t('browseTours')} />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {favorites.length === 0 && <Empty message={t('noFavoritesYet')} href={routes.tours} cta={t('browseTours')} />}
              {favorites.map((id) => (
                <FavoriteCard key={id} id={id} tour={tourService.getById(id)} onRemove={toggle} />
              ))}
            </div>
          </Panel>
        )}

        {view === 'reviews' && (
          <Panel>
            <SectionHeader title={t('myReviews')} />
            <div className="grid gap-3 xl:grid-cols-2">
              {myReviews.length === 0 && <Empty message={t('noReviewsYet')} href={routes.tours} cta={t('browseTours')} />}
              {myReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </Panel>
        )}

        {view === 'profile' && (
          <Panel>
            <SectionHeader title={t('profileInformation')} />
            <ProfileForm />
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-5 text-xs font-semibold text-destructive hover:underline"
            >
              {t('logout')}
            </button>
          </Panel>
        )}

        {view === 'settings' && (
          <Panel>
            <SectionHeader title={t('preferences')} />
            <SettingsPanel />
          </Panel>
        )}
      </div>
    </div>
  )
}

function Panel({ children }: { children: React.ReactNode }) {
  return <section className="rounded-3xl border border-border bg-card p-5 shadow-sm">{children}</section>
}

function Empty({ message, href, cta }: { message: string; href: string; cta: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-6 text-center">
      <p className="text-xs text-muted-foreground">{message}</p>
      <a href={href} className="mt-3 inline-block rounded-xl bg-ink px-4 py-2 text-xs font-bold text-ink-foreground">
        {cta}
      </a>
    </div>
  )
}
