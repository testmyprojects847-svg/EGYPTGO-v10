'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { useLanguage } from '@/hooks/useLanguage'
import { SUPPORT_EMAIL, SUPPORT_PHONE } from '@/lib/constants'

export default function ContactPage() {
  const { t, dir, locale } = useLanguage()
  const [sent, setSent] = useState(false)

  return (
    <div dir={dir} className="mx-auto mb-20 max-w-3xl px-4 py-8 lg:px-10">
      <PageHeader
        eyebrow={locale === 'ar' ? 'تواصل معنا' : 'Get in touch'}
        title={t('contact')}
        description={`${SUPPORT_EMAIL} · ${SUPPORT_PHONE}`}
      />
      {sent ? (
        <p className="mt-8 rounded-xl bg-accent/10 p-4 text-sm font-semibold text-accent">
          {locale === 'ar' ? 'تم إرسال رسالتك، سنرد قريباً.' : 'Thanks — your message is on its way.'}
        </p>
      ) : (
        <form
          className="mt-8 space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
            setSent(true)
          }}
        >
          <input required placeholder={t('fullName')} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm" />
          <input required type="email" placeholder={t('email')} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm" />
          <textarea required rows={5} placeholder={locale === 'ar' ? 'رسالتك' : 'Your message'} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm" />
          <button className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">{locale === 'ar' ? 'إرسال' : 'Send message'}</button>
        </form>
      )}
    </div>
  )
}
