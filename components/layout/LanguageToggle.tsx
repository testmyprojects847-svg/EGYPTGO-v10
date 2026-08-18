'use client'

import { Globe } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage()
  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted"
    >
      <Globe className="size-3.5" />
      {locale === 'en' ? 'العربية' : 'English'}
    </button>
  )
}
