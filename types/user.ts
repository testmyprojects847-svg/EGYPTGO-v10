export type AuthRole = 'guest' | 'customer' | 'admin'
export type AuthProvider = 'password' | 'google'

export interface User {
  id: string
  name: string
  nameAr?: string
  email: string
  phone?: string
  avatar?: string
  role: AuthRole
  provider?: AuthProvider
  createdAt?: string
  status?: 'active' | 'suspended'
}

export interface UserProfileUpdate {
  name?: string
  phone?: string
  avatar?: string
}
