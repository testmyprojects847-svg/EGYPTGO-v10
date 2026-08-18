import type { Review } from '@/types'

export const reviews: Review[] = [
  { id: 'r-1', tourId: 'giza', userId: 'u-1', name: 'Ahmed Hassan', text: 'Incredible morning at the pyramids — our guide made 4,500 years of history come alive. Entering the Great Pyramid was unforgettable.', rating: 5, status: 'approved', createdAt: '2024-04-30' },
  { id: 'r-2', tourId: 'giza', userId: 'u-2', name: 'Emily Carter', text: 'Perfectly organized from pickup to drop-off. The Sphinx up close is even more impressive than the photos.', rating: 5, status: 'approved', createdAt: '2024-05-12' },
  { id: 'r-3', tourId: 'giza', userId: 'u-4', name: 'Marco Rossi', text: 'Great value and a very knowledgeable guide. Only wish we had a little more time at the panorama point.', rating: 4, status: 'approved', createdAt: '2024-05-20' },
  { id: 'r-4', tourId: 'nile', userId: 'u-2', name: 'Sara Mostafa', text: 'The felucca sunset alone is worth the trip. The cruiser was spotless and the food was excellent.', rating: 5, status: 'approved', createdAt: '2024-05-04' },
  { id: 'r-5', tourId: 'nile', userId: 'u-5', name: 'Lena Fischer', text: 'Four magical days. Edfu and Kom Ombo were highlights and the crew treated us like family.', rating: 5, status: 'approved', createdAt: '2024-05-18' },
  { id: 'r-6', tourId: 'luxor', userId: 'u-1', name: 'Ahmed Hassan', text: 'The Valley of the Kings is breathtaking. Standing in Tutankhamun\u2019s tomb gave me chills.', rating: 5, status: 'approved', createdAt: '2024-05-09' },
  { id: 'r-7', tourId: 'abu-simbel', userId: 'u-4', name: 'Marco Rossi', text: 'Worth the early start. The scale of the temples is simply staggering.', rating: 5, status: 'approved', createdAt: '2024-05-22' },
  { id: 'r-8', tourId: 'museum', userId: 'u-5', name: 'Lena Fischer', text: 'Skip-the-line was a lifesaver and the Tutankhamun collection is world-class.', rating: 5, status: 'approved', createdAt: '2024-06-01' },
  { id: 'r-9', tourId: 'red-sea', userId: 'u-2', name: 'Sara Mostafa', text: 'Amazing reefs and a very safe, friendly dive team. Lunch on the boat was tasty too.', rating: 4, status: 'approved', createdAt: '2024-06-03' },
  { id: 'r-10', tourId: 'cairo-food', userId: 'u-1', name: 'Ahmed Hassan', text: 'So much delicious food and the bazaar at night is pure magic. Highly recommend coming hungry!', rating: 5, status: 'approved', createdAt: '2024-06-07' },
  { id: 'r-11', tourId: 'luxor-balloon', userId: 'u-4', name: 'Marco Rossi', text: 'A bucket-list sunrise. Smooth flight and a stunning view over the West Bank.', rating: 5, status: 'approved', createdAt: '2024-06-10' },
  { id: 'r-12', tourId: 'nile', userId: 'u-6', name: 'Yara Adel', text: 'Beautiful trip overall, though embarkation was a little slow. Would still book again.', rating: 4, status: 'pending', createdAt: '2024-06-14' },
]

export const getReviewsByTour = (tourId: string) => reviews.filter((review) => review.tourId === tourId)
