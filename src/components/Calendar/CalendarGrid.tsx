import type { Appointment, Provider } from '../../data/calendar'
import { appointments, blockedSlots, providers, timeSlots } from '../../data/calendar'
import { Icon } from '../icons'
import AppointmentCard from './AppointmentCard'
import type { ViewMode } from './CalendarToolbar'

type Props = {
  /** Extra appointments (e.g. AI-proposed preview or accepted slot). */
  extraAppointments?: Appointment[]
  /** Highlight an appointment id with the "proposed" styling + outlined slot. */
  proposedAppointmentId?: string
  /** Render popover markup (children positioned absolutely inside the grid wrapper). */
  overlay?: React.ReactNode
  /** Provider View shows doctor labels; Operatory View relabels columns as Op 1…N. */
  mode?: ViewMode
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

/**
 * Lays out appointments into sub-columns so overlapping cards render side-by-side
 * instead of on top of each other. Returns each appointment with its column index
 * and the total number of columns within its overlap cluster.
 */
function layoutAppointments(
  items: Appointment[],
): Array<{ apt: Appointment; col: number; totalCols: number }> {
  if (items.length === 0) return []

  const sorted = [...items].sort((a, b) => {
    const sA = timeToMinutes(a.start)
    const sB = timeToMinutes(b.start)
    if (sA !== sB) return sA - sB
    return timeToMinutes(b.end) - timeToMinutes(a.end)
  })

  const result: Array<{ apt: Appointment; col: number; totalCols: number }> = []
  let cluster: Appointment[] = []
  let clusterEnd = -1

  const flush = () => {
    if (cluster.length === 0) return
    const cols: Appointment[][] = []
    const colByApt = new Map<string, number>()
    for (const a of cluster) {
      const s = timeToMinutes(a.start)
      let placed = false
      for (let c = 0; c < cols.length; c++) {
        const last = cols[c][cols[c].length - 1]
        if (timeToMinutes(last.end) <= s) {
          cols[c].push(a)
          colByApt.set(a.id, c)
          placed = true
          break
        }
      }
      if (!placed) {
        cols.push([a])
        colByApt.set(a.id, cols.length - 1)
      }
    }
    const total = cols.length
    for (const a of cluster) {
      result.push({ apt: a, col: colByApt.get(a.id)!, totalCols: total })
    }
    cluster = []
    clusterEnd = -1
  }

  for (const apt of sorted) {
    const s = timeToMinutes(apt.start)
    if (cluster.length > 0 && s < clusterEnd) {
      cluster.push(apt)
      clusterEnd = Math.max(clusterEnd, timeToMinutes(apt.end))
    } else {
      flush()
      cluster.push(apt)
      clusterEnd = timeToMinutes(apt.end)
    }
  }
  flush()

  return result
}

function ColumnHeader({
  provider,
  operatoryIndex,
  mode = 'Provider View',
}: {
  provider?: Provider
  operatoryIndex?: number
  mode?: ViewMode
}) {
  const colorToBg: Record<string, string> = {
    green: 'bg-emerald-500',
    purple: 'bg-violet-500',
    teal: 'bg-teal-500',
    orange: 'bg-amber-500',
    blue: 'bg-brand-500',
    pink: 'bg-rose-500',
  }
  const isOperatoryView = mode === 'Operatory View'
  return (
    <div className="sticky top-0 z-20 flex h-11 items-center justify-between gap-2 border-b border-ink-100 bg-white px-3 text-xs">
      <div className="flex items-center gap-2">
        {provider ? (
          isOperatoryView ? (
            <>
              <span className="grid h-6 w-6 place-items-center rounded-md bg-ink-100 text-[10px] font-semibold text-ink-700">
                {operatoryIndex !== undefined ? operatoryIndex + 1 : ''}
              </span>
              <span className="font-semibold text-ink-800">
                Operatory {operatoryIndex !== undefined ? operatoryIndex + 1 : ''}
              </span>
              <span className="text-[10px] font-medium text-ink-400">· {provider.name}</span>
            </>
          ) : (
            <>
              <span
                className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-semibold text-white ${colorToBg[provider.color]}`}
              >
                {provider.initials}
              </span>
              <span className="font-semibold text-ink-800">{provider.name}</span>
            </>
          )
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
      {timeSlots.map((t) => (
        <div key={t} className="relative" style={{ height: slotHeightPx }}>
          <span className="absolute right-2 top-1 text-[10px] font-medium text-ink-400">
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
  operatoryIndex,
  mode,
}: {
  provider: Provider
  items: Appointment[]
  proposedId?: string
  operatoryIndex: number
  mode: ViewMode
}) {
  const blocked = blockedSlots.filter((b) => b.providerId === provider.id)

  return (
    <div className="relative min-w-0 flex-1 border-r border-ink-100">
      <ColumnHeader provider={provider} operatoryIndex={operatoryIndex} mode={mode} />
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

        {/* appointments — laid out side-by-side when they overlap */}
        {layoutAppointments(items).map(({ apt, col, totalCols }) => {
          const widthPct = 100 / totalCols
          const leftPct = col * widthPct
          return (
            <AppointmentCard
              key={apt.id}
              apt={apt}
              providerName={provider.name}
              color={providerColor(provider)}
              proposed={proposedId === apt.id}
              className="absolute"
              style={{
                top: timeOffsetPx(apt.start) + 2,
                height: durationPx(apt.start, apt.end) - 4,
                left: `calc(${leftPct}% + 4px)`,
                width: `calc(${widthPct}% - 8px)`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function CalendarGrid({
  extraAppointments = [],
  proposedAppointmentId,
  overlay,
  mode = 'Provider View',
}: Props) {
  const allAppointments = [...appointments, ...extraAppointments]

  return (
    <div className="relative flex flex-1 overflow-hidden rounded-xl border border-ink-100 bg-white shadow-card">
      <div className="relative flex flex-1 overflow-y-auto overflow-x-hidden">
        <TimeColumn />
        {providers.map((p, idx) => (
          <ProviderColumn
            key={p.id}
            provider={p}
            items={allAppointments.filter((a) => a.providerId === p.id)}
            proposedId={proposedAppointmentId}
            operatoryIndex={idx}
            mode={mode}
          />
        ))}
        {overlay}
      </div>
    </div>
  )
}
