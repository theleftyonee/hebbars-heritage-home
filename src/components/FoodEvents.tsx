import { useState, type FormEvent } from 'react'
import { dailyService, weekGrid, weekendEvents, weeklyEvents, type HouseEvent } from '../data/events'
import { saveRequest } from '../lib/storage'
import type { Confirmation } from './ConfirmModal'
import Reveal from './Reveal'

type Props = {
  onConfirm: (c: Confirmation) => void
}

export default function FoodEvents({ onConfirm }: Props) {
  const [event, setEvent] = useState<HouseEvent | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [guests, setGuests] = useState(1)
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  const allEvents = [...weekendEvents, ...weeklyEvents]

  function openNamed(label: string) {
    const text = label.toLowerCase()
    const byId = (id: string) => allEvents.find((item) => item.id === id) ?? allEvents[0]
    if (text.includes('walk')) {
      setEvent(byId('fort-walk'))
      return
    }
    if (text.includes('tiffin')) {
      setEvent(byId('tiffin-table'))
      return
    }
    if (text.includes('heritage') || text.includes('tour')) {
      setEvent(byId('house-tour'))
      return
    }
    if (text.includes('game')) {
      setEvent(byId('game-evening'))
      return
    }
    if (text.includes('shoot')) {
      setEvent(byId('shoot-preview'))
      return
    }
    if (text.includes('filter coffee session') || text.includes('coffee session')) {
      setEvent(byId('slow-coffee'))
      return
    }
    if (text.includes('coffee and games')) {
      setEvent(byId('coffee-games'))
      return
    }
    setEvent({
      id: 'daily-table',
      name: label,
      when: 'Daily house service',
      price: 'As listed',
      blurb: 'Reserve a place for daily coffee, breakfast, tiffin or dinner. Cut-off times still apply.',
      bookable: true,
    })
  }

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!event) return
    setError('')
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required.')
      return
    }
    const saved = saveRequest('event', {
      event: event.name,
      name,
      email,
      guests,
      date,
    })
    onConfirm({
      kind: 'event',
      reference: saved.id,
      title: 'Table / activity reserved',
      lines: [
        event.name,
        date ? `Preferred date ${date}` : event.when,
        `${guests} guest(s)`,
        event.price,
        'Weekend meals, walks and workshops close 12–24 hours prior. Walk-ins only if seats remain.',
      ],
    })
    setEvent(null)
    setName('')
    setEmail('')
  }

  return (
    <section className="section" id="table">
      <div className="wrap">
        <div className="stay-intro">
          <Reveal variant="left">
            <figure className="frame">
              <img
                src="/images/tiffin.jpg"
                alt="Communal dining table, brass tiffin jars, today’s menu and the kitchen beyond carved teak screens"
              />
              <figcaption>Tiffin Table · filter coffee · kitchen</figcaption>
            </figure>
          </Reveal>
          <Reveal variant="right" delay={120}>
            <p className="kicker">Food &amp; house calendar</p>
            <h2 className="section-title">Filter coffee, tiffin, and a slower week.</h2>
            <p className="lede">
              Meals are taken at the long Tiffin Table. Daily service stays simple. Weekends open breakfast, the Fort
              walk and coffee sessions. Reserve a place here — the House Desk will confirm.
            </p>
          </Reveal>
        </div>
        <div className="service-strip">
          {dailyService.map((item) => (
            <article className="service-card" key={item.id}>
              <p className="kicker">{item.days}</p>
              <h3>{item.name}</h3>
              <p>
                {item.time}
                {item.price ? ` · ${item.price}` : ''}
              </p>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
        <p className="kicker">Sample week</p>
        <table className="week-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Morning</th>
              <th>Afternoon / evening</th>
            </tr>
          </thead>
          <tbody>
            {weekGrid.map((row) => (
              <tr key={row.day}>
                <td>{row.day}</td>
                <td>
                  <button type="button" onClick={() => openNamed(row.morning)}>
                    {row.morning}
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => openNamed(row.evening)}>
                    {row.evening}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="event-grid">
          {allEvents.map((item) => (
            <article className="event-card" key={item.id}>
              <p className="kicker">{item.when}</p>
              <h3>{item.name}</h3>
              <p>{item.blurb}</p>
              <p>
                {item.price}
                {item.capacity ? ` · ${item.capacity}` : ''}
              </p>
              <button type="button" className="btn btn-ghost-ink" onClick={() => setEvent(item)}>
                Reserve
              </button>
            </article>
          ))}
        </div>
        <p className="fine-print">
          Last public activity around 8:30 PM. Terrace and commons return to quiet use by 10:30 PM. Proposed programme —
          confirm before publishing as final.
        </p>
      </div>
      {event ? (
        <div className="modal-backdrop" onClick={() => setEvent(null)} role="presentation">
          <form
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            onSubmit={submit}
          >
            <p className="kicker">Reserve</p>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>
              {event.name}
            </h2>
            <p>{event.when}</p>
            {error ? <p className="error">{error}</p> : null}
            <label className="field">
              <span>Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="field">
              <span>Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <div className="field-row">
              <label className="field">
                <span>Guests</span>
                <input type="number" min={1} max={25} value={guests} onChange={(e) => setGuests(Number(e.target.value))} />
              </label>
              <label className="field">
                <span>Preferred date</span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </label>
            </div>
            <button className="btn btn-blue" type="submit">
              Hold a place
            </button>
          </form>
        </div>
      ) : null}
    </section>
  )
}
