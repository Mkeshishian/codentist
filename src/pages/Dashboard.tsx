import Layout from '../components/Layout'
import FilterPill from '../components/FilterPill'
import { Icon } from '../components/icons'
import {
  grossProduction,
  utilization,
  financialSummary,
  newPatient,
} from '../data/kpis'
import { codySuggestions } from '../data/suggestions'
import { hygieneAppointments, hygienistProduction } from '../data/hygiene'
import { treatmentAcceptance, treatmentMix } from '../data/treatment'

function SectionCard({
  title,
  children,
  right,
  className = '',
}: {
  title: string
  children: React.ReactNode
  right?: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={`rounded-2xl border border-ink-100 bg-white shadow-card ${className}`}
    >
      <header className="flex items-center justify-between gap-3 border-b border-ink-100 px-5 py-3">
        <div className="flex items-center gap-2">
          <Icon.Grid width={16} height={16} className="text-ink-400" />
          <h3 className="text-sm font-semibold text-ink-800">{title}</h3>
        </div>
        {right}
      </header>
      <div className="p-5">{children}</div>
    </section>
  )
}

function TrendChip({
  direction,
  value,
  label,
}: {
  direction: 'up' | 'down' | 'flat'
  value: string
  label?: string
}) {
  const positive = direction === 'up'
  const color = positive ? 'text-emerald-600' : 'text-rose-500'
  const Arrow = positive ? Icon.ArrowUp : Icon.ArrowDown
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium">
      <Arrow width={12} height={12} className={color} />
      <span className={color}>{value}</span>
      {label ? <span className="text-ink-400">{label}</span> : null}
    </span>
  )
}

function KpiGrossProduction() {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-4">
      <p className="text-xs font-medium text-ink-500">Gross production</p>
      <div className="mt-2 flex items-end gap-3">
        <span className="text-[28px] font-semibold leading-none tracking-tight text-ink-900">
          {grossProduction.total}
        </span>
      </div>
      <div className="mt-1">
        <TrendChip
          direction={grossProduction.trend.direction}
          value={grossProduction.trend.value}
          label={grossProduction.trend.label}
        />
      </div>
      <div className="mt-4 space-y-1.5 text-xs">
        {grossProduction.breakdown.map((b) => (
          <div key={b.label} className="flex items-center justify-between">
            <span className="text-ink-500">{b.label}</span>
            <span className="text-ink-700">
              {b.amount}
              <span
                className={
                  b.direction === 'up'
                    ? 'ml-1 text-emerald-600'
                    : 'ml-1 text-rose-500'
                }
              >
                {b.delta}
              </span>
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between pt-1">
          <span className="text-ink-500">Per Hour Output</span>
          <span className="text-ink-700">
            {grossProduction.perHourOutput.amount}
            <span
              className={
                grossProduction.perHourOutput.direction === 'up'
                  ? 'ml-1 text-emerald-600'
                  : 'ml-1 text-rose-500'
              }
            >
              {grossProduction.perHourOutput.delta}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

function KpiUtilization() {
  const colorMap: Record<string, string> = {
    green: 'bg-emerald-500',
    orange: 'bg-amber-500',
    red: 'bg-rose-500',
    blue: 'bg-brand-500',
  }
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-4">
      <p className="text-xs font-medium text-ink-500">Utilization</p>
      <div className="mt-2 flex items-end gap-3">
        <span className="text-[28px] font-semibold leading-none tracking-tight text-ink-900">
          {utilization.percent}
        </span>
      </div>
      <div className="mt-1">
        <TrendChip
          direction={utilization.trend.direction}
          value={utilization.trend.value}
          label={utilization.trend.label}
        />
      </div>
      <div className="mt-4 space-y-2 text-xs">
        {utilization.rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-ink-500">
              <span className={`h-1.5 w-1.5 rounded-full ${colorMap[r.color]}`} />
              {r.label}
            </span>
            <span className="text-ink-700">{r.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400"
          style={{ width: utilization.percent }}
        />
      </div>
    </div>
  )
}

function KpiFinancial() {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-4">
      <p className="text-xs font-medium text-ink-500">Financial Summary</p>
      <div className="mt-2 flex items-end gap-3">
        <span className="text-[28px] font-semibold leading-none tracking-tight text-ink-900">
          {financialSummary.collections}
        </span>
      </div>
      <div className="mt-1">
        <TrendChip
          direction={financialSummary.trend.direction}
          value={financialSummary.trend.value}
          label={financialSummary.trend.label}
        />
      </div>
      <div className="mt-4 space-y-1.5 text-xs">
        {financialSummary.rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between">
            <span className="text-ink-500">{r.label}</span>
            <span className={r.negative ? 'text-rose-500' : 'text-ink-700'}>
              {r.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function KpiNewPatient() {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-4">
      <p className="text-xs font-medium text-ink-500">New patient</p>
      <div className="mt-2 flex items-end gap-3">
        <span className="text-[28px] font-semibold leading-none tracking-tight text-ink-900">
          {newPatient.count}
        </span>
      </div>
      <div className="mt-1">
        <TrendChip
          direction={newPatient.trend.direction}
          value={newPatient.trend.value}
          label={newPatient.trend.label}
        />
      </div>
      <div className="mt-4 space-y-1.5 text-xs">
        {newPatient.rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between">
            <span className="text-ink-500">{r.label}</span>
            <span className="text-ink-700">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SuggestionCard({
  tone,
  title,
  description,
}: {
  tone: 'warning' | 'info' | 'success'
  title: string
  description: string
}) {
  const map = {
    warning: {
      icon: <Icon.Warn width={16} height={16} className="text-amber-600" />,
      bg: 'bg-amber-50/70',
      border: 'border-amber-100',
      title: 'text-amber-700',
    },
    info: {
      icon: <Icon.Info width={16} height={16} className="text-sky-600" />,
      bg: 'bg-sky-50/70',
      border: 'border-sky-100',
      title: 'text-sky-700',
    },
    success: {
      icon: <Icon.Heart width={16} height={16} className="text-emerald-600" />,
      bg: 'bg-emerald-50/70',
      border: 'border-emerald-100',
      title: 'text-emerald-700',
    },
  }[tone]

  return (
    <div className={`rounded-xl border ${map.border} ${map.bg} p-4`}>
      <div className="flex items-center gap-2">
        {map.icon}
        <span className={`text-sm font-semibold ${map.title}`}>{title}</span>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-ink-600">{description}</p>
    </div>
  )
}

function DonutChart() {
  const slices = treatmentMix
  const total = slices.reduce((s, x) => s + x.percent, 0)
  const r = 46
  const c = 2 * Math.PI * r
  let offset = 0
  return (
    <div className="flex items-center gap-5">
      <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#f1f2f6" strokeWidth="16" />
        {slices.map((s) => {
          const length = (s.percent / total) * c
          const circle = (
            <circle
              key={s.label}
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="16"
              strokeDasharray={`${length} ${c - length}`}
              strokeDashoffset={-offset}
            />
          )
          offset += length
          return circle
        })}
      </svg>
      <ul className="space-y-1.5 text-xs">
        {slices.map((s) => (
          <li key={s.label} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
            <span className="text-ink-700">
              {s.label} <span className="text-ink-400">{s.percent}%</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-[1320px]">
        {/* Page header with tooth decoration */}
        <div className="relative mb-5 overflow-hidden rounded-2xl border border-ink-100 bg-gradient-to-r from-white via-white to-brand-50/60 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-ink-900">
                My Dashboard
              </h1>
              <p className="mt-0.5 text-sm text-ink-500">
                Welcome back — here is how your clinic is performing today.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="grid h-9 w-9 place-items-center rounded-lg border border-ink-100 bg-white text-ink-500 hover:bg-ink-50">
                <Icon.Settings width={16} height={16} />
              </button>
              <FilterPill>Dentist dashboard 1</FilterPill>
              <button className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 text-white shadow-sm hover:bg-brand-600">
                <Icon.Plus width={16} height={16} />
              </button>
            </div>
          </div>
        </div>

        {/* KPI Overview */}
        <SectionCard
          title="KPIs Overview"
          className="mb-5"
          right={
            <div className="flex items-center gap-2">
              <FilterPill icon={<Icon.Calendar width={14} height={14} className="text-ink-400" />}>Last 30 Days</FilterPill>
              <FilterPill>All provider</FilterPill>
              <FilterPill>All location</FilterPill>
            </div>
          }
        >
          <div className="grid grid-cols-4 gap-4">
            <KpiGrossProduction />
            <KpiUtilization />
            <KpiFinancial />
            <KpiNewPatient />
          </div>
        </SectionCard>

        {/* Cody's suggestions */}
        <section className="mb-5 rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
          <div className="mb-3 flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white">
              <Icon.Sparkle width={12} height={12} />
            </span>
            <h3 className="text-sm font-semibold text-ink-800">Cody's suggestions:</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SuggestionCard {...codySuggestions[0]} />
            <SuggestionCard {...codySuggestions[1]} />
            <SuggestionCard {...codySuggestions[2]} />
          </div>
        </section>

        {/* Hygiene + Treatment */}
        <div className="grid grid-cols-2 gap-5">
          <SectionCard
            title="Hygiene analysis"
            right={
              <div className="flex items-center gap-2">
                <FilterPill icon={<Icon.Calendar width={14} height={14} className="text-ink-400" />}>Last 30 Days</FilterPill>
                <FilterPill>All provider</FilterPill>
                <FilterPill>All location</FilterPill>
              </div>
            }
          >
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-sm font-semibold text-ink-800">Hygiene appointment</p>
                <div className="mt-3 space-y-3">
                  <div>
                    <p className="text-xs text-ink-500">Available hygiene appointment</p>
                    <p className="text-2xl font-semibold text-ink-900">
                      {hygieneAppointments.availableSlots}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-ink-500">Completed hygiene appointment</p>
                    <p className="text-2xl font-semibold text-ink-900">
                      {hygieneAppointments.completed}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-ink-500">Utilization rate</p>
                    <p className="text-2xl font-semibold text-emerald-600">
                      {hygieneAppointments.utilizationRate}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-800">Hygienist production</p>
                <div className="mt-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                  <span>Provider</span>
                  <span>Production</span>
                </div>
                <div className="mt-2 space-y-2">
                  {hygienistProduction.map((h) => (
                    <div
                      key={h.name}
                      className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`grid h-8 w-8 place-items-center rounded-full text-[11px] font-semibold ${h.avatarColor}`}
                        >
                          {h.initials}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-ink-800">{h.name}</p>
                          <p className="text-[11px] text-ink-500">{h.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-ink-900">{h.production}</p>
                        <p
                          className={`text-[11px] font-medium ${
                            h.direction === 'up' ? 'text-emerald-600' : 'text-rose-500'
                          }`}
                        >
                          {h.delta}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Treatment plan analysis"
            right={
              <div className="flex items-center gap-2">
                <FilterPill icon={<Icon.Calendar width={14} height={14} className="text-ink-400" />}>Last 30 Days</FilterPill>
                <FilterPill>All location</FilterPill>
                <FilterPill>All provider</FilterPill>
              </div>
            }
          >
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-sm font-semibold text-ink-800">
                  Treatment plan acceptance
                </p>
                <div className="mt-4 flex items-end gap-3">
                  <span className="text-[40px] font-semibold leading-none tracking-tight text-ink-900">
                    {treatmentAcceptance.rate}
                  </span>
                </div>
                <div className="mt-1">
                  <TrendChip
                    direction={treatmentAcceptance.trend.direction}
                    value={treatmentAcceptance.trend.value}
                    label={treatmentAcceptance.trend.label}
                  />
                </div>
                <div className="mt-6 h-2 overflow-hidden rounded-full bg-ink-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
                    style={{ width: treatmentAcceptance.rate }}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-800">Treatment procedure mix chart</p>
                <div className="mt-3">
                  <DonutChart />
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-3 text-xs">
              <span className="text-ink-500">Treatment procedure production</span>
              <span className="font-semibold text-ink-900">{treatmentAcceptance.totalProduction}</span>
            </div>
          </SectionCard>
        </div>
      </div>
    </Layout>
  )
}
