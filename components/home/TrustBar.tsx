'use client'

import { BadgeCheck, Headphones, ShieldCheck, Sparkles } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export function TrustBar() {
  const { t, dir } = useLanguage()
  const items = [
    { icon: BadgeCheck, title: t('bestPrice'), desc: t('bestPriceDesc') },
    { icon: ShieldCheck, title: t('secureBooking'), desc: t('secureBookingDesc') },
    { icon: Headphones, title: t('support247'), desc: t('support247Desc') },
    { icon: Sparkles, title: t('handpicked'), desc: t('handpickedDesc') },
  ]

  return (
    <section dir={dir} className="mx-3 mb-12 rounded-3xl bg-ink px-5 py-8 sm:mx-4 sm:px-8 lg:mx-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex min-w-0 items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-ink-foreground/10 text-gold">
              <Icon className="size-4.5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-ink-foreground">{title}</p>
              <p className="mt-0.5 text-xs text-ink-muted">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
