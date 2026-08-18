'use client'

import { useAuth } from './useAuth'
import { canManageContent, canViewDashboard } from '@/lib/permissions'

export function useUser() {
  const { user, role, isReady } = useAuth()
  return {
    user,
    role,
    isReady,
    isSignedIn: role !== 'guest',
    isAdmin: canManageContent(role),
    canViewDashboard: canViewDashboard(role),
    displayName: user?.name ?? '',
  }
}
