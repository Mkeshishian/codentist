import { useMemo, useState } from 'react'
import Layout from '../components/Layout'
import CalendarGrid, {
  durationPx,
  timeOffsetPx,
} from '../components/Calendar/CalendarGrid'
import CalendarToolbar, {
  type CalendarView,
  type ViewMode,
} from '../components/Calendar/CalendarToolbar'
import CodyPanel, { type CodyState } from '../components/Cody/CodyPanel'
import ReviewPopover from '../components/Cody/ReviewPopover'
import { aiSuggestedAppointment, providers } from '../data/calendar'

export default function AiSchedulePage() {
  const [view, setView] = useState<CalendarView>('Today')
  const [mode, setMode] = useState<ViewMode>('Provider View')
  const [cody, setCody] = useState<CodyState>('idle')
  const [acceptedAppointments, setAccepted] = useState<typeof aiSuggestedAppointment[]>([])

  const goIdle = () => setCody('idle')
  const goListening = () => setCody('listening')
  const goReview = () => {
    setCody('processing')
    window.setTimeout(() => setCody('review'), 1500)
  }
  const accept = () => {
    setAccepted((prev) => [...prev, aiSuggestedAppointment])
    goIdle()
  }
  const skip = () => goIdle()

  const extras = useMemo(() => {
    // On review: show the proposed ghost slot.
    if (cody === 'review') return [aiSuggestedAppointment]
    return acceptedAppointments
  }, [cody, acceptedAppointments])

  // Position of the popover next to the proposed card.
  // Calendar header 44px, time column 80px wide, each provider column flex.
  // Provider "Lily" is 3rd provider (index 2). Inside grid the time col is 80 and
  // the proposed card is in Lily column. We position popover using left/top offsets
  // calculated from provider index.
  const lilyIndex = providers.findIndex((p) => p.id === 'lily')
  const availableWidth = 1440 - 56 /* sidebar */ - 340 /* cody */ - 40 /* padding */
  const providerColWidth = (availableWidth - 80 /* time col */ - 80 /* pending col */) / providers.length
  const popoverLeft = 80 + lilyIndex * providerColWidth + providerColWidth + 12
  const popoverTop =
    44 /* header */ +
    timeOffsetPx(aiSuggestedAppointment.start) +
    durationPx(aiSuggestedAppointment.start, aiSuggestedAppointment.end) / 2 -
    90

  return (
    <Layout flush>
      <div className="flex h-full">
        <CodyPanel
          state={cody}
          onScheduleAppointment={goListening}
          onEndTask={goIdle}
          onGenerate={goReview}
        />
        <div className="flex flex-1 flex-col gap-4 p-5">
          <CalendarToolbar view={view} setView={setView} mode={mode} setMode={setMode} />
          <div className="flex min-h-0 flex-1">
            <CalendarGrid
              extraAppointments={extras}
              proposedAppointmentId={cody === 'review' ? aiSuggestedAppointment.id : undefined}
              overlay={
                cody === 'review' ? (
                  <ReviewPopover
                    onAccept={accept}
                    onSkip={skip}
                    onSkipAll={skip}
                    style={{ left: popoverLeft, top: popoverTop }}
                  />
                ) : null
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
