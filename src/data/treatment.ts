export type TreatmentMixSlice = {
  label: string
  percent: number
  color: string
}

export const treatmentAcceptance = {
  rate: '78.5%',
  trend: { value: '+2.5%', label: 'vs last month', direction: 'up' as const },
  totalProduction: '$44,280',
}

export const treatmentMix: TreatmentMixSlice[] = [
  { label: 'Restorative', percent: 35, color: '#6366f1' },
  { label: 'Hygiene', percent: 25, color: '#10b981' },
  { label: 'Ortho', percent: 15, color: '#f59e0b' },
  { label: 'Implant', percent: 15, color: '#06b6d4' },
  { label: 'Other', percent: 10, color: '#a855f7' },
]
