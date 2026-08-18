'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck, Star } from 'lucide-react'
import { useCurrency } from '@/hooks/useCurrency'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'
import type { Guide } from '@/types'

export function GuideCard({ guide }: { guide: Guide }) {
  const { locale } = useLanguage()
  const { format } = useCurrency()
  return (
    <Link
      href={routes.guide(guide.id)}
      className="group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={guide.image}
          alt={guide.name}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-bold">{locale === 'ar' ? guide.nameAr : guide.name}</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {guide.city} · {locale === 'ar' ? guide.specialtyAr ?? guide.specialty : guide.specialty}
            </p>
          </div>
          {guide.verified && <ShieldCheck className="size-4 text-accent" />}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1">
            <Star className="size-3 fill-accent text-accent" />
            {guide.rating} ({guide.reviews})
          </span>
          <span className="font-bold">
            {format(guide.price)}
            <span className="font-normal text-muted-foreground">/hr</span>
          </span>
        </div>
      </div>
    </Link>
  )
}