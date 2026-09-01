import { useState, type FormEvent } from 'react'
import { saveRequest } from '../lib/storage'
import type { Confirmation } from './ConfirmModal'
import Reveal from './Reveal'

type Props = {
  onConfirm: (c: Confirmation) => void
}

const alwaysRestricted = [
  'Residential floors and private homes',
  'Offices inside Apeejay Chambers',
  'Staff rooms and storage',
  'Electrical, plumbing and maintenance zones',
  'Guest rooms not in the booking',
  'Occupied dormitories and private rooms',
  'Lockers, luggage and guest belongings',
  'House Desk records',
  'Rooftop edges and unsafe structural areas',
]

const temporaryRestricted = [
  'Kitchen during food preparation',
  'Tiffin Table during meals',
  'Filter Coffee Corner during hosted sessions',
  'Washrooms during cleaning',
  'Corridor at check-in and check-out',
  'Terrace in rain, wind or maintenance',
  'Lounge during resident or guest activities',
  'Staircase during peak office movement',
]

export default function Shoots({ onConfirm }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [production, setProduction] = useState('')
  const [date, setDate] = useState('')
  const [duration, setDuration] = useState('half')
  const [crew, setCrew] = useState(4)
  const [areas, setAreas] = useState('')
  const [usage, setUsage] = useState('')
  const [error, setError] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim() || !production.trim() || !date) {
      setError('Production name, contact, email and date are required.')
      return
    }
    const saved = saveRequest('shoot', {
      name,
      email,
      production,
      date,
      duration,
      crew,
      areas,
      usage,
    })
    onConfirm({
      kind: 'shoot',
      reference: saved.id,
      title: 'Shoot enquiry received',
      lines: [
        production,
        `${date} · ${duration === 'full' ? 'full day (up to 8 hours)' : duration === 'half' ? 'half day (up to 4 hours)' : 'overtime / night (special approval)'}`,
        `Crew ${crew}${crew > 10 ? ' — productions over 10 require advance approval' : ''}`,
        areas || 'Areas to be confirmed with the House Desk',
        'A shoot booking does not grant access to the whole building. Commercial filming may need permissions beyond Hebbar’s.',
      ],
    })
  }

  return (
    <section className="section section-dark" id="shoots">
      <div className="wrap shoot-grid">
        <Reveal variant="left">
        <div>
          <p className="kicker">Location library</p>
          <h2 className="section-title">Shoots by appointment only.</h2>
          <p className="lede">
            Fashion editorials, portraits, product and small video. The rose-window landing is often requested for
            morning light. Send the production name, crew size, equipment list, areas required and intended use of the
            final work.
          </p>
          <div className="hours-pair">
            <article>
              <p className="kicker">Monday – Friday</p>
              <h3 className="section-title" style={{ fontSize: '1.8rem', margin: 0 }}>
                10:00 AM – 6:00 PM
              </h3>
            </article>
            <article>
              <p className="kicker">Saturday – Sunday</p>
              <h3 className="section-title" style={{ fontSize: '1.8rem', margin: 0 }}>
                8:00 AM – 7:00 PM
              </h3>
            </article>
          </div>
          <p>Maximum standard booking 8 hours · half-day up to 4 hours · overtime charged hourly · night shoots only with special approval.</p>
          <p>Arrive no more than 30 minutes before access. Setup, hair and makeup, shooting and pack-up must finish inside the booked period.</p>
          <div className="slot-list">
            <div className="slot">
              <span className="slot-name">Morning light</span>
              <span className="slot-time">8:00 AM – 12:00 PM</span>
            </div>
            <div className="slot">
              <span className="slot-name">Afternoon interiors</span>
              <span className="slot-time">1:00 PM – 5:00 PM</span>
            </div>
            <div className="slot">
              <span className="slot-name">Golden-hour terrace</span>
              <span className="slot-time">4:30 PM – 7:00 PM</span>
            </div>
          </div>
          <figure className="frame" style={{ marginTop: 24 }}>
            <img
              src="/images/rose-window.jpg"
              alt="Stained-glass rose window and tiled landing used as a natural-light shoot setting"
            />
            <figcaption>Rose window · morning light</figcaption>
          </figure>
          <figure className="frame" style={{ marginTop: 16 }}>
            <img
              src="/images/interiors.jpg"
              alt="Empty tiled room with teak panelling, Bombay-blue stars and afternoon window light"
            />
            <figcaption>Tiled interiors · afternoon light</figcaption>
          </figure>
          <div className="split-lists">
            <div>
              <p className="kicker">Always restricted</p>
              <ul>
                {alwaysRestricted.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="kicker">Temporarily restricted</p>
              <ul>
                {temporaryRestricted.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        </Reveal>
        <Reveal variant="right" delay={120}>
        <form className="ledger" onSubmit={submit}>
          <p className="kicker">Enquiry</p>
          <h3 className="section-title" style={{ fontSize: '2rem' }}>
            Request a date
          </h3>
          {error ? <p className="error">{error}</p> : null}
          <label className="field">
            <span>Production name</span>
            <input value={production} onChange={(e) => setProduction(e.target.value)} />
          </label>
          <div className="field-row">
            <label className="field">
              <span>Contact name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="field">
              <span>Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
          </div>
          <div className="field-row">
            <label className="field">
              <span>Preferred date</span>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
            <label className="field">
              <span>Duration</span>
              <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option value="half">Half day</option>
                <option value="full">Full day</option>
                <option value="overtime">Overtime / night</option>
              </select>
            </label>
          </div>
          <label className="field">
            <span>Crew size</span>
            <input type="number" min={1} max={40} value={crew} onChange={(e) => setCrew(Number(e.target.value))} />
          </label>
          <label className="field">
            <span>Areas required</span>
            <textarea rows={3} value={areas} onChange={(e) => setAreas(e.target.value)} placeholder="Corridor, terrace, Tiffin Table…" />
          </label>
          <label className="field">
            <span>Intended usage</span>
            <textarea rows={3} value={usage} onChange={(e) => setUsage(e.target.value)} />
          </label>
          <p className="fine-print">
            Do not photograph residents, guests, staff or documents without consent. No drilling, nailing, taping or
            painting on heritage surfaces.
          </p>
          <button className="btn btn-blue" type="submit" style={{ width: '100%', marginTop: 12 }}>
            Send shoot enquiry
          </button>
        </form>
        </Reveal>
      </div>
    </section>
  )
}
