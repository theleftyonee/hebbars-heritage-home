import { useMemo, useState, type FormEvent } from 'react'
import { addons, rooms, type RoomId } from '../data/rooms'
import { quoteStay } from '../lib/booking'
import { addDays, formatLong, rupees, startOfToday, toISODate } from '../lib/dates'
import { saveRequest } from '../lib/storage'
import type { Confirmation } from './ConfirmModal'
import DateCalendar from './DateCalendar'
import Reveal from './Reveal'

type Props = {
  roomId: RoomId
  onRoom: (id: RoomId) => void
  onConfirm: (c: Confirmation) => void
}

export default function Booking({ roomId, onRoom, onConfirm }: Props) {
  const today = startOfToday()
  const [monthCursor, setMonthCursor] = useState({ y: today.getFullYear(), m: today.getMonth() })
  const [checkIn, setCheckIn] = useState(toISODate(addDays(today, 1)))
  const [checkOut, setCheckOut] = useState(toISODate(addDays(today, 3)))
  const [mode, setMode] = useState<'bed' | 'full'>('bed')
  const [guests, setGuests] = useState(1)
  const [peak, setPeak] = useState(false)
  const [addonIds, setAddonIds] = useState<string[]>(['tour'])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [arrival, setArrival] = useState('13:00')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  const room = rooms.find((r) => r.id === roomId) ?? rooms[0]
  const cappedGuests = Math.min(guests, room.occupancy)

  const quote = useMemo(
    () =>
      quoteStay({
        roomId,
        mode,
        guests: cappedGuests,
        checkIn,
        checkOut,
        peak,
        addonIds,
      }),
    [roomId, mode, cappedGuests, checkIn, checkOut, peak, addonIds],
  )

  function pickDay(iso: string) {
    if (!checkIn || (checkIn && checkOut) || iso <= checkIn) {
      setCheckIn(iso)
      setCheckOut('')
      return
    }
    setCheckOut(iso)
  }

  function toggleAddon(id: string) {
    setAddonIds((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]))
  }

  function submit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!quote) {
      setError('Please choose a departure date after arrival.')
      return
    }
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Name, email and telephone are required.')
      return
    }
    const saved = saveRequest('stay', {
      room: room.name,
      mode,
      guests: cappedGuests,
      checkIn,
      checkOut,
      peak,
      addonIds,
      name,
      email,
      phone,
      arrival,
      notes,
      total: Math.round(quote.total),
    })
    onConfirm({
      kind: 'stay',
      reference: saved.id,
      title: 'Stay request filed',
      lines: [
        `${room.name} · ${mode === 'full' ? 'full room' : `${cappedGuests} bed(s)`}`,
        `${formatLong(checkIn)} → ${formatLong(checkOut)} · ${quote.nights} night(s)`,
        `Total ${rupees(quote.total)} · ${quote.fullPaymentRequired ? 'full payment at confirmation' : `30% advance ${rupees(quote.advance)}`}`,
        `Arrival window ${arrival}`,
        'House Desk will confirm availability. Cancellation free until 48 hours before check-in.',
      ],
    })
  }

  return (
    <section className="section section-dark" id="book">
      <div className="wrap">
        <Reveal>
          <p className="kicker">House ledger</p>
          <h2 className="section-title">Book a stay</h2>
          <p className="lede">
            Choose dates on the calendar. A 30% advance confirms most direct bookings; full payment is required for group,
            exclusive-dorm and peak dates. Remaining balance is due at check-in.
          </p>
        </Reveal>
        <div className="book-layout">
          <Reveal variant="left">
            <div className="ledger">
            <DateCalendar
              year={monthCursor.y}
              month={monthCursor.m}
              checkIn={checkIn}
              checkOut={checkOut}
              onMonth={(y, m) => setMonthCursor({ y, m })}
              onPick={pickDay}
              onClear={() => {
                setCheckIn('')
                setCheckOut('')
              }}
            />
            </div>
          </Reveal>
          <Reveal variant="right" delay={120}>
          <form className="ledger" onSubmit={submit}>
            {error ? <p className="error">{error}</p> : null}
            <div className="field">
              <span>Room</span>
              <select
                value={roomId}
                onChange={(e) => {
                  const next = e.target.value as RoomId
                  onRoom(next)
                  const found = rooms.find((r) => r.id === next)
                  if (found && guests > found.occupancy) setGuests(found.occupancy)
                }}
              >
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field-row">
              <label className="field">
                <span>Booking mode</span>
                <select value={mode} onChange={(e) => setMode(e.target.value as 'bed' | 'full')}>
                  <option value="bed">Individual bed(s)</option>
                  <option value="full">Full room</option>
                </select>
              </label>
              <label className="field">
                <span>Guests (max {room.occupancy})</span>
                <input
                  type="number"
                  min={1}
                  max={room.occupancy}
                  value={cappedGuests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                />
              </label>
            </div>
            <div className="field-row">
              <label className="field">
                <span>Arrival</span>
                <input value={checkIn} readOnly />
              </label>
              <label className="field">
                <span>Departure</span>
                <input value={checkOut || 'Select a date'} readOnly />
              </label>
            </div>
            <label className="field">
              <span>Expected arrival time</span>
              <input type="time" value={arrival} onChange={(e) => setArrival(e.target.value)} />
            </label>
            <p className="kicker">Add-ons</p>
            {addons.map((addon) => (
              <label className="check-row" key={addon.id}>
                <input
                  type="checkbox"
                  checked={addonIds.includes(addon.id)}
                  onChange={() => toggleAddon(addon.id)}
                />
                <span>
                  {addon.name}
                  {addon.complimentary ? ' — complimentary for staying guests' : ` — ${rupees(addon.price)} / ${addon.per}`}
                </span>
              </label>
            ))}
            <label className="check-row">
              <input type="checkbox" checked={peak} onChange={(e) => setPeak(e.target.checked)} />
              <span>Festival / peak tourist period (+20%)</span>
            </label>
            <div className="field-row">
              <label className="field">
                <span>Full name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </label>
              <label className="field">
                <span>Telephone</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
              </label>
            </div>
            <label className="field">
              <span>Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </label>
            <label className="field">
              <span>Notes for the House Desk</span>
              <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </label>
            {quote ? (
              <div className="quote">
                <div>
                  {quote.nights} night{quote.nights === 1 ? '' : 's'}
                  {quote.weekendNights ? ` · ${quote.weekendNights} weekend night(s)` : ''}
                </div>
                <div>Rooms {rupees(quote.roomSubtotal)}</div>
                <div>Add-ons {rupees(quote.addonTotal)}</div>
                <div className="total">{rupees(quote.total)}</div>
                <div>
                  {quote.fullPaymentRequired
                    ? 'Full payment required for this request'
                    : `30% advance ${rupees(quote.advance)} · balance ${rupees(quote.remainder)} at check-in`}
                </div>
              </div>
            ) : (
              <p className="fine-print">Select a departure date to see the total.</p>
            )}
            <button className="btn btn-blue" type="submit" style={{ marginTop: 18, width: '100%' }}>
              Send stay request
            </button>
          </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
