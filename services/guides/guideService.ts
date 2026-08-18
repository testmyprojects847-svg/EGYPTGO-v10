import { guides as seedGuides } from '@/data/guides'
import { storageService } from '../storage/storageService'
import { STORAGE_KEYS } from '../storage/storageKeys'
import { createId } from '@/lib/utils'
import type { Guide } from '@/types'

export const guideService = {
  list(): Guide[] {
    return storageService.get<Guide[]>(STORAGE_KEYS.adminGuides, seedGuides)
  },
  listPublic(): Guide[] {
    return guideService.list().filter((guide) => guide.active !== false && guide.availability !== false)
  },
  save(draft: Partial<Guide> & { name: string }, editingId?: string): Guide[] {
    const current = guideService.list()
    const next: Guide = {
      id: editingId ?? createId('guide'),
      name: draft.name,
      nameAr: draft.nameAr || draft.name,
      city: draft.city || 'Cairo',
      language: draft.language || 'English, Arabic',
      specialty: draft.specialty || 'Egyptology',
      specialtyAr: draft.specialtyAr || draft.specialty || 'علم المصريات',
      reviewItems: draft.reviewItems ?? [],
      rating: draft.rating || '5.0',
      reviews: draft.reviews ?? 0,
      price: draft.price ?? 50,
      image: draft.image || '/images/guides/layla.png',
      verified: draft.verified ?? true,
      bio: draft.bio || '',
      bioAr: draft.bioAr || '',
      availability: draft.availability ?? true,
      assignedTours: draft.assignedTours ?? 0,
      active: draft.active ?? true,
    }
    const updated = editingId ? current.map((guide) => (guide.id === editingId ? next : guide)) : [...current, next]
    storageService.set(STORAGE_KEYS.adminGuides, updated)
    return updated
  },
  addReview(id: string, review: Omit<import('@/types').GuideReview, 'id' | 'createdAt'>): Guide[] {
    const current = guideService.list()
    const updated = current.map((guide) => {
      if (guide.id !== id) return guide
      const reviewItems = [...(guide.reviewItems ?? []), { ...review, id: createId('review'), createdAt: new Date().toISOString() }]
      const rating = (reviewItems.reduce((sum, item) => sum + item.rating, 0) / reviewItems.length).toFixed(1)
      return { ...guide, reviewItems, rating, reviews: reviewItems.length }
    })
    storageService.set(STORAGE_KEYS.adminGuides, updated)
    return updated
  },
  remove(id: string): Guide[] {
    const updated = guideService.list().filter((guide) => guide.id !== id)
    storageService.set(STORAGE_KEYS.adminGuides, updated)
    return updated
  },
}
