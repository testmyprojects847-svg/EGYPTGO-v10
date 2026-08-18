'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { passwordService } from '@/services/auth/passwordService'
import { routes } from '@/lib/routes'

export function PasswordRecoveryForm({ mode = 'request' }: { mode?: 'request' | 'reset' }) {
  const { t, locale, dir } = useLanguage()
  const [value, setValue] = useState(mode === 'request' ? 'ahmed@example.com' : '')
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null)
  const isReset = mode === 'reset'

  return (
    <div dir={dir} className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent">
          {locale === 'ar' ? 'استعادة الحساب' : 'Account recovery'}
        </p>
        <h1 className="mt-3 text-2xl font-bold">
          {isReset ? (locale === 'ar' ? 'أنشئ كلمة مرور جديدة' : 'Create a new password') : t('forgotPassword')}
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {isReset
            ? locale === 'ar'
              ? 'أدخل كلمة مرور جديدة لحسابك.'
              : 'Choose a new password for your EgyptGo account.'
            : locale === 'ar'
              ? 'سنرسل لك رابطاً تجريبياً لإعادة التعيين.'
              : 'We will send a simulated reset link to your inbox.'}
        </p>

        {feedback?.success ? (
          <div className="mt-6 rounded-xl bg-accent/10 p-4 text-sm font-semibold text-accent">{feedback.message}</div>
        ) : (
          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              setFeedback(isReset ? passwordService.resetPassword(value, locale) : passwordService.requestReset(value, locale))
            }}
          >
            {feedback && !feedback.success && <p className="text-xs font-semibold text-destructive">{feedback.message}</p>}
            <input
              type={isReset ? 'password' : 'email'}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={isReset ? 'New password' : 'you@example.com'}
              className="rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/30"
            />
            <button className="rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground">
              {isReset ? (locale === 'ar' ? 'حفظ كلمة المرور' : 'Save password') : locale === 'ar' ? 'إرسال الرابط' : 'Send reset link'}
            </button>
          </form>
        )}

        <Link href={routes.signIn} className="mt-5 block text-center text-xs font-semibold text-accent">
          {t('backToSignIn')}
        </Link>
      </div>
    </div>
  )
}
