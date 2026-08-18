import { createId } from '@/lib/utils'
import { storageService } from '../storage/storageService'
import { STORAGE_KEYS } from '../storage/storageKeys'
import type { Notification } from '@/types'

export const notificationService = {
  list(): Notification[] {
    return storageService.get<Notification[]>(STORAGE_KEYS.notifications, [])
  },
  push(title: string, body: string): Notification[] {
    const notification: Notification = { id: createId('n'), title, body, read: false, createdAt: new Date().toISOString() }
    const updated = [notification, ...notificationService.list()]
    storageService.set(STORAGE_KEYS.notifications, updated)
    return updated
  },
  markRead(id: string): Notification[] {
    const updated = notificationService.list().map((item) => (item.id === id ? { ...item, read: true } : item))
    storageService.set(STORAGE_KEYS.notifications, updated)
    return updated
  },
  unreadCount(): number {
    return notificationService.list().filter((item) => !item.read).length
  },
}
