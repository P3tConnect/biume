"use client"

import { Cat, ChevronRight, RefreshCw, Stethoscope, Syringe } from "lucide-react"
import React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export const DailyMetrics = () => {
  // Formatage de la date
  const today = new Date()
  const formattedDate = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })

  return (
    <Card className="rounded-xl">
      <CardHeader className="pb-1 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle>Ma journée</CardTitle>
          <Badge variant="outline" className="text-xs font-normal">
            {formattedDate}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {/* Résumé des métriques */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 bg-secondary/10 rounded-md p-2">
            <div className="bg-secondary/20 rounded-full p-1.5">
              <Stethoscope className="h-3.5 w-3.5 text-secondary-foreground" />
            </div>
            <div>
              <div className="text-lg font-medium text-secondary-foreground">8</div>
              <div className="text-xs text-secondary-foreground/70">Patients aujourd&apos;hui</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-secondary/10 rounded-md p-2">
            <div className="bg-secondary/20 rounded-full p-1.5">
              <Syringe className="h-3.5 w-3.5 text-secondary-foreground" />
            </div>
            <div>
              <div className="text-lg font-medium text-secondary-foreground">3</div>
              <div className="text-xs text-secondary-foreground/70">Vaccinations</div>
            </div>
          </div>
        </div>

        {/* Prochain rendez-vous */}
        <div className="mb-4">
          <div className="text-xs font-medium text-muted-foreground mb-2">PROCHAIN RENDEZ-VOUS</div>
          <div className="flex items-center justify-between p-2 border rounded-md">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                <Cat className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <div className="font-medium text-sm">Félix</div>
                <div className="text-xs text-muted-foreground">Consultation de routine</div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Badge variant="secondary" className="mb-1">
                09:30
              </Badge>
              <Button variant="ghost" size="sm" className="h-6 text-xs px-2">
                Voir fiche
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* État des tâches */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground">ÉTAT D&apos;AVANCEMENT</div>
          <div className="pt-2 pb-3 space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>Consultations</span>
              <span className="text-muted-foreground">2/8 terminées</span>
            </div>
            <Progress value={25} className="h-1.5" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t bg-muted/10 text-xs text-muted-foreground">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <RefreshCw className="h-3 w-3 mr-1.5" />
            Mis à jour il y a 5 min
          </div>
          <Button variant="ghost" size="sm" className="h-6 text-xs px-2">
            Rafraîchir
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
