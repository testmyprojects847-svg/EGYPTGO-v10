'use client'

import { useEffect } from 'react'
import { Search } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { TourGrid } from '@/components/tours/TourGrid'
import { useLanguage } from '@/hooks/useLanguage'
import { useTours } from '@/hooks/useTours'

export default function ToursPage() {
  const { t, dir, locale } = useLanguage()
  const { results, query, setQuery } = useTours()

  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get('q')
    if (initial) setQuery(initial)
  }, [setQuery])

  return (
    <div dir={dir} className="mx-auto mb-20 max-w-6xl px-4 py-8 lg:px-10">
      <PageHeader
        eyebrow={locale === 'ar' ? 'تجارب مختارة' : 'Curated experiences'}
        title={t('tours')}
        description={locale === 'ar' ? 'جولات يقودها خبراء في كل أنحاء مصر.' : 'Expert-led journeys across every corner of Egypt.'}
      />
      <div className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
        <Search className="size-4 text-muted-foreground" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('searchPlaceholder')} className="w-full bg-transparent text-sm outline-none" />
      </div>
      <TourGrid tours={results} />
    </div>
  )
}
