"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { NewObservation, anatomicalRegions, dysfunctionTypes, observationTypes, interventionZones } from "./types"
import { PlusCircleIcon, ListChecksIcon } from "lucide-react"

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
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <PlusCircleIcon className="h-5 w-5 text-primary" />
            Ajouter une observation
          </DialogTitle>
          <DialogDescription>
            Complétez les informations pour ajouter une nouvelle observation au rapport
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Type d'observation</Label>
              <Select
                value={newObservation.type}
                onValueChange={value => setNewObservation({ ...newObservation, type: value as any })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  {observationTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {newObservation.type === "dysfunction" && (
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Type de dysfonction</Label>
                <Select
                  value={newObservation.dysfunctionType}
                  onValueChange={value => setNewObservation({ ...newObservation, dysfunctionType: value as any })}
                >
                  <SelectTrigger>
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

            <div>
              <Label className="text-sm font-medium mb-1.5 block">Zone anatomique</Label>
              <Select
                value={newObservation.region}
                onValueChange={value => setNewObservation({ ...newObservation, region: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une zone" />
                </SelectTrigger>
                <SelectContent>
                  {anatomicalRegions.map(region => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium mb-1.5 block">Zone d'intervention</Label>
              <Select
                value={newObservation.interventionZone}
                onValueChange={value => setNewObservation({ ...newObservation, interventionZone: value as any })}
              >
                <SelectTrigger>
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

            <div>
              <Label className="text-sm font-medium mb-1.5 block">Gravité</Label>
              <Select
                value={newObservation.severity.toString()}
                onValueChange={value => setNewObservation({ ...newObservation, severity: parseInt(value) })}
              >
                <SelectTrigger>
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

            <div>
              <Label className="text-sm font-medium mb-1.5 block">
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

        <DialogFooter>
          <Button
            className="w-full sm:w-auto"
            onClick={onAdd}
            disabled={
              !newObservation.region ||
              !newObservation.type ||
              (newObservation.type === "dysfunction" && !newObservation.dysfunctionType)
            }
          >
            <ListChecksIcon className="h-4 w-4 mr-1" />
            Ajouter l'observation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
