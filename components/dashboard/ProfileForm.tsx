'use client'

import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/hooks/useLanguage'
import { formatDate } from '@/lib/utils'

export function ProfileForm() {
  const { t, locale } = useLanguage()
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState(user?.name ?? '')
  const [phone, setPhone] = useState(user?.phone ?? '')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setName(user?.name ?? '')
    setPhone(user?.phone ?? '')
  }, [user])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!name.trim()) return
    updateProfile({ name: name.trim(), phone: phone.trim() })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground">{t('fullName')}</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-gold"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground">{t('phone')}</span>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-gold"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground">{t('email')}</span>
          <input
            value={user?.email ?? ''}
            readOnly
            className="w-full cursor-not-allowed rounded-xl border border-input bg-muted px-3.5 py-2.5 text-sm text-muted-foreground"
          />
        </label>
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground">{t('accountType')}</span>
          <p className="rounded-xl border border-input bg-muted px-3.5 py-2.5 text-sm text-muted-foreground">
            {user?.provider === 'google' ? t('googleAccount') : t('passwordAccount')}
          </p>
        </div>
      </div>

      {user?.createdAt && (
        <p className="text-xs text-muted-foreground">
          {t('memberSince')}: {formatDate(user.createdAt, locale)}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-ink-foreground transition-opacity hover:opacity-90"
        >
          {t('saveChanges')}
        </button>
        {saved && (
          <span className="flex items-center gap-1 text-xs font-semibold text-accent-foreground">
            <Check className="size-3.5" />
            {t('profileUpdated')}
          </span>
        )}
      </div>
    </form>
  )
}
