import { Appointment, OrganizationSlots, Service } from "@/src/db"

export interface AppointmentWithRelations extends Appointment {
  slot: OrganizationSlots & {
    start: Date
    end: Date
    remainingPlaces: number
  }
  service: Service & {
    places: number
  }
  pets: Array<{
    pet: {
      id: string
      name: string
      image: string | null
    }
  }>
}

export interface AppointmentGroup {
  slot: {
    id: string
    start: Date
    end: Date
    remainingPlaces: number
  }
  appointments: AppointmentWithRelations[]
}
