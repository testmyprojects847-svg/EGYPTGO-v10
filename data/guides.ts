import type { Guide } from '@/types'

export const guides: Guide[] = [
  { id: 'layla', name: 'Layla Hassan', nameAr: 'ليلى حسن', city: 'Cairo', language: 'English, Arabic', specialty: 'Ancient history', specialtyAr: 'التاريخ القديم', rating: '4.9', reviews: 128, price: 45, image: '/images/guides/layla.png', verified: true },
  { id: 'omar', name: 'Omar Saad', nameAr: 'عمر سعد', city: 'Luxor', language: 'English, French, Arabic', specialty: 'Temples & archaeology', specialtyAr: 'المعابد والآثار', rating: '4.8', reviews: 94, price: 52, image: '/images/guides/omar.png', verified: true },
  { id: 'nour', name: 'Nour El Din', nameAr: 'نور الدين', city: 'Aswan', language: 'English, Arabic', specialty: 'Nubian culture', specialtyAr: 'الثقافة النوبية', rating: '5.0', reviews: 71, price: 40, image: '/images/guides/nour.png', verified: true },
]

export const getGuideById = (id: string) => guides.find((guide) => guide.id === id)
