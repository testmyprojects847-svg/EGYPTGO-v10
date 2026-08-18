'use client'

import { useEffect, useState } from 'react'
import { settingsService, type AdminSettings } from '@/services/settings/settingsService'
import { subscribeToStorageChanges } from '@/services/storage/storageService'
import { STORAGE_KEYS } from '@/services/storage/storageKeys'

export function useSettings() {
  const [settings, setSettings] = useState<AdminSettings>(() => settingsService.get())
  useEffect(() => {
    return subscribeToStorageChanges((key) => {
      if (key === STORAGE_KEYS.adminSettings) setSettings(settingsService.get())
    })
  }, [])
  return settings
}
