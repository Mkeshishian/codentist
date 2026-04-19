import type { ReactNode } from 'react'
import { Icon } from './icons'

type Props = {
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export default function FilterPill({ icon, children, className }: Props) {
  return (
    <button
      type="button"
      className={[
        'inline-flex h-9 items-center gap-2 rounded-lg border border-ink-100 bg-white px-3 text-sm font-medium text-ink-700 shadow-sm transition-colors hover:border-ink-200 hover:bg-ink-50',
        className || '',
      ].join(' ')}
    >
      {icon}
      <span className="min-w-0 truncate">{children}</span>
      <Icon.ChevronDown width={14} height={14} className="text-ink-400" />
    </button>
  )
}
