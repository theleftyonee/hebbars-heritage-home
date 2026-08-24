export type DailyService = {
  id: string
  name: string
  time: string
  days: string
  price?: string
  note: string
  cutoff?: string
}

export const dailyService: DailyService[] = [
  {
    id: 'morning-coffee',
    name: 'Morning Filter Coffee & Tea',
    time: '7:00 AM – 10:00 AM',
    days: 'Daily',
    price: '₹120',
    note: 'South Indian filter coffee, house tea and light biscuits from the Filter Coffee Corner.',
  },
  {
    id: 'breakfast',
    name: 'South Indian Breakfast',
    time: '7:30 AM – 10:00 AM',
    days: 'Monday – Friday',
    price: '₹300',
    note: 'Two rotating dishes such as idli, upma, pongal, dosa or poha, with chutney, sambar and coffee.',
    cutoff: 'Order by 9:00 PM the previous evening.',
  },
  {
    id: 'lunch',
    name: 'Lunch Tiffin',
    time: '12:30 PM – 2:30 PM',
    days: 'Monday – Friday',
    price: '₹450',
    note: 'Rice, sambar or rasam, one vegetable, curd, pickle and a small sweet. Staying guests and pre-registered visitors.',
    cutoff: 'Order before 10:00 AM.',
  },
  {
    id: 'evening-coffee',
    name: 'Evening Coffee & Tea',
    time: '4:30 PM – 6:30 PM',
    days: 'Daily',
    note: 'Filter coffee, tea and one rotating snack — medu vada, banana chips, sundal, bonda or paniyaram.',
  },
  {
    id: 'dinner',
    name: 'Dinner',
    time: '7:30 PM – 9:30 PM',
    days: 'Daily',
    price: '₹500',
    note: 'Home-style dinner by advance booking only, to keep waste low.',
    cutoff: 'Confirm before 4:00 PM.',
  },
]

export type HouseEvent = {
  id: string
  name: string
  when: string
  price: string
  capacity?: string
  blurb: string
  bookable: boolean
}

export const weekendEvents: HouseEvent[] = [
  {
    id: 'tiffin-table',
    name: 'Saturday — The Hebbar’s Tiffin Table',
    when: 'Saturday · 8:30 AM – 11:00 AM',
    price: '₹550',
    capacity: '15–20 guests',
    blurb:
      'Communal South Indian breakfast at the long Tiffin Table, with a short introduction to Hebbar’s food history and its welcome to South Indian travellers in Bombay.',
    bookable: true,
  },
  {
    id: 'coffee-games',
    name: 'Saturday — Coffee, Games & Conversations',
    when: 'Saturday · 5:00 PM – 7:00 PM',
    price: 'Guests complimentary · visitors ₹250',
    blurb: 'Filter Coffee Corner and Games Verandah together — carrom, chess, cards or pallanguzhi, with one beverage on a visitor pass.',
    bookable: true,
  },
  {
    id: 'fort-walk',
    name: 'Sunday — Fort Walk and Tiffin',
    when: 'Sunday · 7:30 AM – 10:30 AM',
    price: '₹950',
    capacity: '12–15 guests',
    blurb:
      'A guided walk through Fort — CSMT, old commercial buildings, neighbourhood food histories — returning to Hebbar’s for communal breakfast. Meet at the street entrance.',
    bookable: true,
  },
  {
    id: 'slow-coffee',
    name: 'Sunday — Slow Filter Coffee Session',
    when: 'Sunday · 4:30 PM – 6:00 PM',
    price: '₹350',
    capacity: '10–12 guests',
    blurb: 'A hosted session on the coffee filter, decoction, milk ratio and tumbler-and-dabara service, with a tasting and light snack.',
    bookable: true,
  },
]

export const weeklyEvents: HouseEvent[] = [
  {
    id: 'house-tour',
    name: 'Heritage House Tour',
    when: 'Wednesday & Saturday · 4:00 PM – 5:00 PM',
    price: 'Guests complimentary · visitors ₹300',
    blurb:
      'Entrance, staircase, Corridor Gallery, rooms, kitchen and terrace — the Modern Hindu Hotel, the tiffin service, and the house as a shoot location.',
    bookable: true,
  },
  {
    id: 'game-evening',
    name: 'Old-School Game Evening',
    when: 'Friday · 6:00 PM – 8:00 PM',
    price: 'Guests complimentary · visitors ₹250',
    blurb: 'Carrom, chess, cards, snakes and ladders, and pallanguzhi, with a host for unfamiliar games.',
    bookable: true,
  },
  {
    id: 'archive-night',
    name: 'Archive and Storytelling Evening',
    when: 'Second Friday of the month · 6:30 PM – 8:00 PM',
    price: '₹400',
    capacity: '20 guests',
    blurb: 'Family photographs, guest records, recipes, migration stories and memories of Fort.',
    bookable: true,
  },
  {
    id: 'acoustic',
    name: 'Terrace Acoustic Evening',
    when: 'Third Saturday of the month · 6:30 PM – 8:30 PM',
    price: '₹600',
    capacity: '20–25 guests',
    blurb: 'An intimate, low-volume acoustic performance, poetry or listening session on the terrace.',
    bookable: true,
  },
  {
    id: 'workshop',
    name: 'Creative House Workshop',
    when: 'Last Sunday of the month · 11:30 AM – 1:30 PM',
    price: '₹750–₹1,200',
    blurb: 'Photography, visual storytelling, urban sketching, food memories, archives or analogue image-making.',
    bookable: true,
  },
  {
    id: 'shoot-preview',
    name: 'Shoot Location Preview',
    when: 'First Thursday of the month · 11:00 AM – 1:00 PM',
    price: 'Complimentary with professional registration',
    blurb: 'Walkthrough for photographers, stylists and production houses. Location library, packages and policies at the House Desk.',
    bookable: true,
  },
]

export const weekGrid: { day: string; morning: string; evening: string }[] = [
  { day: 'Monday', morning: 'Breakfast, 7:30–10:00 AM', evening: 'Evening coffee, 4:30–6:30 PM' },
  { day: 'Tuesday', morning: 'Breakfast, 7:30–10:00 AM', evening: 'Evening coffee, 4:30–6:30 PM' },
  { day: 'Wednesday', morning: 'Breakfast, 7:30–10:00 AM', evening: 'Heritage Tour, 4:00–5:00 PM' },
  { day: 'Thursday', morning: 'Breakfast, 7:30–10:00 AM', evening: 'Monthly Shoot Preview, 11:00 AM–1:00 PM' },
  { day: 'Friday', morning: 'Breakfast, 7:30–10:00 AM', evening: 'Game Evening, 6:00–8:00 PM' },
  { day: 'Saturday', morning: 'Tiffin Table, 8:30–11:00 AM', evening: 'Coffee and Games, 5:00–7:00 PM' },
  { day: 'Sunday', morning: 'Fort Walk and Tiffin, 7:30–10:30 AM', evening: 'Filter Coffee Session, 4:30–6:00 PM' },
]
