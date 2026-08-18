import { DEMO_ADMIN, DEMO_CUSTOMER } from '@/lib/constants'
import { validateCredentials, validateRegistration } from '@/lib/validation'
import { createId } from '@/lib/utils'
import { sessionService } from './sessionService'
import { credentialService } from './credentialService'
import { userService } from '@/services/users/userService'
import type { AuthResult, Locale, User } from '@/types'

export const authService = {
  async signIn(email: string, password: string, locale: Locale = 'en'): Promise<AuthResult> {
    const error = validateCredentials(email, password, locale)
    if (error) return { success: false, error }

    const normalized = email.trim().toLowerCase()

    if (normalized === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
      const user: User = { id: 'u-3', name: DEMO_ADMIN.name, email: normalized, role: 'admin', provider: 'password' }
      sessionService.save(user)
      return { success: true, user }
    }
    if (normalized === DEMO_CUSTOMER.email && password === DEMO_CUSTOMER.password) {
      const user: User = { id: 'u-1', name: DEMO_CUSTOMER.name, email: normalized, role: 'customer', provider: 'password' }
      sessionService.save(user)
      return { success: true, user }
    }

    const existing = userService.getByEmail(normalized)
    if (existing && (await credentialService.verifyPassword(normalized, password))) {
      sessionService.save(existing)
      return { success: true, user: existing }
    }

    return { success: false, error: locale === 'ar' ? 'بيانات الدخول غير صحيحة.' : 'Invalid email or password.' }
  },

  async signInAsAdmin(email: string, password: string, locale: Locale = 'en'): Promise<AuthResult> {
    const result = await authService.signIn(email, password, locale)
    if (result.success && result.user?.role !== 'admin') {
      sessionService.clear()
      return { success: false, error: locale === 'ar' ? 'بيانات المشرف غير صحيحة.' : 'Invalid admin credentials.' }
    }
    return result
  },

  async register(name: string, email: string, password: string, confirmPassword: string, locale: Locale = 'en'): Promise<AuthResult> {
    const error = validateRegistration(name, email, password, confirmPassword, locale)
    if (error) return { success: false, error }

    const normalized = email.trim().toLowerCase()
    if (userService.getByEmail(normalized)) {
      return { success: false, error: locale === 'ar' ? 'البريد الإلكتروني مستخدم بالفعل.' : 'This email is already registered.' }
    }

    const user: User = {
      id: createId('u'),
      name: name.trim(),
      email: normalized,
      role: 'customer',
      provider: 'password',
      createdAt: new Date().toISOString(),
      status: 'active',
    }

    userService.create(user)
    await credentialService.setPassword(normalized, password)

    sessionService.save(user)
    return { success: true, user }
  },

  signOut() {
    sessionService.clear()
  },
}