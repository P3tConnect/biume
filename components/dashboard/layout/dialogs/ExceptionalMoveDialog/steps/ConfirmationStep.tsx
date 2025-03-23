"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Check, MapPin, CalendarRange, Clock, Navigation } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { ExceptionalMoveFormValues } from "../types"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export const ConfirmationStep = () => {
  const { getValues } = useFormContext<ExceptionalMoveFormValues>()
  const values = getValues()

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Navigation className="h-4 w-4 text-primary" />
            <h3 className="font-medium">Zone de déplacement</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Ville centrale : {values.city}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Navigation className="h-4 w-4 text-muted-foreground" />
              <span>Rayon d'action : {values.radius} km</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarRange className="h-4 w-4 text-primary" />
            <h3 className="font-medium">Période de disponibilité</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CalendarRange className="h-4 w-4 text-muted-foreground" />
              <span>
                Du {format(values.startDate, "d MMMM yyyy", { locale: fr })} au{" "}
                {format(values.endDate, "d MMMM yyyy", { locale: fr })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>
                De {values.startTime} à {values.endTime}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Check className="h-4 w-4 text-primary" />
            <h3 className="font-medium">Détails</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Adresse : {values.address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-muted-foreground" />
              <span>Raison : {values.reason}</span>
            </div>
            {values.notes && (
              <div className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>Notes : {values.notes}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
