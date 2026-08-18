import { storageService } from '../storage/storageService'
import { STORAGE_KEYS } from '../storage/storageKeys'

export const favoriteService = {
  list(): string[] {
    return storageService.get<string[]>(STORAGE_KEYS.favorites, [])
  },
  has(id: string): boolean {
    return favoriteService.list().includes(id)
  },
  toggle(id: string): string[] {
    const current = favoriteService.list()
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    storageService.set(STORAGE_KEYS.favorites, next)
    return next
  },
  clear() {
    storageService.set(STORAGE_KEYS.favorites, [])
  },
}
