import { NavLink } from 'react-router-dom'
import { Icon } from './icons'

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/calendar', label: 'Calendar', badge: 2 },
  { to: '/ai-schedule', label: 'AI Schedule' },
  { to: '/patients', label: 'Patient list' },
  { to: '/report', label: 'Report' },
  { to: '/communication', label: 'Communication' },
]

export default function TopNav() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-6 border-b border-ink-100 bg-white px-6">
      <div className="flex items-center gap-1.5">
        <span className="text-[22px] font-extrabold tracking-tight text-brand-600">
          Co<span className="text-ink-900">Dentist</span>
        </span>
      </div>

      <nav className="flex items-center gap-1 text-sm">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              [
                'relative rounded-md px-3 py-1.5 font-medium transition-colors',
                isActive
                  ? 'text-brand-600'
                  : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900',
              ].join(' ')
            }
          >
            <span className="flex items-center gap-2">
              {l.label}
              {l.badge ? (
                <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-semibold text-white">
                  {l.badge}
                </span>
              ) : null}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="ml-auto flex flex-1 items-center justify-end gap-4">
        <div className="relative w-[420px] max-w-full">
          <Icon.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" width={16} height={16} />
          <input
            placeholder="Search for patient, document or information"
            className="h-9 w-full rounded-lg border border-ink-100 bg-ink-50 pl-9 pr-3 text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <button className="grid h-9 w-9 place-items-center rounded-lg text-ink-500 hover:bg-ink-50">
          <Icon.Help width={18} height={18} />
        </button>
        <button className="relative grid h-9 w-9 place-items-center rounded-lg text-ink-500 hover:bg-ink-50">
          <Icon.Bell width={18} height={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-500" />
        </button>
        <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-amber-300 to-rose-400 ring-2 ring-white" />
      </div>
    </header>
  )
}
