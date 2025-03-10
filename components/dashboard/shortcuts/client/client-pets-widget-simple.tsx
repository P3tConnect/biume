"use client"

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui"
import { Calendar, ChevronRight, PawPrint, Plus, Weight } from "lucide-react"

import Image from "next/image"
import { cn } from "@/src/lib"
import { getPets } from "@/src/actions"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useSession } from "@/src/lib/auth-client"
import { useState } from "react"

const getAge = (birthDate: string) => {
  const today = new Date()
  const birth = new Date(birthDate)
  const monthDiff = today.getMonth() - birth.getMonth()
  let age = today.getFullYear() - birth.getFullYear()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

const ClientPetsWidgetSimple = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const userId = session?.user?.id

  // Utilisation de useQuery pour récupérer les animaux dynamiquement
  const { data: petsData, isLoading } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const result = await getPets({})
      return result.data
    },
    enabled: !!userId,
  })

  const [selectedPet, setSelectedPet] = useState<any>(null)

  return (
    <>
      <Card className="rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2">
            <PawPrint className="size-5" />
            Mes animaux
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-lg"
              onClick={() => router.push(`/dashboard/user/${userId}/pets/new`)}
            >
              <Plus className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-lg"
              onClick={() => router.push(`/dashboard/user/${userId}/pets`)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-2 gap-2 h-[160px]">
              {[1, 2].map(i => (
                <div key={i} className="relative overflow-hidden rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : petsData && petsData.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {petsData.map(pet => (
                <div
                  key={pet.id}
                  className="group relative overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setSelectedPet(pet)}
                >
                  <div className="relative aspect-square">
                    {pet.image ? (
                      <Image fill src={pet.image} alt={pet.name} className="object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-muted">
                        <PawPrint className="h-8 w-8 text-muted-foreground/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white truncate">{pet.name}</span>
                        <div
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold bg-white/90",
                            pet.gender === "Female" ? "text-pink-500" : "text-blue-500"
                          )}
                        >
                          {pet.gender === "Female" ? "♀" : "♂"}
                        </div>
                      </div>
                      <Badge variant="secondary" className="mt-1 bg-white/10 text-white text-xs">
                        {pet.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[160px]">
              <PawPrint className="h-12 w-12 text-muted-foreground/20 mb-2" />
              <p className="text-sm text-muted-foreground">Aucun animal enregistré</p>
              <Button
                variant="link"
                size="sm"
                onClick={() => router.push(`/dashboard/user/${userId}/pets/new`)}
                className="mt-2"
              >
                Ajouter un animal
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet open={!!selectedPet} onOpenChange={() => setSelectedPet(null)}>
        <SheetContent className="overflow-y-auto">
          {selectedPet && (
            <>
              <SheetHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-2xl font-bold">{selectedPet.name}</SheetTitle>
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold",
                      selectedPet.gender === "Female" ? "bg-pink-100 text-pink-500" : "bg-blue-100 text-blue-500"
                    )}
                  >
                    {selectedPet.gender === "Female" ? "♀" : "♂"}
                  </div>
                </div>
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  {selectedPet.image ? (
                    <Image fill src={selectedPet.image} alt={selectedPet.name} className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-muted">
                      <PawPrint className="h-16 w-16 text-muted-foreground/20" />
                    </div>
                  )}
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-sm">
                      {selectedPet.type}
                    </Badge>
                    {selectedPet.breed && <span className="text-sm text-muted-foreground">{selectedPet.breed}</span>}
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    {selectedPet.birthDate && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Âge</span>
                        </div>
                        <p className="text-lg font-medium">{getAge(selectedPet.birthDate)} ans</p>
                      </div>
                    )}
                    {selectedPet.weight && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Weight className="h-4 w-4" />
                          <span>Poids</span>
                        </div>
                        <p className="text-lg font-medium">{selectedPet.weight} kg</p>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button onClick={() => router.push(`/dashboard/user/${userId}/pets/${selectedPet.id}`)}>
                    Voir tous les détails
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}

export default ClientPetsWidgetSimple
