import type { Booking, PaymentRecord } from '@/types'

export const bookings: Booking[] = [
  { id: 'b-1001', tourId: 'giza', tourTitle: 'Giza Pyramids & Sphinx', date: '2024-05-20', travelers: 2, customerName: 'Ahmed Hassan', customerEmail: 'ahmed@example.com', total: 324, status: 'confirmed', createdAt: '2024-04-28' },
  { id: 'b-1002', tourId: 'nile', tourTitle: 'Nile River Luxury Cruise', date: '2024-06-11', travelers: 1, customerName: 'Sara Mostafa', customerEmail: 'sara@example.com', total: 594, status: 'pending', createdAt: '2024-05-02' },
  { id: 'b-1003', tourId: 'luxor', tourTitle: 'Valley of the Kings', date: '2024-06-18', travelers: 2, customerName: 'Emily Carter', customerEmail: 'emily@example.com', total: 691, status: 'confirmed', createdAt: '2024-05-15' },
  { id: 'b-1004', tourId: 'abu-simbel', tourTitle: 'Abu Simbel Temples', date: '2024-06-25', travelers: 3, customerName: 'Marco Rossi', customerEmail: 'marco@example.com', total: 680, status: 'confirmed', createdAt: '2024-05-19' },
  { id: 'b-1005', tourId: 'red-sea', tourTitle: 'Red Sea Diving Adventure', date: '2024-07-02', travelers: 2, customerName: 'Lena Fischer', customerEmail: 'lena@example.com', total: 281, status: 'confirmed', createdAt: '2024-05-28' },
  { id: 'b-1006', tourId: 'cairo-food', tourTitle: 'Cairo Food & Bazaar Tour', date: '2024-07-08', travelers: 2, customerName: 'Ahmed Hassan', customerEmail: 'ahmed@example.com', total: 140, status: 'confirmed', createdAt: '2024-06-05' },
  { id: 'b-1007', tourId: 'museum', tourTitle: 'Grand Egyptian Museum', date: '2024-05-12', travelers: 1, customerName: 'Yara Adel', customerEmail: 'yara@example.com', total: 97, status: 'cancelled', createdAt: '2024-04-30' },
  { id: 'b-1008', tourId: 'luxor-balloon', tourTitle: 'Luxor Hot Air Balloon', date: '2024-07-15', travelers: 2, customerName: 'Emily Carter', customerEmail: 'emily@example.com', total: 259, status: 'pending', createdAt: '2024-06-12' },
]

export const payments: PaymentRecord[] = [
  { id: 'p-5001', bookingId: 'b-1001', amount: 324, method: 'card', status: 'paid', createdAt: '2024-04-28' },
  { id: 'p-5002', bookingId: 'b-1002', amount: 594, method: 'card', status: 'failed', createdAt: '2024-05-02' },
  { id: 'p-5003', bookingId: 'b-1003', amount: 691, method: 'card', status: 'paid', createdAt: '2024-05-15' },
  { id: 'p-5004', bookingId: 'b-1004', amount: 680, method: 'wallet', status: 'paid', createdAt: '2024-05-19' },
  { id: 'p-5005', bookingId: 'b-1005', amount: 281, method: 'card', status: 'paid', createdAt: '2024-05-28' },
  { id: 'p-5006', bookingId: 'b-1006', amount: 140, method: 'card', status: 'paid', createdAt: '2024-06-05' },
  { id: 'p-5007', bookingId: 'b-1007', amount: 97, method: 'card', status: 'refunded', createdAt: '2024-04-30' },
  { id: 'p-5008', bookingId: 'b-1008', amount: 259, method: 'wallet', status: 'paid', createdAt: '2024-06-12' },
]
