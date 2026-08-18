'use client'

import Image from 'next/image'
import { Menu, Search, UserRound } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/hooks/useLanguage'

export function AdminHeader({ onMenu }: { onMenu: () => void }) {
  const { isRtl, locale } = useLanguage()
  const { user } = useAuth()
  const name = (locale === 'ar' && user?.nameAr) || user?.name || 'Admin User'

  return (
    <header dir={isRtl ? 'rtl' : 'ltr'} className="flex flex-col gap-4 border-b border-border bg-card px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} className="rounded-xl border border-border p-2 md:hidden" aria-label="Open navigation">
          <Menu className="size-5" />
        </button>
        <div>
          <p className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-foreground">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="text-xl font-bold">Good morning, {name.split(' ')[0]}</h1>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <label className="relative flex min-w-0 flex-1 items-center sm:w-64">
          <Search className="absolute start-3 size-4 text-muted-foreground" />
          <input
            aria-label="Global search"
            placeholder="Search anything..."
            className="w-full rounded-xl border border-input bg-background py-2.5 ps-9 pe-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <div className="hidden items-center gap-2 border-s border-border ps-3 sm:flex">
          <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-secondary text-secondary-foreground">
            {user?.avatar ? (
              <Image src={user.avatar} alt={name} fill sizes="36px" className="object-cover" />
            ) : (
              <UserRound className="size-4" />
            )}
          </span>
          <div>
            <p className="text-xs font-semibold">{name}</p>
            <p className="text-[11px] text-muted-foreground">Super admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}