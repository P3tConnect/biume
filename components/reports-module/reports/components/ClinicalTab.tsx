"use client"

import { cn } from "@/src/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, CheckCircle2 } from "lucide-react"
import { Observation, anatomicalRegions, interventionZones } from "./types"

interface ObservationsTabProps {
  observations: Observation[]
  onRemoveObservation: (id: string) => void
  onOpenAddSheet: () => void
}

export function ObservationsTab({ observations, onRemoveObservation, onOpenAddSheet }: ObservationsTabProps) {
  const typeIcon = <CheckCircle2 className="h-4 w-4" />

  return (
    <div className="h-full">
      {/* Liste des observations */}
      <Card className="flex flex-col h-full">
        <div className="p-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            {typeIcon}
            <h2 className="font-medium">Observations</h2>
            {observations.length > 0 && (
              <Badge className="bg-primary/90 hover:bg-primary text-white">{observations.length}</Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onOpenAddSheet} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
        </div>

        <div className="p-3 flex-1 overflow-y-auto">
          {observations.length > 0 ? (
            <div className="space-y-3">
              {observations.map(obs => (
                <div
                  key={obs.id}
                  className="p-3 border rounded-md flex items-start justify-between hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
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
                      <span className="text-xs text-muted-foreground">
                        (
                        {obs.severity === 1
                          ? "Légère"
                          : obs.severity === 2
                            ? "Modérée"
                            : obs.severity === 3
                              ? "Importante"
                              : obs.severity === 4
                                ? "Sévère"
                                : "Critique"}
                        )
                      </span>
                    </div>

                    {obs.interventionZone && (
                      <div className="mb-2">
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          Zone: {interventionZones.find(z => z.value === obs.interventionZone)?.label}
                        </Badge>
                      </div>
                    )}

                    {obs.notes && <p className="text-sm text-muted-foreground">{obs.notes}</p>}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveObservation(obs.id)}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-3">
              <div className="flex items-center gap-2">
                {typeIcon}
                <p>Aucune observation</p>
              </div>
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
