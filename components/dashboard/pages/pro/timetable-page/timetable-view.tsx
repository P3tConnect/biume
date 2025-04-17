"use client"

import { AppointmentForm, AppointmentFormData } from "./appointment-form"

import Calendar from "./calendar"
import { Card } from "@/components/ui/card"
import { DailyAppointments } from "./daily-appointments"
import { DropResult } from "react-beautiful-dnd"
import { Event } from "@/src/lib"
import { useState } from "react"

interface Appointment extends AppointmentFormData {
  id: string
}

interface TimetableViewProps {
  appointments: Appointment[]
}

export function TimetableView({ appointments }: TimetableViewProps) {
  const [view, setView] = useState<"calendar" | "list">("calendar")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [editingAppointment, setEditingAppointment] = useState<AppointmentFormData | null>(null)
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false)
  const [events, setEvents] = useState<Event[]>([])

  const handleAddAppointment = (data: AppointmentFormData) => {
    // TODO: Implémenter l'ajout d'un rendez-vous
    console.log("Nouveau rendez-vous:", data)
  }

  const handleEditAppointment = (appointment: AppointmentFormData) => {
    setEditingAppointment(appointment)
    setIsFormOpen(true)
  }

  const handleDeleteAppointment = (appointment: AppointmentFormData) => {
    // TODO: Implémenter la suppression d'un rendez-vous
    console.log("Supprimer le rendez-vous:", appointment)
  }

  const handleEventDrop = (result: DropResult) => {
    // TODO: Implement event drag and drop
    console.log("Event dropped:", result)
  }

  const handleDayClick = (date: Date) => {
    setSelectedDate(date)
    setIsSideDrawerOpen(true)
  }

  const handleAddEvent = (event: Event) => {
    setEvents(prevEvents => [...prevEvents, event])
  }

  const handleEditEvent = (updatedEvent: Event) => {
    setEvents(prevEvents => prevEvents.map(event => (event.id === updatedEvent.id ? updatedEvent : event)))
  }

  const handleDeleteEvent = (eventToDelete: Event) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventToDelete.id))
  }

  const dailyAppointments = appointments.filter(apt => apt.date.toDateString() === selectedDate.toDateString())

  const selectedDateEvents = events.filter(
    event => new Date(event.startTime).toDateString() === selectedDate.toDateString()
  )

  return (
    <div className="h-full w-full flex flex-col">
      {/* <TimetableHeader view={view} onViewChange={setView} onNewAppointment={() => setIsFormOpen(true)} /> */}
      <div className="flex-1 overflow-hidden pb-4">
        {view === "calendar" ? (
          <Card className="rounded-xl overflow-hidden h-full px-2">
            <div className="h-full">
              <Calendar
                selectedDate={selectedDate}
                onDayClick={handleDayClick}
                onEventDrop={handleEventDrop}
                events={{ [selectedDate.toDateString()]: events }}
              />
            </div>
          </Card>
        ) : (
          <Card className="rounded-xl h-full">
            <div className="p-4">
              <div className="max-w-5xl mx-auto">
                <DailyAppointments appointments={dailyAppointments} selectedDate={selectedDate} />
              </div>
            </div>
          </Card>
        )}
      </div>

      <AppointmentForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingAppointment(null)
        }}
        onSubmit={handleAddAppointment}
        initialData={editingAppointment || undefined}
        isEditing={!!editingAppointment}
      />
    </div>
  )
}
