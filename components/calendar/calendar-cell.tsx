"use client"

import { cn } from "@/src/lib/utils"
import { Appointment } from "@/src/db/appointments"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { groupAppointmentsByTimeSlot, getTotalPetsInGroup } from "./utils"

interface CalendarCellProps {
  day: number
  isToday: boolean
  isSelected: boolean
  isWeekend: boolean
  appointments: Appointment[]
  onClick: () => void
}

function renderDayAppointments(appointments: Appointment[]) {
  if (appointments.length === 0) return null

  const groupedAppointments = groupAppointmentsByTimeSlot(appointments)
  const displayedGroups = groupedAppointments.slice(0, 2)
  const remainingCount = groupedAppointments.length - 2

  return (
    <>
      {displayedGroups.map((group, index) => {
        const totalPets = getTotalPetsInGroup(group)
        const mainAppointment = group[0]

        return (
          <div
            key={index}
            className={cn(
              "text-xs truncate rounded-lg px-2 py-1",
              group.length > 1
                ? "bg-secondary/10 dark:bg-secondary/30 text-secondary dark:text-secondary-foreground border border-secondary/20 dark:border-secondary/40"
                : "bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100 border border-purple-200 dark:border-purple-800"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <span className="font-medium">
                  {new Date(mainAppointment.slot.start).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {group.length > 1 && <span className="text-[10px] font-medium">({group.length})</span>}
              </div>
              <div className="flex -space-x-2">
                {group
                  .flatMap(
                    appointment =>
                      appointment.pets?.map((pet, petIndex) => (
                        <Avatar
                          key={`${appointment.id}-${petIndex}`}
                          className={cn(
                            "h-5 w-5 border",
                            group.length > 1
                              ? "border-secondary/20 dark:border-secondary/40"
                              : "border-purple-200 dark:border-purple-800"
                          )}
                        >
                          {pet.pet.image ? (
                            <AvatarImage src={pet.pet.image} alt={pet.pet.name} />
                          ) : (
                            <AvatarFallback
                              className={cn(
                                "text-[10px]",
                                group.length > 1
                                  ? "bg-secondary/10 dark:bg-secondary/30 text-secondary dark:text-secondary-foreground"
                                  : "bg-purple-200 dark:bg-purple-900/50 text-purple-900 dark:text-purple-100"
                              )}
                            >
                              {pet.pet.name.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      )) || []
                  )
                  .slice(0, 3)}
                {totalPets > 3 && (
                  <div
                    className={cn(
                      "h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-medium border",
                      group.length > 1
                        ? "bg-secondary/10 dark:bg-secondary/30 text-secondary border-secondary/20 dark:border-secondary/40"
                        : "bg-purple-200 dark:bg-purple-900/50 text-purple-900 border-purple-200 dark:border-purple-800"
                    )}
                  >
                    +{totalPets - 3}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
      {remainingCount > 0 && (
        <div className="text-xs font-medium text-muted-foreground mt-1">
          +{remainingCount} autre{remainingCount > 1 ? "s" : ""}
        </div>
      )}
    </>
  )
}

export function CalendarCell({ day, isToday, isSelected, isWeekend, appointments, onClick }: CalendarCellProps) {
  if (day === 0) {
    return <div className="invisible" />
  }

  return (
    <div
      className={cn(
        "relative flex flex-col p-2 transition-all duration-200 h-full",
        "rounded-xl border border-border/60 hover:border-border",
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
          "text-sm font-medium",
          "group-hover:text-secondary",
          isToday && "text-primary",
          isSelected && "text-secondary",
          isWeekend && "text-foreground/70"
        )}
      >
        {day}
      </div>
      <div className="mt-1 space-y-1">{renderDayAppointments(appointments)}</div>
    </div>
  )
}
