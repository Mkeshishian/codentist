export type Suggestion = {
  id: string
  title: string
  description: string
  tone: 'warning' | 'info' | 'success'
}

export const codySuggestions: Suggestion[] = [
  {
    id: 'no-show',
    title: 'High No-Show Rate',
    description:
      'No-shows rate increased to 15% this month. Consider implementing a reminder system and reviewing scheduling practices.',
    tone: 'warning',
  },
  {
    id: 'revenue',
    title: 'Revenue Opportunity',
    description:
      "Dr. Johnson's chair utilization is 84.7%. Optimizing schedule could increase production by estimated $12,000/month.",
    tone: 'info',
  },
  {
    id: 'retention',
    title: 'Patient Retention',
    description:
      'Hygiene recall rate at 75%. Implementing a follow-up system could improve patient retention and recurring revenue.',
    tone: 'success',
  },
]
