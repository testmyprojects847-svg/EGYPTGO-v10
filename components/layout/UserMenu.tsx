'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Briefcase, ChevronDown, LayoutDashboard, LogOut, Settings, UserRound } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'

export function UserMenu() {
  const { t, locale } = useLanguage()
  const { user, role, signOut } = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isAdmin = role === 'admin'

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const name = (locale === 'ar' && user?.nameAr) || user?.name || ''

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pe-2.5 ps-1 text-xs font-semibold hover:bg-muted"
      >
        <span className="relative grid size-7 shrink-0 place-items-center overflow-hidden rounded-full bg-gold text-gold-foreground">
          {user?.avatar ? (
            <Image src={user.avatar} alt={name} fill sizes="28px" className="object-cover" />
          ) : (
            <span className="text-[11px] font-bold">{name.slice(0, 1).toUpperCase() || 'E'}</span>
          )}
        </span>
        <span className="hidden max-w-24 truncate sm:block">{name}</span>
        <ChevronDown className="size-3 shrink-0 text-muted-foreground" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute end-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-border bg-popover p-1.5 shadow-lg"
        >
          <div className="px-2.5 py-2">
            <p className="truncate text-xs font-bold">{name}</p>
            <p className="truncate text-[11px] text-muted-foreground">{user?.email}</p>
          </div>
          <div className="my-1 h-px bg-border" />

          {isAdmin ? (
            <>
              <MenuLink href={routes.admin} icon={LayoutDashboard} label={t('adminDashboard')} onNavigate={() => setOpen(false)} />
              <MenuLink href={`${routes.admin}?tab=profile`} icon={UserRound} label={t('myProfile')} onNavigate={() => setOpen(false)} />
            </>
          ) : (
            <>
              <MenuLink href={routes.dashboard} icon={LayoutDashboard} label={t('dashboard')} onNavigate={() => setOpen(false)} />
              <MenuLink href={`${routes.dashboard}?section=trips`} icon={Briefcase} label={t('myTrips')} onNavigate={() => setOpen(false)} />
              <MenuLink href={`${routes.dashboard}?section=profile`} icon={UserRound} label={t('myProfile')} onNavigate={() => setOpen(false)} />
              <MenuLink href={`${routes.dashboard}?section=settings`} icon={Settings} label={t('settings')} onNavigate={() => setOpen(false)} />
            </>
          )}

          <div className="my-1 h-px bg-border" />
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false)
              signOut()
              router.push(routes.home)
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-destructive hover:bg-destructive/10"
          >
            <LogOut className="size-3.5 shrink-0" />
            {t('logout')}
          </button>
        </div>
      )}
    </div>
  )
}

function MenuLink({
  href,
  icon: Icon,
  label,
  onNavigate,
}: {
  href: string
  icon: typeof Briefcase
  label: string
  onNavigate: () => void
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onNavigate}
      className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium hover:bg-muted"
    >
      <Icon className="size-3.5 shrink-0 text-muted-foreground" />
      <span className="truncate">{label}</span>
    </Link>
  )
}
