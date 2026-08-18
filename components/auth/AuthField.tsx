'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export function AuthField({
  label,
  type = 'text',
  value,
  onChange,
  required = true,
}: {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}) {
  const [reveal, setReveal] = useState(false)
  const isPassword = type === 'password'
  return (
    <label className="block">
      <p className="mb-2 text-xs font-semibold">{label}</p>
      <div className="relative">
        <input
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          type={isPassword && reveal ? 'text' : type}
          className="w-full rounded-xl border border-border bg-background px-3 py-3 text-xs outline-none focus:ring-2 focus:ring-accent/30"
        />
        {isPassword && (
          <button type="button" onClick={() => setReveal(!reveal)} className="absolute right-3 top-3 text-muted-foreground">
            {reveal ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
      </div>
    </label>
  )
}
