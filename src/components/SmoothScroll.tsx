import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      lerp: 0.07,
      smoothWheel: true,
      anchors: { offset: -104, duration: 1.3 },
      respectReducedMotion: true,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}
