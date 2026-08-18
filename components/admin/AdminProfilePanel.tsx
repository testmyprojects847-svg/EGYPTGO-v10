'use client'

import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/hooks/useLanguage'
import { ProfileForm } from '@/components/dashboard/ProfileForm'
import { AvatarUpload } from '@/components/dashboard/AvatarUpload'

export function AdminProfilePanel() {
  const { t, locale } = useLanguage()
  const { user } = useAuth()
  const name = (locale === 'ar' && user?.nameAr) || user?.name || ''

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <h2 className="mb-1 text-lg font-bold">{t('profileInformation')}</h2>
      <p className="mb-5 text-xs text-muted-foreground">{t('manageYourAccount')}</p>

      <div className="mb-6 flex items-center gap-4">
        <AvatarUpload name={name} size={72} />
        <div>
          <p className="text-sm font-bold">{name}</p>
          <p className="text-xs text-muted-foreground">{t('changePhoto')}</p>
        </div>
      </div>

      <ProfileForm />
    </div>
  )
}