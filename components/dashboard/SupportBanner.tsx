'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Headset } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'

export function SupportBanner() {
  const { t, isRtl } = useLanguage()

  return (
    <section className="relative min-h-[280px] w-full overflow-hidden rounded-3xl">
      <div className="absolute inset-0">
        <Image
          src="/assets/temple.png"
          alt="Egyptian Temple"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
      </div>

      <div
        className={`relative flex min-h-[280px] w-full flex-col justify-center gap-8 px-8 py-10 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-14 ${
          isRtl ? 'text-right' : 'text-left'
        }`}
      >
        <div className="flex items-center gap-5">
          <span className="grid size-14 shrink-0 place-items-center text-gold">
            <Headset className="size-8" strokeWidth={2.2} />
          </span>

          <div>
            <p className="text-xl font-bold text-white sm:text-2xl">
              {t('needHelpTitle')}
            </p>

            <p className="mt-2 text-sm font-medium text-white/95 sm:text-base">
              {t('needHelpDesc')}
            </p>
          </div>
        </div>

        <Link
          href={routes.contact}
          className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-white/60 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:border-gold hover:bg-gold hover:text-gold-foreground hover:shadow-lg"
        >
          {t('contactSupport')}

          <ArrowRight
            className={`size-4 transition-transform duration-200 group-hover:translate-x-0.5 ${
              isRtl ? 'rotate-180 group-hover:-translate-x-0.5' : ''
            }`}
          />
        </Link>
      </div>
    </section>
  )
}