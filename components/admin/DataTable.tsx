'use client'

import type { ReactNode } from 'react'
import { useLanguage } from '@/hooks/useLanguage'

export interface Column<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
  className?: string
}

export function DataTable<T extends { id: string }>({ columns, rows }: { columns: Column<T>[]; rows: T[] }) {
  const { t, isRtl } = useLanguage()
  if (!rows.length) return <p className="py-6 text-sm text-muted-foreground">{t('noResults')}</p>

  return (
    <div className="overflow-x-auto">
      <table className={`w-full min-w-[560px] border-collapse text-sm ${isRtl ? 'text-right' : 'text-left'}`}>
        <thead>
          <tr className="border-b border-border text-[11px] uppercase tracking-wide text-muted-foreground">
            {columns.map((column) => (
              <th key={column.key} className={`px-3 py-3 font-semibold ${column.className ?? ''}`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-border/60 last:border-0">
              {columns.map((column) => (
                <td key={column.key} className={`px-3 py-3 align-middle ${column.className ?? ''}`}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
