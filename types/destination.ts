export interface Destination {
  id: string
  name: string
  nameAr: string
  country: string
  image: string
  description: string
  descriptionAr?: string
  /* Optional enrichment */
  rating?: string
  tours?: number
  tagline?: string
  taglineAr?: string
  attractions?: string[]
  attractionsAr?: string[]
  bestTime?: string
}
