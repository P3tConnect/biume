"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Observation, anatomicalRegions } from "./types"
import { cn } from "@/lib/utils"

interface ReportPreviewProps {
  isOpen: boolean
  onClose: () => void
  title: string
  observations: Observation[]
  notes: string
  images: string[]
}

export function ReportPreview({
  isOpen,
  onClose,
  title,
  observations,
  notes,
  images
}: ReportPreviewProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed inset-6 bg-background rounded-lg shadow-lg border overflow-auto">
        <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-medium">Aperçu du rapport</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-muted-foreground">
                {new Date().toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {observations.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Observations cliniques</h2>
                {observations.map(obs => (
                  <div key={obs.id} className="border-b pb-3">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-3 h-3 rounded-full",
                        obs.severity === 1 ? "bg-green-500" :
                          obs.severity === 2 ? "bg-yellow-500" :
                            obs.severity === 3 ? "bg-orange-500" :
                              obs.severity === 4 ? "bg-red-500" :
                                "bg-purple-500"
                      )} />
                      <h3 className="font-medium">
                        {anatomicalRegions.find(r => r.value === obs.region)?.label}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        (Gravité : {
                          obs.severity === 1 ? "Légère" :
                            obs.severity === 2 ? "Modérée" :
                              obs.severity === 3 ? "Importante" :
                                obs.severity === 4 ? "Sévère" :
                                  "Critique"
                        })
                      </span>
                    </div>
                    {obs.notes && (
                      <p className="mt-2 text-muted-foreground">{obs.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {notes && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Notes complémentaires</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">{notes}</p>
              </div>
            )}

            <div className="border-t pt-6">
              <p className="font-medium">Dr. Vétérinaire</p>
              <p className="text-sm text-muted-foreground">Signature</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 