'use client'

import { Globe, WalletCards } from 'lucide-react'
import { useCurrency } from '@/hooks/useCurrency'
import { useLanguage } from '@/hooks/useLanguage'
import { CURRENCIES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { Currency, Locale } from '@/types'

export function SettingsPanel() {
  const { t, locale, setLocale } = useLanguage()
  const { currency, setCurrency } = useCurrency()

  const locales: { value: Locale; label: string }[] = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
  ]

  return (
    <div className="space-y-5">
      <p className="text-xs text-muted-foreground">{t('preferencesDesc')}</p>

      <Row icon={WalletCards} label={t('currency')}>
        {CURRENCIES.map((item: Currency) => (
          <Pill key={item} active={currency === item} onClick={() => setCurrency(item)}>
            {item}
          </Pill>
        ))}
      </Row>

      <Row icon={Globe} label={t('language')}>
        {locales.map((item) => (
          <Pill key={item.value} active={locale === item.value} onClick={() => setLocale(item.value)}>
            {item.label}
          </Pill>
        ))}
      </Row>
    </div>
  )
}

function Row({ icon: Icon, label, children }: { icon: typeof Globe; label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-border p-4">
      <p className="flex min-w-0 items-center gap-2 text-sm font-semibold">
        <Icon className="size-4 shrink-0 text-muted-foreground" />
        <span className="truncate">{label}</span>
      </p>
      <div className="flex shrink-0 items-center gap-2">{children}</div>
    </div>
  )
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors',
        active ? 'border-gold bg-gold text-gold-foreground' : 'border-border text-muted-foreground hover:bg-muted',
      )}
    >
      {children}
    </button>
  )
}
