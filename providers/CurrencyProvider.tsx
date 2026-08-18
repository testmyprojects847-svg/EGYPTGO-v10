'use client'

import { createContext, useMemo, type ReactNode } from 'react'
import { formatAmount } from '@/lib/currency'
import type { Currency, PriceBreakdown } from '@/types'

interface CurrencyContextValue {
  currency: Currency
  setCurrency: (currency: Currency) => void
  toggleCurrency: () => void
  format: (amount: number) => string
  breakdown: (pricePerPerson: number, travelers: number) => PriceBreakdown
}

export const CurrencyContext = createContext<CurrencyContextValue | null>(null)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const value = useMemo<CurrencyContextValue>(() => ({
    currency: 'USD',
    setCurrency: () => undefined,
    toggleCurrency: () => undefined,
    format: (amount) => formatAmount(amount, 'USD'),
    breakdown: (pricePerPerson, travelers) => {
      const base = pricePerPerson * Math.max(1, travelers)
      return { base, serviceFee: 0, total: base, currency: 'USD' }
    },
  }), [])

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}
