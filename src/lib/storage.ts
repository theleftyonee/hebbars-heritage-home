export type StoredKind = 'stay' | 'event' | 'shoot'

export type StoredRequest = {
  id: string
  kind: StoredKind
  createdAt: string
  payload: Record<string, string | number | boolean | string[]>
}

const KEY = 'hebbars-heritage-requests'

function readAll(): StoredRequest[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as StoredRequest[]) : []
  } catch {
    return []
  }
}

export function generateReference(): string {
  const hex = Math.floor(Math.random() * 0xffff)
    .toString(16)
    .toUpperCase()
    .padStart(4, '0')
  return `HHH-${hex}`
}

export function saveRequest(
  kind: StoredKind,
  payload: Record<string, string | number | boolean | string[]>,
): StoredRequest {
  const entry: StoredRequest = {
    id: generateReference(),
    kind,
    createdAt: new Date().toISOString(),
    payload,
  }
  const next = [entry, ...readAll()].slice(0, 40)
  localStorage.setItem(KEY, JSON.stringify(next))
  return entry
}
