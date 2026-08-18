'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Camera, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/hooks/useLanguage'

const MAX_BYTES = 5 * 1024 * 1024 // 5MB

export function AvatarUpload({ name, size = 96 }: { name: string; size?: number }) {
  const { t } = useLanguage()
  const { user, updateProfile } = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const initials = name.trim().slice(0, 1).toUpperCase()

  const pickFile = () => inputRef.current?.click()

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (file.size > MAX_BYTES) {
      setError(t('imageTooLarge'))
      window.setTimeout(() => setError(''), 3000)
      return
    }
    setLoading(true)
    const reader = new FileReader()
    reader.onload = () => {
      updateProfile({ avatar: String(reader.result) })
      setLoading(false)
    }
    reader.onerror = () => setLoading(false)
    reader.readAsDataURL(file)
  }

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <button
        type="button"
        onClick={pickFile}
        aria-label={t('changePhoto')}
        title={t('changePhoto')}
        className="group relative block size-full overflow-hidden rounded-full ring-4 ring-card"
      >
        {user?.avatar ? (
          <Image src={user.avatar} alt={name} fill sizes={`${size}px`} className="object-cover" />
        ) : (
          <span className="grid size-full place-items-center bg-gold text-2xl font-bold text-gold-foreground">
            {initials || 'E'}
          </span>
        )}
        <span className="absolute inset-0 grid place-items-center bg-black/0 transition-colors group-hover:bg-black/40">
          {loading ? (
            <Loader2 className="size-5 animate-spin text-white opacity-100" />
          ) : (
            <Camera className="size-5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </span>
      </button>
      <input ref={inputRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />
      {error && (
        <p role="alert" className="absolute top-full mt-1 w-40 text-center text-[10px] font-semibold text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}