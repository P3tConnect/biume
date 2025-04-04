"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Observation, anatomicalRegions, observationTypes, dysfunctionTypes } from "./types"
import { Separator } from "@/components/ui/separator"

interface ReportPreviewProps {
  isOpen: boolean
  onClose: () => void
  title: string
  observations: Observation[]
  notes: string
  images: string[]
}

export function ReportPreview({ isOpen, onClose, title, observations, notes, images }: ReportPreviewProps) {
  // Regrouper les observations par type
  const staticObservations = observations.filter(obs => obs.type === "staticObservation")
  const dynamicObservations = observations.filter(obs => obs.type === "dynamicObservation")
  const dysfunctions = observations.filter(obs => obs.type === "dysfunction")
  const recommendations = observations.filter(obs => obs.type === "recommendation")

  // Fonction utilitaire pour afficher les observations
  const renderObservations = (obs: Observation[]) => {
    if (obs.length === 0) return <p className="text-muted-foreground italic">Aucune observation</p>

    return obs.map(observation => (
      <div key={observation.id} className="mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getSeverityColor(observation.severity)}`} />
          <span className="font-medium">{anatomicalRegions.find(r => r.value === observation.region)?.label}</span>
          {observation.type === "dysfunction" && observation.dysfunctionType && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {dysfunctionTypes.find(t => t.value === observation.dysfunctionType)?.label}
            </span>
          )}
          <span className="text-xs text-muted-foreground">({getSeverityLabel(observation.severity)})</span>
        </div>
        <p className="text-sm ml-4 mt-1">{observation.notes}</p>
      </div>
    ))
  }

  // Fonction utilitaire pour obtenir la couleur selon la sévérité
  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 1:
        return "bg-green-500"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-orange-500"
      case 4:
        return "bg-red-500"
      case 5:
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  // Fonction utilitaire pour obtenir le label de sévérité
  const getSeverityLabel = (severity: number) => {
    switch (severity) {
      case 1:
        return "Légère"
      case 2:
        return "Modérée"
      case 3:
        return "Importante"
      case 4:
        return "Sévère"
      case 5:
        return "Critique"
      default:
        return "Inconnue"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Observations statiques */}
          <div>
            <h3 className="text-lg font-medium mb-2">
              {observationTypes.find(t => t.value === "staticObservation")?.label}
            </h3>
            <Separator className="mb-3" />
            {renderObservations(staticObservations)}
          </div>

          {/* Observations dynamiques */}
          <div>
            <h3 className="text-lg font-medium mb-2">
              {observationTypes.find(t => t.value === "dynamicObservation")?.label}
            </h3>
            <Separator className="mb-3" />
            {renderObservations(dynamicObservations)}
          </div>

          {/* Dysfonctions */}
          <div>
            <h3 className="text-lg font-medium mb-2">{observationTypes.find(t => t.value === "dysfunction")?.label}</h3>
            <Separator className="mb-3" />
            {renderObservations(dysfunctions)}
          </div>

          {/* Conseils et recommandations */}
          <div>
            <h3 className="text-lg font-medium mb-2">
              {observationTypes.find(t => t.value === "recommendation")?.label}
            </h3>
            <Separator className="mb-3" />
            {renderObservations(recommendations)}
          </div>

          {/* Notes générales */}
          {notes && (
            <div>
              <h3 className="text-lg font-medium mb-2">Notes générales</h3>
              <Separator className="mb-3" />
              <p className="whitespace-pre-wrap">{notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
