'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'

export function GoogleButton() {
  const { t, locale } = useLanguage()
  const { signInWithGoogle } = useAuth()
  const router = useRouter()

  return (
    <>
      <button
        type="button"
        onClick={() => {
          signInWithGoogle()
          router.push(routes.dashboard)
        }}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold shadow-sm hover:bg-muted/50"
      >
        <span className="grid size-5 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">G</span>
        {t('continueWithGoogle')}
      </button>
      <p className="mt-2 text-center text-[10px] text-muted-foreground">
        {locale === 'ar' ? 'محاكاة أمامية فقط — لا يتم الاتصال بـ Google.' : 'Frontend-only simulation — no Google OAuth connection.'}
      </p>
    </>
  )
}
