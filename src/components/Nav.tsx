import { useEffect, useState } from 'react'
import BrandMark from './BrandMark'

type Props = {
  open: boolean
  onToggle: () => void
  onClose: () => void
}

const links = [
  { href: '#house', label: 'The House' },
  { href: '#stay', label: 'Stay' },
  { href: '#table', label: 'Table' },
  { href: '#fort', label: 'Fort' },
  { href: '#shoots', label: 'Shoots' },
  { href: '#house-rules', label: 'House' },
]

function toneUnderNav(): 'cream' | 'ink' {
  if (document.body.classList.contains('modal-open')) return 'cream'
  const nav = document.querySelector('.nav')
  const bottom = nav?.getBoundingClientRect().bottom ?? 84
  const x = Math.round(window.innerWidth / 2)
  let sawLight = false
  for (const offset of [36, 110, 200]) {
    const y = Math.round(bottom + offset)
    if (y < 0 || y > window.innerHeight) continue
    const hit = document.elementFromPoint(x, y)
    const band = hit?.closest('.hero, .section, .footer, .marquee, .tile-rule')
    if (!band || band.matches('.tile-rule, .marquee')) continue
    if (band.matches('.hero, .section-dark, .section-blue, .footer')) return 'cream'
    sawLight = true
  }
  return sawLight ? 'ink' : 'cream'
}

export default function Nav({ open, onToggle, onClose }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [tone, setTone] = useState<'cream' | 'ink'>('cream')
  const [active, setActive] = useState('')

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      const hero = document.getElementById('top')
      const past = hero
        ? hero.getBoundingClientRect().bottom <= window.innerHeight * 0.42
        : window.scrollY > 80
      setPastHero(past)
      setScrolled(window.scrollY > 48)
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setTone(toneUnderNav())
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('scroll', onScroll, { passive: true, capture: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('hashchange', onScroll)

    const ids = ['house', 'stay', 'book', 'table', 'fort', 'shoots', 'house-rules']
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el))
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) {
          const id = visible.target.id
          setActive(id === 'book' ? '#stay' : `#${id}`)
        }
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0.15, 0.4] },
    )
    els.forEach((el) => io.observe(el))

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('hashchange', onScroll)
      cancelAnimationFrame(frame)
      io.disconnect()
    }
  }, [])

  const ink = tone === 'ink'
  const visible = pastHero || open

  return (
    <header
      className={['nav', scrolled && 'is-scrolled', visible && 'is-visible', ink ? 'nav-tone-ink' : 'nav-tone-cream']
        .filter(Boolean)
        .join(' ')}
      aria-hidden={!visible}
      {...(!visible ? { inert: true } : {})}
    >
      <div className="nav-inner">
        <a className="brand" href="#top" onClick={onClose}>
          <BrandMark variant={ink ? 'horizCream' : 'horiz'} className="brand-horiz" />
          <BrandMark variant={ink ? 'sealCream' : 'seal'} className="brand-seal-mobile" />
        </a>
        <nav aria-label="Primary">
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <a className={active === link.href ? 'is-active' : ''} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn-brass" href="#book">
          Book a stay
        </a>
        <button className="nav-toggle" type="button" aria-label="Open menu" onClick={onToggle}>
          <span />
        </button>
      </div>
      {open ? (
        <div className="drawer" role="dialog" aria-label="Menu">
          <BrandMark variant="seal" className="drawer-seal" decorative />
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={onClose}>
              {link.label}
            </a>
          ))}
          <a className="btn btn-blue" href="#book" onClick={onClose}>
            Book a stay
          </a>
        </div>
      ) : null}
    </header>
  )
}
