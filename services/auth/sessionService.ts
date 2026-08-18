import { storageService } from '../storage/storageService'
import { STORAGE_KEYS } from '../storage/storageKeys'
import type { AuthRole, Session, User } from '@/types'

export const sessionService = {
  read(): Session {
    return {
      user: storageService.get<User | null>(STORAGE_KEYS.session, null),
      role: storageService.get<AuthRole>(STORAGE_KEYS.role, 'guest'),
    }
  },
  save(user: User) {
    storageService.set(STORAGE_KEYS.session, user)
    storageService.set(STORAGE_KEYS.role, user.role)
  },
  clear() {
    storageService.remove(STORAGE_KEYS.session)
    storageService.remove(STORAGE_KEYS.role)
  },
}
