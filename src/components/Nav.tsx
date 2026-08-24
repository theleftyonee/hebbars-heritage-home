import { useEffect, useState } from 'react'

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

export default function Nav({ open, onToggle, onClose }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

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
      io.disconnect()
    }
  }, [])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="brand" href="#top" onClick={onClose}>
          <span className="monogram" aria-hidden="true">
            H
          </span>
          <span className="brand-text">
            <strong>Hebbar’s Heritage Home</strong>
            <span>Fort · Bombay · Est. 1924</span>
          </span>
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
