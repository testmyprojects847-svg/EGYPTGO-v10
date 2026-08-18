'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export function BackLink({ href, label }: { href: string; label?: string }) {
  const { t, isRtl } = useLanguage()
  const Icon = isRtl ? ArrowRight : ArrowLeft
  return (
    <Link href={href} className={`mb-5 flex items-center gap-2 text-xs font-semibold text-muted-foreground ${isRtl ? 'flex-row-reverse' : ''}`}>
      <Icon className="size-3.5" />
      {label ?? t('back')}
    </Link>
  )
}
