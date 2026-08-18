import type { AuthRole } from '@/types'

export const isGuest = (role: AuthRole) => role === 'guest'
export const isCustomer = (role: AuthRole) => role === 'customer'
export const isAdmin = (role: AuthRole) => role === 'admin'

export const canBook = (role: AuthRole) => role === 'customer' || role === 'admin'
export const canReview = (role: AuthRole) => role === 'customer'
export const canManageContent = (role: AuthRole) => role === 'admin'
export const canModerateReviews = (role: AuthRole) => role === 'admin'
export const canViewDashboard = (role: AuthRole) => role !== 'guest'
