'use client'

import { useCallback, useEffect, useState } from 'react'
import { reviewService } from '@/services/reviews/reviewService'
import { useAuth } from './useAuth'
import type { Review, ReviewStatus } from '@/types'

export function useReviews(tourId?: string) {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setReviews(reviewService.list())
    setIsReady(true)
  }, [])

  const visible = tourId ? reviews.filter((review) => review.tourId === tourId && review.status !== 'rejected') : reviews
  const add = useCallback(
    (text: string, rating: number) => {
      if (!tourId) return
      const author = { id: user?.id ?? 'guest', name: user?.name ?? 'Guest traveler', avatar: user?.avatar }
      setReviews(reviewService.add(tourId, author, text, rating))
    },
    [tourId, user],
  )

  const setStatus = useCallback((id: string, status: ReviewStatus) => setReviews(reviewService.setStatus(id, status)), [])

  return { reviews, visible, add, setStatus, isReady }
}
