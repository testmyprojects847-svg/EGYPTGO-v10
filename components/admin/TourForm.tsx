'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { tourService } from '@/services/tours/tourService'
import { guideService } from '@/services/guides/guideService'
import type { ItineraryDay, Tour } from '@/types'

const input = 'rounded-xl border border-input bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-ring'
const blankDay: ItineraryDay = { day: 1, title: '', details: '' }

const emptyForm: Partial<Tour> = {
  title: '',
  titleAr: '',
  location: 'Cairo',
  locationAr: 'القاهرة',
  priceUsd: 150,
  oldPriceUsd: 0,
  priceEgp: 0,
  oldPriceEgp: 0,
  discount: 0,
  maxTravelers: 12,
  days: 1,
  nights: 0,
  rating: '5.0',
  reviews: 0,
  image: '/images/tours/giza.png',
  description: '',
  descriptionAr: '',
  category: 'Cultural',
  tag: 'New',
  featured: false,
  published: true,
  meetingPoint: '',
  meetingPointAr: '',
  itinerary: [{ ...blankDay }],
}

export function TourForm({
  editing,
  onSaved,
  onCancel,
}: {
  editing?: Tour | null
  onSaved: (tours: Tour[]) => void
  onCancel: () => void
}) {
  const { t } = useLanguage()
  const availableGuides = guideService.list()
  const [form, setForm] = useState<Partial<Tour>>(emptyForm)

  useEffect(() => {
    setForm(
      editing
        ? { ...editing, itinerary: editing.itinerary?.length ? editing.itinerary : [{ ...blankDay }] }
        : emptyForm,
    )
  }, [editing])

  const set = (key: keyof Tour, value: unknown) => setForm((current) => ({ ...current, [key]: value }))

  const updateDay = (index: number, key: keyof ItineraryDay, value: string) =>
    set(
      'itinerary',
      (form.itinerary ?? []).map((day, i) => (i === index ? { ...day, [key]: key === 'day' ? Number(value) : value } : day)),
    )

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.title?.trim()) return
    const priceUsd = Number(form.priceUsd) || 0
    onSaved(
      tourService.save(
        {
          ...form,
          title: form.title.trim(),
          // `price` is the legacy required field — always derive it from the
          // single "USD price" input so nothing else can silently disagree.
          price: priceUsd,
        },
        editing?.id,
      ),
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
        <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-muted/40 text-center">
          <span className="rounded-full bg-secondary p-3">
            <Plus />
          </span>
          <span className="text-sm font-semibold">Cover image &amp; gallery</span>
          <span className="text-xs text-muted-foreground">Use an image URL to keep it in existing storage</span>
          <input
            value={String(form.image ?? '')}
            onChange={(e) => set('image', e.target.value)}
            className="mx-4 w-[calc(100%-2rem)] rounded-lg border border-input bg-background px-3 py-2 text-xs"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="English title" required>
            <input required value={form.title ?? ''} onChange={(e) => set('title', e.target.value)} className={input} />
          </Field>
          <Field label="Arabic title">
            <input dir="rtl" value={form.titleAr ?? ''} onChange={(e) => set('titleAr', e.target.value)} className={input} />
          </Field>
          <Field label="Destination">
            <input value={form.location ?? ''} onChange={(e) => set('location', e.target.value)} className={input} />
          </Field>
          <Field label="Arabic destination">
            <input dir="rtl" value={form.locationAr ?? ''} onChange={(e) => set('locationAr', e.target.value)} className={input} />
          </Field>
          <Field label="Category">
            <select value={form.category ?? ''} onChange={(e) => set('category', e.target.value)} className={input}>
              <option>Cultural</option>
              <option>Adventure</option>
              <option>Beach</option>
              <option>Family</option>
            </select>
          </Field>
          <Field label="Duration (days)">
            <input type="number" min="1" value={form.days ?? 1} onChange={(e) => set('days', Number(e.target.value))} className={input} />
          </Field>
        </div>
      </div>

      {/*
        Pricing + capacity — ONE set of fields only. Each input maps to exactly
        one Tour property so there is no ambiguity about which value the site
        actually reads (public pages always read priceUsd / priceEgp /
        maxTravelers — never the legacy price / oldPrice / availableSeats
        fields, so those must never be edited directly here again).
      */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2 grid gap-4 sm:grid-cols-3">
          <Field label={t('currencyUsd')}>
            <input
              type="number"
              min="0"
              value={form.priceUsd ?? 0}
              onChange={(e) => {
                const priceUsd = Number(e.target.value) || 0
                setForm((current) => {
                  const percent = current.discount ?? 0
                  return {
                    ...current,
                    priceUsd,
                    oldPriceUsd: percent > 0 ? Math.round(priceUsd / (1 - percent / 100)) : current.oldPriceUsd,
                  }
                })
              }}
              className={input}
            />
          </Field>
          <Field label={t('oldPriceUsd')}>
            <input
              type="number"
              min="0"
              value={form.oldPriceUsd ?? 0}
              onChange={(e) => set('oldPriceUsd', Number(e.target.value))}
              className={input}
            />
          </Field>
          <Field label="Rating">
            <input value={form.rating ?? ''} onChange={(e) => set('rating', e.target.value)} className={input} />
          </Field>
          <Field label={t('currencyEgp')}>
            <input
              type="number"
              min="0"
              value={form.priceEgp ?? 0}
              onChange={(e) => {
                const priceEgp = Number(e.target.value) || 0
                setForm((current) => {
                  const percent = current.discount ?? 0
                  return {
                    ...current,
                    priceEgp,
                    oldPriceEgp: percent > 0 ? Math.round(priceEgp / (1 - percent / 100)) : current.oldPriceEgp,
                  }
                })
              }}
              className={input}
            />
          </Field>
          <Field label={t('oldPriceEgp')}>
            <input
              type="number"
              min="0"
              value={form.oldPriceEgp ?? 0}
              onChange={(e) => set('oldPriceEgp', Number(e.target.value))}
              className={input}
            />
          </Field>
          <Field label="Discount %">
            <input
              type="number"
              min="0"
              max="99"
              placeholder="e.g. 20"
              value={form.discount ?? ''}
              onChange={(e) => {
                const percent = Number(e.target.value) || 0
                setForm((current) => {
                  const priceUsd = current.priceUsd ?? 0
                  const priceEgp = current.priceEgp ?? 0
                  return {
                    ...current,
                    discount: percent,
                    oldPriceUsd: percent > 0 ? Math.round(priceUsd / (1 - percent / 100)) : current.oldPriceUsd,
                    oldPriceEgp: percent > 0 ? Math.round(priceEgp / (1 - percent / 100)) : current.oldPriceEgp,
                  }
                })
              }}
              className={input}
            />
            <span className="text-[11px] font-normal text-muted-foreground">
              Auto-fills the struck-through old price for both currencies. Leave at 0 for no discount.
            </span>
          </Field>
          <Field label={t('maxTravelers')}>
            <input
              type="number"
              min="1"
              value={form.maxTravelers ?? 12}
              onChange={(e) => set('maxTravelers', Number(e.target.value))}
              className={input}
            />
          </Field>
        </div>

        <Field label="Assigned guides">
          <select
            multiple
            value={form.guideIds ?? []}
            onChange={(e) => set('guideIds', Array.from(e.target.selectedOptions, (option) => option.value))}
            className={`${input} min-h-28`}
          >
            {availableGuides.map((guide) => (
              <option key={guide.id} value={guide.id}>
                {guide.name} · {guide.city}
              </option>
            ))}
          </select>
          <span className="text-[11px] font-normal text-muted-foreground">
            Only guides created in the Guides workspace can be assigned.
          </span>
        </Field>

        <Field label="English description">
          <textarea
            value={form.description ?? ''}
            onChange={(e) => set('description', e.target.value)}
            className={`${input} min-h-28`}
          />
        </Field>
        <Field label="Arabic description">
          <textarea
            dir="rtl"
            value={form.descriptionAr ?? ''}
            onChange={(e) => set('descriptionAr', e.target.value)}
            className={`${input} min-h-28`}
          />
        </Field>
      </div>

      <div className="rounded-2xl border border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold">Itinerary</h4>
            <p className="text-xs text-muted-foreground">Give guests a clear day-by-day plan.</p>
          </div>
          <button
            type="button"
            onClick={() => set('itinerary', [...(form.itinerary ?? []), { ...blankDay, day: (form.itinerary?.length ?? 0) + 1 }])}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-semibold"
          >
            <Plus /> Add day
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {(form.itinerary ?? []).map((day, index) => (
            <div key={index} className="grid gap-2 sm:grid-cols-[70px_1fr_1.5fr_auto]">
              <input
                aria-label="Day number"
                type="number"
                value={day.day}
                onChange={(e) => updateDay(index, 'day', e.target.value)}
                className={input}
              />
              <input placeholder="Day title" value={day.title} onChange={(e) => updateDay(index, 'title', e.target.value)} className={input} />
              <input placeholder="Details" value={day.details} onChange={(e) => updateDay(index, 'details', e.target.value)} className={input} />
              <button
                type="button"
                onClick={() => set('itinerary', (form.itinerary ?? []).filter((_, i) => i !== index))}
                className="rounded-lg p-2 text-destructive hover:bg-destructive/10"
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Inclusions">
          <textarea
            placeholder="Breakfast, transfers, guide"
            value={(form.included ?? []).join(', ')}
            onChange={(e) => set('included', e.target.value.split(',').map((item) => item.trim()).filter(Boolean))}
            className={`${input} min-h-24`}
          />
        </Field>
        <Field label="Exclusions">
          <textarea
            placeholder="Flights, personal expenses"
            value={(form.excluded ?? []).join(', ')}
            onChange={(e) => set('excluded', e.target.value.split(',').map((item) => item.trim()).filter(Boolean))}
            className={`${input} min-h-24`}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Meeting point">
          <input value={form.meetingPoint ?? ''} onChange={(e) => set('meetingPoint', e.target.value)} className={input} />
        </Field>
        <Field label="Tour tags">
          <input value={form.tag ?? ''} onChange={(e) => set('tag', e.target.value)} className={input} />
        </Field>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
        <div className="flex flex-wrap gap-5 text-sm font-semibold">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={form.featured ?? false} onChange={(e) => set('featured', e.target.checked)} /> Featured
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={form.published ?? true} onChange={(e) => set('published', e.target.checked)} /> Published
          </label>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={onCancel} className="rounded-xl border border-border px-4 py-3 text-sm font-semibold">
            {t('cancel')}
          </button>
          <button className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
            {editing ? t('save') : 'Create tour'}
          </button>
        </div>
      </div>
    </form>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2 text-xs font-semibold">
      {label}
      {required ? ' *' : ''}
      {children}
    </label>
  )
}