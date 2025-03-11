"use client"

import { useState, useEffect } from "react"
import { Member, Service } from "@/src/db"
import { cn } from "@/src/lib/utils"
import Avvvatars from "avvvatars-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, Star } from "lucide-react"

interface ProfessionalStepProps {
  professionals: Member[]
  selectedService: Service | null
  selectedPro: Member | null
  onSelectPro: (pro: Member) => void
}

export function ProfessionalStep({ professionals, selectedService, selectedPro, onSelectPro }: ProfessionalStepProps) {
  const [filteredPros, setFilteredPros] = useState<Member[]>(professionals)

  // Filtrer les professionnels en fonction du service sélectionné
  useEffect(() => {
    if (!selectedService) {
      setFilteredPros(professionals)
      return
    }

    // Logique pour filtrer les professionnels qui peuvent fournir le service sélectionné
    // Cette logique dépend de votre modèle de données
    // Pour l'instant, nous allons simplement montrer tous les professionnels
    setFilteredPros(professionals)
  }, [selectedService, professionals])

  return (
    <div className="space-y-6">
      {selectedService ? (
        <>
          <div className="bg-muted/30 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Service sélectionné</h3>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium">{selectedService.name}</span>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{selectedService.duration} min</span>
                </div>
              </div>
              <span className="text-primary font-semibold">{selectedService.price} €</span>
            </div>
          </div>

          <h3 className="font-medium text-lg mb-4">Choisissez votre professionnel</h3>
          <RadioGroup
            defaultValue={selectedPro?.id}
            className="grid grid-cols-1 gap-3"
            onValueChange={value => {
              const pro = professionals.find(p => p.id === value)
              if (pro) onSelectPro(pro)
            }}
          >
            {filteredPros.map(pro => (
              <div key={pro.id} className="relative">
                <RadioGroupItem value={pro.id} id={`pro-${pro.id}`} className="peer sr-only" />
                <Label
                  htmlFor={`pro-${pro.id}`}
                  className={cn(
                    "flex p-4 rounded-xl border-2 cursor-pointer transition-all",
                    "hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  )}
                >
                  <div className="flex gap-4 items-center w-full">
                    <div className="h-12 w-12 rounded-full overflow-hidden shrink-0">
                      <Avvvatars value={pro.user.name || ""} style="shape" size={48} />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">{pro.user.name}</p>
                      <p className="text-sm text-muted-foreground">{pro.role}</p>
                    </div>

                    {/* Indicateurs d'expertise ou de spécialité pourraient être ajoutés ici */}
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400" />
                      <Star className="h-4 w-4 text-amber-400" />
                      <Star className="h-4 w-4 text-amber-400" />
                      <Star className="h-4 w-4 text-amber-400" />
                      <Star className="h-4 w-4 text-amber-400" />
                    </div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </>
      ) : (
        <div className="p-6 text-center bg-muted/30 rounded-lg">
          <Calendar className="h-10 w-10 mx-auto mb-3 text-muted-foreground/80" />
          <h3 className="font-medium mb-2">Veuillez d'abord sélectionner un service</h3>
          <p className="text-sm text-muted-foreground">Les professionnels disponibles dépendent du service choisi</p>
        </div>
      )}
    </div>
  )
}
