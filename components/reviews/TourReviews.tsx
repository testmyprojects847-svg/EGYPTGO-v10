'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'
import { useReviews } from '@/hooks/useReviews'
import { validateReview } from '@/lib/validation'

export function TourReviews({ tourId }: { tourId: string }) {
  const { t, locale } = useLanguage()
  const { visible, add } = useReviews(tourId)
  const [text, setText] = useState('')
  const [rating, setRating] = useState('5')
  const [error, setError] = useState('')

  return (
    <section className="mt-7 border-t border-border pt-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold">{t('travelerReviews')}</h2>
        <span className="text-xs text-muted-foreground">{visible.length}</span>
      </div>

      {visible.length > 0 && (
        <div className="mt-3 space-y-2">
          {visible.map((review) => (
            <div key={review.id} className="flex gap-3 rounded-xl bg-muted/50 p-3">
              <ReviewerAvatar name={review.name} avatar={review.avatar} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="truncate">{review.name}</span>
                  <span className="shrink-0 text-accent">{'★'.repeat(review.rating)}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-3 text-xs font-semibold text-destructive">{error}</p>}

      <form
        className="mt-4 flex flex-col gap-2 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault()
          const message = validateReview(text, Number(rating), locale)
          if (message) return setError(message)
          setError('')
          add(text, Number(rating))
          setText('')
        }}
      >
        <select value={rating} onChange={(event) => setRating(event.target.value)} className="rounded-xl border border-border bg-background px-3 py-2 text-xs">
          <option value="5">5 ★</option>
          <option value="4">4 ★</option>
          <option value="3">3 ★</option>
          <option value="2">2 ★</option>
          <option value="1">1 ★</option>
        </select>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={t('reviewPlaceholder')}
          className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs"
        />
        <button className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">{t('addReview')}</button>
      </form>
    </section>
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