'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'
import { AuthField } from './AuthField'
import { GoogleButton } from './GoogleButton'

export function RegisterForm() {
  const { t, locale, dir } = useLanguage()
  const { register } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const update = (key: keyof typeof form) => (value: string) => setForm({ ...form, [key]: value })

  return (
    <div dir={dir} className="flex min-h-[80vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <h1 className="mb-8 text-center text-3xl font-bold">{t('signUp')}</h1>
        {error && <p role="alert" className="mb-4 rounded-xl bg-destructive/10 p-3 text-xs font-semibold text-destructive">{error}</p>}
        <form
          className="space-y-4"
          onSubmit={async (event) => {
            event.preventDefault()
            setSubmitting(true)
            const result = await register(form.name, form.email, form.password, form.confirm, locale)
            setSubmitting(false)
            if (!result.success) return setError(result.error ?? t('errorOccurred'))
            router.push(routes.dashboard)
          }}
        >
          <AuthField label={t('fullName')} value={form.name} onChange={update('name')} />
          <AuthField label={t('email')} type="email" value={form.email} onChange={update('email')} />
          <AuthField label={t('password')} type="password" value={form.password} onChange={update('password')} />
          <AuthField label={t('confirmPassword')} type="password" value={form.confirm} onChange={update('confirm')} />
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
          >
            {submitting ? '…' : t('register')}
          </button>
        </form>
        <div className="my-5 flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          {locale === 'ar' ? 'أو' : 'or'}
          <span className="h-px flex-1 bg-border" />
        </div>
        <GoogleButton />
        <Link href={routes.signIn} className="mt-4 block text-center text-xs font-semibold text-accent">
          {t('alreadyHaveAccount')}
        </Link>
      </div>
    </div>
  )
}