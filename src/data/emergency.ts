export type Helpline = {
  name: string
  number: string
  note?: string
}

export const nationalLines: Helpline[] = [
  { name: 'National emergency', number: '112', note: 'Police, fire, medical — Emergency Response Support System' },
  { name: 'Police', number: '100' },
  { name: 'Fire Brigade', number: '101' },
  { name: 'Ambulance', number: '102' },
  { name: 'Women’s assistance, Mumbai', number: '103' },
  { name: 'Cybercrime and financial fraud', number: '1930' },
  { name: 'Tourist helpline', number: '1363' },
]

export const hospitals: { name: string; address: string; phones: string[] }[] = [
  {
    name: 'St. George’s Hospital',
    address: 'Near CSMT, Fort, Mumbai 400001',
    phones: ['022-2262 0242'],
  },
  {
    name: 'Bombay Hospital',
    address: '12, Vitthaldas Thackersey Marg, New Marine Lines, Mumbai 400020',
    phones: ['022-2206 7676', 'Casualty 022-4051 1433', 'Ambulance 99676 55556'],
  },
]

export const police: Helpline[] = [
  { name: 'Emergency', number: '100' },
  { name: 'Control room', number: '022-2262 1855 / 022-2262 1983 / 022-2262 5020' },
]

export const internalContacts: Helpline[] = [
  { name: 'House Desk', number: '[Insert number]' },
  { name: 'Property manager', number: '[Insert name and number]' },
  { name: 'Night-duty staff', number: '[Insert number]' },
  { name: 'Building security', number: '[Insert number]' },
  { name: 'Maintenance / electrician', number: '[Insert number]' },
  { name: 'Nearest pharmacy', number: '[Insert verified name and number]' },
]
