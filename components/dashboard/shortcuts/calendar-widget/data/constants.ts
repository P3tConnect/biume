export const CALENDAR_VIEW_MODE_KEY = "calendar_view_mode"

export const appointmentColors = {
  consultation: "bg-blue-500 text-white hover:bg-blue-600",
  grooming: "bg-purple-500 text-white hover:bg-purple-600",
  surgery: "bg-red-500 text-white hover:bg-red-600",
  vaccination: "bg-green-500 text-white hover:bg-green-600",
  checkup: "bg-yellow-500 text-white hover:bg-yellow-600",
  emergency: "bg-orange-500 text-white hover:bg-orange-600",
  training: "bg-indigo-500 text-white hover:bg-indigo-600",
  boarding: "bg-pink-500 text-white hover:bg-pink-600",
} as const

export const appointmentLabels = {
  consultation: "Consultation",
  grooming: "Toilettage",
  surgery: "Chirurgie",
  vaccination: "Vaccination",
  checkup: "Contrôle",
  emergency: "Urgence",
  training: "Dressage",
  boarding: "Pension",
} as const

export const statusColors = {
  CONFIRMED: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
  SCHEDULED: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  "PENDING PAYMENT": "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
  PAYED: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  DENIED: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
  CANCELED: "bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400",
  POSTPONED: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
  ONGOING: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  COMPLETED: "bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400",
  CREATED: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  DRAFT: "bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400",
} as const

// Mock data for testing
export const mockAppointments: Record<string, any[]> = {
  [new Date().toDateString()]: [],
}
