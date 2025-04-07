"use client"

import { useState } from "react"
import { Service, Member, OrganizationSlots } from "@/src/db"
import { cn } from "@/src/lib/utils"
import AppointmentPicker from "@/components/ui/appointment-picker"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useQuery } from "@tanstack/react-query"
import { getOrganizationSlotsByService } from "@/src/actions/organizationSlots.action"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar, Home, Building, Clock, Check } from "lucide-react"

interface DateStepProps {
  selectedService: Service | null
  selectedPro: Member | null
  selectedDate: Date | undefined
  selectedTime: string | null
  selectedSlot: OrganizationSlots | null
  isHomeVisit: boolean
  onSelectDateTime: (date: Date, time: string | null, slot: OrganizationSlots | null) => void
  onToggleHomeVisit: (isHomeVisit: boolean) => void
}

export function DateStep({
  selectedService,
  selectedPro,
  selectedDate,
  selectedTime,
  selectedSlot,
  isHomeVisit,
  onSelectDateTime,
  onToggleHomeVisit,
}: DateStepProps) {
  // Récupération des slots d'organisation
  const { data: organizationSlots, isLoading: isLoadingSlots } = useQuery({
    queryKey: ["organization-slots", selectedService?.id],
    queryFn: async () => {
      if (!selectedService?.id) return { data: [] }
      return getOrganizationSlotsByService({
        serviceId: selectedService.id,
      })
    },
    enabled: !!selectedService?.id,
  })

  return (
    <div className="space-y-4">
      {/* Section inférieure: Calendrier et créneau sélectionné */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Calendrier */}
        <div className="md:col-span-2">
          {isLoadingSlots ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="max-h-[360px] overflow-auto rounded-lg border">
              <AppointmentPicker timeSlots={organizationSlots?.data ?? []} onSelectDateTime={onSelectDateTime} />
            </div>
          )}
        </div>

        {/* Créneau sélectionné */}
        <div className="md:col-span-1 flex flex-col">
          <div className="font-medium text-sm mb-2">Créneau sélectionné</div>

          {selectedDate && selectedTime ? (
            <Card className="bg-primary/5 border-primary/20 h-full">
              <CardContent className="p-3 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{format(selectedDate, "EEEE d MMMM", { locale: fr })}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{selectedTime}</span>
                  </div>

                  {isHomeVisit && (
                    <div className="flex items-center gap-2 mt-2">
                      <Home className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Supplément de 10€</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center text-primary text-sm gap-1 mt-4">
                  <Check className="h-4 w-4" />
                  <span>Créneau disponible</span>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-muted/30 border-dashed h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Calendar className="h-8 w-8 mb-2 opacity-40" />
                <p className="text-sm">Sélectionnez une date et un horaire</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
