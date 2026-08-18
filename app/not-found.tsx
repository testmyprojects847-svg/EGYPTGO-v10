import Link from 'next/link'
import { routes } from '@/lib/routes'

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-4 text-center">
      <div>
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-3 text-sm text-muted-foreground">We couldn&apos;t find that page.</p>
        <Link href={routes.home} className="mt-6 inline-block rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">
          Back home
        </Link>
      </div>
    </div>
  )
}
