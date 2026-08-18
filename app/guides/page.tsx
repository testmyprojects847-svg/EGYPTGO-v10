'use client'

import { useState } from 'react'
import { Search, Users } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { GuideCard } from '@/components/guides/GuideCard'
import { Reveal } from '@/components/ui/Reveal'
import { useGuides } from '@/hooks/useGuides'
import { useLanguage } from '@/hooks/useLanguage'

export default function GuidesPage() {
  const { t, dir, locale } = useLanguage()
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('All')
  const { guides } = useGuides()

  const visible = guides.filter(
    (guide) =>
      `${guide.name} ${guide.city} ${guide.specialty}`.toLowerCase().includes(query.toLowerCase()) && (city === 'All' || guide.city === city),
  )

  return (
    <div dir={dir} className="mx-auto mb-20 max-w-6xl px-4 py-8 lg:px-10">
      <PageHeader
        eyebrow={locale === 'ar' ? 'خبراء محليون' : 'Local experts'}
        title={t('guides')}
        description={locale === 'ar' ? 'احجز دليلاً محلياً يجعل رحلتك لا تنسى.' : 'Meet trusted local guides who make every day in Egypt unforgettable.'}
        action={<Users className="hidden size-10 text-accent md:block" />}
      />
      <div className="mt-7 flex flex-col gap-3 md:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <Search className="size-4 text-muted-foreground" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('search')} className="w-full bg-transparent text-sm outline-none" />
        </div>
        <select value={city} onChange={(event) => setCity(event.target.value)} className="rounded-xl border border-border bg-card px-3 py-2 text-sm">
          <option value="All">{locale === 'ar' ? 'كل المدن' : 'All cities'}</option>
          <option value="Cairo">Cairo</option>
          <option value="Luxor">Luxor</option>
          <option value="Aswan">Aswan</option>
        </select>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {visible.map((guide, index) => (
          <Reveal key={guide.id} delay={index * 60}>
            <GuideCard guide={guide} />
          </Reveal>
        ))}
      </div>
      {!visible.length && <p className="mt-8 text-sm text-muted-foreground">{t('noResults')}</p>}
    </div>
  )
}