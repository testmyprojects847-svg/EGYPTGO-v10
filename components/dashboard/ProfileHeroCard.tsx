'use client'

import Image from 'next/image'
import { Pencil, Star } from 'lucide-react'
import { AvatarUpload } from './AvatarUpload'
import { useLanguage } from '@/hooks/useLanguage'
import type { MessageKey } from '@/providers/LanguageProvider'

interface Stat {
  key: string
  label: MessageKey
  value: number
  icon: string
}

export function ProfileHeroCard({
  name,
  tierLabel,
  stats,
  onEditProfile,
}: {
  name: string
  tierLabel: string
  stats: Stat[]
  onEditProfile: () => void
}) {
  const { t } = useLanguage()

  return (
    <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-6">
        {/* Cover */}
        <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-2xl sm:h-32 lg:h-28 lg:w-48">
          <Image src="/images/tours/giza.png" alt="" fill sizes="(max-width: 1024px) 100vw, 200px" className="object-cover" />
        </div>

        {/* Identity */}
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
          <AvatarUpload name={name} size={72} />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-muted-foreground">{t('welcomeBack')}</p>
            <h1 className="mt-0.5 truncate text-xl font-extrabold tracking-tight sm:text-2xl">{name}</h1>
            <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-[11px] font-semibold text-gold">
              <Star className="size-3 fill-gold" />
              {tierLabel}
            </span>
          </div>
        </div>

        {/* Stats + edit */}
        <div className="flex flex-col gap-3 lg:items-end">
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {stats.map((stat) => (
              <div key={stat.key} className="rounded-2xl bg-secondary px-1.5 py-2.5 text-center shadow-sm sm:px-3 lg:w-24">
                <Image
                  src={stat.icon}
                  alt={t(stat.label)}
                  width={56}
                  height={56}
                  className="mx-auto size-12 object-contain sm:size-14"
                />
                <p className="mt-1.5 text-base font-extrabold leading-none sm:text-lg">{stat.value}</p>
                <p className="mt-1 truncate text-[9px] font-semibold text-foreground/70 sm:text-[10px]">
                  {t(stat.label)}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onEditProfile}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-gold/40 px-4 py-2 text-xs font-bold text-gold transition-colors hover:bg-gold/10 lg:w-auto"
          >
            <Pencil className="size-3.5" />
            {t('editProfile')}
          </button>
        </div>
      </div>
    </section>
  )
}
