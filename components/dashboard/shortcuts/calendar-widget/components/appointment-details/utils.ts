import type { Appointment } from "@/src/db"
import { AppointmentColorKey, appointmentTypeToColorKey } from "./types"

// Fonction utilitaire pour vérifier si deux rendez-vous sont sur le même créneau
export const areSameTimeSlot = (app1: Appointment, app2: Appointment): boolean => {
  if (!app1.slot?.id || !app2.slot?.id) return false
  return app1.slot.id === app2.slot.id
}

// Fonction pour grouper les rendez-vous par créneau horaire
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

// Obtenir la clé de couleur correspondante au type d'appointment
export const getColorKey = (type: "oneToOne" | "multiple"): AppointmentColorKey => {
  return appointmentTypeToColorKey[type] || "consultation"
}

// Détermine les initiales pour l'avatar
export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}
