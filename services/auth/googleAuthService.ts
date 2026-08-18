import { sessionService } from './sessionService'
import type { AuthResult, User } from '@/types'

/** Frontend-only simulation of a Google sign-in — no OAuth call is made. */
export const googleAuthService = {
  signIn(): AuthResult {
    const user: User = {
      id: 'u-google',
      name: 'Ahmed Hassan',
      email: 'ahmed@gmail.com',
      role: 'customer',
      provider: 'google',
      createdAt: new Date().toISOString(),
    }
    sessionService.save(user)
    return { success: true, user }
  },
}
