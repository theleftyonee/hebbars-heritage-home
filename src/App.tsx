import { useState } from 'react'
import Booking from './components/Booking'
import ConfirmModal, { type Confirmation } from './components/ConfirmModal'
import Emergency from './components/Emergency'
import FindUs from './components/FindUs'
import FoodEvents from './components/FoodEvents'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Intro from './components/Intro'
import HouseRules from './components/HouseRules'
import Marquee from './components/Marquee'
import Nav from './components/Nav'
import Reveal from './components/Reveal'
import Rooms from './components/Rooms'
import ScrollProgress from './components/ScrollProgress'
import Shoots from './components/Shoots'
import Sightseeing from './components/Sightseeing'
import SmoothScroll from './components/SmoothScroll'
import TheHouse from './components/TheHouse'
import TileRule from './components/TileRule'
import type { RoomId } from './data/rooms'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [roomId, setRoomId] = useState<RoomId>('heritage-3')
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null)

  function selectRoom(id: RoomId) {
    setRoomId(id)
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Intro />
      <SmoothScroll />
      <ScrollProgress />
      <Nav open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} onClose={() => setMenuOpen(false)} />
      <Hero />
      <TileRule />
      <TheHouse />
      <Marquee />
      <Rooms selected={roomId} onSelect={selectRoom} />
      <Booking roomId={roomId} onRoom={setRoomId} onConfirm={setConfirmation} />
      <TileRule />
      <FoodEvents onConfirm={setConfirmation} />
      <Sightseeing />
      <Shoots onConfirm={setConfirmation} />
      <HouseRules />
      <FindUs />
      <Reveal>
        <Emergency />
      </Reveal>
      <Footer />
      <ConfirmModal confirmation={confirmation} onClose={() => setConfirmation(null)} />
    </>
  )
}
