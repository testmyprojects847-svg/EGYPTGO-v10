'use client'

import { BookOpen, CalendarCheck, CircleUserRound, FileText, Globe2, LayoutDashboard, LogOut, Map, Settings, Shield, Users, UserRound, X } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

const items = [
  ['dashboard', LayoutDashboard], ['tours', BookOpen], ['destinations', Map], ['bookings', CalendarCheck], ['users', Users], ['guides', UserRound], ['reviews', FileText], ['profile', CircleUserRound], ['settings', Settings],
] as const

export function AdminSidebar({ active, onChange, open, onClose }: { active: string; onChange: (key: string) => void; open: boolean; onClose: () => void }) {
  const { isRtl, t } = useLanguage()
  const labels: Record<string, keyof typeof import('@/messages/en.json')> = { dashboard: 'dashboard', tours: 'toursManagement', destinations: 'destinationsManagement', bookings: 'bookingsManagement', users: 'usersManagement', guides: 'guides', reviews: 'reviewsModeration', profile: 'profileInformation', settings: 'settings' }
  return <>
    {open && <button aria-label={t('closeNavigation')} onClick={onClose} className="fixed inset-0 z-40 bg-primary/30 md:hidden" />}
    <aside dir={isRtl ? 'rtl' : 'ltr'} className={`fixed inset-y-0 z-50 flex w-72 flex-col bg-primary p-5 text-primary-foreground shadow-2xl transition-transform md:sticky md:top-0 md:h-screen md:!translate-x-0 ${isRtl ? 'right-0 lg:right-auto' : 'left-0'} ${open ? 'translate-x-0' : isRtl ? 'translate-x-full' : '-translate-x-full'}`}>
      <div className="mb-8 flex items-center justify-between"><div className="flex items-center gap-3"><div className="rounded-xl bg-accent p-2 text-accent-foreground"><Globe2 className="size-5" /></div><div><p className="font-bold tracking-tight">EgyptGO</p><p className="text-[10px] uppercase tracking-widest text-primary-foreground/60">Admin console</p></div></div><button className="md:hidden" onClick={onClose} aria-label={t('closeNavigation')}><X /></button></div>
      <nav className="flex flex-1 flex-col gap-1">{items.map(([key, Icon]) => <button key={key} onClick={() => { onChange(key); onClose() }} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${active === key ? 'bg-primary-foreground text-primary shadow-sm' : 'text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground'}`}><Icon className="size-4" />{t(labels[key])}</button>)}</nav>
      <div className="border-t border-primary-foreground/10 pt-4 text-xs text-primary-foreground/60"><div className="flex items-center gap-2 px-3 py-2"><Shield className="size-4" /> {t('protectedAdminAccess')}</div><button onClick={() => window.open('/', '_blank')} className="flex items-center gap-2 px-3 py-2 hover:text-primary-foreground"><LogOut className="size-4" /> {t('viewWebsite')}</button></div>
    </aside>
  </>
}