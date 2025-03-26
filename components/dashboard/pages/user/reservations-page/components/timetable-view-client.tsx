"use client"

import { useState, useEffect } from "react"
import { type AppointmentFormData } from "@/src/schemas/appointment.schema"
import { Card } from "@/components/ui/card"
import { Event } from "@/src/lib"
import Calendar from "../../../pro/timetable-page/calendar"
import { DailyAppointments } from "../../../pro/timetable-page/daily-appointments"
import { TimetableHeader } from "../../../pro/timetable-page/timetable-header"
import { Button } from "@/components/ui/button"
import { Dog, Clock, Calendar as CalendarIcon, User2, CheckCircle2, AlertCircle, XCircle, Loader2 } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/src/lib/utils"
import { WeekView } from "./week-view"

interface TimetableViewClientProps {
  appointments: AppointmentFormData[]
}

type EventCategory = "work" | "personal" | "education" | "other" | "hobbies" | "health" | "finance"
type CalendarView = "month" | "week"

const statusConfig: Record<
  AppointmentFormData["status"],
  {
    label: string
    icon: any
    className: string
    badgeVariant: string
    category: EventCategory
  }
> = {
  confirmed: {
    label: "Confirmé",
    icon: CheckCircle2,
    className: "border-primary bg-primary/10 text-primary",
    badgeVariant: "default",
    category: "health",
  },
  pending: {
    label: "En attente",
    icon: Loader2,
    className: "border-orange-500 bg-orange-500/10 text-orange-500 dark:border-orange-400 dark:text-orange-400",
    badgeVariant: "secondary",
    category: "work",
  },
  cancelled: {
    label: "Annulé",
    icon: XCircle,
    className: "border-destructive bg-destructive/10 text-destructive",
    badgeVariant: "destructive",
    category: "personal",
  },
}

// Mise à jour du style des cards des rendez-vous
const AppointmentCard = ({ appointment }: { appointment: AppointmentFormData }) => {
  const StatusIcon = statusConfig[appointment.status].icon

  return (
    <Card
      key={appointment.id}
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "hover:shadow-lg hover:scale-[1.02]",
        "before:content-[''] before:absolute before:inset-0 before:border-l-[3px]",
        "before:transition-colors",
        statusConfig[appointment.status].className
      )}
    >
      <div className="relative p-5">
        {/* En-tête avec statut et heure */}
        <div className="flex items-center justify-between mb-6">
          <Badge
            variant={statusConfig[appointment.status].badgeVariant as any}
            className="gap-1.5 px-3 py-1.5 text-sm font-medium"
          >
            <StatusIcon className="h-4 w-4 animate-pulse" />
            {statusConfig[appointment.status].label}
          </Badge>
          <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
            <Clock className="h-4 w-4" />
            <span className="font-medium">{appointment.time}</span>
          </div>
        </div>

        {/* Informations sur le service */}
        <h3 className="text-xl font-semibold mb-5 text-foreground/90">{appointment.service.name}</h3>

        <div className="space-y-4">
          {/* Informations sur le professionnel */}
          <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 backdrop-blur-sm transition-colors hover:bg-muted/50">
            <Avatar className="h-12 w-12 ring-2 ring-primary/20">
              <AvatarImage src={appointment.professional.avatar} alt={appointment.professional.name} />
              <AvatarFallback className="bg-primary/5">
                <User2 className="h-6 w-6 text-primary" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground/90">{appointment.professional.name}</p>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{appointment.duration} minutes</span>
              </div>
            </div>
          </div>

          {/* Informations sur l'animal */}
          <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 backdrop-blur-sm transition-colors hover:bg-muted/50">
            <Avatar className="h-12 w-12 ring-2 ring-primary/20 bg-primary/5">
              <AvatarFallback>
                <Dog className="h-6 w-6 text-primary" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground/90">{appointment.animal.name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {appointment.animal.species} • {appointment.animal.breed}
              </p>
              {appointment.animal.age && (
                <p className="text-sm text-muted-foreground">
                  {appointment.animal.age} an{appointment.animal.age > 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>

          {/* Notes */}
          {appointment.notes && (
            <div className="p-4 rounded-xl bg-muted/30 backdrop-blur-sm">
              <p className="font-medium text-sm mb-2 text-foreground/80">Notes</p>
              <p className="text-sm text-muted-foreground italic">{appointment.notes}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        {appointment.status === "confirmed" && (
          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
              size="sm"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Annuler le rendez-vous
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}

export function TimetableViewClient({ appointments }: TimetableViewClientProps) {
  const [view, setView] = useState<"calendar" | "list">("calendar")
  const [calendarView, setCalendarView] = useState<CalendarView>("month")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [events, setEvents] = useState<{ [date: string]: Event[] }>({})
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Convertir les rendez-vous en événements pour le calendrier
  useEffect(() => {
    const eventsByDate: { [date: string]: Event[] } = {}
    appointments.forEach(appointment => {
      const dateString = appointment.date.toDateString()
      const event: Event = {
        id: appointment.id,
        title: `${appointment.service.name} avec ${appointment.professional.name}`,
        startTime: `${appointment.date.toISOString().split("T")[0]}T${appointment.time}`,
        endTime: new Date(
          new Date(`${appointment.date.toISOString().split("T")[0]}T${appointment.time}`).getTime() +
            appointment.duration * 60000
        ).toISOString(),
        category: statusConfig[appointment.status].category,
        description: appointment.notes || "",
      }

      if (!eventsByDate[dateString]) {
        eventsByDate[dateString] = []
      }
      eventsByDate[dateString].push(event)
    })
    setEvents(eventsByDate)
  }, [appointments])

  const handleDayClick = (date: Date) => {
    setSelectedDate(date)
    setIsDrawerOpen(true)
  }

  const dailyAppointments = appointments.filter(apt => apt.date.toDateString() === selectedDate.toDateString())

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            {selectedDate.toLocaleString("fr-FR", { month: "long", year: "numeric" })}
          </h2>
          <Button variant="outline" size="sm" className="text-primary">
            Aujourd'hui
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={calendarView === "month" ? "default" : "outline"}
            size="sm"
            className={cn("rounded-full px-4", calendarView === "month" && "bg-primary text-primary-foreground")}
            onClick={() => setCalendarView("month")}
          >
            Mois
          </Button>
          <Button
            variant={calendarView === "week" ? "default" : "outline"}
            size="sm"
            className={cn("rounded-full px-4", calendarView === "week" && "bg-primary text-primary-foreground")}
            onClick={() => setCalendarView("week")}
          >
            Semaine
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full bg-background">
          {calendarView === "month" ? (
            <Calendar
              selectedDate={selectedDate}
              onDayClick={handleDayClick}
              onEventDrop={() => {}}
              events={events}
              className="border-none bg-transparent"
            />
          ) : (
            <WeekView
              selectedDate={selectedDate}
              onDayClick={handleDayClick}
              events={events}
              className="border-none bg-transparent"
            />
          )}
        </div>
      </div>

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Rendez-vous du {selectedDate.toLocaleDateString("fr-FR", { dateStyle: "long" })}
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6">
            {dailyAppointments.length === 0 ? (
              <div className="text-center py-8">
                <Dog className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">Aucun rendez-vous prévu pour cette journée</p>
              </div>
            ) : (
              <div className="space-y-6">
                {dailyAppointments.map(appointment => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
