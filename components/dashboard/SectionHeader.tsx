'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'

export function SectionHeader({
  title,
  href,
  action,
  onAction,
}: {
  title: string
  href?: string
  action?: string
  onAction?: () => void
}) {
  const { isRtl } = useLanguage()
  return (
    <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <h2 className="truncate text-base font-bold">{title}</h2>
      {action && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="flex shrink-0 items-center gap-1 text-xs font-semibold text-gold hover:underline"
        >
          {action}
          <ArrowRight className={`size-3 ${isRtl ? 'rotate-180' : ''}`} />
        </button>
      )}
      {action && !onAction && href && (
        <Link href={href} className="flex shrink-0 items-center gap-1 text-xs font-semibold text-gold hover:underline">
          {action}
          <ArrowRight className={`size-3 ${isRtl ? 'rotate-180' : ''}`} />
        </Link>
      )}
    </div>
  )
}