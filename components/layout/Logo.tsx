'use client'

import Image from 'next/image'
import Link from 'next/link'
import { routes } from '@/lib/routes'

export function Logo() {
  return (
    <Link
      href={routes.home}
      className="flex items-center shrink-0"
      aria-label="EgyptGo"
    >
      <span className="relative h-16 w-24 shrink-0">
        <Image
          src="/assets/logo-invoice.png"
          alt="EgyptGo"
          fill
          sizes="96px"
          priority
          className="object-contain"
        />
      </span>
    </Link>
  )
}