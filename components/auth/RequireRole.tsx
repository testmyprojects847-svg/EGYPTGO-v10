'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/hooks/useLanguage'
import type { AuthRole } from '@/types'

export function RequireRole({ role, redirectTo, children }: { role: AuthRole; redirectTo: string; children: ReactNode }) {
  const { role: currentRole, isReady } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const allowed = currentRole === role || (role === 'customer' && currentRole === 'admin')

  useEffect(() => {
    if (isReady && !allowed) router.replace(redirectTo)
  }, [isReady, allowed, redirectTo, router])

  if (!isReady || !allowed) return <div className="grid min-h-[60vh] place-items-center text-sm text-muted-foreground">{t('loading')}</div>
  return <>{children}</>
}
