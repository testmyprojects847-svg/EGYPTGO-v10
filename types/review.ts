export type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'hidden'

export interface Review {
  id: string
  tourId: string
  userId: string
  name: string
  avatar?: string
  text: string
  rating: number
  status: ReviewStatus
  createdAt: string
}