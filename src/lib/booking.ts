import { addons, rooms, type RoomId } from '../data/rooms'
import { eachNight, isWeekend, nightsBetween } from './dates'

export type StayMode = 'bed' | 'full'

export type StayDraft = {
  roomId: RoomId
  mode: StayMode
  guests: number
  checkIn: string
  checkOut: string
  peak: boolean
  addonIds: string[]
}

export type StayQuote = {
  nights: number
  weekendNights: number
  roomSubtotal: number
  addonTotal: number
  total: number
  advance: number
  remainder: number
  fullPaymentRequired: boolean
}

export function quoteStay(draft: StayDraft): StayQuote | null {
  const room = rooms.find((r) => r.id === draft.roomId)
  if (!room) return null
  const nights = nightsBetween(draft.checkIn, draft.checkOut)
  if (nights < 1) return null

  const overnight = eachNight(draft.checkIn, draft.checkOut)
  const weekendNights = overnight.filter(isWeekend).length
  const guests = Math.min(Math.max(1, draft.guests), room.occupancy)

  let roomSubtotal = 0
  for (const night of overnight) {
    let rate = draft.mode === 'full' ? room.fullRate : room.bedRate * guests
    if (isWeekend(night)) rate *= 1.1
    if (draft.peak) rate *= 1.2
    roomSubtotal += rate
  }

  let addonTotal = 0
  for (const id of draft.addonIds) {
    const addon = addons.find((a) => a.id === id)
    if (!addon || addon.complimentary) continue
    addonTotal += addon.per === 'guest' ? addon.price * guests : addon.price
  }

  const total = roomSubtotal + addonTotal
  const fullPaymentRequired = draft.mode === 'full' || guests >= 6 || draft.peak
  const advance = fullPaymentRequired ? total : total * 0.3
  return {
    nights,
    weekendNights,
    roomSubtotal,
    addonTotal,
    total,
    advance,
    remainder: total - advance,
    fullPaymentRequired,
  }
}
