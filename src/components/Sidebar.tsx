import { NavLink, useLocation } from 'react-router-dom'
import { Icon } from './icons'

const topItems = [
  { to: '/', label: 'Home', icon: Icon.Dashboard },
  { to: '/calendar', label: 'Calendar', icon: Icon.Calendar },
  { to: '/patients', label: 'Patients', icon: Icon.Users },
  { to: '/records', label: 'Records', icon: Icon.Clipboard },
  { to: '/uploads', label: 'Uploads', icon: Icon.Upload },
  { to: '/communication', label: 'Communication', icon: Icon.Phone },
  { to: '/documents', label: 'Documents', icon: Icon.Notes },
  { to: '/billing', label: 'Billing', icon: Icon.Dollar },
  { to: '/reports', label: 'Reports', icon: Icon.TrendingUp },
  { to: '/settings', label: 'Settings', icon: Icon.Settings },
]

export default function Sidebar() {
  const { pathname } = useLocation()
  const onAi = pathname.startsWith('/ai-schedule')

  return (
    <aside className="flex w-14 shrink-0 flex-col items-center gap-1 border-r border-ink-100 bg-white py-3">
      <NavLink
        to="/ai-schedule"
        title="Open Cody"
        className="mb-2 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm ring-2 ring-white"
      >
        <Icon.Sparkle width={16} height={16} />
      </NavLink>

      <div className="flex flex-col items-center gap-0.5">
        {topItems.map((item) => {
          const Comp = item.icon
          return (
            <NavLink
              key={item.label}
              to={item.to}
              title={item.label}
              className={({ isActive }) =>
                [
                  'grid h-9 w-9 place-items-center rounded-lg transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-ink-400 hover:bg-ink-50 hover:text-ink-700',
                ].join(' ')
              }
            >
              <Comp width={18} height={18} />
            </NavLink>
          )
        })}
      </div>

      <div className="mt-auto flex flex-col items-center gap-1 pt-3">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">Cody</span>
        <NavLink
          to="/ai-schedule"
          title="Cody chat"
          className={({ isActive }) =>
            [
              'grid h-9 w-9 place-items-center rounded-lg transition-colors',
              isActive || onAi
                ? 'bg-brand-50 text-brand-600'
                : 'text-ink-400 hover:bg-ink-50 hover:text-ink-700',
            ].join(' ')
          }
        >
          <Icon.Chat width={18} height={18} />
        </NavLink>
        <button
          title="History"
          className="grid h-9 w-9 place-items-center rounded-lg text-ink-400 hover:bg-ink-50 hover:text-ink-700"
        >
          <Icon.History width={18} height={18} />
        </button>
        <NavLink
          to="/ai-schedule"
          title="AI Schedule"
          className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 text-white shadow-sm"
        >
          <Icon.Sparkle width={16} height={16} />
        </NavLink>
      </div>
    </aside>
  )
}
