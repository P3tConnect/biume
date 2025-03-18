import type { Appointment, Pet } from "@/src/db"
import { appointmentColors, appointmentLabels, statusColors } from "./constants"

// Type pour les services du professionnel
export interface Service {
  id: string
  name: string
  duration: string
  type: "oneToOne" | "multiple"
  price?: number
  description?: string
}

export interface PetAppointment {
  pet: Pet
}

export interface AppointmentDetailsProps {
  appointments: Appointment[]
  onEdit?: (id: string, updatedAppointment: Partial<Appointment>) => void
  onDelete?: (id: string) => void
  services?: Service[]
  isLoadingServices?: boolean
  onViewPetDetails?: (petId: string) => void
}

// Type pour mapper les types d'appointments vers les clés dans appointmentColors et appointmentLabels
export type AppointmentColorKey = keyof typeof appointmentColors
export type AppointmentLabelKey = keyof typeof appointmentLabels
export type StatusColorKey = keyof typeof statusColors

export const appointmentTypeToColorKey: Record<"oneToOne" | "multiple", AppointmentColorKey> = {
  oneToOne: "consultation",
  multiple: "grooming",
}
