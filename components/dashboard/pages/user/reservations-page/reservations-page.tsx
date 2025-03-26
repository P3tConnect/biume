"use client"

import { Suspense } from "react"
import { TimetableViewClient } from "./components/timetable-view-client"

// Données temporaires pour la démonstration
const mockAppointments = [
  {
    id: "1",
    clientName: "Jean Dupont",
    date: new Date(),
    time: "09:00",
    duration: 30,
    status: "confirmed" as const,
    notes: "Premier rendez-vous",
    animal: {
      id: "a1",
      name: "Rex",
      species: "chien",
      breed: "Labrador",
      age: 5,
      weight: 25,
    },
    professional: {
      id: "p1",
      name: "Dr. Martin",
      specialty: "Vétérinaire",
    },
    service: {
      id: "s1",
      name: "Consultation standard",
      duration: 30,
      price: 50,
    },
  },
  {
    id: "2",
    clientName: "Marie Martin",
    date: new Date(),
    time: "10:30",
    duration: 45,
    status: "pending" as const,
    animal: {
      id: "a2",
      name: "Minou",
      species: "chat",
    },
    professional: {
      id: "p1",
      name: "Dr. Martin",
      specialty: "Vétérinaire",
    },
    service: {
      id: "s2",
      name: "Vaccination",
      duration: 45,
      price: 75,
    },
  },
  {
    id: "3",
    clientName: "Pierre Durand",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: "14:00",
    duration: 60,
    status: "confirmed" as const,
    animal: {
      id: "a3",
      name: "Luna",
      species: "chat",
      breed: "Persan",
      age: 3,
      weight: 4,
    },
    professional: {
      id: "p2",
      name: "Dr. Bernard",
      specialty: "Vétérinaire",
    },
    service: {
      id: "s3",
      name: "Consultation approfondie",
      duration: 60,
      price: 90,
    },
  },
]

const ClientDashboardReservationsComponent = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <Suspense fallback={<div>Chargement...</div>}>
        <TimetableViewClient appointments={mockAppointments} />
      </Suspense>
    </div>
  )
}

export default ClientDashboardReservationsComponent
