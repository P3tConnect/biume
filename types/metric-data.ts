export interface MetricData {
  currentMonth: {
    appointments: number
    newPatients: number
    treatments: number
    satisfaction: number
  }
  previousMonth: {
    appointments: number
    newPatients: number
    treatments: number
    satisfaction: number
  }
  currentMonthLabel: string
  previousMonthLabel: string
  // Arrays for chart data
  appointmentsData: { month: string; value: number }[]
  newPatientsData: { month: string; value: number }[]
  treatmentsData: { month: string; value: number }[]
  satisfactionData: { month: string; value: number }[]
}
