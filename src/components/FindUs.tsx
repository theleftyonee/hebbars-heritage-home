import Reveal from './Reveal'

export default function FindUs() {
  return (
    <section className="section" id="visit">
      <div className="wrap visit-grid">
        <Reveal variant="left">
          <p className="kicker">Find us</p>
          <h2 className="section-title">Fourth floor, Wallace Street, Fort.</h2>
          <p className="lede">
            Hebbar’s Heritage Home, Apeejay Chambers, Wallace Street, Fort, Mumbai 400001. About five minutes from
            CSMT. Follow Bombay-blue signage from the street entrance, past the rose window, to the House Desk.
          </p>
          <ul className="perk-list">
            <li>
              <strong>Visitors</strong>
              <span>9:00 AM – 9:00 PM. Register at the House Desk with the name of the guest you are meeting.</span>
            </li>
            <li>
              <strong>Cancel</strong>
              <span>
                Free until 48 hours before check-in. 50% within 24–48 hours. Full charge within 24 hours or no-show.
                Groups need seven days’ notice for a full refund.
              </span>
            </li>
            <li>
              <strong>Luggage</strong>
              <span>Early check-in and luggage storage depending on availability.</span>
            </li>
          </ul>
        </Reveal>
        <Reveal variant="right" delay={120}>
          <div className="visit-media">
            <figure className="frame">
              <img
                src="/images/rose-window.jpg"
                alt="Bombay-blue Hebbar’s sign pointing to the fourth floor beside the stained-glass landing"
              />
              <figcaption>Follow the blue board · fourth floor</figcaption>
            </figure>
            <div className="map-frame">
              <iframe
                title="Map of Fort, Mumbai near Wallace Street"
                src="https://www.openstreetmap.org/export/embed.html?bbox=72.8305%2C18.9305%2C72.8395%2C18.9375&amp;layer=mapnik&amp;marker=18.9338%2C72.8348"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
