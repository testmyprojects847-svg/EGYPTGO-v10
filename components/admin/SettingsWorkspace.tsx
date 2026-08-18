'use client'

import { useState } from 'react'
import { settingsService, type AdminSettings } from '@/services/settings/settingsService'

export function SettingsWorkspace() {
  const [settings, setSettings] = useState<AdminSettings>(() => settingsService.get())
  const [saved, setSaved] = useState(false)
  const update = <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) => setSettings((current) => ({ ...current, [key]: value }))
  const save = () => { settingsService.save(settings); setSaved(true); window.setTimeout(() => setSaved(false), 2200) }
  return <section className="flex flex-col gap-6">
    <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Configuration</p><h2 className="mt-1 text-2xl font-bold">Marketplace settings</h2><p className="mt-1 text-sm text-muted-foreground">Control the customer-facing identity and business rules from one persisted source.</p></div>
    <div className="grid gap-4 md:grid-cols-2">
      <label className="flex flex-col gap-2 text-sm font-medium">Site name<input value={settings.siteName} onChange={(e) => update('siteName', e.target.value)} className="rounded-xl border border-border bg-background px-3 py-2 font-normal" /></label>
      <label className="flex flex-col gap-2 text-sm font-medium">Arabic site name<input value={settings.siteNameAr} onChange={(e) => update('siteNameAr', e.target.value)} dir="rtl" className="rounded-xl border border-border bg-background px-3 py-2 font-normal" /></label>
      <label className="flex flex-col gap-2 text-sm font-medium">Contact email<input type="email" value={settings.contactEmail} onChange={(e) => update('contactEmail', e.target.value)} className="rounded-xl border border-border bg-background px-3 py-2 font-normal" /></label>
      <label className="flex flex-col gap-2 text-sm font-medium">Cancellation window (hours)<input type="number" min="0" value={settings.cancellationWindowHours} onChange={(e) => update('cancellationWindowHours', Number(e.target.value))} className="rounded-xl border border-border bg-background px-3 py-2 font-normal" /></label>
    </div>
    <div className="grid gap-3 rounded-2xl border border-border bg-background p-4 text-sm md:grid-cols-3"><label className="flex items-center gap-3"><input type="checkbox" checked={settings.bookingEnabled} onChange={(e) => update('bookingEnabled', e.target.checked)} />Bookings enabled</label><label className="flex items-center gap-3"><input type="checkbox" checked={settings.registrationEnabled} onChange={(e) => update('registrationEnabled', e.target.checked)} />Registration enabled</label><label className="flex items-center gap-3"><select value={settings.defaultCurrency} onChange={(e) => update('defaultCurrency', e.target.value as AdminSettings['defaultCurrency'])} className="rounded-lg border border-border bg-card px-2 py-1"><option value="USD">USD</option><option value="EGP">EGP</option></select>Default currency</label></div>
    <div className="flex items-center gap-3"><button onClick={save} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Save settings</button>{saved && <span role="status" className="text-sm text-accent">Settings saved</span>}</div>
  </section>
}
