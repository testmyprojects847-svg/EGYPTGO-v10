import { users as seedUsers } from '@/data/users'
import { storageService } from '../storage/storageService'
import { STORAGE_KEYS } from '../storage/storageKeys'
import type { User, UserProfileUpdate } from '@/types'

export const userService = {
  list(): User[] {
    return storageService.get<User[]>(STORAGE_KEYS.adminUsers, seedUsers)
  },
  getById(id: string): User | undefined {
    return userService.list().find((user) => user.id === id)
  },
  getByEmail(email: string): User | undefined {
    const normalized = email.trim().toLowerCase()
    return userService.list().find((user) => user.email.toLowerCase() === normalized)
  },
  create(user: User): User[] {
    const current = userService.list()
    if (current.some((existing) => existing.email.toLowerCase() === user.email.toLowerCase())) {
      return current
    }
    const updated = [...current, user]
    storageService.set(STORAGE_KEYS.adminUsers, updated)
    return updated
  },
  updateProfile(user: User, update: UserProfileUpdate): User {
    const next = { ...user, ...update }
    const updated = userService.list().map((existing) => (existing.id === user.id ? next : existing))
    storageService.set(STORAGE_KEYS.adminUsers, updated)
    return next
  },
  remove(id: string): User[] {
    const updated = userService.list().filter((user) => user.id !== id)
    storageService.set(STORAGE_KEYS.adminUsers, updated)
    return updated
  },
  stats() {
    const list = userService.list()
    return {
      total: list.length,
      customers: list.filter((user) => user.role === 'customer').length,
      admins: list.filter((user) => user.role === 'admin').length,
    }
  },
}