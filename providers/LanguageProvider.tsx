'use client'

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import en from '@/messages/en.json'
import ar from '@/messages/ar.json'
import { DEFAULT_LOCALE } from '@/lib/constants'
import { dirOf, isRtl } from '@/lib/utils'
import { storageService } from '@/services/storage/storageService'
import { STORAGE_KEYS } from '@/services/storage/storageKeys'
import type { Locale } from '@/types'

type Messages = typeof en
export type MessageKey = keyof Messages

const dictionaries: Record<Locale, Messages> = { en, ar: ar as Messages }

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: (key: MessageKey) => string
  isRtl: boolean
  dir: 'rtl' | 'ltr'
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  useEffect(() => {
    setLocaleState(storageService.get<Locale>(STORAGE_KEYS.locale, DEFAULT_LOCALE))
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = dirOf(locale)
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    storageService.set(STORAGE_KEYS.locale, next)
    setLocaleState(next)
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale(locale === 'en' ? 'ar' : 'en'),
      t: (key: MessageKey) => dictionaries[locale][key] ?? dictionaries.en[key] ?? String(key),
      isRtl: isRtl(locale),
      dir: dirOf(locale),
    }),
    [locale, setLocale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
