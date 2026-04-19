import { useState } from 'react'
import Layout from '../components/Layout'
import CalendarGrid from '../components/Calendar/CalendarGrid'
import CalendarToolbar, {
  type CalendarView,
  type ViewMode,
} from '../components/Calendar/CalendarToolbar'

export default function CalendarPage() {
  const [view, setView] = useState<CalendarView>('Today')
  const [mode, setMode] = useState<ViewMode>('Provider View')

  return (
    <Layout flush>
      <div className="flex h-full flex-col gap-4 p-5">
        <CalendarToolbar view={view} setView={setView} mode={mode} setMode={setMode} />
        <div className="flex min-h-0 flex-1">
          <CalendarGrid />
        </div>
      </div>
    </Layout>
  )
}
