"use client"

import { cn } from "@/src/lib/utils"
import { Appointment } from "@/src/db/appointments"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { groupAppointmentsByTimeSlot, getTotalPetsInGroup } from "./utils"
import { useEffect, useState } from "react"

interface CalendarCellProps {
  day: number
  isToday: boolean
  isSelected: boolean
  isWeekend: boolean
  appointments: Appointment[]
  onClick: () => void
}

function renderDayAppointments(appointments: Appointment[], maxDisplayedGroups: number) {
  if (appointments.length === 0) return null

  const groupedAppointments = groupAppointmentsByTimeSlot(appointments)
  const displayedGroups = groupedAppointments.slice(0, maxDisplayedGroups)
  const remainingCount = groupedAppointments.length - maxDisplayedGroups

  return (
    <>
      {displayedGroups.map((group, index) => {
        const totalPets = getTotalPetsInGroup(group)
        const mainAppointment = group[0]

        return (
          <div
            key={index}
            className={cn(
              "text-[10px] sm:text-xs truncate rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1",
              group.length > 1
                ? "bg-secondary/10 dark:bg-secondary/30 text-secondary dark:text-secondary-foreground border border-secondary/20 dark:border-secondary/40"
                : "bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100 border border-purple-200 dark:border-purple-800"
            )}
          >
            <div className="flex items-center justify-between gap-1">
              <span className="font-medium">
                {new Date(mainAppointment.slot.start).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[8px] sm:text-[10px] font-medium">
                  {totalPets} {totalPets > 1 ? "patients" : "patient"}
                </span>
              </div>
            </div>
          </div>
        )
      })}
      {remainingCount > 0 && (
        <div className="text-[10px] sm:text-xs font-medium text-muted-foreground mt-0.5 sm:mt-1">
          +{remainingCount} autre{remainingCount > 1 ? "s" : ""}
        </div>
      )}
    </>
  )
}

export function CalendarCell({ day, isToday, isSelected, isWeekend, appointments, onClick }: CalendarCellProps) {
  const [maxDisplayedGroups, setMaxDisplayedGroups] = useState(2)

  // Ajuster le nombre d'événements affichés en fonction de la hauteur de la fenêtre
  useEffect(() => {
    const updateMaxDisplayedGroups = () => {
      const windowHeight = window.innerHeight
      if (windowHeight < 768) {
        setMaxDisplayedGroups(1)
      } else if (windowHeight < 1024) {
        setMaxDisplayedGroups(2)
      } else {
        setMaxDisplayedGroups(3)
      }
    }

    updateMaxDisplayedGroups()
    window.addEventListener("resize", updateMaxDisplayedGroups)
    return () => window.removeEventListener("resize", updateMaxDisplayedGroups)
  }, [])

  if (day === 0) {
    return <div className="invisible" />
  }

  return (
    <div
      className={cn(
        "relative flex flex-col p-1 sm:p-2 transition-all duration-200",
        "h-[120px] sm:h-[130px]", // Hauteur fixe pour toutes les cellules
        "rounded-lg sm:rounded-xl border border-border/60 hover:border-border",
        "dark:border-gray-700 dark:hover:border-gray-600",
        isToday && "bg-primary/5 ring-2 ring-primary border-primary/50",
        isSelected && "bg-secondary/5 ring-2 ring-secondary border-secondary/50",
        isWeekend && "bg-muted/80 border-muted/80 dark:bg-muted/60 dark:border-muted/60",
        "group cursor-pointer"
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "text-xs sm:text-sm font-medium",
          "group-hover:text-secondary",
          isToday && "text-primary",
          isSelected && "text-secondary",
          isWeekend && "text-foreground/70"
        )}
      >
        {day}
      </div>
      <div className="mt-0.5 sm:mt-1 space-y-0.5 sm:space-y-1 overflow-y-auto scrollbar-none">
        {renderDayAppointments(appointments, maxDisplayedGroups)}
      </div>
    </div>
  )
}
