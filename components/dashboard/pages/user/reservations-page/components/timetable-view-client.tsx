"use client"

import { useState } from "react"
import { DropResult } from "react-beautiful-dnd"
import { Event } from "@/src/lib"
import { Card } from "@/components/ui/card"
import { ViewMode } from "@/src/types/view-mode"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppointmentFormData } from "./appointment-form-client"
import { TimetableHeaderClient } from "./timetable-header-client"
import CalendarClient from "./calendar-client"
import { DailyAppointmentsClient } from "./daily-appointments-client"
import { AppointmentFormClient } from "./appointment-form-client"
import SideDrawerClient from "./side-drawer-client"

interface Appointment {
  id: string
  clientName: string
  date: Date
  time: string
  duration: number
  status: "pending" | "confirmed" | "cancelled"
  animal: {
    id: string
    name: string
    species: string
    breed?: string
    age?: number
    weight?: number
  }
  professional: {
    id: string
    name: string
  }
  service: {
    id: string
    name: string
    price: number
  }
  notes?: string
}

interface TimetableViewClientProps {
  appointments: Appointment[]
}

export function TimetableViewClient({ appointments }: TimetableViewClientProps) {
  const [view, setView] = useState<"calendar" | "list">("calendar")
  const [viewMode, setViewMode] = useState<ViewMode>("month")
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

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode)
  }

  const dailyAppointments =
    appointments.length > 0 ? appointments.filter(apt => apt.date.toDateString() === selectedDate.toDateString()) : []

  const selectedDateEvents = events.filter(
    event => new Date(event.startTime).toDateString() === selectedDate.toDateString()
  )

  return (
    <div className="h-full w-full flex flex-col">
      <TimetableHeaderClient
        view={view}
        onViewChange={setView}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />
      <div className="flex-1 overflow-hidden pb-4">
        <div className="h-full grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
          {view === "calendar" ? (
            <Card className="rounded-xl overflow-hidden h-full px-2">
              <div className="h-full">
                <CalendarClient
                  selectedDate={selectedDate}
                  onDayClick={handleDayClick}
                  onEventDrop={handleEventDrop}
                  events={{ [selectedDate.toDateString()]: events }}
                  viewMode={viewMode}
                  onViewModeChange={handleViewModeChange}
                />
              </div>
            </Card>
          ) : (
            <Card className="rounded-xl h-full">
              <div className="p-4">
                <div className="max-w-5xl mx-auto">
                  <DailyAppointmentsClient appointments={dailyAppointments} selectedDate={selectedDate} />
                </div>
              </div>
            </Card>
          )}

          {/* Sidebar */}
          <div className="hidden lg:block h-full">
            <Card className="h-full p-4 rounded-xl">
              <div className="flex flex-col h-full">
                <h2 className="text-xl font-bold mb-4">
                  {selectedDate.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </h2>

                <div className="flex-1 overflow-auto">
                  {selectedDateEvents.length === 0 ? (
                    <div className="text-center p-4">
                      <p className="text-muted-foreground">Aucun rendez-vous prévu</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedDateEvents.map(event => (
                        <div
                          key={event.id}
                          className={`p-3 rounded-lg ${eventColors[event.category]} cursor-pointer`}
                          onClick={() => handleEditEvent(event)}
                        >
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm opacity-90 mt-1">
                            {new Date(event.startTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            -
                            {new Date(event.endTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <AppointmentFormClient
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingAppointment(null)
        }}
        onSubmit={handleAddAppointment}
        initialData={editingAppointment || undefined}
        isEditing={!!editingAppointment}
      />

      <SideDrawerClient
        isOpen={isSideDrawerOpen}
        onClose={() => setIsSideDrawerOpen(false)}
        selectedDate={selectedDate}
        events={selectedDateEvents}
        onAddEvent={handleAddEvent}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
        onSaveEvent={handleEditEvent}
        existingEvents={events}
      />
    </div>
  )
}

const eventColors = {
  work: "bg-blue-500 text-white",
  personal: "bg-green-500 text-white",
  other: "bg-gray-500 text-white",
  education: "bg-yellow-500 text-black",
  hobbies: "bg-purple-500 text-white",
  health: "bg-red-500 text-white",
  finance: "bg-yellow-400 text-black",
}
