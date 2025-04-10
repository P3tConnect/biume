"use client"

import { format, isSameDay, parseISO } from "date-fns"
import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { OrganizationSlots } from "@/src/db"
import { ScrollArea } from "@/components/ui/scroll-area"
import { fr } from "date-fns/locale"

interface AppointmentPickerProps {
  timeSlots: OrganizationSlots[]
  onSelectDateTime?: (date: Date, time: string | null, slot: OrganizationSlots | null) => void
}

export default function AppointmentPicker({ timeSlots = [], onSelectDateTime }: AppointmentPickerProps) {
  const today = new Date()
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [filteredSlots, setFilteredSlots] = useState<OrganizationSlots[]>([])

  // Calculer les dates pour lesquelles nous avons des créneaux et leur disponibilité
  const { daysWithSlots, disabledDays } = useMemo(() => {
    // Grouper les créneaux par date
    const slotsByDate = new Map<string, OrganizationSlots[]>()

    // Enregistrer toutes les dates avec des créneaux
    const daysWithSlots = new Set<string>()

    timeSlots.map(slot => {
      const slotDate = new Date(slot.start)
      const dateKey = format(slotDate, "yyyy-MM-dd")

      // Ajouter cette date à notre ensemble de dates avec créneaux
      daysWithSlots.add(dateKey)

      if (!slotsByDate.has(dateKey)) {
        slotsByDate.set(dateKey, [])
      }

      slotsByDate.get(dateKey)?.push(slot)
    })

    // Trouver les dates où tous les créneaux sont indisponibles
    const unavailableDates: Date[] = []

    slotsByDate.forEach((slots: OrganizationSlots[], dateKey: string) => {
      const allUnavailable = slots.length > 0 && slots.every(slot => !slot.isAvailable)

      if (allUnavailable) {
        unavailableDates.push(parseISO(dateKey))
      }
    })

    return {
      daysWithSlots,
      disabledDays: unavailableDates,
    }
  }, [timeSlots, today])

  // Fonction pour désactiver les dates
  const isDayDisabled = useMemo(() => {
    return (day: Date) => {
      // 1. Désactiver les dates strictement antérieures à aujourd'hui (pas aujourd'hui)
      const isBeforeToday = day < today && !isSameDay(day, today)
      if (isBeforeToday) {
        return true
      }

      const dayKey = format(day, "yyyy-MM-dd")

      // 2. Désactiver les dates sans aucun créneau
      if (!daysWithSlots.has(dayKey)) {
        return true
      }

      // 3. Désactiver les dates où tous les créneaux sont indisponibles
      return disabledDays.some(disabledDay => isSameDay(disabledDay, day))
    }
  }, [today, daysWithSlots, disabledDays])

  useEffect(() => {
    // Filtrer les créneaux pour la date sélectionnée
    const filtered = timeSlots.filter(slot => {
      // Convertir les dates de début et de fin en objets Date
      const startDate = new Date(slot.start)
      return isSameDay(startDate, date!)
    })

    setFilteredSlots(filtered)
  }, [timeSlots, date])

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate)
      setTime(null)
      if (onSelectDateTime) onSelectDateTime(newDate, null, null)
    }
  }

  const handleTimeChange = (timeSlot: string, slot: OrganizationSlots | null) => {
    setTime(timeSlot)
    if (onSelectDateTime) onSelectDateTime(date!, timeSlot, slot)
  }

  // Fonction pour formater l'heure à partir d'une date
  const formatTime = (dateStr: string | Date): string => {
    const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr
    return format(date, "HH'h'mm", { locale: fr })
  }

  const hasSlots = filteredSlots.length > 0

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <div className="flex max-sm:flex-col h-full w-full justify-center items-center">
          <Calendar
            mode="single"
            selected={date ?? undefined}
            onSelect={handleDateChange}
            className="p-3 sm:pe-5 max-w-none"
            disabled={isDayDisabled}
            locale={fr}
          />
          <div className="relative w-full max-sm:h-72 sm:h-[350px] sm:w-64">
            <div className="absolute inset-0 py-4 max-sm:border-t">
              <ScrollArea className="h-full sm:border-s">
                <div className="space-y-3">
                  <div className="flex shrink-0 items-center px-5 justify-center border-b pb-2">
                    <p className="text-base font-medium">{format(date!, "EEEE d MMMM", { locale: fr })}</p>
                  </div>
                  <div className="grid gap-1.5 px-5 max-sm:grid-cols-2 pt-2">
                    {!hasSlots ? (
                      <div className="text-center text-sm text-muted-foreground col-span-2 py-4">
                        Aucun créneau disponible pour cette date
                      </div>
                    ) : (
                      filteredSlots.map((slot, index) => {
                        const timeString = formatTime(slot.start)
                        return (
                          <Button
                            key={index}
                            variant={time === timeString ? "default" : "outline"}
                            size="sm"
                            className="w-full flex items-center justify-between gap-2"
                            onClick={() => handleTimeChange(timeString, slot)}
                          >
                            <span>{timeString}</span>
                            <span
                              className={`
                              px-2 py-0.5 rounded-full text-xs
                              ${slot.remainingPlaces <= 2
                                  ? "bg-red-100 text-red-700"
                                  : slot.remainingPlaces <= 5
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-green-100 text-green-700"
                                }
                            `}
                            >
                              {slot.remainingPlaces} {slot.remainingPlaces > 1 ? "places" : "place"}
                            </span>
                          </Button>
                        )
                      })
                    )}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
