import type { AuthRole, User } from './user'

export interface Credentials {
  email: string
  password: string
}

export interface RegisterPayload extends Credentials {
  name: string
  confirmPassword: string
}

export interface Session {
  user: User | null
  role: AuthRole
  signedInAt?: string
}

export interface AuthResult {
  success: boolean
  user?: User
  error?: string
}
