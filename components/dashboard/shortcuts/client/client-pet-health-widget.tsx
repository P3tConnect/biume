"use client"

import { AlertTriangle, ChevronRight, Heart, Syringe, Weight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui"
import { useSession } from "@/src/lib/auth-client"

// Types
type HealthMetric = {
  label: string
  value: number | string
  target?: number
  unit?: string
  status: "good" | "warning" | "alert"
  date?: string
}

type PetHealth = {
  id: string
  name: string
  avatar: string
  age: string
  species: string
  breed: string
  nextAppointment: {
    date: string
    type: string
    practitioner: string
  }
  lastCheckup: string
  metrics: HealthMetric[]
  medicalHistory: {
    date: string
    type: string
    description: string
  }[]
  currentTreatments: {
    medication: string
    frequency: string
    endDate: string
  }[]
  alerts: string[]
}

// Données de test
const petsHealth: PetHealth[] = [
  {
    id: "1",
    name: "Luna",
    avatar: "/images/pets/persian-cat.jpg",
    age: "3 ans",
    species: "Chat",
    breed: "Persan",
    nextAppointment: {
      date: "15 Avril 2024",
      type: "Vaccination antirabique",
      practitioner: "Dr. Martin",
    },
    lastCheckup: "15 Mars 2024",
    metrics: [
      {
        label: "Poids",
        value: 3.5,
        target: 4,
        unit: "kg",
        status: "warning",
        date: "15 Mars 2024",
      },
      {
        label: "Température",
        value: 38.5,
        target: 39,
        unit: "°C",
        status: "good",
        date: "15 Mars 2024",
      },
      {
        label: "Dernier vermifuge",
        value: "01 Mars 2024",
        status: "good",
      },
    ],
    medicalHistory: [
      {
        date: "15 Mars 2024",
        type: "Examen général",
        description: "Bilan annuel - RAS",
      },
      {
        date: "01 Mars 2024",
        type: "Vermifuge",
        description: "Administration Milbemax",
      },
    ],
    currentTreatments: [
      {
        medication: "Complément alimentaire",
        frequency: "1x par jour",
        endDate: "15 Avril 2024",
      },
    ],
    alerts: [
      "Vaccination antirabique à renouveler dans 30 jours",
      "Légère perte de poids à surveiller",
      "Prochain vermifuge prévu le 01 Juin 2024",
    ],
  },
  {
    id: "2",
    name: "Max",
    avatar: "/images/pets/german-shepherd.jpg",
    age: "5 ans",
    species: "Chien",
    breed: "Berger Allemand",
    nextAppointment: {
      date: "10 Mai 2024",
      type: "Suivi arthrose",
      practitioner: "Dr. Dupont",
    },
    lastCheckup: "10 Mars 2024",
    metrics: [
      {
        label: "Poids",
        value: 32,
        target: 30,
        unit: "kg",
        status: "alert",
        date: "10 Mars 2024",
      },
      {
        label: "Mobilité articulaire",
        value: 60,
        target: 100,
        unit: "%",
        status: "warning",
        date: "10 Mars 2024",
      },
      {
        label: "Dernier antiparasitaire",
        value: "01 Mars 2024",
        status: "good",
      },
    ],
    medicalHistory: [
      {
        date: "10 Mars 2024",
        type: "Consultation arthrose",
        description: "Raideur articulations postérieures",
      },
      {
        date: "01 Mars 2024",
        type: "Antiparasitaire",
        description: "Administration Nexgard",
      },
    ],
    currentTreatments: [
      {
        medication: "Locox",
        frequency: "2x par jour",
        endDate: "10 Juin 2024",
      },
      {
        medication: "Complément articulaire",
        frequency: "1x par jour",
        endDate: "10 Juin 2024",
      },
    ],
    alerts: [
      "Surpoids - Régime recommandé",
      "Suivi arthrose en cours",
      "Prochain antiparasitaire prévu le 01 Juin 2024",
    ],
  },
]

const ClientPetHealthWidget = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const userId = session?.user?.id
  const [selectedPet, setSelectedPet] = useState<PetHealth | null>(null)

  const getStatusColor = (status: HealthMetric["status"]) => {
    switch (status) {
      case "good":
        return "text-green-500"
      case "warning":
        return "text-yellow-500"
      case "alert":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getProgressColor = (status: HealthMetric["status"]) => {
    switch (status) {
      case "good":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "alert":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const calculateProgress = (metric: HealthMetric) => {
    if (typeof metric.value === "number" && metric.target) {
      return (metric.value / metric.target) * 100
    }
    return 0
  }

  return (
    <>
      <Card className="rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2">
            <Heart className="size-5" />
            Suivi médical
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/user/${userId}/pets`)}>
            Voir tout
            <ChevronRight className="size-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {petsHealth.map(pet => (
              <div
                key={pet.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                onClick={() => setSelectedPet(pet)}
              >
                <Avatar className="size-12 border-2 border-background">
                  <AvatarImage src={pet.avatar} alt={pet.name} />
                  <AvatarFallback>{pet.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium truncate">{pet.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {pet.species} - {pet.breed}
                      </p>
                    </div>
                    {pet.alerts.length > 0 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger onClick={e => e.stopPropagation()}>
                            <Badge variant="outline" className="shrink-0 gap-1">
                              <AlertTriangle className="size-3 text-yellow-500" />
                              {pet.alerts.length}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <ul className="text-xs space-y-1">
                              {pet.alerts.map((alert, index) => (
                                <li key={index}>{alert}</li>
                              ))}
                            </ul>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>

                  <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Syringe className="size-3" />
                      <span className="truncate">
                        RDV : {pet.nextAppointment.type} ({pet.nextAppointment.date})
                      </span>
                    </div>
                    {pet.currentTreatments.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Heart className="size-3" />
                        <span>
                          {pet.currentTreatments.length} traitement{pet.currentTreatments.length > 1 ? "s" : ""} en
                          cours
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Sheet open={!!selectedPet} onOpenChange={() => setSelectedPet(null)}>
        <SheetContent className="overflow-y-auto">
          {selectedPet && (
            <>
              <SheetHeader className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="size-16 border-2 border-background">
                    <AvatarImage src={selectedPet.avatar} alt={selectedPet.name} />
                    <AvatarFallback>{selectedPet.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle>{selectedPet.name}</SheetTitle>
                    <SheetDescription>
                      {selectedPet.species} - {selectedPet.breed} - {selectedPet.age}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Prochain rendez-vous</h4>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Type</span>
                      <span>{selectedPet.nextAppointment.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span>{selectedPet.nextAppointment.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Praticien</span>
                      <span>{selectedPet.nextAppointment.practitioner}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Métriques de santé</h4>
                  {selectedPet.metrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{metric.label}</span>
                        <span className={getStatusColor(metric.status)}>
                          {metric.value} {metric.unit}
                        </span>
                      </div>
                      {typeof metric.value === "number" && metric.target && (
                        <Progress
                          value={calculateProgress(metric)}
                          className="h-2"
                          indicatorClassName={getProgressColor(metric.status)}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {selectedPet.currentTreatments.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Traitements en cours</h4>
                      <div className="space-y-3">
                        {selectedPet.currentTreatments.map((treatment, index) => (
                          <div key={index} className="text-sm">
                            <div className="font-medium">{treatment.medication}</div>
                            <div className="text-muted-foreground">
                              {treatment.frequency} - Jusqu'au {treatment.endDate}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Historique médical récent</h4>
                  <div className="space-y-3">
                    {selectedPet.medicalHistory.map((event, index) => (
                      <div key={index} className="text-sm">
                        <div className="font-medium">{event.type}</div>
                        <div className="text-muted-foreground">
                          {event.date} - {event.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedPet.alerts.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <AlertTriangle className="size-4 text-yellow-500" />
                        Points d'attention
                      </h4>
                      <ul className="space-y-2">
                        {selectedPet.alerts.map((alert, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-yellow-500" />
                            {alert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}

export default ClientPetHealthWidget
