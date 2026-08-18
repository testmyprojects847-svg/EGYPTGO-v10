'use client'

import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { SUPPORT_EMAIL, SUPPORT_PHONE } from '@/lib/constants'
import { mainNav, routes } from '@/lib/routes'
import type { MessageKey } from '@/providers/LanguageProvider'

export function Footer() {
  const { t, dir } = useLanguage()
  return (
    <footer dir={dir} className="border-t border-border bg-ink px-4 py-10 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <p className="text-base font-bold text-ink-foreground">{t('appName')}</p>
          <p className="mt-2 max-w-xs text-xs leading-5 text-ink-muted">{t('handpickedDesc')}</p>
        </div>
        <nav className="flex min-w-0 flex-col gap-2 text-xs text-ink-muted">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} prefetch className="hover:text-ink-foreground">
              {t(item.key as MessageKey)}
            </Link>
          ))}
          <Link href={routes.contact} prefetch className="hover:text-ink-foreground">
            {t('contact')}
          </Link>
        </nav>
        <div className="min-w-0 text-xs text-ink-muted">
          <p className="break-words">{SUPPORT_EMAIL}</p>
          <p className="mt-2">{SUPPORT_PHONE}</p>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl border-t border-ink-foreground/10 pt-5 text-[11px] text-ink-muted">
        © 2026 {t('appName')}
      </p>
    </footer>
  )
}
