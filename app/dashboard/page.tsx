'use client'

import { CustomerDashboard } from '@/components/dashboard/CustomerDashboard'
import { RequireRole } from '@/components/auth/RequireRole'
import { routes } from '@/lib/routes'

export default function DashboardPage() {
  return (
    <RequireRole role="customer" redirectTo={routes.signIn}>
      <CustomerDashboard />
    </RequireRole>
  )
}
