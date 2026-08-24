import BrandMark from './BrandMark'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const mediaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const media = mediaRef.current
    if (!media) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onScroll = () => {
      const y = window.scrollY
      media.style.transform = `translate3d(0, ${y * 0.32}px, 0)`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="hero" id="top">
      <div className="hero-media" ref={mediaRef}>
        <img className="hero-img" src="/images/hero.jpg" alt="The Bombay-blue tiled corridor of Hebbar’s Heritage Home" />
      </div>
      <div className="hero-veil" />
      <div className="hero-copy">
        <BrandMark variant="seal" className="hero-seal" decorative />
        <p className="hero-est">Est. 1924 · Fourth floor</p>
        <h1>
          Hebbar’s
          <br />
          Heritage Home
        </h1>
        <p className="hero-place">Apeejay Chambers · Wallace Street · Fort · Bombay</p>
        <div className="hero-actions">
          <a className="btn btn-brass" href="#book">
            Book a stay
          </a>
          <a className="btn btn-ghost" href="#fort">
            Walk the Fort
          </a>
        </div>
      </div>
      <a className="scroll-cue" href="#house">
        Enter
        <i />
      </a>
    </section>
  )
}
