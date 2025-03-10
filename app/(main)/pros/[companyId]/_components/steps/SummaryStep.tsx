import Avvvatars from "avvvatars-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { motion } from "framer-motion"
import { Bird, Cat, CreditCard, Dog, Home, PawPrint, Star, Wallet } from "lucide-react"
import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage, Label, Separator, Textarea } from "@/components/ui"
import { Member, OrganizationSlots, Pet, Service } from "@/src/db"

import { Option } from "./OptionsStep"

interface SummaryStepProps {
  selectedPet: Pet | undefined
  selectedService: Service | null
  selectedPro: Member | null
  selectedSlot: OrganizationSlots | null
  isHomeVisit: boolean
  additionalInfo: string
  onAdditionalInfoChange: (value: string) => void
  selectedOptions: Option[]
  paymentMethod: "online" | "inPerson" | null
}

export function SummaryStep({
  selectedPet,
  selectedService,
  selectedPro,
  selectedSlot,
  isHomeVisit,
  additionalInfo,
  onAdditionalInfoChange,
  selectedOptions,
  paymentMethod,
}: SummaryStepProps) {
  const getPetIcon = (type: string) => {
    switch (type) {
      case "Dog":
        return <Dog className="h-5 w-5" />
      case "Cat":
        return <Cat className="h-5 w-5" />
      case "Bird":
        return <Bird className="h-5 w-5" />
      default:
        return <PawPrint className="h-5 w-5" />
    }
  }

  // Calculer le prix total en incluant les options
  const calculateTotalPrice = () => {
    const basePrice = parseInt(selectedService?.price?.toString() || "0")
    const homeVisitFee = isHomeVisit ? 10 : 0
    const optionsPrice = selectedOptions.reduce((total, option) => total + option.price, 0)

    return basePrice + homeVisitFee + optionsPrice
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="rounded-xl border bg-muted/50 p-4 space-y-3">
        <div className="flex items-center gap-3">
          {selectedPet?.image ? (
            <div className="relative h-16 w-16 overflow-hidden rounded-lg shrink-0">
              <Image
                width={64}
                height={64}
                src={selectedPet.image}
                alt="Animal"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted shrink-0">
              <PawPrint className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
          <div className="min-w-0">
            <h4 className="font-medium truncate">{selectedPet?.name}</h4>
            <div className="flex items-center gap-1 text-muted-foreground">
              {getPetIcon(selectedPet?.type || "")}
              <span className="truncate">{selectedPet?.type}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between items-center gap-2">
            <span className="text-muted-foreground text-sm shrink-0">Service</span>
            <span className="font-medium text-sm text-right truncate">{selectedService?.name}</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-muted-foreground text-sm shrink-0">Professionnel</span>
            <div className="flex items-center gap-2 min-w-0 justify-end">
              {selectedPro?.user.image ? (
                <Avatar className="h-5 w-5 shrink-0">
                  <AvatarImage src={selectedPro.user.image} />
                  <AvatarFallback>
                    {selectedPro.user.name
                      .split(" ")
                      .map(n => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-5 w-5 rounded-full overflow-hidden shrink-0">
                  <Avvvatars value={selectedPro?.user.name || ""} style="shape" size={20} />
                </div>
              )}
              <span className="font-medium text-sm truncate">{selectedPro?.user.name}</span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-muted-foreground text-sm shrink-0">Date et heure</span>
            <span className="font-medium text-sm text-right truncate">
              {selectedSlot
                ? `${format(selectedSlot.start, "d MMM yyyy", {
                    locale: fr,
                  })} à ${format(selectedSlot.start, "HH:mm", {
                    locale: fr,
                  })}`
                : "Non spécifié"}
            </span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-muted-foreground text-sm shrink-0">Type</span>
            <div className="flex items-center gap-2 justify-end">
              {isHomeVisit ? (
                <>
                  <Home className="h-4 w-4 shrink-0" />
                  <span className="font-medium text-sm">À domicile</span>
                </>
              ) : (
                <>
                  <Star className="h-4 w-4 shrink-0" />
                  <span className="font-medium text-sm">Au cabinet</span>
                </>
              )}
            </div>
          </div>

          {/* Afficher les options sélectionnées */}
          {selectedOptions.length > 0 && (
            <>
              <Separator />
              <div>
                <span className="text-muted-foreground text-sm">Options</span>
                <div className="mt-2 space-y-2">
                  {selectedOptions.map(option => (
                    <div key={option.id} className="flex justify-between items-center">
                      <span className="text-xs truncate max-w-[70%]">{option.name}</span>
                      <span className="font-medium text-xs shrink-0">+{option.price}€</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />
          <div className="flex justify-between items-center gap-2">
            <span className="text-muted-foreground text-sm shrink-0">Prix total</span>
            <div className="flex items-center">
              <span className="text-lg font-semibold">{calculateTotalPrice()}€</span>
            </div>
          </div>

          {/* Méthode de paiement */}
          <Separator />
          <div className="flex justify-between items-center gap-2">
            <span className="text-muted-foreground text-sm shrink-0">Paiement</span>
            <div className="flex items-center gap-2 justify-end">
              {paymentMethod === "online" ? (
                <>
                  <CreditCard className="h-4 w-4 shrink-0" />
                  <span className="font-medium text-sm">En ligne</span>
                </>
              ) : paymentMethod === "inPerson" ? (
                <>
                  <Wallet className="h-4 w-4 shrink-0" />
                  <span className="font-medium text-sm">Sur place</span>
                </>
              ) : (
                <span className="font-medium text-sm">Non spécifié</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm">Informations complémentaires</Label>
        <Textarea
          placeholder="Ajoutez des informations utiles pour le professionnel..."
          value={additionalInfo}
          onChange={e => onAdditionalInfoChange(e.target.value)}
          className="min-h-[80px] resize-none text-sm"
        />
      </div>
    </motion.div>
  )
}
