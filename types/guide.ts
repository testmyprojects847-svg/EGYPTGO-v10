export interface GuideReview {
  id: string
  userId: string
  name: string
  avatar?: string
  rating: number
  comment: string
  createdAt: string
}

export interface Guide {
  id: string
  name: string
  nameAr: string
  city: string
  language: string
  specialty: string
  specialtyAr?: string
  reviewItems?: GuideReview[]
  rating: string
  reviews: number
  price: number
  image: string
  verified: boolean
  bio?: string
  bioAr?: string
  availability?: boolean
  assignedTours?: number
  active?: boolean
}
