"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/src/lib"
import { Plus, Trash2 } from "lucide-react"
import { Observation, anatomicalRegions } from "./types"

interface ObservationsTabProps {
  observations: Observation[]
  onRemoveObservation: (id: string) => void
  onOpenAddSheet: () => void
}

export function ObservationsTab({ observations, onRemoveObservation, onOpenAddSheet }: ObservationsTabProps) {
  return (
    <Card className="flex flex-col h-full">
      <div className="p-3 border-b flex items-center justify-between">
        <h2 className="font-medium">Observations cliniques</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenAddSheet}
          className="flex items-center gap-1"
        >
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
                className="p-3 border rounded-md flex items-start justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      obs.severity === 1 ? "bg-green-500" :
                        obs.severity === 2 ? "bg-yellow-500" :
                          obs.severity === 3 ? "bg-orange-500" :
                            obs.severity === 4 ? "bg-red-500" :
                              "bg-purple-500"
                    )} />
                    <span className="font-medium">
                      {anatomicalRegions.find(r => r.value === obs.region)?.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({obs.severity === 1 ? "Légère" :
                        obs.severity === 2 ? "Modérée" :
                          obs.severity === 3 ? "Importante" :
                            obs.severity === 4 ? "Sévère" :
                              "Critique"})
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{obs.notes}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveObservation(obs.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-3">
            <p>Aucune observation</p>
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenAddSheet}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Ajouter une observation
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
} 