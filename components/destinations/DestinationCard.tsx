'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'
import type { Destination } from '@/types'

export function DestinationCard({ destination }: { destination: Destination }) {
  const { locale } = useLanguage()
  return (
    <Link
      href={routes.destination(destination.id)}
      prefetch
      className="group relative block overflow-hidden rounded-2xl shadow-sm"
    >
      <div className="relative h-44 w-full overflow-hidden sm:h-48">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3.5">
        <p className="text-sm font-bold text-white">
          {locale === 'ar' ? destination.nameAr : destination.name}
        </p>
        <p className="text-[11px] text-white/75">{destination.country}</p>
      </div>
    </Link>
  )
}