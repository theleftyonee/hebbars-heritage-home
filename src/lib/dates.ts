export function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function startOfToday(): Date {
  const n = new Date()
  return new Date(n.getFullYear(), n.getMonth(), n.getDate())
}

export function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function isBeforeDay(a: Date, b: Date): boolean {
  return toISODate(a) < toISODate(b)
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = parseISODate(checkIn).getTime()
  const b = parseISODate(checkOut).getTime()
  return Math.round((b - a) / 86400000)
}

export function eachNight(checkIn: string, checkOut: string): Date[] {
  const nights: Date[] = []
  const start = parseISODate(checkIn)
  const end = parseISODate(checkOut)
  for (let d = start; d < end; d = addDays(d, 1)) {
    nights.push(d)
  }
  return nights
}

export function isWeekend(d: Date): boolean {
  const day = d.getDay()
  return day === 0 || day === 6
}

export function formatLong(iso: string): string {
  return parseISODate(iso).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function monthLabel(year: number, month: number): string {
  return new Date(year, month, 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
}

export function rupees(n: number): string {
  return `₹${Math.round(n).toLocaleString('en-IN')}`
}
