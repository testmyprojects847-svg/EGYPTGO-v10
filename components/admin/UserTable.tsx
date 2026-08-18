'use client'

import { useLanguage } from '@/hooks/useLanguage'
import { userService } from '@/services/users/userService'
import { DataTable, type Column } from './DataTable'
import type { User } from '@/types'

export function UserTable() {
  const { t, locale } = useLanguage()
  const columns: Column<User>[] = [
    { key: 'name', header: t('fullName'), render: (user) => <span className="font-semibold">{locale === 'ar' ? user.nameAr ?? user.name : user.name}</span> },
    { key: 'email', header: t('email'), render: (user) => user.email },
    { key: 'role', header: 'Role', render: (user) => user.role },
    { key: 'status', header: t('status'), render: (user) => user.status ?? 'active' },
  ]
  return <DataTable columns={columns} rows={userService.list()} />
}
