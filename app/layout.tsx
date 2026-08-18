import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { AppProviders } from '@/providers/AppProviders'
import { Topbar } from '@/components/layout/Topbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'EgyptGo — Discover the timeless wonders of Egypt',
  description: 'Book unforgettable tours, hotels, guides and experiences across Egypt with EgyptGo.',
  icons: {
    icon: [
      { url: '/icons/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icons/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icons/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icons/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <AppProviders>
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Topbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AppProviders>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
