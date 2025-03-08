"use client"

import {
  CheckCircleIcon,
  ChevronRightIcon,
  Clock3Icon,
  EyeIcon,
  PawPrintIcon,
  StethoscopeIcon,
  UserIcon,
} from "lucide-react"
import React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"

const ObservationsWidget = () => {
  const [selectedObservation, setSelectedObservation] = React.useState<(typeof observations)[0] | null>(null)

  // Exemple de données (à remplacer par vos vraies données)
  const observations = [
    {
      id: 1,
      petName: "Bella",
      petType: "Chien",
      breed: "Labrador",
      ownerName: "Sophie Martin",
      symptoms: "Léthargie, perte d'appétit",
      dateReported: "2024-03-18",
      timeReported: "14:30",
      status: "urgent",
      notes:
        "Le patient montre des signes de déshydratation et de fatigue importante. Propriétaire inquiet car le comportement a changé brusquement depuis hier soir.",
      imageUrl: "/pets/dog1.jpg",
    },
    {
      id: 2,
      petName: "Felix",
      petType: "Chat",
      breed: "Persan",
      ownerName: "Jean Dubois",
      symptoms: "Problèmes respiratoires",
      dateReported: "2024-03-19",
      timeReported: "10:15",
      status: "pending",
      notes:
        "Respiration rapide et difficile observée. Propriétaire a remarqué que le chat évite de s'allonger et reste en position assise.",
      imageUrl: "/pets/cat1.jpg",
    },
    {
      id: 3,
      petName: "Max",
      petType: "Chien",
      breed: "Golden Retriever",
      ownerName: "Marie Lambert",
      symptoms: "Boiterie patte arrière",
      dateReported: "2024-03-19",
      timeReported: "16:45",
      status: "pending",
      notes:
        "Le patient évite de poser la patte arrière droite. Pas de gonflement visible mais douleur à la palpation selon la propriétaire.",
      imageUrl: "/pets/dog2.jpg",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent":
        return "text-red-500 bg-red-100 dark:bg-red-900/30"
      case "pending":
        return "text-amber-500 bg-amber-100 dark:bg-amber-900/30"
      default:
        return "text-green-500 bg-green-100 dark:bg-green-900/30"
    }
  }

  return (
    <Card className="border rounded-lg shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-md">
              <EyeIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <CardTitle className="text-base">Observations récentes</CardTitle>
          </div>
          <Badge variant="secondary" className="px-2 py-0.5">
            {observations.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <ScrollArea className="h-[280px] pr-4">
          <div className="space-y-2">
            {observations.map(observation => (
              <Sheet key={observation.id}>
                <SheetTrigger asChild>
                  <div
                    className="flex items-center justify-between p-3 bg-muted/50 border border-muted hover:border-muted hover:bg-muted transition-colors rounded-md cursor-pointer"
                    onClick={() => setSelectedObservation(observation)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border-2 border-background">
                        <AvatarImage src={observation.imageUrl} alt={observation.petName} />
                        <AvatarFallback className="bg-indigo-600">
                          <PawPrintIcon className="w-4 h-4 text-white" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{observation.petName}</span>
                          <Badge
                            variant="outline"
                            className={`text-xs px-1.5 py-0 rounded-sm ${getStatusColor(observation.status)}`}
                          >
                            {observation.status === "urgent" ? "Urgent" : "En attente"}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{observation.symptoms}</div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <UserIcon className="w-3 h-3" />
                            <span>{observation.ownerName}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock3Icon className="w-3 h-3" />
                            <span>{observation.dateReported}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
                  </div>
                </SheetTrigger>
                <SheetContent className="sm:max-w-md">
                  <SheetHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="flex items-center gap-2">
                        <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-md">
                          <EyeIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        Détails de l&apos;observation
                      </SheetTitle>
                      <Badge variant="outline" className={`${getStatusColor(observation.status)}`}>
                        {observation.status === "urgent" ? "Urgent" : "En attente"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-md">
                      <Avatar className="h-14 w-14 border-2 border-background">
                        <AvatarImage src={observation.imageUrl} alt={observation.petName} />
                        <AvatarFallback className="bg-indigo-600">
                          <PawPrintIcon className="w-6 h-6 text-white" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{observation.petName}</h3>
                          <Badge variant="outline" className="text-xs">
                            {observation.petType}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{observation.breed}</p>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                          <UserIcon className="w-3.5 h-3.5" />
                          <span>{observation.ownerName}</span>
                        </div>
                      </div>
                    </div>
                  </SheetHeader>

                  <div className="space-y-6 mt-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Symptômes observés</h4>
                      <div className="bg-muted/30 p-3 rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <StethoscopeIcon className="w-5 h-5 text-indigo-600" />
                          <span className="font-medium">{observation.symptoms}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{observation.notes}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Informations supplémentaires</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                          <div className="flex items-center gap-2">
                            <Clock3Icon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">Date signalée</span>
                          </div>
                          <span className="text-sm font-medium">
                            {observation.dateReported} à {observation.timeReported}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Ajouter une note</h4>
                      <Textarea placeholder="Entrez vos observations ici..." className="resize-none min-h-[100px]" />
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <SheetFooter className="flex-row gap-2 sm:justify-end">
                    <SheetClose asChild>
                      <Button variant="outline" className="flex-1">
                        Fermer
                      </Button>
                    </SheetClose>
                    <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">Traiter maintenant</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}

            {observations.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-full mb-3">
                  <CheckCircleIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-muted-foreground mb-1">Aucune observation récente</p>
                <p className="text-sm text-muted-foreground">Toutes les observations ont été traitées</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default ObservationsWidget
