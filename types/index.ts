export type Locale = 'en' | 'ar'
export type Currency = 'USD' | 'EGP'

export interface Notification {
  id: string
  title: string
  body: string
  read: boolean
  createdAt: string
}

export interface TravelArticle {
  id: string
  title: string
  titleAr: string
  excerpt: string
  excerptAr?: string
  image: string
  category: string
}

export * from './user'
export * from './auth'
export * from './tour'
export * from './destination'
export * from './guide'
export * from './booking'
export * from './review'
