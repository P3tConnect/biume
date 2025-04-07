"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { anatomicalRegions, anatomicalRegionsByCategory } from "./types"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PlusIcon, ActivityIcon, AlertCircleIcon } from "lucide-react"

interface AnatomicalIssue {
  type: "dysfunction" | "anatomicalSuspicion"
  region: string
  severity: number
  notes: string
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
  onAdd
}: AddAnatomicalIssueDialogProps) {
  // Détermine le titre et les libellés en fonction du type d'élément
  const getDialogTitle = () => {
    return issueType === "dysfunction"
      ? "Ajouter une dysfonction"
      : "Ajouter une suspicion d'atteinte anatomique"
  }

  const getDialogIcon = () => {
    return issueType === "dysfunction"
      ? <ActivityIcon className="h-5 w-5 text-primary mr-2" />
      : <AlertCircleIcon className="h-5 w-5 text-amber-500 mr-2" />
  }

  const getSeverityLabel = () => {
    return issueType === "dysfunction" ? "Sévérité" : "Indice de suspicion"
  }

  // Fonction pour obtenir le libellé d'un niveau de sévérité
  const getLevelLabel = (severity: number) => {
    switch (severity) {
      case 1: return "Légère"
      case 2: return "Modérée"
      case 3: return "Importante"
      case 4: return "Sévère"
      case 5: return "Critique"
      default: return "Modérée"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            {getDialogIcon()}
            {getDialogTitle()}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="region">Région anatomique</Label>
            <Select
              value={newIssue.region}
              onValueChange={(value) => setNewIssue({ ...newIssue, region: value })}
            >
              <SelectTrigger id="region">
                <SelectValue placeholder="Sélectionner une région" />
              </SelectTrigger>
              <SelectContent>
                {anatomicalRegionsByCategory.map((category) => (
                  <SelectGroup key={category.category}>
                    <SelectLabel>{category.category}</SelectLabel>
                    {category.items.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="severity">
              {getSeverityLabel()}: {getLevelLabel(newIssue.severity)}
            </Label>
            <Slider
              id="severity"
              value={[newIssue.severity]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => setNewIssue({ ...newIssue, severity: value[0] })}
              className="my-1"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Légère</span>
              <span>Modérée</span>
              <span>Critique</span>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={newIssue.notes}
              onChange={(e) => setNewIssue({ ...newIssue, notes: e.target.value })}
              placeholder={`Détails sur ${issueType === "dysfunction" ? "la dysfonction" : "la suspicion d'atteinte"}...`}
              className="resize-none"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button
            onClick={onAdd}
            disabled={!newIssue.region}
            className="gap-1"
          >
            <PlusIcon className="h-4 w-4" />
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 