'use client'

import { notFound, useParams } from 'next/navigation'
import { BookingForm } from '@/components/tours/BookingForm'
import { RequireRole } from '@/components/auth/RequireRole'
import { getTourById } from '@/data/tours'
import { routes } from '@/lib/routes'

export default function BookingPage() {
  const { tourId } = useParams<{ tourId: string }>()
  const tour = getTourById(tourId)
  if (!tour) notFound()

  return (
    <RequireRole role="customer" redirectTo={routes.signIn}>
      <div className="mx-auto mb-20 max-w-3xl px-4 py-8 lg:px-10">
        <BookingForm tour={tour} />
      </div>
    </RequireRole>
  )
}
