"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { NewObservation, anatomicalRegions, dysfunctionTypes, observationTypes, interventionZones } from "./types"
import { PlusCircleIcon, ListChecksIcon, EyeIcon, EyeClosed, ClipboardCheck, Activity } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/src/lib/utils"

interface AddObservationDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  newObservation: NewObservation
  setNewObservation: (observation: NewObservation) => void
  onAdd: () => void
}

export function AddObservationDialog({
  isOpen,
  onOpenChange,
  newObservation,
  setNewObservation,
  onAdd,
}: AddObservationDialogProps) {
  // Fonction pour obtenir l'icône en fonction du type d'observation
  const getObservationIcon = (type: string) => {
    switch (type) {
      case "staticObservation":
        return <EyeIcon className="h-5 w-5" />
      case "dynamicObservation":
        return <Activity className="h-5 w-5" />
      case "dysfunction":
        return <Activity className="h-5 w-5" />
      case "recommendation":
        return <ClipboardCheck className="h-5 w-5" />
      default:
        return <EyeIcon className="h-5 w-5" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="bg-gradient-to-r from-primary/80 to-primary p-4 text-white">
          <DialogTitle className="text-white">Nouvelle observation</DialogTitle>
        </DialogHeader>

        <div className="p-5 pt-4">
          <div className="space-y-4">
            {/* Type d'observation avec boutons */}
            <div className="space-y-3">
              <Label className="font-medium">Type d'observation</Label>

              <div className="grid grid-cols-2 gap-3">
                {/* Observation statique */}
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-2 p-2.5 rounded-md border-2 transition-all",
                    newObservation.type === "staticObservation"
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-primary/50"
                  )}
                  onClick={() => setNewObservation({ ...newObservation, type: "staticObservation" as any })}
                >
                  <EyeIcon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      newObservation.type === "staticObservation" ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  <span
                    className={cn(
                      "font-medium text-sm",
                      newObservation.type === "staticObservation" ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    Observation statique
                  </span>
                </button>

                {/* Observation dynamique */}
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-2 p-2.5 rounded-md border-2 transition-all",
                    newObservation.type === "dynamicObservation"
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-primary/50"
                  )}
                  onClick={() => setNewObservation({ ...newObservation, type: "dynamicObservation" as any })}
                >
                  <Activity
                    className={cn(
                      "h-5 w-5 transition-colors",
                      newObservation.type === "dynamicObservation" ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  <span
                    className={cn(
                      "font-medium text-sm",
                      newObservation.type === "dynamicObservation" ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    Observation dynamique
                  </span>
                </button>
              </div>
            </div>

            {/* Type de dysfonction (conditionnel) */}
            {newObservation.type === "dysfunction" && (
              <div className="space-y-3">
                <Label className="font-medium">Type de dysfonction</Label>
                <Select
                  value={newObservation.dysfunctionType}
                  onValueChange={value => setNewObservation({ ...newObservation, dysfunctionType: value as any })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner le type de dysfonction" />
                  </SelectTrigger>
                  <SelectContent>
                    {dysfunctionTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Separator className="my-1" />

            {/* Zone d'intervention */}
            <div className="space-y-3">
              <Label className="font-medium">Zone d'intervention</Label>
              <Select
                value={newObservation.interventionZone}
                onValueChange={value => setNewObservation({ ...newObservation, interventionZone: value as any })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner une zone d'intervention" />
                </SelectTrigger>
                <SelectContent>
                  {interventionZones.map(zone => (
                    <SelectItem key={zone.value} value={zone.value}>
                      {zone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Gravité */}
            <div className="space-y-3">
              <Label className="font-medium">Gravité</Label>
              <Select
                value={newObservation.severity.toString()}
                onValueChange={value => setNewObservation({ ...newObservation, severity: parseInt(value) })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Légère</SelectItem>
                  <SelectItem value="2">Modérée</SelectItem>
                  <SelectItem value="3">Importante</SelectItem>
                  <SelectItem value="4">Sévère</SelectItem>
                  <SelectItem value="5">Critique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="my-1" />

            {/* Notes/Recommandations */}
            <div className="space-y-3">
              <Label className="font-medium">
                {newObservation.type === "recommendation" ? "Recommandations" : "Observations"}
              </Label>
              <Textarea
                value={newObservation.notes}
                onChange={e => setNewObservation({ ...newObservation, notes: e.target.value })}
                placeholder={
                  newObservation.type === "recommendation"
                    ? "Décrivez vos conseils et recommandations..."
                    : "Décrivez vos observations..."
                }
                className="resize-none h-[150px]"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="px-5 pb-5">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button
            onClick={onAdd}
            disabled={
              !newObservation.type || (newObservation.type === "dysfunction" && !newObservation.dysfunctionType)
            }
            className="gap-1"
          >
            <ListChecksIcon className="h-4 w-4" />
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
