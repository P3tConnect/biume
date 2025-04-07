"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Observation, anatomicalRegions, observationTypes, dysfunctionTypes, interventionZones } from "./types"
import { Separator } from "@/components/ui/separator"

// Interface pour les problèmes anatomiques (dysfonctions et suspicions)
interface AnatomicalIssue {
  id: string
  type: "dysfunction" | "anatomicalSuspicion"
  region: string
  severity: number
  notes: string
}

interface ReportPreviewProps {
  isOpen: boolean
  onClose: () => void
  title: string
  observations: Observation[]
  notes: string
  recommendations?: { id: string; content: string }[]
  anatomicalIssues?: AnatomicalIssue[]
  images: string[]
}

export function ReportPreview({
  isOpen,
  onClose,
  title,
  observations,
  notes,
  recommendations = [],
  anatomicalIssues = [],
  images
}: ReportPreviewProps) {
  // Regrouper les observations par type
  const staticObservations = observations.filter(obs => obs.type === "staticObservation")
  const dynamicObservations = observations.filter(obs => obs.type === "dynamicObservation")
  const dysfunctions = observations.filter(obs => obs.type === "dysfunction")
  const recommendationObservations = observations.filter(obs => obs.type === "recommendation")

  // Regrouper les dysfonctions et suspicions issues du nouvel onglet
  const confirmedAnatomicalDysfunctions = anatomicalIssues.filter(issue => issue.type === "dysfunction")
  const anatomicalSuspicions = anatomicalIssues.filter(issue => issue.type === "anatomicalSuspicion")

  // Sous-groupes de dysfonctions par type
  const confirmedDysfunctions = dysfunctions.filter(obs => obs.dysfunctionType === "confirmed")
  const suspectedDysfunctions = dysfunctions.filter(obs => obs.dysfunctionType === "suspected")

  // Fonction utilitaire pour afficher les observations
  const renderObservations = (obs: Observation[]) => {
    if (obs.length === 0) return <p className="text-muted-foreground italic">Aucune observation</p>

    return obs.map(observation => (
      <div key={observation.id} className="mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className={`w-2 h-2 rounded-full ${getSeverityColor(observation.severity)}`} />
          <span className="font-medium">{anatomicalRegions.find(r => r.value === observation.region)?.label}</span>
          {observation.type === "dysfunction" && observation.dysfunctionType && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {dysfunctionTypes.find(t => t.value === observation.dysfunctionType)?.label}
            </span>
          )}
          {observation.interventionZone && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
              {interventionZones.find(z => z.value === observation.interventionZone)?.label}
            </span>
          )}
          <span className="text-xs text-muted-foreground">({getSeverityLabel(observation.severity)})</span>
        </div>
        <p className="text-sm ml-4 mt-1">{observation.notes}</p>
      </div>
    ))
  }

  // Fonction utilitaire pour afficher les problèmes anatomiques
  const renderAnatomicalIssues = (issues: AnatomicalIssue[]) => {
    if (issues.length === 0) return <p className="text-muted-foreground italic">Aucun élément à afficher</p>

    return issues.map(issue => (
      <div key={issue.id} className="mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className={`w-2 h-2 rounded-full ${getSeverityColor(issue.severity)}`} />
          <span className="font-medium">{anatomicalRegions.find(r => r.value === issue.region)?.label}</span>
          <span className="text-xs text-muted-foreground">
            ({issue.type === "dysfunction" ? "Sévérité" : "Indice"}: {getSeverityLabel(issue.severity)})
          </span>
        </div>
        <p className="text-sm ml-4 mt-1">{issue.notes}</p>
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Observations statiques */}
          <div>
            <h3 className="text-lg font-medium mb-2">
              {observationTypes.find(t => t.value === "staticObservation")?.label || "Observations statiques"}
            </h3>
            <Separator className="mb-3" />
            {renderObservations(staticObservations)}
          </div>

          {/* Observations dynamiques */}
          <div>
            <h3 className="text-lg font-medium mb-2">
              {observationTypes.find(t => t.value === "dynamicObservation")?.label || "Observations dynamiques"}
            </h3>
            <Separator className="mb-3" />
            {renderObservations(dynamicObservations)}
          </div>

          {/* Dysfonctions (ancien système) */}
          {(confirmedDysfunctions.length > 0 || suspectedDysfunctions.length > 0) && (
            <div>
              <h3 className="text-lg font-medium mb-2">
                {observationTypes.find(t => t.value === "dysfunction")?.label || "Dysfonctions"}
              </h3>
              <Separator className="mb-3" />

              {confirmedDysfunctions.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-md font-medium mb-2 text-primary">
                    {dysfunctionTypes.find(t => t.value === "confirmed")?.label || "Dysfonctions confirmées"}
                  </h4>
                  {renderObservations(confirmedDysfunctions)}
                </div>
              )}

              {suspectedDysfunctions.length > 0 && (
                <div>
                  <h4 className="text-md font-medium mb-2 text-primary">
                    {dysfunctionTypes.find(t => t.value === "suspected")?.label || "Suspicions de dysfonction"}
                  </h4>
                  {renderObservations(suspectedDysfunctions)}
                </div>
              )}
            </div>
          )}

          {/* Dysfonctions (nouveau système) */}
          {confirmedAnatomicalDysfunctions.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Dysfonctions</h3>
              <Separator className="mb-3" />
              {renderAnatomicalIssues(confirmedAnatomicalDysfunctions)}
            </div>
          )}

          {/* Suspicions d'atteinte anatomique */}
          {anatomicalSuspicions.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Suspicions d'atteinte anatomique</h3>
              <Separator className="mb-3" />
              {renderAnatomicalIssues(anatomicalSuspicions)}
            </div>
          )}

          {/* Observations avec recommandations (ancien système) */}
          {recommendationObservations.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">
                {observationTypes.find(t => t.value === "recommendation")?.label || "Recommandations"}
              </h3>
              <Separator className="mb-3" />
              {renderObservations(recommendationObservations)}
            </div>
          )}

          {/* Recommandations (nouveau système) */}
          {recommendations.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Conseils et recommandations</h3>
              <Separator className="mb-3" />
              <ul className="space-y-2">
                {recommendations.map((recommendation, index) => (
                  <li key={recommendation.id} className="flex items-start gap-2">
                    <span className="font-medium min-w-[24px]">{index + 1}.</span>
                    <p>{recommendation.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
