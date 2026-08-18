'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import type { MessageKey } from '@/providers/LanguageProvider'
import { useAuth } from '@/hooks/useAuth'
import { mainNav, routes } from '@/lib/routes'
import { Logo } from './Logo'
import { LanguageToggle } from './LanguageToggle'
import { UserMenu } from './UserMenu'

export function Topbar() {
  const { t, dir } = useLanguage()
  const { role } = useAuth()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header dir={dir} className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
      <div className="flex items-center justify-between gap-3 px-4 py-3 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-6 text-xs font-medium text-muted-foreground lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              className={`transition hover:text-foreground ${pathname === item.href ? 'text-foreground' : ''}`}
            >
              {t(item.key as MessageKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <LanguageToggle />
          </div>
          {role === 'guest' ? (
            <>
              <Link href={routes.signIn} prefetch className="hidden text-xs font-medium sm:block">
                {t('signIn')}
              </Link>
              <Link
                href={routes.signUp}
                prefetch
                className="rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground"
              >
                {t('signUp')}
              </Link>
            </>
          ) : (
            <UserMenu />
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Menu"
            aria-expanded={open}
            className="grid size-9 shrink-0 place-items-center rounded-lg border border-border lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-card px-4 pb-4 pt-2 lg:hidden">
          <div className="flex flex-col">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                className="rounded-lg px-2 py-2.5 text-sm font-medium hover:bg-muted"
              >
                {t(item.key as MessageKey)}
              </Link>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 sm:hidden">
            <LanguageToggle />
            {role === 'guest' && (
              <Link href={routes.signIn} prefetch className="text-xs font-medium">
                {t('signIn')}
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
