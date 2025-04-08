"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { anatomicalRegionsByCategory, interventionZones } from "./types"
import { Slider } from "@/components/ui/slider"
import { PlusIcon, ActivityIcon, AlertCircleIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/src/lib/utils"

interface AnatomicalIssue {
  type: "dysfunction" | "anatomicalSuspicion"
  region: string
  severity: number
  notes: string
  interventionZone?: string
}

interface AddAnatomicalIssueDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  issueType: "dysfunction" | "anatomicalSuspicion"
  newIssue: AnatomicalIssue
  setNewIssue: (issue: AnatomicalIssue) => void
  onAdd: () => void
}

export function AddAnatomicalIssueDialog({
  isOpen,
  onOpenChange,
  issueType,
  newIssue,
  setNewIssue,
  onAdd,
}: AddAnatomicalIssueDialogProps) {
  // Fonction pour obtenir le libellé d'un niveau de sévérité
  const getLevelLabel = (severity: number) => {
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
        return "Modérée"
    }
  }

  // Obtenir la couleur en fonction de la sévérité
  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 1:
        return "text-green-500 border-green-500"
      case 2:
        return "text-yellow-500 border-yellow-500"
      case 3:
        return "text-orange-500 border-orange-500"
      case 4:
        return "text-red-500 border-red-500"
      case 5:
        return "text-purple-500 border-purple-500"
      default:
        return "text-yellow-500 border-yellow-500"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden rounded-lg">
        <DialogHeader className="bg-gradient-to-r from-primary/80 to-primary p-4 text-white">
          <DialogTitle className="text-white">Nouvel élément anatomique</DialogTitle>
        </DialogHeader>

        <div className="p-5 pt-4">
          {/* Section Type d'élément avec boutons plus petits */}
          <div className="space-y-3">
            <Label className="font-medium">Type d'élément</Label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={cn(
                  "flex items-center gap-2 p-2.5 rounded-md border-2 transition-all",
                  newIssue.type === "dysfunction"
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-primary/50"
                )}
                onClick={() => setNewIssue({ ...newIssue, type: "dysfunction" })}
              >
                <ActivityIcon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    newIssue.type === "dysfunction" ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "font-medium text-sm",
                    newIssue.type === "dysfunction" ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  Dysfonction
                </span>
              </button>

              <button
                type="button"
                className={cn(
                  "flex items-center gap-2 p-2.5 rounded-md border-2 transition-all",
                  newIssue.type === "anatomicalSuspicion"
                    ? "border-amber-500 bg-amber-500/5"
                    : "border-muted hover:border-amber-500/50"
                )}
                onClick={() => setNewIssue({ ...newIssue, type: "anatomicalSuspicion" })}
              >
                <AlertCircleIcon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    newIssue.type === "anatomicalSuspicion" ? "text-amber-500" : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "font-medium text-sm",
                    newIssue.type === "anatomicalSuspicion" ? "text-amber-500" : "text-muted-foreground"
                  )}
                >
                  Suspicion d'atteinte
                </span>
              </button>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Section Région anatomique */}
          <div className="space-y-4">
            {/* Zone d'intervention placée en premier */}
            <div className="space-y-3">
              <Label htmlFor="interventionZone" className="font-medium">
                Zone d'intervention
              </Label>
              <Select
                value={newIssue.interventionZone}
                onValueChange={value => setNewIssue({ ...newIssue, interventionZone: value })}
              >
                <SelectTrigger id="interventionZone" className="w-full">
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

            {/* Région anatomique placée ensuite */}
            <div className="space-y-3">
              <Label htmlFor="region" className="font-medium">
                Région anatomique <span className="text-destructive">*</span>
              </Label>
              <Select value={newIssue.region} onValueChange={value => setNewIssue({ ...newIssue, region: value })}>
                <SelectTrigger id="region" className="w-full">
                  <SelectValue placeholder="Sélectionner une région" />
                </SelectTrigger>
                <SelectContent>
                  {anatomicalRegionsByCategory.map(category => (
                    <SelectGroup key={category.category}>
                      <SelectLabel>{category.category}</SelectLabel>
                      {category.items.map(region => (
                        <SelectItem key={region.value} value={region.value}>
                          {region.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Section Sévérité */}
            <div className="space-y-3">
              <div>
                <Label className="font-medium">
                  {newIssue.type === "dysfunction" ? "Sévérité" : "Indice de suspicion"}
                </Label>
                <div
                  className={cn("text-base font-medium mt-1 transition-colors", getSeverityColor(newIssue.severity))}
                >
                  {getLevelLabel(newIssue.severity)}
                </div>
              </div>

              <Slider
                value={[newIssue.severity]}
                min={1}
                max={5}
                step={1}
                onValueChange={value => setNewIssue({ ...newIssue, severity: value[0] })}
                className={cn("my-2", `severity-${newIssue.severity}`)}
              />

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Légère</span>
                <span>Modérée</span>
                <span>Critique</span>
              </div>
            </div>

            {/* Section Notes */}
            <div className="space-y-3">
              <Label htmlFor="notes" className="font-medium">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={newIssue.notes}
                onChange={e => setNewIssue({ ...newIssue, notes: e.target.value })}
                placeholder={`Détails sur ${newIssue.type === "dysfunction" ? "la dysfonction" : "la suspicion d'atteinte"}...`}
                className="resize-none"
                rows={3}
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
            disabled={!newIssue.region}
            className={cn(
              "gap-1",
              newIssue.type === "dysfunction" ? "bg-primary hover:bg-primary/90" : "bg-amber-500 hover:bg-amber-600"
            )}
          >
            <PlusIcon className="h-4 w-4" />
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
