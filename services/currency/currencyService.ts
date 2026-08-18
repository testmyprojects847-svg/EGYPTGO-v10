import { DEFAULT_CURRENCY } from '@/lib/constants'
import { calculatePrice, convertPrice, formatLegacyPrice } from '@/lib/currency'
import { storageService } from '../storage/storageService'
import { STORAGE_KEYS } from '../storage/storageKeys'
import type { Currency } from '@/types'

export const currencyService = {
  read(): Currency { return storageService.get<Currency>(STORAGE_KEYS.currency, DEFAULT_CURRENCY) },
  save(currency: Currency) { storageService.set(STORAGE_KEYS.currency, currency) },
  convert: convertPrice,
  format: formatLegacyPrice,
  breakdown: calculatePrice,
}
