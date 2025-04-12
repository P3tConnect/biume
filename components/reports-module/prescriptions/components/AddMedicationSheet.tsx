"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Plus, PlusCircle } from "lucide-react"

interface NewMedicationItem {
  name: string
  dosage: string
  frequency: string
  duration: string
  notes?: string
}

interface AddMedicationSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  newItem: NewMedicationItem
  setNewItem: (item: NewMedicationItem) => void
  onAdd: () => void
}

export function AddMedicationSheet({
  isOpen,
  onOpenChange,
  newItem,
  setNewItem,
  onAdd
}: AddMedicationSheetProps) {
  const updateField = (field: keyof NewMedicationItem, value: string) => {
    setNewItem({ ...newItem, [field]: value })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[450px] sm:w-[550px] overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center">
            <PlusCircle className="h-5 w-5 mr-2 text-primary" />
            Ajouter un médicament
          </SheetTitle>
          <SheetDescription>
            Complétez les informations du médicament à ajouter à l'ordonnance
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 py-4">
          <div className="space-y-4">
            <div>
              <Label>Nom du médicament*</Label>
              <Input
                value={newItem.name}
                onChange={e => updateField("name", e.target.value)}
                placeholder="ex: Amoxicilline"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Dosage*</Label>
              <Input
                value={newItem.dosage}
                onChange={e => updateField("dosage", e.target.value)}
                placeholder="ex: 500mg"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Fréquence*</Label>
              <Input
                value={newItem.frequency}
                onChange={e => updateField("frequency", e.target.value)}
                placeholder="ex: 2 fois par jour"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Durée*</Label>
              <Input
                value={newItem.duration}
                onChange={e => updateField("duration", e.target.value)}
                placeholder="ex: 7 jours"
                className="mt-1.5"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Notes et instructions spécifiques</Label>
              <Textarea
                value={newItem.notes}
                onChange={e => updateField("notes", e.target.value)}
                placeholder="Instructions spécifiques pour ce médicament..."
                className="resize-none h-32 mt-1.5"
              />
            </div>
          </div>
        </div>
        <SheetFooter className="pt-2 flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Annuler
          </Button>
          <Button
            onClick={onAdd}
            disabled={!newItem.name || !newItem.dosage || !newItem.frequency || !newItem.duration}
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter à l'ordonnance
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
} 