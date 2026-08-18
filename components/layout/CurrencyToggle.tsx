'use client'

import { WalletCards } from 'lucide-react'
import { useCurrency } from '@/hooks/useCurrency'

export function CurrencyToggle() {
  const { currency, toggleCurrency } = useCurrency()
  return (
    <button
      type="button"
      onClick={toggleCurrency}
      className="hidden items-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted sm:flex"
    >
      <WalletCards className="size-3.5" />
      {currency}
    </button>
  )
}
