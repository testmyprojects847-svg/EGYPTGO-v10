'use client'

import type { ReactNode } from 'react'
import { AuthProvider } from './AuthProvider'
import { CurrencyProvider } from './CurrencyProvider'
import { LanguageProvider } from './LanguageProvider'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <AuthProvider>{children}</AuthProvider>
      </CurrencyProvider>
    </LanguageProvider>
  )
}
