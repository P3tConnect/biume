"use client"

import { Service, Member, Pet, Option } from "@/src/db"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Textarea } from "@/components/ui/textarea"
import { CalendarClock, ChevronsRight, User, Sparkles, Home, Building } from "lucide-react"

interface SummaryStepProps {
  selectedService: Service | null
  selectedPro: Member | null
  selectedDate: Date | undefined
  selectedTime: string | null
  selectedPets: Pet[] | null
  isHomeVisit: boolean
  selectedOptions: Option[]
  additionalInfo: string
  onAdditionalInfoChange: (info: string) => void
}

export function SummaryStep({
  selectedService,
  selectedPro,
  selectedDate,
  selectedTime,
  selectedPets,
  isHomeVisit,
  selectedOptions,
  additionalInfo,
  onAdditionalInfoChange,
}: SummaryStepProps) {
  // Calculer le prix total
  const basePrice = selectedService?.price || 0
  const optionsPrice = selectedOptions.reduce((acc, option) => acc + (option.price || 0), 0)
  const homeVisitPrice = isHomeVisit ? 10 : 0
  const totalPrice = basePrice + optionsPrice + homeVisitPrice

  return (
    <div className="space-y-6">
      {/* En-tête avec prix total */}
      <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
        <h3 className="font-medium">Total à payer</h3>
        <span className="text-xl font-semibold text-primary">{totalPrice}€</span>
      </div>

      {/* Récapitulatif */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Service */}
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Service</h4>
            </div>
            <p className="text-sm">{selectedService?.name}</p>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">{selectedService?.duration} min</span>
              <span className="text-sm">{selectedService?.price}€</span>
            </div>
          </div>

          {/* Professionnel */}
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <User className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Professionnel</h4>
            </div>
            <p className="text-sm">{selectedPro?.user.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{selectedPro?.role}</p>
          </div>

          {/* Date et heure */}
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <CalendarClock className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Date et heure</h4>
            </div>
            {selectedDate && selectedTime && (
              <>
                <p className="text-sm">{format(selectedDate, "EEEE d MMMM", { locale: fr })}</p>
                <p className="text-xs text-muted-foreground mt-1">{selectedTime}</p>
              </>
            )}
          </div>

          {/* Type de consultation */}
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              {isHomeVisit ? <Home className="h-4 w-4 text-primary" /> : <Building className="h-4 w-4 text-primary" />}
              <h4 className="text-sm font-medium">Lieu</h4>
            </div>
            <p className="text-sm">{isHomeVisit ? "À domicile" : "Au cabinet"}</p>
            {isHomeVisit && (
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">Déplacement</span>
                <span className="text-sm">+10€</span>
              </div>
            )}
          </div>
        </div>

        {/* Options */}
        {selectedOptions.length > 0 && (
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ChevronsRight className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-medium">Options supplémentaires</h4>
              </div>
              <span className="text-sm">+{optionsPrice}€</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {selectedOptions.map(option => (
                <div key={option.id} className="text-xs">
                  <span>{option.title || "Option"}</span>
                  {option.price > 0 && <span className="ml-1 text-muted-foreground">({option.price}€)</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Informations complémentaires */}
      <div>
        <label htmlFor="additionalInfo" className="block text-sm font-medium mb-1">
          Informations complémentaires (facultatif)
        </label>
        <Textarea
          id="additionalInfo"
          placeholder="Ajouter des informations pour le professionnel..."
          value={additionalInfo}
          onChange={e => onAdditionalInfoChange(e.target.value)}
          className="resize-none h-16 text-sm"
        />
      </div>
    </div>
  )
}
