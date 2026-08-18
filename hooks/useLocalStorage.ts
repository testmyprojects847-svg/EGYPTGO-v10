'use client'

import { useCallback, useEffect, useState } from 'react'
import { storageService } from '@/services/storage/storageService'

export function useLocalStorage<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setValue(storageService.get<T>(key, fallback))
    setIsReady(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const update = useCallback(
    (next: T | ((current: T) => T)) => {
      setValue((current) => {
        const resolved = typeof next === 'function' ? (next as (current: T) => T)(current) : next
        storageService.set(key, resolved)
        return resolved
      })
    },
    [key],
  )

  return [value, update, isReady] as const
}
