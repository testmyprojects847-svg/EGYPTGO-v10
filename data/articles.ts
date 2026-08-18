import type { TravelArticle } from '@/types'

export const articles: TravelArticle[] = [
  { id: 'a-1', title: 'Three days in Cairo', titleAr: 'ثلاثة أيام في القاهرة', excerpt: 'How to see the pyramids, the museum and Khan el-Khalili without rushing.', excerptAr: 'كيف تزور الأهرامات والمتحف وخان الخليلي دون عجلة.', image: '/images/destinations/cairo.png', category: 'City guide' },
  { id: 'a-2', title: 'Nile cruising season', titleAr: 'موسم رحلات النيل', excerpt: 'The best months to sail between Luxor and Aswan.', excerptAr: 'أفضل الشهور للإبحار بين الأقصر وأسوان.', image: '/images/destinations/aswan.png', category: 'Planning' },
]
