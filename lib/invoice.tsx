'use client'

import { useState } from 'react'
import jsPDF from 'jspdf'
import type { Booking, Locale } from '@/types'
import { tourService } from '@/services/tours/tourService'
import { EGP_PER_USD, SUPPORT_EMAIL, SUPPORT_PHONE } from '@/lib/constants'

const NAVY = '#10243b'
const GOLD = '#b8860b'
const TEXT = '#172033'
const MUTED = '#64748b'
const LIGHT = '#f1f5f7'
const GREEN = '#dff5e9'
const GREEN_TEXT = '#1b7a4b'

const LOGO_ASPECT = 1140 / 800

function money(value: number) {
  return `USD ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function safeDate(value?: string) {
  if (!value) return 'Not provided'
  return value.slice(0, 10)
}

async function loadImageAsDataUrl(path: string): Promise<string> {
  const response = await fetch(path)
  const blob = await response.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export async function downloadInvoice(booking: Booking, _locale: Locale) {
  const tour = tourService.getById(booking.tourId)
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const left = 15
  const right = 195
  const labelX = 20
  const valueX = 70
  let y = 58

  const logoWidth = 52
  const logoHeight = logoWidth / LOGO_ASPECT
  try {
    const logoDataUrl = await loadImageAsDataUrl('/assets/logo-invoice.png')
    doc.addImage(logoDataUrl, 'PNG', left, 10, logoWidth, logoHeight)
  } catch {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.setTextColor(NAVY)
    doc.text('EgyptGO', left, 22)
  }
  doc.setDrawColor(GOLD)
  doc.setLineWidth(0.6)
  doc.line(left, 52, right, 52)

  const section = (title: string, shaded = false) => {
    if (shaded) {
      doc.setFillColor(LIGHT)
      doc.roundedRect(left, y, 180, 30, 3, 3, 'F')
    }
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(NAVY)
    doc.text(title.toUpperCase(), labelX, y + 8)
    y += shaded ? 16 : 13
  }
  const row = (label: string, value: string, options: { bold?: boolean; color?: string } = {}) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(MUTED)
    doc.text(label, labelX, y)
    doc.setFont('helvetica', options.bold ? 'bold' : 'normal')
    doc.setTextColor(options.color ?? TEXT)
    doc.text(value || 'Not provided', valueX, y)
    y += 7
  }
  const divider = () => {
    doc.setDrawColor(210, 220, 226)
    doc.setLineWidth(0.25)
    doc.line(left, y, right, y)
    y += 8
  }

  section('Booking summary', true)
  row('Reference', booking.reference ?? booking.id, { bold: true })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(MUTED)
  doc.text('Status', labelX, y)
  const status = booking.status === 'confirmed' ? 'Confirmed' : booking.status === 'cancelled' ? 'Cancelled' : 'Pending'
  const statusWidth = doc.getTextWidth(status) + 8
  doc.setFillColor(booking.status === 'confirmed' ? GREEN : booking.status === 'cancelled' ? '#fee2e2' : '#fef3c7')
  doc.roundedRect(valueX, y - 4.5, statusWidth, 6.5, 3, 3, 'F')
  doc.setTextColor(booking.status === 'confirmed' ? GREEN_TEXT : booking.status === 'cancelled' ? '#b91c1c' : '#a16207')
  doc.text(status, valueX + 4, y)
  y += 7
  row('Booking date', safeDate(booking.createdAt))
  y += 7

  section('Customer details')
  row('Name', booking.customerName)
  row('Email', booking.customerEmail)
  row('Phone', booking.phone ?? 'Not provided')
  divider()

  section('Trip details')
  row('Tour', tour?.title ?? booking.tourTitle)
  row('Destination', tour?.location ?? booking.destination ?? 'Egypt')
  row('Travel date', safeDate(booking.date))
  row('Duration', booking.tourDuration ?? `${tour?.days ?? 1} day${(tour?.days ?? 1) === 1 ? '' : 's'}`)
  row('Travelers', String(booking.travelers))
  row('Meeting point', tour?.meetingPoint ?? booking.meetingPoint ?? 'Hotel pickup in Cairo or Giza')
  divider()

  section('Price breakdown')
  const conversion = booking.currency === 'EGP' ? EGP_PER_USD : 1
  const invoiceTotal = booking.total / conversion
  const invoiceSaved = (booking.saved ?? 0) / conversion
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(TEXT)
  doc.text(`Base price x ${booking.travelers} traveler${booking.travelers === 1 ? '' : 's'}`, labelX, y)
  const oldTotal = invoiceSaved ? invoiceTotal + invoiceSaved : undefined
  if (oldTotal) {
    doc.setTextColor(MUTED)
    doc.setFontSize(8)
    doc.text(money(oldTotal), 145, y)
    doc.setDrawColor(MUTED)
    doc.line(145, y - 1, 145 + doc.getTextWidth(money(oldTotal)), y - 1)
  }
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(TEXT)
  doc.text(money(invoiceTotal), right, y, { align: 'right' })
  y += 9
  divider()
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(NAVY)
  doc.text('Total', labelX, y)
  doc.text(money(invoiceTotal), right, y, { align: 'right' })

  doc.setFillColor(NAVY)
  doc.rect(0, 277, 210, 20, 'F')
  doc.setTextColor(220, 232, 241)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.text(`${SUPPORT_EMAIL}   ${SUPPORT_PHONE}`, 105, 285, { align: 'center' })
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Thank you for choosing EgyptGo', 105, 291, { align: 'center' })
  doc.save(`egyptgo-invoice-${booking.reference ?? booking.id}.pdf`)
}

export function invoiceFilename(booking: Booking) {
  return `egyptgo-invoice-${booking.reference ?? booking.id}.pdf`
}

export function InvoiceButton({ booking, locale, label }: { booking: Booking; locale: Locale; label: string }) {
  const [loading, setLoading] = useState(false)
  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        setLoading(true)
        try {
          await downloadInvoice(booking, locale)
        } finally {
          setLoading(false)
        }
      }}
      className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-muted disabled:opacity-60"
    >
      {loading ? 'Generating…' : label}
    </button>
  )
}