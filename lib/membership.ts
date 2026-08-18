import type { Booking } from '@/types'

export type MembershipTier = 'explorer' | 'voyager' | 'pharaoh'

export function membershipTier(bookings: Booking[]): MembershipTier {
  const trips = bookings.filter((booking) => booking.status !== 'cancelled').length
  if (trips >= 6) return 'pharaoh'
  if (trips >= 3) return 'voyager'
  return 'explorer'
}

export const membershipKey = (tier: MembershipTier) =>
  ({ explorer: 'tierExplorer', voyager: 'tierVoyager', pharaoh: 'tierPharaoh' } as const)[tier]
