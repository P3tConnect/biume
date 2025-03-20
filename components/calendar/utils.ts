import { Appointment } from "@/src/db/appointments"

// Vérifie si deux rendez-vous sont sur le même créneau
export const areSameTimeSlot = (app1: Appointment, app2: Appointment): boolean => {
  if (!app1.slot?.id || !app2.slot?.id) return false
  return app1.slot.id === app2.slot.id
}

// Groupe les rendez-vous par créneau horaire
export const groupAppointmentsByTimeSlot = (appointments: Appointment[]): Appointment[][] => {
  return appointments.reduce((groups: Appointment[][], appointment) => {
    const existingGroup = groups.find(group => areSameTimeSlot(group[0], appointment))
    if (existingGroup) {
      existingGroup.push(appointment)
    } else {
      groups.push([appointment])
    }
    return groups
  }, [])
}

// Obtient le nombre total d'animaux pour un groupe de rendez-vous
export const getTotalPetsInGroup = (appointments: Appointment[]): number => {
  return appointments.reduce((total, appointment) => {
    return total + (appointment.pets?.length || 0)
  }, 0)
}

// Obtient tous les animaux d'un groupe de rendez-vous
export const getAllPetsInGroup = (appointments: Appointment[]) => {
  return appointments.flatMap(app => app.pets?.map(pa => pa.pet).filter(Boolean) || [])
}
