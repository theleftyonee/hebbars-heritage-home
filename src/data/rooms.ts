export type RoomId = 'heritage-3' | 'traveller-8' | 'bombay-12'

export type Room = {
  id: RoomId
  name: string
  kicker: string
  occupancy: number
  bedRate: number
  fullRate: number
  summary: string
  inclusions: string[]
  suitedTo: string
}

export const rooms: Room[] = [
  {
    id: 'heritage-3',
    name: 'Three-Bed Heritage Room',
    kicker: 'Quiet · Private or shared',
    occupancy: 3,
    bedRate: 1750,
    fullRate: 4800,
    suitedTo: 'Friends, families, creative teams',
    summary:
      'A quieter shared or privately bookable room designed for travellers seeking greater privacy. Three individual beds, reading lights, charging points and secure storage.',
    inclusions: [
      'Cotton bedding and towels',
      'Wi-Fi',
      'Shared kitchen and common areas',
      'Bombay Pocket Map',
      'Welcome filter coffee or tea',
    ],
  },
  {
    id: 'traveller-8',
    name: 'Eight-Bed Traveller Room',
    kicker: 'Social · Comfortable dorm',
    occupancy: 8,
    bedRate: 1350,
    fullRate: 9600,
    suitedTo: 'Solo travellers, students, small groups',
    summary:
      'A medium shared room that balances dormitory energy with personal space. Each bed has a reading light, charging point, privacy curtain and lockable storage.',
    inclusions: ['Wi-Fi', 'Cotton bedding', 'Privacy curtain', 'Lockable storage', 'All shared facilities'],
  },
  {
    id: 'bombay-12',
    name: 'Twelve-Bed Bombay Dorm',
    kicker: 'Affordable · Most social',
    occupancy: 12,
    bedRate: 1150,
    fullRate: 12600,
    suitedTo: 'Backpackers, student groups, budget travellers',
    summary:
      'The most affordable room in the house. Privacy curtains and individual storage keep the larger dormitory organised and comfortable.',
    inclusions: [
      'Cotton bedding',
      'Wi-Fi',
      'Reading lights and charging',
      'Secure lockers',
      'Kitchen and common areas',
    ],
  },
]

export type Addon = {
  id: string
  name: string
  price: number
  per: 'guest' | 'stay'
  complimentary?: boolean
}

export const addons: Addon[] = [
  { id: 'coffee', name: 'Filter coffee or house tea', price: 120, per: 'guest' },
  { id: 'breakfast', name: 'South Indian breakfast', price: 300, per: 'guest' },
  { id: 'tiffin', name: 'Hebbar’s Tiffin Table', price: 550, per: 'guest' },
  { id: 'walk', name: 'Fort neighbourhood walk', price: 750, per: 'guest' },
  { id: 'tour', name: 'Heritage house tour', price: 0, per: 'stay', complimentary: true },
]
