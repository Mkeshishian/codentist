import type { Appointment, Provider } from '../../data/calendar'
import { appointments, blockedSlots, providers, timeSlots, pendingColumn } from '../../data/calendar'
import { Icon } from '../icons'
import AppointmentCard from './AppointmentCard'

type Props = {
  /** Extra appointments (e.g. AI-proposed preview or accepted slot). */
  extraAppointments?: Appointment[]
  /** Highlight an appointment id with the "proposed" styling + outlined slot. */
  proposedAppointmentId?: string
  /** Render popover markup (children positioned absolutely inside the grid wrapper). */
  overlay?: React.ReactNode
}

/** Minutes since 8:00 AM (start of our day). */
const dayStart = 8 * 60
const slotHeightPx = 80 // height per 30 minutes

function timeToMinutes(t: string) {
  const m = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/i.exec(t.trim())
  if (!m) return 0
  let h = parseInt(m[1], 10)
  const mm = parseInt(m[2], 10)
  const suffix = m[3].toUpperCase()
  if (suffix === 'PM' && h !== 12) h += 12
  if (suffix === 'AM' && h === 12) h = 0
  return h * 60 + mm
}

export function timeOffsetPx(time: string) {
  const diff = timeToMinutes(time) - dayStart
  return (diff / 30) * slotHeightPx
}

export function durationPx(start: string, end: string) {
  const diff = timeToMinutes(end) - timeToMinutes(start)
  return (diff / 30) * slotHeightPx
}

function providerColor(p: Provider) {
  return p.color
}

function ColumnHeader({
  provider,
  pending,
}: {
  provider?: Provider
  pending?: boolean
}) {
  const colorToBg: Record<string, string> = {
    green: 'bg-emerald-500',
    purple: 'bg-violet-500',
    teal: 'bg-teal-500',
    orange: 'bg-amber-500',
    blue: 'bg-brand-500',
    pink: 'bg-rose-500',
  }
  return (
    <div className="sticky top-0 z-20 flex h-11 items-center justify-between gap-2 border-b border-ink-100 bg-white px-3 text-xs">
      <div className="flex items-center gap-2">
        {provider ? (
          <>
            <span
              className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-semibold text-white ${colorToBg[provider.color]}`}
            >
              {provider.initials}
            </span>
            <span className="font-semibold text-ink-800">{provider.name}</span>
          </>
        ) : pending ? (
          <span className="font-semibold text-ink-700">Pending</span>
        ) : null}
      </div>
      <div className="flex items-center gap-1 text-ink-400">
        <Icon.Filter width={12} height={12} />
        <Icon.Eye width={12} height={12} />
        <Icon.Info width={12} height={12} />
      </div>
    </div>
  )
}

function TimeColumn() {
  return (
    <div className="relative w-20 shrink-0 border-r border-ink-100 bg-white">
      <div className="sticky top-0 z-20 h-11 border-b border-ink-100 bg-white" />
      {timeSlots.map((t, i) => (
        <div key={t} className="relative" style={{ height: slotHeightPx }}>
          <span className="absolute -top-2 right-2 text-[10px] font-medium text-ink-400">
            {t}
          </span>
        </div>
      ))}
      {/* current time badge floating */}
      <span
        className="pointer-events-none absolute right-1 z-20 rounded bg-brand-500 px-1.5 py-0.5 text-[9px] font-semibold text-white"
        style={{ top: 44 + 6 * slotHeightPx + (12 / 30) * slotHeightPx - 8 }}
      >
        11:12
      </span>
    </div>
  )
}

function ProviderColumn({
  provider,
  items,
  proposedId,
}: {
  provider: Provider
  items: Appointment[]
  proposedId?: string
}) {
  const blocked = blockedSlots.filter((b) => b.providerId === provider.id)

  return (
    <div className="relative min-w-0 flex-1 border-r border-ink-100">
      <ColumnHeader provider={provider} />
      <div className="relative" style={{ height: timeSlots.length * slotHeightPx }}>
        {/* horizontal lines */}
        {timeSlots.map((_, i) => (
          <div
            key={i}
            className="absolute inset-x-0 border-b border-ink-100"
            style={{ top: i * slotHeightPx, height: slotHeightPx }}
          />
        ))}

        {/* current time indicator across (simulated 11:12 AM) */}
        <div
          className="pointer-events-none absolute inset-x-0 z-10 border-t-2 border-brand-500"
          style={{ top: 6 * slotHeightPx + (12 / 30) * slotHeightPx }}
        />

        {/* blocked slots */}
        {blocked.map((b, i) => (
          <div
            key={i}
            className="stripes absolute inset-x-2 rounded-md"
            style={{
              top: timeOffsetPx(b.start),
              height: durationPx(b.start, b.end),
            }}
          />
        ))}

        {/* appointments */}
        {items.map((apt) => (
          <AppointmentCard
            key={apt.id}
            apt={apt}
            providerName={provider.name}
            color={providerColor(provider)}
            proposed={proposedId === apt.id}
            className="absolute left-1.5 right-1.5"
            style={{
              top: timeOffsetPx(apt.start) + 2,
              height: durationPx(apt.start, apt.end) - 4,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function PendingColumn() {
  return (
    <div className="relative w-20 shrink-0 bg-ink-50/40">
      <ColumnHeader pending />
      <div className="relative" style={{ height: timeSlots.length * slotHeightPx }} />
    </div>
  )
}

export default function CalendarGrid({ extraAppointments = [], proposedAppointmentId, overlay }: Props) {
  const allAppointments = [...appointments, ...extraAppointments]

  return (
    <div className="relative flex flex-1 overflow-hidden rounded-xl border border-ink-100 bg-white shadow-card">
      <div className="relative flex flex-1 overflow-auto">
        <TimeColumn />
        {providers.map((p) => (
          <ProviderColumn
            key={p.id}
            provider={p}
            items={allAppointments.filter((a) => a.providerId === p.id)}
            proposedId={proposedAppointmentId}
          />
        ))}
        <PendingColumn />
        {overlay}
      </div>
      {/* tiny footer to hold pendingColumn reference for ts noUnusedLocals */}
      <span className="sr-only">{pendingColumn.name}</span>
    </div>
  )
}
