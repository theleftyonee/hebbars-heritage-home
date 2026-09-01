import Reveal from './Reveal'

export default function TheHouse() {
  return (
    <section className="section" id="house">
      <div className="wrap house-grid">
        <Reveal variant="left">
          <div className="frame-stack">
            <figure className="frame">
              <img
                src="/images/desk.jpg"
                alt="House Desk with the Hebbar legacy wall, brass picture lights and the stair to the rooms"
              />
              <figcaption>House Desk · Hebbar legacy</figcaption>
            </figure>
            <figure className="frame">
              <img src="/images/house.jpg" alt="Low teak seating, brass tiffins and Bombay-blue tiles in the common room" />
              <figcaption>Lounge · common room</figcaption>
            </figure>
            <figure className="frame">
              <img
                src="/images/nook.jpg"
                alt="Floor seating, brass lanterns and a gallery wall in the house nook"
              />
              <figcaption>Nook · floor seating</figcaption>
            </figure>
          </div>
        </Reveal>
        <Reveal variant="right" delay={120}>
          <p className="kicker">The House</p>
          <h2 className="section-title">A heritage hostel in the old commercial heart of Bombay.</h2>
          <p className="lede">
            Hebbar’s began as a welcome for South Indian travellers — rooms above the city, filter coffee, and a tiffin
            table. It still occupies the fourth floor of Apeejay Chambers, five minutes from CSMT, inside a shared
            residential and commercial building.
          </p>
          <ul className="perk-list">
            <li>
              <strong>Arrive</strong>
              <span>Check-in from 1:00 PM. Check-out by 10:30 AM. Late arrivals after 9:00 PM should write ahead.</span>
            </li>
            <li>
              <strong>Direct</strong>
              <span>
                Website, WhatsApp or House Desk bookings include welcome coffee, a Bombay Pocket Map, cancellation until
                48 hours before arrival, and priority for house activities.
              </span>
            </li>
            <li>
              <strong>Signage</strong>
              <span>Follow the Bombay-blue boards from the street entrance, up the stair, to the House Desk.</span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
