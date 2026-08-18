'use client'

import { useCallback, useEffect, useState } from 'react'
import { favoriteService } from '@/services/favorites/favoriteService'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setFavorites(favoriteService.list())
    setIsReady(true)
  }, [])

  const toggle = useCallback((id: string) => setFavorites(favoriteService.toggle(id)), [])
  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites])

  return { favorites, toggle, isFavorite, isReady }
}
