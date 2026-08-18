'use client'

import type { ReactNode } from 'react'
import { useLanguage } from '@/hooks/useLanguage'

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  const { isRtl } = useLanguage()
  return (
    <div className={`flex items-end justify-between gap-4 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
      <div>
        {eyebrow && <p className="text-[11px] font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>}
        <h1 className="mt-2 text-3xl font-bold">{title}</h1>
        {description && <p className="mt-2 max-w-xl text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  )
}
