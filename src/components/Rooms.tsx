import { rooms, addons, type RoomId } from '../data/rooms'
import { rupees } from '../lib/dates'
import Reveal from './Reveal'

type Props = {
  selected: RoomId
  onSelect: (id: RoomId) => void
}

export default function Rooms({ selected, onSelect }: Props) {
  return (
    <section className="section" id="stay">
      <div className="wrap">
        <div className="stay-intro">
          <Reveal variant="left">
            <div className="frame-stack">
            <figure className="frame">
              <img
                src="/images/dorm.jpg"
                alt="Teak bunk beds with cream linens, reading lamps and Bombay-blue tiled floor in the heritage dormitory"
              />
              <figcaption>Bunk rooms · reading lights · lockers</figcaption>
            </figure>
            <figure className="frame">
              <img
                src="/images/vanity.jpg"
                alt="Tiled corridor leading to a shared washbasin, teak doors and a hanging lamp"
              />
              <figcaption>Shared washroom · tiled corridor</figcaption>
            </figure>
            </div>
          </Reveal>
          <Reveal variant="right" delay={120}>
            <p className="kicker">Rooms &amp; rate card</p>
            <h2 className="section-title">Three rooms, one house.</h2>
            <p className="lede">
              Teak bunks, cotton bedding and a reading lamp at each bed. Positioned slightly above a basic hostel for
              Fort, heritage character and a curated stay. Select a room to carry it into the ledger below.
            </p>
          </Reveal>
        </div>
        <div className="room-grid">
          {rooms.map((room, i) => (
            <Reveal key={room.id} delay={i * 110}>
              <button
                type="button"
                className={`room-card ${selected === room.id ? 'is-active' : ''}`}
                onClick={() => onSelect(room.id)}
              >
              <p className="kicker">{room.kicker}</p>
              <h3 className="section-title" style={{ fontSize: '1.7rem', margin: 0 }}>
                {room.name}
              </h3>
              <p className="price">
                {rupees(room.bedRate)} <span>per bed / night</span>
              </p>
              <p>
                Full room {rupees(room.fullRate)} · up to {room.occupancy} guests
              </p>
              <p>{room.summary}</p>
              <ul>
                {room.inclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </button>
            </Reveal>
          ))}
        </div>
        <table className="rate-table">
          <thead>
            <tr>
              <th>Room</th>
              <th>Individual rate</th>
              <th>Full-room rate</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.name}</td>
                <td>{rupees(room.bedRate)} per bed</td>
                <td>{rupees(room.fullRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="addon-row">
          {addons.map((addon) => (
            <span className="chip" key={addon.id}>
              {addon.name}
              {addon.complimentary ? ' · complimentary for guests' : ` · ${rupees(addon.price)}`}
            </span>
          ))}
        </div>
        <p className="fine-print">
          Proposed base rates, excluding taxes. Weekends may rise 10%; festivals, major events and peak tourist periods
          up to 20%. Confirm with the property before relying on published figures.
        </p>
      </div>
    </section>
  )
}
