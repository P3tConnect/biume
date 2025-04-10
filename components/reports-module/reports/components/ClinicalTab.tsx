"use client"

import { cn } from "@/src/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, Filter } from "lucide-react"
import { Observation, ObservationType, anatomicalRegions, dysfunctionTypes, interventionZones } from "./types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ObservationsTabProps {
  observations: Observation[]
  activeType: ObservationType
  onRemoveObservation: (id: string) => void
  onOpenAddSheet: () => void
  selectedView: "left" | "right"
  setSelectedView: (view: "left" | "right") => void
}

export function ObservationsTab({
  observations,
  activeType,
  onRemoveObservation,
  onOpenAddSheet,
  selectedView,
  setSelectedView,
}: ObservationsTabProps) {
  const filteredObservations = observations.filter(obs => obs.type === activeType)

  const typeLabels = {
    staticObservation: "Observation statique",
    dynamicObservation: "Observation dynamique",
  } as const

  const typeTitle = typeLabels[activeType]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {/* Vue anatomique - partie gauche */}
      <Card className="flex flex-col h-full">
        <div className="p-3 border-b flex items-center justify-between">
          <h2 className="font-medium">Vue anatomique</h2>
          <div className="flex gap-1">
            <Button
              variant={selectedView === "left" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedView("left")}
            >
              Gauche
            </Button>
            <Button
              variant={selectedView === "right" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedView("right")}
            >
              Droite
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p className="text-center">
              Visualisation anatomique {selectedView === "left" ? "(gauche)" : "(droite)"}
              <br />
              <span className="text-sm text-muted-foreground/70">
                Cette fonctionnalité sera améliorée prochainement
              </span>
            </p>
          </div>
        </div>
      </Card>

      {/* Observations - partie droite */}
      <Card className="flex flex-col h-full">
        <div className="p-3 border-b flex items-center justify-between">
          <h2 className="font-medium">{typeTitle}</h2>
          <Button variant="ghost" size="sm" onClick={onOpenAddSheet} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
        </div>

        <div className="p-3 flex-1 overflow-y-auto">
          {filteredObservations.length > 0 ? (
            <div className="space-y-3">
              {filteredObservations.map(obs => (
                <div key={obs.id} className="p-3 border rounded-md flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full",
                          obs.severity === 1
                            ? "bg-green-500"
                            : obs.severity === 2
                              ? "bg-yellow-500"
                              : obs.severity === 3
                                ? "bg-orange-500"
                                : obs.severity === 4
                                  ? "bg-red-500"
                                  : "bg-purple-500"
                        )}
                      />
                      <span className="font-medium">{anatomicalRegions.find(r => r.value === obs.region)?.label}</span>
                      {obs.interventionZone && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          {interventionZones.find(z => z.value === obs.interventionZone)?.label}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        ({obs.severity === 1
                          ? "Légère"
                          : obs.severity === 2
                            ? "Modérée"
                            : obs.severity === 3
                              ? "Importante"
                              : obs.severity === 4
                                ? "Sévère"
                                : "Critique"})
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{obs.notes}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => onRemoveObservation(obs.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-3">
              <p>Aucune observation</p>
              <Button variant="outline" size="sm" onClick={onOpenAddSheet} className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                Ajouter une observation
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
