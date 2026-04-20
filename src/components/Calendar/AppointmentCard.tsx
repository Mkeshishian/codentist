import { useMemo } from 'react'
import type { Appointment, ProviderColor } from '../../data/calendar'
import { Icon } from '../icons'

const colorStyles: Record<
  ProviderColor,
  {
    header: string
    body: string
    border: string
    button: string
    hover: string
  }
> = {
  green: {
    header: 'bg-emerald-500',
    body: 'bg-emerald-50',
    border: 'border-emerald-200',
    button: 'bg-white text-emerald-700',
    hover: 'hover:ring-emerald-300',
  },
  purple: {
    header: 'bg-violet-500',
    body: 'bg-violet-50',
    border: 'border-violet-200',
    button: 'bg-white text-violet-700',
    hover: 'hover:ring-violet-300',
  },
  teal: {
    header: 'bg-teal-500',
    body: 'bg-teal-50',
    border: 'border-teal-200',
    button: 'bg-white text-teal-700',
    hover: 'hover:ring-teal-300',
  },
  orange: {
    header: 'bg-amber-500',
    body: 'bg-amber-50',
    border: 'border-amber-200',
    button: 'bg-white text-amber-700',
    hover: 'hover:ring-amber-300',
  },
  blue: {
    header: 'bg-brand-500',
    body: 'bg-brand-50',
    border: 'border-brand-200',
    button: 'bg-white text-brand-700',
    hover: 'hover:ring-brand-300',
  },
  pink: {
    header: 'bg-rose-500',
    body: 'bg-rose-50',
    border: 'border-rose-200',
    button: 'bg-white text-rose-700',
    hover: 'hover:ring-rose-300',
  },
}

type Props = {
  apt: Appointment
  providerName: string
  color: ProviderColor
  /** For the AI proposed card special styling (dashed blue). */
  proposed?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function AppointmentCard({ apt, providerName, color, proposed, className = '', style }: Props) {
  const c = colorStyles[color]

  const rangeText = useMemo(() => `${apt.start} – ${apt.end} ${apt.operatory}`, [apt])

  return (
    <div
      style={style}
      className={[
        'group overflow-hidden rounded-lg border shadow-sm transition-all duration-150',
        'ring-1 ring-transparent hover:-translate-y-[1px] hover:shadow-md',
        proposed
          ? 'border-dashed border-brand-400 bg-brand-50/60 ring-1 ring-brand-200'
          : `${c.border} ${c.body}`,
        c.hover,
        className,
      ].join(' ')}
    >
      <div
        className={`flex items-center justify-between px-2 py-1 text-[10px] font-semibold text-white ${
          proposed ? 'bg-brand-500' : c.header
        }`}
      >
        <span className="truncate">{providerName}</span>
        <Icon.Dots width={12} height={12} className="opacity-80" />
      </div>
      <div className="px-2.5 py-2">
        <p className="truncate text-[12px] font-semibold text-ink-900">{apt.patient}</p>
        <p className="truncate text-[11px] text-ink-600">{apt.treatment}</p>
        <p className="mt-0.5 truncate text-[10px] text-ink-500">{rangeText}</p>

        <div className="mt-1.5 flex flex-wrap items-center gap-1">
          {apt.tags.includes('pay-today') && (
            <span className="inline-flex items-center gap-1 rounded-md bg-rose-100 px-1.5 py-0.5 text-[10px] font-medium text-rose-700">
              <Icon.Dollar width={10} height={10} />
              Pay Today
            </span>
          )}
          {apt.tags.includes('child') && (
            <span className="inline-flex items-center gap-1 rounded-md bg-sky-100 px-1.5 py-0.5 text-[10px] font-medium text-sky-700">
              <Icon.Child width={10} height={10} />
              Child
            </span>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1 text-ink-400">
            <Icon.Calendar width={12} height={12} />
            <Icon.Dollar width={12} height={12} />
            <Icon.CheckSquare width={12} height={12} />
            <Icon.Phone width={12} height={12} />
            <Icon.Notes width={12} height={12} />
          </div>
          {apt.status === 'waiting' && (
            <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${c.button} border ${c.border}`}>
              Waiting
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
