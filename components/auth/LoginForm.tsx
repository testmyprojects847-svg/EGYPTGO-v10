'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'
import { AuthField } from './AuthField'
import { GoogleButton } from './GoogleButton'

export function LoginForm({ admin = false }: { admin?: boolean }) {
  const { t, locale, dir } = useLanguage()
  const { signIn, signInAsAdmin } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  return (
    <div dir={dir} className="flex min-h-[80vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">{admin ? t('adminDashboard') : t('signIn')}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {admin
              ? 'admin@egyptgo.com / admin123'
              : locale === 'ar'
                ? 'استخدم الحساب التجريبي أو زر Google.'
                : 'Use the demo account or the simulated Google button.'}
          </p>
        </div>

        {error && <p role="alert" className="mb-4 rounded-xl bg-destructive/10 p-3 text-xs font-semibold text-destructive">{error}</p>}

        <form
          className="space-y-4"
          onSubmit={async (event) => {
            event.preventDefault()
            setSubmitting(true)
            const result = admin ? await signInAsAdmin(email, password, locale) : await signIn(email, password, locale)
            setSubmitting(false)
            if (!result.success) return setError(result.error ?? t('errorOccurred'))
            router.push(result.user?.role === 'admin' ? routes.admin : routes.dashboard)
          }}
        >
          <AuthField label={t('email')} type="email" value={email} onChange={setEmail} />
          <AuthField label={t('password')} type="password" value={password} onChange={setPassword} />
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
          >
            {submitting ? '…' : t('login')}
          </button>
        </form>

        {!admin && (
          <>
            <div className="my-5 flex items-center gap-3 text-[10px] text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              {locale === 'ar' ? 'أو' : 'or'}
              <span className="h-px flex-1 bg-border" />
            </div>
            <GoogleButton />
            <Link href={routes.forgotPassword} className="mt-4 block text-center text-xs font-semibold text-muted-foreground hover:text-accent">
              {t('forgotPassword')}
            </Link>
            <Link href={routes.signUp} className="mt-4 block text-center text-xs font-semibold text-accent">
              {t('dontHaveAccount')}
            </Link>
          </>
        )}
      </div>
    </div>
  )
}