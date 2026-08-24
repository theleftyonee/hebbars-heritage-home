import { useState, type KeyboardEvent } from 'react'
import {
  addDays,
  formatLong,
  isBeforeDay,
  isSameDay,
  isWeekend,
  monthLabel,
  nightsBetween,
  parseISODate,
  startOfToday,
  toISODate,
} from '../lib/dates'

type Props = {
  year: number
  month: number
  checkIn: string
  checkOut: string
  onMonth: (year: number, month: number) => void
  onPick: (iso: string) => void
  onClear: () => void
}

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function DateCalendar({ year, month, checkIn, checkOut, onMonth, onPick, onClear }: Props) {
  const today = startOfToday()
  const [hover, setHover] = useState<string | null>(null)
  const first = new Date(year, month, 1)
  const startWeekday = first.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (Date | null)[] = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)

  const prevBlocked = year < today.getFullYear() || (year === today.getFullYear() && month <= today.getMonth())
  const rangeEnd = checkOut || (checkIn && hover && hover > checkIn ? hover : '')
  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0

  function prev() {
    const d = new Date(year, month - 1, 1)
    onMonth(d.getFullYear(), d.getMonth())
  }

  function next() {
    const d = new Date(year, month + 1, 1)
    onMonth(d.getFullYear(), d.getMonth())
  }

  function onGridKey(e: KeyboardEvent<HTMLDivElement>) {
    const current = hover || checkOut || checkIn || toISODate(today)
    const origin = parseISODate(current)
    let nextDay: Date | null = null
    if (e.key === 'ArrowLeft') nextDay = addDays(origin, -1)
    if (e.key === 'ArrowRight') nextDay = addDays(origin, 1)
    if (e.key === 'ArrowUp') nextDay = addDays(origin, -7)
    if (e.key === 'ArrowDown') nextDay = addDays(origin, 7)
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!isBeforeDay(origin, today)) onPick(current)
      return
    }
    if (!nextDay) return
    e.preventDefault()
    if (isBeforeDay(nextDay, today)) return
    const iso = toISODate(nextDay)
    setHover(iso)
    if (nextDay.getMonth() !== month || nextDay.getFullYear() !== year) {
      onMonth(nextDay.getFullYear(), nextDay.getMonth())
    }
  }

  return (
    <div className="calendar">
      <div className="cal-head">
        <button type="button" className="icon-btn" onClick={prev} disabled={prevBlocked} aria-label="Previous month">
          ‹
        </button>
        <h3>{monthLabel(year, month)}</h3>
        <button type="button" className="icon-btn" onClick={next} aria-label="Next month">
          ›
        </button>
      </div>
      <div className="cal-status">
        {checkIn && checkOut ? (
          <p>
            <strong>{formatLong(checkIn)}</strong>
            <span> → </span>
            <strong>{formatLong(checkOut)}</strong>
            <span>
              {' '}
              · {nights} night{nights === 1 ? '' : 's'}
            </span>
          </p>
        ) : checkIn ? (
          <p>
            Arrive <strong>{formatLong(checkIn)}</strong> · now choose departure
          </p>
        ) : (
          <p>Select an arrival date, then a departure.</p>
        )}
        {checkIn ? (
          <button type="button" className="cal-reset" onClick={onClear}>
            Reset
          </button>
        ) : null}
      </div>
      <div
        className="cal-grid"
        tabIndex={0}
        onKeyDown={onGridKey}
        onMouseLeave={() => setHover(null)}
        aria-label="Stay calendar"
      >
        {DOW.map((d) => (
          <div className="cal-dow" key={d}>
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />
          const iso = toISODate(day)
          const disabled = isBeforeDay(day, today)
          const start = checkIn === iso
          const end = checkOut === iso
          const inRange = Boolean(checkIn && rangeEnd && iso > checkIn && iso < rangeEnd)
          const previewing = Boolean(!checkOut && checkIn && hover && hover > checkIn)
          const previewEnd = previewing && iso === hover
          const classes = [
            'cal-day',
            isWeekend(day) ? 'is-weekend' : '',
            isSameDay(day, today) ? 'is-today' : '',
            start ? 'is-start' : '',
            end ? 'is-end' : '',
            inRange ? (previewing ? 'is-preview' : 'in-range') : '',
            previewEnd ? 'is-preview-end' : '',
          ]
            .filter(Boolean)
            .join(' ')
          return (
            <button
              key={iso}
              type="button"
              className={classes}
              disabled={disabled}
              onClick={() => onPick(iso)}
              onMouseEnter={() => setHover(iso)}
              aria-label={`${iso}${start ? ', arrival' : ''}${end ? ', departure' : ''}${isWeekend(day) ? ', weekend' : ''}`}
              aria-pressed={start || end}
            >
              {day.getDate()}
              {start ? <span className="cal-tag">In</span> : null}
              {end || previewEnd ? <span className="cal-tag">{end ? 'Out' : 'Out?'}</span> : null}
            </button>
          )
        })}
      </div>
      <div className="cal-legend">
        <span>
          <i className="swatch swatch-in" /> Arrival
        </span>
        <span>
          <i className="swatch swatch-span" /> Nights
        </span>
        <span>
          <i className="swatch swatch-week" /> Weekend +10%
        </span>
        <span>
          <i className="swatch swatch-today" /> Today
        </span>
      </div>
      <p className="fine-print">Minimum one night. Use arrow keys to move, Enter to select.</p>
    </div>
  )
}
