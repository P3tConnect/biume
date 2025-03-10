"use client"

import {
  ActivityIcon,
  AlertTriangleIcon,
  CalendarDays,
  CalendarIcon,
  CatIcon,
  CheckIcon,
  ChevronRightIcon,
  ClockIcon,
  DogIcon,
  HeartPulseIcon,
  SyringeIcon,
  UserCircle2Icon,
  XIcon,
} from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import React from "react"
import { cn } from "@/src/lib/utils"

export const AppointmentRequests = () => {
  // Fonction pour gérer l'action
  const handleAction = (action: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    console.log(`Action ${action} pour la demande ${id}`)
  }

  // Données avec plus d'informations pour le design
  const requests = [
    {
      id: "15",
      petName: "Luna",
      petType: "chien",
      petBreed: "Berger australien",
      ownerName: "Marie Dupont",
      service: "Consultation",
      timeframe: "09:30 - 10:00",
      icon: <DogIcon className="h-4 w-4" />,
      serviceIcon: <HeartPulseIcon className="h-4 w-4" />,
      color: "green",
      urgent: false,
    },
    {
      id: "14",
      petName: "Simba",
      petType: "chat",
      petBreed: "Maine Coon",
      ownerName: "Paul Martin",
      service: "Vaccination",
      timeframe: "14:15 - 14:30",
      icon: <CatIcon className="h-4 w-4" />,
      serviceIcon: <SyringeIcon className="h-4 w-4" />,
      color: "green",
      urgent: false,
    },
    {
      id: "12",
      petName: "Rocky",
      petType: "chien",
      petBreed: "Jack Russell",
      ownerName: "Lucie Moreau",
      service: "Urgence",
      timeframe: "Dès que possible",
      icon: <DogIcon className="h-4 w-4" />,
      serviceIcon: <ActivityIcon className="h-4 w-4" />,
      color: "red",
      urgent: true,
    },
  ]

  return (
    <Card className="overflow-hidden border border-border">
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between bg-gradient-to-r from-green-50 to-white dark:from-green-950/30 dark:to-slate-900">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-md">
            <CalendarDays className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-lg font-medium">Demandes de rendez-vous</CardTitle>
        </div>
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/70">
          {requests.length}
        </Badge>
      </CardHeader>

      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-3">
          {requests.map(request => (
            <div
              key={request.id}
              onClick={() => console.log(`Voir détails de ${request.petName}`)}
              className={cn(
                "group relative rounded-xl p-3 transition-all hover:scale-[1.01] cursor-pointer border",
                !request.urgent
                  ? "bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-800"
                  : "bg-rose-50/30 dark:bg-rose-950/10 border-rose-200 dark:border-rose-900/30 hover:border-rose-300 dark:hover:border-rose-800/50"
              )}
            >
              {/* Indicateur d'urgence */}
              {request.urgent && (
                <div className="absolute -top-2 -right-2">
                  <div className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full shadow-sm animate-pulse flex items-center gap-1">
                    <AlertTriangleIcon className="h-3 w-3" />
                    <span>Urgent</span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                {/* Info de l'animal */}
                <div
                  className={cn(
                    "p-2.5 rounded-lg flex-shrink-0 flex items-center justify-center",
                    request.urgent
                      ? "bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400"
                      : "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                  )}
                >
                  {request.icon}
                </div>

                {/* Détails de la demande */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-base">
                      {request.petName}
                      <span className="text-sm font-normal text-muted-foreground ml-1">({request.petBreed})</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center gap-1.5 text-sm">
                      {request.serviceIcon}
                      <span>{request.service}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                      <ClockIcon className="h-4 w-4 text-muted-foreground" />
                      <span className={request.urgent ? "text-red-600 dark:text-red-400 font-medium" : ""}>
                        {request.timeframe}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <UserCircle2Icon className="h-4 w-4" />
                      <span>{request.ownerName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Aujourd'hui</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full bg-green-50 hover:bg-green-100 text-green-600 border-green-200 hover:border-green-300 dark:bg-green-900/20 dark:hover:bg-green-900/40 dark:border-green-800"
                    onClick={e => handleAction("confirm", request.id, e)}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border-red-200 hover:border-red-300 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:border-red-800"
                    onClick={e => handleAction("reject", request.id, e)}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {requests.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mb-3">
                <CheckIcon className="h-6 w-6" />
              </div>
              <p className="text-lg font-medium mb-1">Aucune demande en attente</p>
              <p className="text-sm text-muted-foreground">Toutes les demandes ont été traitées</p>
            </div>
          )}
        </div>
      </CardContent>

      {requests.length > 0 && (
        <CardFooter className="py-3 px-4 border-t bg-green-50/50 dark:bg-green-900/10">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs flex items-center justify-center gap-1.5 text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30"
          >
            <span>Voir toutes les demandes</span>
            <ChevronRightIcon className="h-3.5 w-3.5" />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
