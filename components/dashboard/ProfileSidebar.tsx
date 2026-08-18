'use client'

import Image from 'next/image'
import { Briefcase, Heart, LogOut, Settings, Star, UserRound } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import type { MessageKey } from '@/providers/LanguageProvider'
import { cn } from '@/lib/utils'
import type { User } from '@/types'
import type { DashboardSection } from './sections'

const items: { key: DashboardSection; label: MessageKey; icon: typeof Briefcase }[] = [
  { key: 'trips', label: 'myTrips', icon: Briefcase },
  { key: 'favorites', label: 'myFavorites', icon: Heart },
  { key: 'reviews', label: 'myReviews', icon: Star },
  { key: 'profile', label: 'profileInformation', icon: UserRound },
  { key: 'settings', label: 'settings', icon: Settings },
]

interface Props {
  user: User | null
  tierLabel: string
  active: DashboardSection
  onChange: (section: DashboardSection) => void
  onSignOut: () => void
}

export function ProfileSidebar({ user, tierLabel, active, onChange, onSignOut }: Props) {
  const { t, locale } = useLanguage()
  const name = (locale === 'ar' && user?.nameAr) || user?.name || ''
  const initials = name.trim().slice(0, 1).toUpperCase()

  return (
    <div className="overflow-hidden rounded-3xl bg-ink text-ink-foreground shadow-sm">
      <div className="flex flex-col items-center gap-2 px-6 pt-8 pb-6 text-center">
        <div className="relative size-20 overflow-hidden rounded-full ring-3 ring-ink-foreground/25">
          {user?.avatar ? (
            <Image src={user.avatar} alt={name} fill sizes="80px" className="object-cover" />
          ) : (
            <span className="grid size-full place-items-center bg-gold text-2xl font-bold text-gold-foreground">
              {initials || 'E'}
            </span>
          )}
        </div>
        <p className="mt-1 text-base font-bold">{name}</p>
        <p className="max-w-full truncate text-xs text-ink-muted">{user?.email}</p>
        <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-[11px] font-semibold text-gold">
          <Star className="size-3 fill-gold" />
          {tierLabel}
        </span>
      </div>

      <nav className="space-y-1 px-3 pb-4">
        {items.map((item) => {
          const isActive = active === item.key
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onChange(item.key)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-gold/20 text-gold' : 'text-ink-muted hover:bg-ink-foreground/5 hover:text-ink-foreground',
              )}
            >
              <item.icon className="size-4 shrink-0" />
              <span className="truncate">{t(item.label)}</span>
            </button>
          )
        })}
        <div className="my-2 h-px bg-ink-foreground/10" />
        <button
          type="button"
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-ink-foreground/5 hover:text-ink-foreground"
        >
          <LogOut className="size-4 shrink-0" />
          <span className="truncate">{t('logout')}</span>
        </button>
      </nav>
    </div>
  )
}
