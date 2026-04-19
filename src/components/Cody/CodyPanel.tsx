import { Icon } from '../icons'

export type CodyState = 'idle' | 'listening' | 'processing' | 'review'

type Props = {
  state: CodyState
  onScheduleAppointment: () => void
  onEndTask: () => void
  onGenerate: () => void
}

function CodyOrb({ pulse = false }: { pulse?: boolean }) {
  return (
    <div className="relative grid h-48 w-48 place-items-center">
      {pulse && (
        <>
          <span className="animate-pulse-ring absolute inset-0 rounded-full bg-brand-200/50" />
          <span
            className="animate-pulse-ring absolute inset-4 rounded-full bg-brand-300/40"
            style={{ animationDelay: '0.6s' }}
          />
        </>
      )}
      <div className="animate-float-orb relative h-32 w-32 rounded-full bg-gradient-to-br from-white via-brand-100 to-brand-400 shadow-inner">
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/80 via-brand-200/60 to-brand-500/60 blur-[1px]" />
        <div className="absolute left-6 top-6 h-8 w-8 rounded-full bg-white/70 blur-sm" />
      </div>
    </div>
  )
}

function VoiceChatToggle() {
  return (
    <div className="mt-auto rounded-2xl bg-gradient-to-r from-brand-50 to-white p-1">
      <div className="grid grid-cols-2 gap-1">
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-3 py-2.5 text-sm font-semibold text-white shadow-sm">
          <Icon.Mic width={16} height={16} />
          Voice
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50">
          <Icon.Chat width={16} height={16} />
          Chat
        </button>
      </div>
    </div>
  )
}

function PresetAction({
  label,
  onClick,
  primary,
}: {
  label: string
  onClick?: () => void
  primary?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'group flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-colors',
        primary
          ? 'border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100'
          : 'border-ink-100 bg-white text-ink-700 hover:border-ink-200 hover:bg-ink-50',
      ].join(' ')}
    >
      <span>{label}</span>
      <Icon.ChevronRight width={14} height={14} className="opacity-60 group-hover:opacity-100" />
    </button>
  )
}

function TaskCard({ title = 'Schedule appointment', subtitle = 'Schedule coordinator', name = 'Art Vandelay' }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-3 shadow-sm">
      <p className="mb-2 text-xs font-medium text-ink-500">I am helping you:</p>
      <div className="flex items-start gap-2">
        <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-600">
          <Icon.Sparkle width={14} height={14} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink-900">{title}</p>
          <p className="text-[11px] text-ink-500">{subtitle}</p>
          <p className="text-[11px] font-medium text-ink-700">{name}</p>
        </div>
      </div>
    </div>
  )
}

export default function CodyPanel({
  state,
  onScheduleAppointment,
  onEndTask,
  onGenerate,
}: Props) {
  const isBusy = state === 'listening' || state === 'processing' || state === 'review'

  return (
    <aside className="relative flex h-full w-[340px] shrink-0 flex-col gap-3 border-r border-ink-100 bg-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
            <Icon.Sparkle width={14} height={14} />
          </span>
          <span className="text-sm font-semibold text-ink-900">Cody</span>
        </div>
        <div className="flex items-center gap-1 text-ink-400">
          <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-ink-50 hover:text-ink-700">
            <Icon.History width={14} height={14} />
          </button>
          <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-ink-50 hover:text-ink-700">
            <Icon.Notes width={14} height={14} />
          </button>
          <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-ink-50 hover:text-ink-700">
            <Icon.Close width={14} height={14} />
          </button>
        </div>
      </div>

      {/* Breadcrumb chip when task is active */}
      {isBusy && (
        <div className="flex items-center justify-between rounded-xl bg-brand-50/60 p-2 text-xs font-medium text-brand-700">
          <div className="flex items-center gap-2">
            <Icon.Plus width={12} height={12} />
            Schedule appointment
          </div>
          <button className="rounded-md p-0.5 text-brand-500 hover:bg-brand-100" onClick={onEndTask}>
            <Icon.Close width={12} height={12} />
          </button>
        </div>
      )}

      {/* Main body */}
      {state === 'idle' && (
        <>
          <div className="mt-2 flex flex-col items-center">
            <CodyOrb />
            <p className="mt-1 text-center text-sm font-semibold text-ink-800">
              Good Morning! how can I help you?
            </p>
            <p className="text-center text-xs text-ink-500">
              Pick one below or tap the mic to start.
            </p>
          </div>
          <div className="mt-3 space-y-2">
            <PresetAction label="Schedule appointment" primary onClick={onScheduleAppointment} />
            <PresetAction label="Add schedule notes" />
            <PresetAction label="Send message to patients" />
          </div>
          <VoiceChatToggle />
        </>
      )}

      {(state === 'listening' || state === 'processing') && (
        <>
          <div className="mt-2 flex flex-col items-center">
            <CodyOrb pulse />
            <p className="mt-1 text-center text-sm font-semibold text-ink-800">
              {state === 'processing' ? 'Generating…' : 'I am listening…'}
            </p>
            <p className="text-center text-xs text-ink-500">
              {state === 'processing'
                ? 'Cody is drafting your appointment suggestion.'
                : 'Describe the appointment you want to schedule.'}
            </p>
          </div>

          <TaskCard />

          <div className="mt-1 grid grid-cols-2 gap-2">
            <button
              onClick={onGenerate}
              disabled={state === 'processing'}
              className="inline-flex items-center justify-center rounded-xl bg-ink-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:bg-ink-800 disabled:opacity-60"
            >
              {state === 'processing' ? 'Generating…' : 'Generate'}
            </button>
            <button
              onClick={onEndTask}
              className="inline-flex items-center justify-center rounded-xl bg-rose-500 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-600"
            >
              End task
            </button>
          </div>

          <VoiceChatToggle />
        </>
      )}

      {state === 'review' && (
        <>
          <div className="mt-2 flex flex-col items-center">
            <CodyOrb />
            <p className="mt-1 text-center text-sm font-semibold text-ink-800">
              Your scheduled appointment is ready for review
            </p>
            <p className="text-center text-xs text-ink-500">
              Check the proposed slot on the calendar and accept to confirm.
            </p>
          </div>

          <TaskCard />

          <div className="mt-1 grid grid-cols-2 gap-2">
            <button
              onClick={onGenerate}
              className="inline-flex items-center justify-center rounded-xl bg-ink-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-ink-800"
            >
              Regenerate
            </button>
            <button
              onClick={onEndTask}
              className="inline-flex items-center justify-center rounded-xl bg-rose-500 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-600"
            >
              End task
            </button>
          </div>

          <VoiceChatToggle />
        </>
      )}
    </aside>
  )
}
