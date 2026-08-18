export interface StorageAdapter {
  get<T>(key: string, fallback: T): T
  set<T>(key: string, value: T): void
  remove(key: string): void
}

export const STORAGE_CHANGE_EVENT = 'egyptgo:storage-change'

export function subscribeToStorageChanges(listener: (key: string) => void) {
  if (typeof window === 'undefined') return () => undefined
  const onStorage = (event: StorageEvent) => {
    if (event.key) listener(event.key)
  }
  const onCustom = (event: Event) => listener((event as CustomEvent<string>).detail)
  window.addEventListener('storage', onStorage)
  window.addEventListener(STORAGE_CHANGE_EVENT, onCustom)
  return () => {
    window.removeEventListener('storage', onStorage)
    window.removeEventListener(STORAGE_CHANGE_EVENT, onCustom)
  }
}

function emitStorageChange(key: string) {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent(STORAGE_CHANGE_EVENT, { detail: key }))
}

export const storageService: StorageAdapter = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : fallback
    } catch {
      return fallback
    }
  },
  set<T>(key: string, value: T) {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      emitStorageChange(key)
    } catch {
      /* quota or private mode — ignore */
    }
  },
  remove(key: string) {
    if (typeof window !== 'undefined') window.localStorage.removeItem(key)
  },
}
