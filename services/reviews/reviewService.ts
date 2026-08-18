import { reviews as seedReviews } from '@/data/reviews'
import { createId } from '@/lib/utils'
import { storageService } from '../storage/storageService'
import { STORAGE_KEYS } from '../storage/storageKeys'
import type { Review, ReviewStatus, User } from '@/types'

export const reviewService = {
  list(): Review[] {
    return storageService.get<Review[]>(STORAGE_KEYS.reviews, seedReviews)
  },
  listForTour(tourId: string, includePending = false): Review[] {
    return reviewService
      .list()
      .filter((review) => review.tourId === tourId && (includePending || review.status === 'approved'))
  },
   add(tourId: string, user: Pick<User, 'id' | 'name' | 'avatar'>, text: string, rating: number): Review[] {
    const review: Review = {
      id: createId('r'),
      tourId,
      userId: user.id,
      name: user.name,
      avatar: user.avatar,
      text: text.trim(),
      rating,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    const updated = [...reviewService.list(), review]
    storageService.set(STORAGE_KEYS.reviews, updated)
    return updated
  },
  setStatus(id: string, status: ReviewStatus): Review[] {
    const updated = reviewService.list().map((review) => (review.id === id ? { ...review, status } : review))
    storageService.set(STORAGE_KEYS.reviews, updated)
    return updated
  },
}
