"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { NewObservation, anatomicalRegions, dysfunctionTypes, observationTypes } from "./types"

interface AddObservationSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  newObservation: NewObservation
  setNewObservation: (observation: NewObservation) => void
  onAdd: () => void
}

export function AddObservationSheet({
  isOpen,
  onOpenChange,
  newObservation,
  setNewObservation,
  onAdd,
}: AddObservationSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Ajouter une observation</SheetTitle>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>
        <div className="space-y-6 py-6">
          <div className="space-y-3">
            <div>
              <Label>Type d'observation</Label>
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
                <Label>Type de dysfonction</Label>
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
              <Label>Zone anatomique</Label>
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
              <Label>Gravité</Label>
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
              <Label>{newObservation.type === "recommendation" ? "Recommandations" : "Observations"}</Label>
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
        <SheetFooter>
          <Button
            className="w-full"
            onClick={onAdd}
            disabled={
              !newObservation.region ||
              !newObservation.type ||
              (newObservation.type === "dysfunction" && !newObservation.dysfunctionType)
            }
          >
            Ajouter
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
