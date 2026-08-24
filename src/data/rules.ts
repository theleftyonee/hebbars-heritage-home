export type RuleGroup = {
  id: string
  title: string
  points: string[]
}

export const ruleGroups: RuleGroup[] = [
  {
    id: 'checkin',
    title: 'Check-in and identification',
    points: [
      'Check-in from 1:00 PM; check-out by 10:30 AM.',
      'Every guest must present valid government-issued photo ID. International travellers must provide a passport and visa.',
      'Unregistered guests cannot stay overnight.',
      'Early check-in and late check-out are subject to availability and may involve a charge.',
    ],
  },
  {
    id: 'entry',
    title: 'Entry and late arrivals',
    points: [
      'Inform the House Desk in advance if arriving after 9:00 PM.',
      'Follow entry instructions carefully — the property sits inside a shared building.',
      'Room keys, access codes and building-entry information must not be shared with anyone who is not registered.',
    ],
  },
  {
    id: 'visitors',
    title: 'Visitors',
    points: [
      'Visitors are permitted between 9:00 AM and 9:00 PM and must register at the House Desk.',
      'Guests are responsible for their visitors’ conduct.',
      'Visitors cannot enter dormitories, private rooms or restricted areas without permission.',
      'Overnight visitors must be formally added to the booking.',
    ],
  },
  {
    id: 'quiet',
    title: 'Quiet hours',
    points: [
      'Quiet hours are 10:30 PM to 7:00 AM in rooms, corridors, staircases and shared areas.',
      'Headphones must be used in dormitories.',
      'Repeated late-night disturbance may result in cancellation of the stay without a refund.',
    ],
  },
  {
    id: 'shared',
    title: 'Shared rooms',
    points: [
      'Use only the bed and locker assigned to you.',
      'Personal belongings should not block corridors, doorways or empty beds.',
      'Keep lights low after quiet hours. Switch alarms off promptly and take calls outside shared rooms.',
    ],
  },
  {
    id: 'bathrooms',
    title: 'Bathrooms',
    points: [
      'Keep bathroom use considerate during peak hours. Remove belongings after use and keep showers reasonably brief.',
      'Do not dispose of sanitary products, wipes, food or plastic in toilets.',
      'Report leaks, drainage problems or damaged fixtures immediately.',
    ],
  },
  {
    id: 'kitchen',
    title: 'Kitchen, food and coffee',
    points: [
      'The shared kitchen may only be used during designated hours. Clean utensils, counters and equipment immediately after use.',
      'Label personal food and store it only in assigned areas.',
      'Strong-smelling food, open flames and unapproved appliances are not permitted in guest rooms.',
      'Meals should be taken at the Tiffin Table, kitchen or designated common areas — not in dormitories.',
      'Return coffee equipment and brass or steel serving vessels after use.',
    ],
  },
  {
    id: 'heritage',
    title: 'Heritage property care',
    points: [
      'Do not nail, drill, paint, tape or attach anything to walls, doors, windows or furniture.',
      'Heritage objects, photographs, records and decorative pieces must not be moved or handled without permission.',
      'Report accidental damage immediately. Guests may be charged for negligent or intentional damage.',
    ],
  },
  {
    id: 'housekeeping',
    title: 'Cleanliness and housekeeping',
    points: [
      'Keep beds, lockers and shared areas reasonably organised.',
      'Fresh linen and towels follow the house change schedule. Additional changes may involve a fee.',
    ],
  },
  {
    id: 'substances',
    title: 'Smoking, alcohol and prohibited substances',
    points: [
      'Smoking and vaping are prohibited inside rooms, corridors, bathrooms, kitchen and staircases. Smoking only in a designated area, if provided.',
      'Illegal substances are strictly prohibited.',
      'Alcohol may only be consumed in approved areas and must not disturb guests, residents or building occupants.',
    ],
  },
  {
    id: 'safety',
    title: 'Safety and security',
    points: [
      'Keep room doors and lockers secured. Hebbar’s is not responsible for valuables left unattended outside designated lockers.',
      'Do not block staircases, exits or fire-safety equipment.',
      'During an evacuation, use the staircase — not the lift — and follow staff instructions.',
      'Candles, incense, portable burners, irons and other exposed heating elements are not permitted in rooms.',
    ],
  },
  {
    id: 'family',
    title: 'Children, families and pets',
    points: [
      'Children must remain under the supervision of a parent or guardian.',
      'Pets are not permitted unless a pet-friendly policy is confirmed at booking.',
    ],
  },
  {
    id: 'photo',
    title: 'Photography and terrace',
    points: [
      'Personal photography is permitted in approved guest and common areas. Do not photograph other guests, residents or staff without consent.',
      'Professional or commercial photography requires advance permission and a confirmed shoot booking.',
      'The terrace may only be used during published hours and may close for weather, maintenance or private events.',
      'Do not sit or lean on parapets, move safety barriers or leave children unattended.',
    ],
  },
  {
    id: 'conduct',
    title: 'Respectful conduct and liability',
    points: [
      'Discrimination, harassment, intimidation, violence or abusive behaviour will not be tolerated.',
      'Anyone threatening the safety or comfort of others may be required to leave immediately.',
      'Guests are financially responsible for loss or damage caused by misuse, negligence or violation of the rules.',
      'By completing check-in, guests confirm that they have read and accepted the house rules.',
    ],
  },
]
