'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'
import type { MessageKey } from '@/providers/LanguageProvider'

export function QuickActionsGrid({
  onOpenProfile,
}: {
  onOpenProfile: () => void
}) {
  const { t } = useLanguage()

  const tiles: {
    key: string
    iconSrc: string
    label: MessageKey
    href?: string
  }[] = [
    {
      key: 'tours',
      iconSrc: '/assets/icons/mytour.jpg',
      label: 'exploreTours',
      href: routes.tours,
    },
    {
      key: 'bookings',
      iconSrc: '/assets/icons/mybooking.jpg',
      label: 'myBookings',
      href: `${routes.dashboard}?section=trips`,
    },
    {
      key: 'favorites',
      iconSrc: '/assets/icons/myfavorite.jpg',
      label: 'myFavorites',
      href: `${routes.dashboard}?section=favorites`,
    },
    {
      key: 'profile',
      iconSrc: '/assets/icons/myprofile.jpg',
      label: 'myProfile',
    },
  ]

  return (
    <section className="rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-5 lg:p-6">
      <h2 className="mb-4 text-base font-bold sm:mb-5 sm:text-lg">
        {t('quickActions')}
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
        {tiles.map((tile) => {
          const content = (
            <div className="flex w-full items-center justify-center">
              <div
                className="
                  relative
                  aspect-[4/3]
                  w-full
                  max-w-[180px]
                  overflow-hidden
                  rounded-xl
                  shadow-[0_8px_20px_rgba(0,0,0,0.22)]
                  transition-all
                  duration-300
                  group-hover:-translate-y-1
                  group-hover:scale-[1.03]
                  group-hover:shadow-[0_14px_30px_rgba(0,0,0,0.30)]
                  sm:max-w-[220px]
                  sm:rounded-2xl
                  md:max-w-[240px]
                  lg:max-w-[280px]
                  xl:max-w-[320px]
                "
              >
                <Image
                  src={tile.iconSrc}
                  alt={t(tile.label)}
                  fill
                  sizes="
                    (max-width: 640px) 45vw,
                    (max-width: 768px) 40vw,
                    (max-width: 1024px) 30vw,
                    (max-width: 1280px) 25vw,
                    320px
                  "
                  className="object-cover"
                />
              </div>
            </div>
          )

          if (tile.href) {
            return (
              <Link
                key={tile.key}
                href={tile.href}
                aria-label={t(tile.label)}
                className="
                  group
                  flex
                  min-h-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-transparent
                  p-1
                  transition-all
                  duration-300
                "
              >
                {content}
              </Link>
            )
          }

          return (
            <button
              key={tile.key}
              type="button"
              onClick={onOpenProfile}
              aria-label={t(tile.label)}
              className="
                group
                flex
                min-h-0
                items-center
                justify-center
                rounded-2xl
                bg-transparent
                p-1
                transition-all
                duration-300
              "
            >
              {content}
            </button>
          )
        })}
      </div>
    </section>
  )
}