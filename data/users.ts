import type { User } from '@/types'

export const users: User[] = [
  { id: 'u-1', name: 'Ahmed Hassan', nameAr: 'أحمد حسن', email: 'ahmed@example.com', phone: '+20 123 456 7890', role: 'customer', provider: 'password', createdAt: '2024-01-12', status: 'active' },
  { id: 'u-2', name: 'Sara Mostafa', nameAr: 'سارة مصطفى', email: 'sara@example.com', role: 'customer', provider: 'google', createdAt: '2024-02-03', status: 'active' },
  { id: 'u-3', name: 'EgyptGo Admin', nameAr: 'مشرف مصر جو', email: 'admin@egyptgo.com', role: 'admin', provider: 'password', createdAt: '2023-11-01', status: 'active' },
]
