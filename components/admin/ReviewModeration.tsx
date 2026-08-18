'use client'

import { useLanguage } from '@/hooks/useLanguage'
import { useReviews } from '@/hooks/useReviews'
import { DataTable, type Column } from './DataTable'
import type { Review } from '@/types'

export function ReviewModeration() {
  const { t } = useLanguage()
  const { reviews, setStatus } = useReviews()

  const columns: Column<Review>[] = [
    { key: 'name', header: t('fullName'), render: (review) => <span className="font-semibold">{review.name}</span> },
    { key: 'text', header: t('reviewsModeration'), render: (review) => <span className="text-muted-foreground">{review.text}</span> },
    { key: 'rating', header: '★', render: (review) => '★'.repeat(review.rating) },
    { key: 'status', header: t('status'), render: (review) => review.status },
    {
      key: 'actions',
      header: t('actions'),
      render: (review) => (
        <div className="flex gap-2">
          <button onClick={() => setStatus(review.id, 'approved')} className="rounded-lg border border-border px-2 py-1 text-xs">
            {t('approve')}
          </button>
          <button onClick={() => setStatus(review.id, 'rejected')} className="rounded-lg border border-destructive/30 px-2 py-1 text-xs text-destructive">
            {t('reject')}
          </button>
        </div>
      ),
    },
  ]

  return <DataTable columns={columns} rows={reviews} />
}
