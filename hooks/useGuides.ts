'use client'

import { useEffect, useState } from 'react'
import { guideService } from '@/services/guides/guideService'
import { subscribeToStorageChanges } from '@/services/storage/storageService'
import { STORAGE_KEYS } from '@/services/storage/storageKeys'
import type { Guide } from '@/types'

export function useGuides() {
  const [guides, setGuides] = useState<Guide[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setGuides(guideService.listPublic())
    setIsReady(true)
    return subscribeToStorageChanges((key) => {
      if (key === STORAGE_KEYS.adminGuides) setGuides(guideService.listPublic())
    })
  }, [])

  return { guides, isReady }
}
