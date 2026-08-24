import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { landmarks } from '../data/landmarks'
import Reveal from './Reveal'

export default function Sightseeing() {
  const [index, setIndex] = useState(0)
  const startX = useRef<number | null>(null)
  const slide = landmarks[index]

  function go(delta: number) {
    setIndex((current) => (current + delta + landmarks.length) % landmarks.length)
  }

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    startX.current = e.clientX
  }

  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    if (startX.current == null) return
    const delta = e.clientX - startX.current
    startX.current = null
    if (delta < -40) go(1)
    if (delta > 40) go(-1)
  }

  return (
    <section className="section section-blue" id="fort">
      <div className="wrap">
        <Reveal>
          <p className="kicker">Fort neighbourhood</p>
          <h2 className="section-title">Five minutes from CSMT, a century of Bombay streets.</h2>
          <p className="lede">
            Wallace Street sits in the old Fort. On Sundays the house walks the neighbourhood and returns for tiffin —
            ₹950, including breakfast and filter coffee.
          </p>
        </Reveal>
        <Reveal variant="scale">
        <div
          className="carousel"
          tabIndex={0}
          onKeyDown={onKey}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          aria-roledescription="carousel"
        >
          <article className="carousel-slide">
            <img key={slide.id} src={slide.image} alt={slide.name} />
            <div className="carousel-copy" key={`${slide.id}-copy`}>
              <p className="kicker">{slide.walk}</p>
              <h3 className="section-title" style={{ fontSize: '2.4rem' }}>
                {slide.name}
              </h3>
              <p>{slide.caption}</p>
              <div className="carousel-nav">
                <button type="button" className="btn btn-ghost" onClick={() => go(-1)}>
                  Previous
                </button>
                <button type="button" className="btn btn-brass" onClick={() => go(1)}>
                  Next
                </button>
                <div className="dots">
                  {landmarks.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`dot ${i === index ? 'is-on' : ''}`}
                      aria-label={item.name}
                      onClick={() => setIndex(i)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
        </Reveal>
        <p style={{ marginTop: 28 }}>
          <a className="btn btn-brass" href="#table">
            Join the Sunday Fort Walk
          </a>
        </p>
      </div>
    </section>
  )
}
