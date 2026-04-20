import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
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

  // Position the popover BELOW the proposed Art Vandelay card in Lily's column.
  // Lily is the 3rd of 4 columns, so positioning to the right would clip the
  // popover; below the card sits in empty space.
  const lilyIndex = providers.findIndex((p) => p.id === 'lily')
  const availableWidth = 1440 - 56 /* sidebar */ - 340 /* cody */ - 40 /* padding */
  const providerColWidth = (availableWidth - 80 /* time col */) / providers.length
  const popoverWidth = 280
  // Center the popover horizontally under Lily's column (it's slightly wider
  // than one column, so it extends a touch into the neighbouring columns).
  const popoverLeft =
    80 + lilyIndex * providerColWidth + providerColWidth / 2 - popoverWidth / 2
  const popoverTop =
    44 /* header */ +
    timeOffsetPx(aiSuggestedAppointment.end) +
    12 /* small gap below the card */

  return (
    <Layout flush>
      <div className="flex h-full">
        <CodyPanel
          state={cody}
          onScheduleAppointment={goListening}
          onEndTask={goIdle}
          onGenerate={goReview}
          onClose={() => navigate('/calendar')}
        />
        <div className="flex flex-1 flex-col gap-4 p-5">
          <CalendarToolbar view={view} setView={setView} mode={mode} setMode={setMode} />
          <div className="flex min-h-0 flex-1">
            <CalendarGrid
              extraAppointments={extras}
              mode={mode}
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
