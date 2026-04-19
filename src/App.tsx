import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/Dashboard'
import CalendarPage from './pages/Calendar'
import AiSchedulePage from './pages/AiSchedule'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/ai-schedule" element={<AiSchedulePage />} />
      {/* Placeholder routes so other nav links don't 404 */}
      <Route path="/patients" element={<DashboardPage />} />
      <Route path="/report" element={<DashboardPage />} />
      <Route path="/communication" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
