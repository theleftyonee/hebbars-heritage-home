import { hospitals, internalContacts, nationalLines, police } from '../data/emergency'

export default function Emergency() {
  return (
    <section className="section" id="emergency">
      <div className="wrap">
        <p className="kicker">Emergency</p>
        <h2 className="section-title">Keep this page close if you need it.</h2>
        <div className="emergency-112">
          <div>
            <p className="kicker" style={{ color: 'var(--brass)' }}>
              National emergency
            </p>
            <p style={{ margin: 0 }}>Police, fire, medical — then tell the House Desk.</p>
          </div>
          <a href="tel:112">112</a>
        </div>
        <div className="helpline-grid">
          {nationalLines.slice(1).map((line) => (
            <article className="helpline" key={line.name}>
              <p className="kicker">{line.name}</p>
              <a href={`tel:${line.number.replace(/\s/g, '')}`}>{line.number}</a>
              {line.note ? <p className="fine-print">{line.note}</p> : null}
            </article>
          ))}
        </div>
        <div className="event-grid" style={{ marginTop: 28 }}>
          {hospitals.map((h) => (
            <article className="event-card" key={h.name}>
              <p className="kicker">Nearby medical</p>
              <h3>{h.name}</h3>
              <p>{h.address}</p>
              {h.phones.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </article>
          ))}
          <article className="event-card">
            <p className="kicker">Mumbai Police</p>
            <h3>Control room</h3>
            {police.map((p) => (
              <p key={p.name}>
                {p.name}: {p.number}
              </p>
            ))}
          </article>
        </div>
        <p className="kicker" style={{ marginTop: 36 }}>
          Internal contacts — confirm before public use
        </p>
        <div className="helpline-grid">
          {internalContacts.map((c) => (
            <article className="helpline" key={c.name}>
              <p className="kicker">{c.name}</p>
              <p style={{ margin: 0 }}>{c.number}</p>
            </article>
          ))}
        </div>
        <p className="fine-print">
          In a fire, electrical failure or evacuation, use the staircase, not the lift. Do not collect luggage if it
          delays leaving. Proposed assembly: outside Apeejay Chambers, clear of the main doorway — confirm with an
          on-site fire assessment before publication.
        </p>
      </div>
    </section>
  )
}
