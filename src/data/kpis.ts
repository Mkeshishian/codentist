export type KpiTrend = {
  value: string
  direction: 'up' | 'down' | 'flat'
  label: string
}

export type GrossProductionKpi = {
  total: string
  trend: KpiTrend
  breakdown: Array<{
    label: string
    amount: string
    delta: string
    direction: 'up' | 'down'
  }>
  perHourOutput: { amount: string; delta: string; direction: 'up' | 'down' }
}

export type UtilizationKpi = {
  percent: string
  trend: KpiTrend
  rows: Array<{ label: string; value: string; color: 'green' | 'orange' | 'red' | 'blue' }>
}

export type FinancialSummaryKpi = {
  collections: string
  trend: KpiTrend
  rows: Array<{ label: string; value: string; negative?: boolean }>
}

export type NewPatientKpi = {
  count: number
  trend: KpiTrend
  rows: Array<{ label: string; value: number | string }>
}

export const grossProduction: GrossProductionKpi = {
  total: '$127,450',
  trend: { value: '+12.5%', direction: 'up', label: 'vs last month' },
  breakdown: [
    { label: 'Treatment', amount: '$69,215 (70%)', delta: '+2.5%', direction: 'up' },
    { label: 'Hygiene', amount: '$23,345 (30%)', delta: '-5.1%', direction: 'down' },
  ],
  perHourOutput: { amount: '$485', delta: '-2.5%', direction: 'down' },
}

export const utilization: UtilizationKpi = {
  percent: '87.3%',
  trend: { value: '-3.1%', direction: 'down', label: 'vs last month' },
  rows: [
    { label: 'Chair Utilization', value: '90%', color: 'green' },
    { label: 'Provider Idle Time', value: '13%', color: 'orange' },
    { label: 'Cancel/No Show Rate', value: '6.2%', color: 'red' },
  ],
}

export const financialSummary: FinancialSummaryKpi = {
  collections: '$118,920',
  trend: { value: '-8.7%', direction: 'down', label: 'collections' },
  rows: [
    { label: 'Total Collections', value: '$118,920' },
    { label: 'Adjustments', value: '-$3,245', negative: true },
    { label: 'Deposits', value: '$5,860' },
    { label: 'Courtesy Credits', value: '-$1,125', negative: true },
  ],
}

export const newPatient: NewPatientKpi = {
  count: 43,
  trend: { value: '+2.7%', direction: 'up', label: 'vs last month' },
  rows: [
    { label: 'Total patient', value: '2342' },
    { label: 'Active patient', value: '434' },
    { label: 'Active patient exam', value: '234' },
    { label: 'Inactive patient', value: '12' },
  ],
}
