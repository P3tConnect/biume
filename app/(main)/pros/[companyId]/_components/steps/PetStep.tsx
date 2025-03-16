"use client"

import { Pet, Service } from "@/src/db"
import { cn } from "@/src/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus, Dog, Cat, PawPrint } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { getPets } from "@/src/actions"

interface PetStepProps {
  selectedPets: Pet[] | null
  onSelectPets: (pets: Pet[]) => void
  selectedService: Service | null
}

export function PetStep({ selectedPets, onSelectPets, selectedService }: PetStepProps) {
  // Récupération des animaux de l'utilisateur
  const { data: userPets, isLoading } = useQuery({
    queryKey: ["user-pets"],
    queryFn: () => getPets({}),
  })

  // Gestion de la sélection des animaux
  const handlePetSelection = (pet: Pet) => {
    if (!selectedService) return

    if (selectedService.type === "MULTIPLE") {
      // Pour les services de groupe, permettre la sélection multiple
      const isSelected = selectedPets?.some(p => p.id === pet.id)
      if (isSelected) {
        onSelectPets((selectedPets || []).filter(p => p.id !== pet.id))
      } else {
        onSelectPets([...(selectedPets || []), pet])
      }
    } else {
      // Pour les services individuels, permettre uniquement la sélection d'un animal
      onSelectPets([pet])
    }
  }

  // Obtenir l'icône appropriée en fonction du type d'animal
  const getPetIcon = (type?: string) => {
    switch (type?.toLowerCase()) {
      case "dog":
        return <Dog className="h-4 w-4" />
      case "cat":
        return <Cat className="h-4 w-4" />
      default:
        return <PawPrint className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium text-lg">Sélectionnez {selectedService?.type === "MULTIPLE" ? "un ou plusieurs animaux" : "un animal"} pour ce rendez-vous</h3>
        {selectedService?.type === "MULTIPLE" && (
          <p className="text-sm text-muted-foreground">Ce service permet d'accueillir plusieurs animaux en même temps.</p>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(userPets?.data || []).map(pet => (
            <Card
              key={pet.id}
              className={cn(
                "cursor-pointer transition-all hover:border-primary/50",
                selectedPets?.some(p => p.id === pet.id) ? "border-2 border-primary bg-primary/5" : ""
              )}
              onClick={() => handlePetSelection(pet)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  {pet.image ? (
                    <AvatarImage src={pet.image} alt={pet.name} />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {pet.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{pet.name}</h4>
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      {getPetIcon(pet.type)}
                      {pet.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {pet.breed || ""}
                    {pet.weight ? `, ${pet.weight} kg` : ""}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="cursor-pointer hover:border-primary/50 border-dashed">
            <CardContent className="p-4 flex flex-col items-center justify-center gap-2 text-muted-foreground h-full">
              <div className="rounded-full bg-primary/10 p-2">
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium">Ajouter un animal</span>
            </CardContent>
          </Card>
        </div>
      )}

      {(userPets?.data?.length === 0 || !userPets?.data) && !isLoading && (
        <div className="text-center p-6 border rounded-lg">
          <p className="text-muted-foreground mb-4">Vous n'avez pas encore ajouté d'animaux</p>
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter mon premier animal
          </Button>
        </div>
      )}
    </div>
  )
}
