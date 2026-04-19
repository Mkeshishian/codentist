export type HygieneAppointments = {
  availableSlots: number
  completed: number
  utilizationRate: string
}

export type HygienistRow = {
  initials: string
  name: string
  role: string
  production: string
  delta: string
  direction: 'up' | 'down'
  avatarColor: string
}

export const hygieneAppointments: HygieneAppointments = {
  availableSlots: 127,
  completed: 120,
  utilizationRate: '89.2%',
}

export const hygienistProduction: HygienistRow[] = [
  {
    initials: 'SC',
    name: 'Dr. Sarah Chen',
    role: 'General Dentist',
    production: '$45,280',
    delta: '+8.3%',
    direction: 'up',
    avatarColor: 'bg-rose-100 text-rose-700',
  },
  {
    initials: 'MJ',
    name: 'Dr. Michael Johnson',
    role: 'Oral Surgeon',
    production: '$38,800',
    delta: '+12%',
    direction: 'up',
    avatarColor: 'bg-blue-100 text-blue-700',
  },
  {
    initials: 'EW',
    name: 'Dr. Emily Wilson',
    role: 'Orthodontist',
    production: '$32,150',
    delta: '-2.1%',
    direction: 'down',
    avatarColor: 'bg-emerald-100 text-emerald-700',
  },
]
