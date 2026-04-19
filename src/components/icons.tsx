import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>

const defaults = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export const Icon = {
  Search: (p: Props) => (
    <svg {...defaults} {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  ),
  ChevronDown: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  ChevronLeft: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
  ChevronRight: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  Calendar: (p: Props) => (
    <svg {...defaults} {...p}>
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  ),
  Plus: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  ArrowUp: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  ),
  ArrowDown: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  ),
  Bell: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Z" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </svg>
  ),
  Help: (p: Props) => (
    <svg {...defaults} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1 .9-1 1.7" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" />
    </svg>
  ),
  Settings: (p: Props) => (
    <svg {...defaults} {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </svg>
  ),
  Sparkle: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  ),
  Tooth: (p: Props) => (
    <svg viewBox="0 0 64 64" fill="none" {...p}>
      <path
        d="M32 6c-6 0-10 2-14 2-6 0-10 4-10 10 0 5 2 8 3.5 11 1.2 2.5 1.2 4.5 2 9 .9 5 2 14 6 14 3 0 4-5 5.5-10 1.3-4.5 3-6 7-6s5.7 1.5 7 6c1.5 5 2.5 10 5.5 10 4 0 5-9 6-14 .8-4.5.8-6.5 2-9 1.5-3 3.5-6 3.5-11 0-6-4-10-10-10-4 0-8-2-14-2Z"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Dashboard: (p: Props) => (
    <svg {...defaults} {...p}>
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  ),
  Users: (p: Props) => (
    <svg {...defaults} {...p}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
      <circle cx="17" cy="7" r="2.5" />
      <path d="M15 14c3 0 6 2 6 5" />
    </svg>
  ),
  Clipboard: (p: Props) => (
    <svg {...defaults} {...p}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4h6v3H9z" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  ),
  Upload: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M12 16V4M6 10l6-6 6 6" />
      <path d="M4 20h16" />
    </svg>
  ),
  Phone: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" />
    </svg>
  ),
  Chat: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12Z" />
    </svg>
  ),
  Filter: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M3 5h18M6 12h12M10 19h4" />
    </svg>
  ),
  Menu: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Mic: (p: Props) => (
    <svg {...defaults} {...p}>
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
    </svg>
  ),
  Close: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  History: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5M12 7v5l3 2" />
    </svg>
  ),
  CheckSquare: (p: Props) => (
    <svg {...defaults} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  ),
  Dollar: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M12 3v18M17 6.5c-1-1.5-3-2.5-5-2.5-2.5 0-5 1.5-5 4 0 5 10 3 10 8 0 2.5-2.5 4-5 4-2 0-4-1-5-2.5" />
    </svg>
  ),
  Child: (p: Props) => (
    <svg {...defaults} {...p}>
      <circle cx="12" cy="6" r="2.5" />
      <path d="M8 21v-6H6l2-5h8l2 5h-2v6" />
    </svg>
  ),
  Dots: (p: Props) => (
    <svg {...defaults} {...p}>
      <circle cx="5" cy="12" r="1.2" fill="currentColor" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <circle cx="19" cy="12" r="1.2" fill="currentColor" />
    </svg>
  ),
  Info: (p: Props) => (
    <svg {...defaults} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="8" r="0.6" fill="currentColor" />
    </svg>
  ),
  Notes: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M4 5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M14 3v5h5" />
      <path d="M8 13h8M8 17h5" />
    </svg>
  ),
  Monitor: (p: Props) => (
    <svg {...defaults} {...p}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  ),
  Eye: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Grid: (p: Props) => (
    <svg {...defaults} {...p}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  List: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M8 6h13M8 12h13M8 18h13" />
      <circle cx="4" cy="6" r="1" fill="currentColor" />
      <circle cx="4" cy="12" r="1" fill="currentColor" />
      <circle cx="4" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  Warn: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M12 3 2 20h20Z" />
      <path d="M12 10v5" />
      <circle cx="12" cy="18" r="0.6" fill="currentColor" />
    </svg>
  ),
  Heart: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M20.8 7a5.5 5.5 0 0 0-9.3-2L12 5.6l-.5-.6A5.5 5.5 0 0 0 2 8c0 6 10 12 10 12s10-6 10-12c0-.3 0-.7-.1-1Z" />
    </svg>
  ),
  TrendingUp: (p: Props) => (
    <svg {...defaults} {...p}>
      <path d="M3 17 9 11l4 4 8-9" />
      <path d="M14 6h7v7" />
    </svg>
  ),
}
