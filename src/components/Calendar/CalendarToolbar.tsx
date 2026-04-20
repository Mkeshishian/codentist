import type { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import FilterPill from '../FilterPill'
import { Icon } from '../icons'

export type CalendarView = 'Today' | 'Week' | 'Month'
export type ViewMode = 'Provider View' | 'Operatory View'

type Props = {
  view: CalendarView
  setView: Dispatch<SetStateAction<CalendarView>>
  mode: ViewMode
  setMode: Dispatch<SetStateAction<ViewMode>>
}

function Toggle({
  options,
  value,
  onChange,
  pill = false,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
  pill?: boolean
}) {
  return (
    <div
      className={[
        'inline-flex items-center gap-1 rounded-lg border border-ink-100 bg-white p-0.5',
        pill ? '' : '',
      ].join(' ')}
    >
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={[
            'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
            value === o
              ? 'bg-ink-900 text-white shadow-sm'
              : 'text-ink-600 hover:text-ink-900',
          ].join(' ')}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export default function CalendarToolbar({ view, setView, mode, setMode }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold tracking-tight text-ink-900">June 30, 2025</h1>
          <div className="ml-1 flex items-center gap-0.5">
            <button className="grid h-7 w-7 place-items-center rounded-md text-ink-500 hover:bg-ink-50">
              <Icon.ChevronLeft width={16} height={16} />
            </button>
            <button className="grid h-7 w-7 place-items-center rounded-md text-ink-500 hover:bg-ink-50">
              <Icon.ChevronRight width={16} height={16} />
            </button>
          </div>
          <Toggle
            options={['Today', 'Week', 'Month']}
            value={view}
            onChange={(v) => setView(v as CalendarView)}
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-ink-100 bg-white text-ink-500 hover:bg-ink-50">
            <Icon.Calendar width={16} height={16} />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-ink-100 bg-white text-ink-500 hover:bg-ink-50">
            <Icon.Menu width={16} height={16} />
          </button>
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-ink-100 bg-white px-3 text-sm font-medium text-ink-700 hover:bg-ink-50">
            <Icon.Notes width={16} height={16} />
            Add notes
            <Icon.ChevronDown width={14} height={14} className="text-ink-400" />
          </button>
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-ink-100 bg-white px-3 text-sm font-medium text-ink-700 hover:bg-ink-50">
            <Icon.Monitor width={16} height={16} />
            Clinic monitor
          </button>
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-brand-500 px-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-600">
            <Icon.Plus width={16} height={16} />
            Add appointment
          </button>
          <Link
            to="/ai-schedule"
            title="Open AI Schedule"
            aria-label="Open AI Schedule"
            className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-600 transition-colors hover:bg-brand-100"
          >
            <Icon.Sparkle width={16} height={16} />
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="relative w-72">
            <Icon.Search
              width={14}
              height={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400"
            />
            <input
              placeholder="Search patients..."
              className="h-9 w-full rounded-lg border border-ink-100 bg-white pl-8 pr-3 text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <FilterPill>All Locations</FilterPill>
          <FilterPill>All Providers</FilterPill>
          <FilterPill>All Types</FilterPill>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-ink-100 bg-white text-ink-500 hover:bg-ink-50">
            <Icon.Filter width={14} height={14} />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-ink-100 bg-white text-ink-500 hover:bg-ink-50">
            <Icon.Eye width={14} height={14} />
          </button>
        </div>
        <div>
          <Toggle
            options={['Provider View', 'Operatory View']}
            value={mode}
            onChange={(v) => setMode(v as ViewMode)}
          />
        </div>
      </div>
    </div>
  )
}
