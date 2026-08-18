'use client'

import { notFound, useParams } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { ShieldCheck, Star } from 'lucide-react'
import { BackLink } from '@/components/layout/BackLink'
import { guideService } from '@/services/guides/guideService'
import { useAuth } from '@/hooks/useAuth'
import { useCurrency } from '@/hooks/useCurrency'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'

export default function GuideDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { locale, dir } = useLanguage()
  const { format } = useCurrency()
  const { user, role } = useAuth()
  const [version, setVersion] = useState(0)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  const guide = guideService.listPublic().find((item) => item.id === id)
  if (!guide) notFound()
  const reviews = guide.reviewItems ?? []
  void version

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!rating || !comment.trim()) {
      setError(locale === 'ar' ? 'اختر تقييماً واكتب تعليقاً.' : 'Choose a rating and write a comment.')
      return
    }
    if (!user || role !== 'customer') return
    guideService.addReview(guide.id, {
      userId: user.id,
      name: user.name,
      avatar: user.avatar,
      rating,
      comment: comment.trim(),
    })
    setComment('')
    setError('')
    setVersion((value) => value + 1)
  }

  return (
    <div dir={dir} className="mx-auto mb-20 max-w-5xl px-4 py-8 lg:px-10">
      <BackLink href={routes.guides} />

      <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
        <img src={guide.image} alt={guide.name} className="h-72 w-full rounded-3xl object-cover" />
        <div className="rounded-3xl border border-border bg-card p-6">
          {guide.verified && (
            <div className="flex items-center gap-2 text-xs font-semibold text-accent">
              <ShieldCheck className="size-5" />
              {locale === 'ar' ? 'دليل موثق' : 'Verified guide'}
            </div>
          )}
          <h1 className="mt-3 text-3xl font-bold">{locale === 'ar' ? guide.nameAr : guide.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {guide.city} · {guide.language}
          </p>
          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            {locale === 'ar'
              ? guide.bioAr || 'دليل محلي شغوف يشارك الثقافة الأصيلة.'
              : guide.bio || `A passionate local expert specializing in ${guide.specialty}.`}
          </p>
          <div className="mt-6 flex items-center justify-between border-y border-border py-4">
            <span className="flex items-center gap-1 text-sm">
              <Star className="size-4 fill-accent text-accent" />
              {guide.rating} · {guide.reviews} reviews
            </span>
            <span className="text-lg font-bold">{format(guide.price)}/hr</span>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-bold">{locale === 'ar' ? 'آراء المسافرين' : 'Guide reviews'}</h2>

        <div className="mt-4 grid gap-3">
          {reviews.map((review) => (
            <article key={review.id} className="flex gap-3 rounded-2xl border border-border bg-card p-4">
              <ReviewerAvatar name={review.name} avatar={review.avatar} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <strong className="truncate text-sm">{review.name}</strong>
                  <span className="shrink-0 text-accent">{'★'.repeat(review.rating)}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                <time className="mt-2 block text-xs text-muted-foreground">{review.createdAt.slice(0, 10)}</time>
              </div>
            </article>
          ))}
        </div>

        {user && role === 'customer' && (
          <form onSubmit={submit} className="mt-6 rounded-2xl border border-border bg-card p-5">
            <h3 className="font-bold">{locale === 'ar' ? 'أضف تقييماً' : 'Add a review'}</h3>
            <div className="mt-3 flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  type="button"
                  key={value}
                  aria-label={`${value} stars`}
                  onClick={() => setRating(value)}
                  className={value <= rating ? 'text-accent' : 'text-muted-foreground'}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder={locale === 'ar' ? 'اكتب تجربتك' : 'Share your experience'}
              className="mt-3 min-h-24 w-full rounded-xl border border-input bg-background p-3 text-sm"
            />
            {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
            <button className="mt-3 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground">
              {locale === 'ar' ? 'إرسال التقييم' : 'Submit review'}
            </button>
          </form>
        )}
      </section>
    </div>
  )
}

function ReviewerAvatar({ name, avatar }: { name: string; avatar?: string }) {
  return (
    <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-gold text-gold-foreground">
      {avatar ? (
        <Image src={avatar} alt={name} fill sizes="36px" className="object-cover" />
      ) : (
        <span className="text-xs font-bold">{name.trim().slice(0, 1).toUpperCase() || '?'}</span>
      )}
    </span>
  )
}