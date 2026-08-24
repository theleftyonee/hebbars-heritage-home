export type Landmark = {
  id: string
  name: string
  walk: string
  image: string
  caption: string
}

export const landmarks: Landmark[] = [
  {
    id: 'gateway',
    name: 'Gateway of India',
    walk: 'About 20 minutes south',
    image: '/images/fort/csmt.jpg',
    caption:
      'The waterfront monument that still orients so many Bombay walks. A natural end — or beginning — to an evening in Colaba after a day in Fort.',
  },
  {
    id: 'asiatic',
    name: 'Asiatic Society & Town Hall',
    walk: 'A few minutes on foot',
    image: '/images/fort/asiatic.jpg',
    caption:
      'The colonnade of 1804 looks over the steps where readers still sit with newspapers. A quiet civic heart of Fort, close to Horniman Circle.',
  },
  {
    id: 'cathedral',
    name: 'St. Thomas Cathedral',
    walk: 'A short walk through Fort',
    image: '/images/fort/cathedral.jpg',
    caption:
      'The city’s first Anglican church, finished in 1718, still standing among banks and offices. Marble, teak and a sudden hush in the middle of the business district.',
  },
]
