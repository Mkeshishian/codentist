import { Icon } from '../icons'

type Props = {
  onAccept: () => void
  onSkip: () => void
  onSkipAll: () => void
  /** Positioning, absolute inside calendar grid. */
  style?: React.CSSProperties
}

export default function ReviewPopover({ onAccept, onSkip, onSkipAll, style }: Props) {
  return (
    <div
      style={style}
      className="pointer-events-auto absolute z-30 w-[280px] rounded-2xl border border-brand-200 bg-white p-3 shadow-pop"
    >
      {/* Upward-pointing arrow connecting popover to the proposed card above. */}
      <span
        aria-hidden
        className="absolute left-1/2 -top-[7px] h-3 w-3 -translate-x-1/2 rotate-45 rounded-[2px] border-l border-t border-brand-200 bg-white"
      />

      <div className="mb-2 flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white">
          <Icon.Sparkle width={12} height={12} />
        </span>
        <p className="text-xs font-semibold text-ink-900">AI suggested result</p>
      </div>

      <div className="rounded-lg bg-brand-50/50 p-2 text-[11px] text-ink-700">
        <p className="font-semibold text-ink-900">Art Vandelay</p>
        <p>Schedule coordinator · Dr. Lily</p>
        <p className="text-ink-500">9:00 AM – 10:00 AM · Operatory 2</p>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <button
          onClick={onSkipAll}
          className="text-xs font-medium text-ink-500 hover:text-ink-800"
        >
          Skip all
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onSkip}
            className="inline-flex items-center rounded-md border border-ink-100 bg-white px-3 py-1.5 text-xs font-semibold text-ink-700 hover:bg-ink-50"
          >
            Skip
          </button>
          <button
            onClick={onAccept}
            className="inline-flex items-center rounded-md bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-600"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
