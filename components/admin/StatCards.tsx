'use client'

export function StatCards({ items }: { items: { label: string; value: string; change?: string }[] }) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-border bg-card p-4">
          <p className="text-[10px] text-muted-foreground">{item.label}</p>
          <p className="mt-3 text-xl font-bold">{item.value}</p>
          {item.change && <p className="mt-1 text-[10px] font-semibold text-accent">{item.change}</p>}
        </div>
      ))}
    </div>
  )
}
