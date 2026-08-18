'use client'

import { PageHeader } from '@/components/layout/PageHeader'
import { articles } from '@/data/articles'
import { useLanguage } from '@/hooks/useLanguage'

export default function AboutPage() {
  const { t, dir, locale } = useLanguage()
  return (
    <div dir={dir} className="mx-auto mb-20 max-w-4xl px-4 py-8 lg:px-10">
      <PageHeader
        eyebrow={locale === 'ar' ? 'من نحن' : 'Our story'}
        title={t('about')}
        description={
          locale === 'ar'
            ? 'EgyptGo منصة سفر تجمع بين الجولات والفنادق والأدلاء المحليين في مكان واحد.'
            : 'EgyptGo brings tours, stays and trusted local guides together in one simple place.'
        }
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <article key={article.id} className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-lg font-bold">{locale === 'ar' ? article.titleAr : article.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{locale === 'ar' ? article.excerptAr : article.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
