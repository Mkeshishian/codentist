export type ProviderColor = 'green' | 'purple' | 'teal' | 'orange' | 'blue' | 'pink'

export type Provider = {
  id: string
  name: string
  initials: string
  color: ProviderColor
}

export type AppointmentStatus = 'waiting' | 'confirmed' | 'pending'

export type Appointment = {
  id: string
  providerId: string
  patient: string
  treatment: string
  start: string // 'HH:MM' 24h, quarter-hour resolution
  end: string
  operatory: string
  status: AppointmentStatus
  tags: Array<'pay-today' | 'child'>
}

export const providers: Provider[] = [
  { id: 'rodney', name: 'Dr. Rodney', initials: 'R', color: 'green' },
  { id: 'jennifer', name: 'Dr. Jennifer', initials: 'J', color: 'purple' },
  { id: 'lily', name: 'Dr. Lily', initials: 'L', color: 'orange' },
  { id: 'jessica', name: 'Dr. Jessica', initials: 'J', color: 'teal' },
]

export const pendingColumn = {
  id: 'pending',
  name: 'Pending',
}

export const timeSlots = [
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
]

// Blocked / unavailable slot under Dr. Rodney (diagonal stripes area).
export const blockedSlots: Array<{ providerId: string; start: string; end: string }> = [
  { providerId: 'rodney', start: '8:00 AM', end: '9:30 AM' },
]

const baseAppointment = {
  patient: 'Emily Richardson',
  treatment: 'Root Canal Treatment',
  operatory: 'Operatory 2',
  tags: ['pay-today', 'child'] as Array<'pay-today' | 'child'>,
  status: 'waiting' as AppointmentStatus,
}

export const appointments: Appointment[] = [
  {
    id: 'a1',
    providerId: 'jennifer',
    start: '8:00 AM',
    end: '9:30 AM',
    ...baseAppointment,
  },
  {
    id: 'a2',
    providerId: 'jessica',
    start: '8:00 AM',
    end: '9:30 AM',
    ...baseAppointment,
    status: 'confirmed',
  },
  {
    id: 'a3',
    providerId: 'jennifer',
    start: '9:30 AM',
    end: '11:00 AM',
    ...baseAppointment,
  },
  {
    id: 'a4',
    providerId: 'rodney',
    start: '9:30 AM',
    end: '11:00 AM',
    ...baseAppointment,
  },
  {
    id: 'a5',
    providerId: 'jennifer',
    start: '10:00 AM',
    end: '11:30 AM',
    ...baseAppointment,
  },
  {
    id: 'a6',
    providerId: 'rodney',
    start: '11:00 AM',
    end: '12:00 PM',
    ...baseAppointment,
  },
  {
    id: 'a7',
    providerId: 'jessica',
    start: '10:00 AM',
    end: '11:30 AM',
    ...baseAppointment,
  },
  {
    id: 'a8',
    providerId: 'jessica',
    start: '11:30 AM',
    end: '12:30 PM',
    ...baseAppointment,
  },
]

// AI-suggested appointment slot (Dr. Lily)
export const aiSuggestedAppointment: Appointment = {
  id: 'ai-1',
  providerId: 'lily',
  patient: 'Art Vandelay',
  treatment: 'Schedule coordinator',
  operatory: 'Operatory 2',
  start: '9:00 AM',
  end: '10:00 AM',
  status: 'pending',
  tags: [],
}
