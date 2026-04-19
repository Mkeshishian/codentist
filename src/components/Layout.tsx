import type { ReactNode } from 'react'
import Sidebar from './Sidebar'
import TopNav from './TopNav'

type Props = {
  children: ReactNode
  /** When true, page content is not padded so it can own its own layout (e.g. Calendar). */
  flush?: boolean
}

export default function Layout({ children, flush }: Props) {
  return (
    <div className="mx-auto flex min-h-screen w-[1440px] flex-col bg-ink-50">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className={flush ? 'flex-1 overflow-hidden' : 'flex-1 overflow-auto p-6'}>
          {children}
        </main>
      </div>
    </div>
  )
}
