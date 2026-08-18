'use client'

import { useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { destinations as seedDestinations } from '@/data/destinations'
import { createId } from '@/lib/utils'
import { DataTable, type Column } from './DataTable'
import type { Destination } from '@/types'

export function DestinationForm() {
  const { t, locale } = useLanguage()
  const [items, setItems] = useState<Destination[]>(seedDestinations)
  const [name, setName] = useState('')
  const [nameAr, setNameAr] = useState('')

  const columns: Column<Destination>[] = [
    { key: 'name', header: t('destinationsManagement'), render: (item) => <span className="font-semibold">{locale === 'ar' ? item.nameAr : item.name}</span> },
    { key: 'country', header: 'Country', render: (item) => item.country },
    {
      key: 'actions',
      header: t('actions'),
      render: (item) => (
        <button onClick={() => setItems(items.filter((entry) => entry.id !== item.id))} className="rounded-lg border border-destructive/30 px-2 py-1 text-xs text-destructive">
          {t('delete')}
        </button>
      ),
    },
  ]

  return (
    <div>
      <form
        className="mb-5 grid gap-2 rounded-xl bg-muted/50 p-4 sm:grid-cols-[1fr_1fr_auto]"
        onSubmit={(event) => {
          event.preventDefault()
          if (!name.trim()) return
          setItems([
            ...items,
            {
              id: createId('dest'),
              name: name.trim(),
              nameAr: nameAr.trim() || name.trim(),
              country: 'Egypt',
              image: '/images/destinations/cairo.png',
              description: 'A new EgyptGo destination.',
            },
          ])
          setName('')
          setNameAr('')
        }}
      >
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Destination name" className="rounded-lg border border-border bg-background px-3 py-2 text-xs" />
        <input value={nameAr} onChange={(event) => setNameAr(event.target.value)} placeholder="اسم الوجهة" className="rounded-lg border border-border bg-background px-3 py-2 text-xs" />
        <button className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">{t('addNew')}</button>
      </form>
      <DataTable columns={columns} rows={items} />
    </div>
  )
}
