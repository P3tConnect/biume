"use client"

import { Service, Member, Pet, Option } from "@/src/db"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Textarea } from "@/components/ui/textarea"
import { CalendarClock, User, Sparkles, Home, Building, CheckCircle2, Clock, PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

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
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Résumé du rendez-vous</h2>
      </div>
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Service */}
        <div className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
          <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium">Service</h3>
            <p className="text-base font-medium">{selectedService?.name}</p>
            <div className="flex items-center gap-2 mt-0.5 text-muted-foreground text-xs">
              <Clock className="h-3 w-3" />
              <span>{selectedService?.duration} min</span>
              <span className="font-medium text-foreground ml-1">{selectedService?.price}€</span>
            </div>
          </div>
        </div>

        {/* Professionnel */}
        <div className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
          <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium">Professionnel</h3>
            <p className="text-base font-medium">{selectedPro?.user.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{selectedPro?.role}</p>
          </div>
        </div>

        {/* Date et heure */}
        <div className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
          <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
            <CalendarClock className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium">Date et heure</h3>
            {selectedDate && selectedTime ? (
              <>
                <p className="text-base font-medium capitalize">
                  {format(selectedDate, "EEEE d MMMM", { locale: fr })}
                </p>
                <p className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded inline-block mt-0.5">
                  {selectedTime}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Non sélectionné</p>
            )}
          </div>
        </div>

        {/* Lieu */}
        <div className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
          <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
            {isHomeVisit ? <Home className="h-4 w-4 text-primary" /> : <Building className="h-4 w-4 text-primary" />}
          </div>
          <div>
            <h3 className="text-sm font-medium">Lieu</h3>
            <p className="text-base font-medium">{selectedService?.atHome ? "À domicile" : "Au cabinet"}</p>
            {isHomeVisit && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Déplacement <span className="font-medium text-foreground">+10€</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Options et animaux en ligne (ou stack en mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
        {/* Options */}
        <div className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
          <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
            <PlusCircle className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">Options</h3>
              {optionsPrice > 0 && <span className="text-xs font-medium text-primary">+{optionsPrice}€</span>}
            </div>
            {selectedOptions.length > 0 ? (
              <div className="mt-1 space-y-0.5">
                {selectedOptions.map(option => (
                  <div key={option.id} className="flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                    <span>{option.title || "Option"}</span>
                    {option.price > 0 && <span className="text-xs text-muted-foreground">({option.price}€)</span>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Aucune option sélectionnée</p>
            )}
          </div>
        </div>

        {/* Animaux */}
        <div className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
          <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
            <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.5 8C10.5 9.38071 9.38071 10.5 8 10.5C6.61929 10.5 5.5 9.38071 5.5 8C5.5 6.61929 6.61929 5.5 8 5.5C9.38071 5.5 10.5 6.61929 10.5 8Z"
                fill="currentColor"
              />
              <path
                d="M18.5 8C18.5 9.38071 17.3807 10.5 16 10.5C14.6193 10.5 13.5 9.38071 13.5 8C13.5 6.61929 14.6193 5.5 16 5.5C17.3807 5.5 18.5 6.61929 18.5 8Z"
                fill="currentColor"
              />
              <path
                d="M10.5 16C10.5 17.3807 9.38071 18.5 8 18.5C6.61929 18.5 5.5 17.3807 5.5 16C5.5 14.6193 6.61929 13.5 8 13.5C9.38071 13.5 10.5 14.6193 10.5 16Z"
                fill="currentColor"
              />
              <path
                d="M18.5 16C18.5 17.3807 17.3807 18.5 16 18.5C14.6193 18.5 13.5 17.3807 13.5 16C13.5 14.6193 14.6193 13.5 16 13.5C17.3807 13.5 18.5 14.6193 18.5 16Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium">Animaux concernés</h3>
            {selectedPets && selectedPets.length > 0 ? (
              <div className="mt-1 space-y-0.5">
                {selectedPets.map(pet => (
                  <div key={pet.id} className="flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                    <span>{pet.name}</span>
                    <span className="text-xs text-muted-foreground">{pet.type || "Animal"}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Aucun animal sélectionné</p>
            )}
          </div>
        </div>
      </div>

      {/* Informations complémentaires */}
      <div className="mt-2">
        <label htmlFor="additionalInfo" className="block text-sm font-medium mb-1">
          Informations complémentaires
        </label>
        <Textarea
          id="additionalInfo"
          placeholder="Ajouter des informations pour le professionnel..."
          value={additionalInfo}
          onChange={e => onAdditionalInfoChange(e.target.value)}
          className="resize-none text-sm h-16 w-full"
        />
      </div>

      {/* Total à payer */}
      <div className="bg-primary/5 p-3 rounded-md mt-3">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Total à payer</h3>
            <p className="text-xs text-muted-foreground">Montant à régler lors du rendez-vous</p>
          </div>
          <div className="text-xl font-bold text-primary">{totalPrice}€</div>
        </div>
      </div>
    </div>
  )
}
