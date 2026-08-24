import { useEffect } from 'react'

const MIN_MS = 2400
const LEAVE_MS = 780

function whenWindowLoaded() {
  if (document.readyState === 'complete') return Promise.resolve()
  return new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }))
}

function whenHeroReady() {
  const img = new Image()
  img.src = '/images/hero.jpg'
  if (img.decode) return img.decode().catch(() => undefined)
  return new Promise<void>((resolve) => {
    img.onload = () => resolve()
    img.onerror = () => resolve()
  })
}

export default function Intro() {
  useEffect(() => {
    const intro = document.getElementById('intro')
    if (!intro) return

    document.body.classList.add('intro-open')

    const block = (event: Event) => event.preventDefault()
    intro.addEventListener('wheel', block, { passive: false })
    intro.addEventListener('touchmove', block, { passive: false })

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const wait = reduced ? 400 : MIN_MS

    let leaveTimer = 0
    let cancelled = false
    Promise.all([whenWindowLoaded(), whenHeroReady(), new Promise((r) => setTimeout(r, wait))]).then(() => {
      if (cancelled || !document.getElementById('intro')) return
      intro.classList.add('is-leaving')
      leaveTimer = window.setTimeout(() => {
        if (cancelled) return
        intro.remove()
        document.body.classList.remove('intro-open')
      }, reduced ? 0 : LEAVE_MS)
    })

    return () => {
      cancelled = true
      intro.removeEventListener('wheel', block)
      intro.removeEventListener('touchmove', block)
      window.clearTimeout(leaveTimer)
    }
  }, [])

  return null
}
