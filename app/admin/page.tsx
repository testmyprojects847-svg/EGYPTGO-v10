'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { AdminProfilePanel } from '@/components/admin/AdminProfilePanel'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { GuideWorkspace } from '@/components/admin/GuideWorkspace'
import { RecentBookings } from '@/components/admin/RecentBookings'
import { BookingTable } from '@/components/admin/BookingTable'
import { DestinationForm } from '@/components/admin/DestinationForm'
import { ReviewModeration } from '@/components/admin/ReviewModeration'
import { StatCards } from '@/components/admin/StatCards'
import { SettingsWorkspace } from '@/components/admin/SettingsWorkspace'
import { TourTable } from '@/components/admin/TourTable'
import { UserTable } from '@/components/admin/UserTable'
import { RequireRole } from '@/components/auth/RequireRole'
import { useCurrency } from '@/hooks/useCurrency'
import { useLanguage } from '@/hooks/useLanguage'
import { bookingService } from '@/services/bookings/bookingService'
import { tourService } from '@/services/tours/tourService'
import { users } from '@/data/users'
import { routes } from '@/lib/routes'

function AdminDashboard() {
  const { dir, t } = useLanguage(); const { format } = useCurrency(); const searchParams = useSearchParams(); const [tab, setTab] = useState(searchParams.get('tab') ?? 'tours'); const [sidebarOpen, setSidebarOpen] = useState(false); const stats = bookingService.stats()
  const active = tab === 'dashboard' ? 'tours' : tab
  const content = tab === 'tours' ? <><div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(330px,0.75fr)]"><div className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-sm"><TourTable /></div><div className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-sm"><GuideWorkspace /></div></div><RecentBookings /></> : tab === 'guides' ? <div className="rounded-2xl border border-border bg-card p-5 shadow-sm"><GuideWorkspace /></div> : tab === 'bookings' ? <div className="rounded-2xl border border-border bg-card p-5 shadow-sm"><BookingTable /></div> : tab === 'destinations' ? <DestinationForm /> : tab === 'users' ? <UserTable /> : tab === 'reviews' ? <ReviewModeration /> : tab === 'profile' ? <AdminProfilePanel /> : tab === 'settings' ? <SettingsWorkspace /> : <TourTable />
  return <div dir={dir} className="min-h-screen bg-muted/30 md:flex"><AdminSidebar active={active} onChange={setTab} open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><div className="min-w-0 flex-1"><AdminHeader onMenu={() => setSidebarOpen(true)} /><main className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8"><div className="flex flex-col gap-2"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t('egyptgoOperations')}</p><h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('marketplaceAtGlance')}</h2><p className="max-w-2xl text-sm leading-6 text-muted-foreground">{t('manageExperiences')}</p></div><StatCards items={[{ label: t('totalBookings'), value: String(stats.total), change: '+12.5%' }, { label: t('totalRevenue'), value: format(stats.revenue), change: '+8.2%' }, { label: t('toursManagement'), value: String(tourService.list().length), change: '+4.3%' }, { label: t('totalUsers'), value: String(users.length), change: '+18.7%' }]} />{content}</main></div></div>
}

export default function AdminPage() { return <RequireRole role="admin" redirectTo={routes.adminSignIn}><AdminDashboard /></RequireRole> }