'use client'

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { authService } from '@/services/auth/authService'
import { googleAuthService } from '@/services/auth/googleAuthService'
import { sessionService } from '@/services/auth/sessionService'
import { userService } from '@/services/users/userService'
import { runStorageMigrations } from '@/services/storage/migrationService'
import type { AuthResult, AuthRole, Locale, User, UserProfileUpdate } from '@/types'

interface AuthContextValue {
  user: User | null
  role: AuthRole
  isReady: boolean
  signIn: (email: string, password: string, locale?: Locale) => Promise<AuthResult>
  signInAsAdmin: (email: string, password: string, locale?: Locale) => Promise<AuthResult>
  signInWithGoogle: () => AuthResult
  register: (name: string, email: string, password: string, confirmPassword: string, locale?: Locale) => Promise<AuthResult>
  updateProfile: (update: UserProfileUpdate) => User | null
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<AuthRole>('guest')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    runStorageMigrations()
    const session = sessionService.read()
    setUser(session.user)
    setRole(session.role)
    setIsReady(true)
  }, [])

  const apply = useCallback((result: AuthResult) => {
    if (result.success && result.user) {
      setUser(result.user)
      setRole(result.user.role)
    }
    return result
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      role,
      isReady,
      signIn: async (email, password, locale) => apply(await authService.signIn(email, password, locale)),
      signInAsAdmin: async (email, password, locale) => apply(await authService.signInAsAdmin(email, password, locale)),
      signInWithGoogle: () => apply(googleAuthService.signIn()),
      register: async (name, email, password, confirmPassword, locale) =>
        apply(await authService.register(name, email, password, confirmPassword, locale)),
      updateProfile: (update: UserProfileUpdate) => {
        if (!user) return null
        const next = userService.updateProfile(user, update)
        sessionService.save(next)
        setUser(next)
        return next
      },
      signOut: () => {
        authService.signOut()
        setUser(null)
        setRole('guest')
      },
    }),
    [user, role, isReady, apply],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}