"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody
} from "@/components/ui/credenza"
import {
  Clock,
  FileText,
  Plus,
  PlusCircle,
  Tablet,
  CalendarClock,
  Info,
  X,
  Pill
} from "lucide-react"
import { cn } from "@/src/lib/utils"
import { useEffect } from "react"

// Utilisation du même type que celui défini dans la server action
export interface NewMedicationItem {
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

  // Validation du formulaire
  const isFormValid = newItem.name && newItem.dosage && newItem.frequency && newItem.duration

  // Gérer l'ajout avec Enter dans les champs de saisie
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isFormValid) {
      e.preventDefault()
      onAdd()
    }
  }

  // Remettre à zéro le formulaire quand on ferme la modale sans ajouter
  useEffect(() => {
    if (!isOpen) {
      // Attendre un peu avant de réinitialiser les champs pour éviter une animation bizarre
      const timeout = setTimeout(() => {
        if (!isOpen) {
          setNewItem({
            name: "",
            dosage: "",
            frequency: "",
            duration: "",
            notes: ""
          })
        }
      }, 300)

      return () => clearTimeout(timeout)
    }
  }, [isOpen, setNewItem])

  return (
    <Credenza open={isOpen} onOpenChange={onOpenChange}>
      <CredenzaContent className="w-full p-0 md:max-w-[600px] overflow-hidden rounded-xl">
        <div className="flex flex-col h-full">
          {/* En-tête stylisé */}
          <div className="bg-primary py-6 px-6 relative">

            <div className="flex items-center space-x-4">
              <div className="bg-primary-foreground/10 p-3 rounded-full">
                <Pill className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary-foreground">Ajouter un médicament</h2>
                <p className="text-primary-foreground/80 text-sm mt-1">
                  Complétez les informations du médicament à ajouter à l'ordonnance
                </p>
              </div>
            </div>
          </div>

          {/* Corps avec fond blanc */}
          <div className="bg-background flex-1 px-6 py-6 overflow-y-auto max-h-[70vh]">
            <form onSubmit={(e) => { e.preventDefault(); isFormValid && onAdd(); }} className="space-y-6">
              {/* Champ Nom du médicament avec style spécial */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <Label htmlFor="medication-name" className="text-sm font-medium text-primary mb-2 block">
                  Nom du médicament*
                </Label>
                <div className="relative">
                  <Tablet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="medication-name"
                    value={newItem.name}
                    onChange={e => updateField("name", e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="ex: Amoxicilline"
                    className="pl-10 border-primary/20 focus-visible:ring-primary/30"
                    autoFocus
                  />
                </div>
              </div>

              {/* Groupe de 2 champs côte à côte */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg">
                  <Label htmlFor="dosage" className="text-sm font-medium block mb-2">
                    Dosage*
                  </Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dosage"
                      value={newItem.dosage}
                      onChange={e => updateField("dosage", e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="ex: 500mg"
                      className="pl-10 focus-visible:ring-primary/30"
                    />
                  </div>
                </div>

                <div className="rounded-lg">
                  <Label htmlFor="frequency" className="text-sm font-medium block mb-2">
                    Fréquence*
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="frequency"
                      value={newItem.frequency}
                      onChange={e => updateField("frequency", e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="ex: 2 fois par jour"
                      className="pl-10 focus-visible:ring-primary/30"
                    />
                  </div>
                </div>
              </div>

              {/* Durée */}
              <div className="rounded-lg">
                <Label htmlFor="duration" className="text-sm font-medium block mb-2">
                  Durée*
                </Label>
                <div className="relative">
                  <CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="duration"
                    value={newItem.duration}
                    onChange={e => updateField("duration", e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="ex: 7 jours"
                    className="pl-10 focus-visible:ring-primary/30"
                  />
                </div>
              </div>

              {/* Section Notes */}
              <div className="bg-muted/30 rounded-lg p-4 border">
                <Label htmlFor="notes" className="text-sm font-medium flex items-center gap-1.5 mb-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  Notes et instructions spécifiques
                </Label>
                <Textarea
                  id="notes"
                  value={newItem.notes}
                  onChange={e => updateField("notes", e.target.value)}
                  placeholder="Instructions spécifiques pour ce médicament..."
                  className="resize-none h-24 bg-background focus-visible:ring-primary/30"
                />
              </div>
            </form>
          </div>

          {/* Pied de page avec bouton d'action flottant */}
          <div className="bg-muted/20 border-t px-6 py-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="sm:order-1 order-2"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                onClick={onAdd}
                disabled={!isFormValid}
                className={cn(
                  "relative overflow-hidden transition-all sm:order-2 order-1",
                  isFormValid ? "bg-primary hover:bg-primary/90" : "bg-primary/60"
                )}
              >
                {isFormValid && (
                  <span className="absolute inset-0 flex items-center justify-center bg-white/10 opacity-0 hover:opacity-100 transition-opacity">
                    <Plus className="h-4 w-4" />
                  </span>
                )}
                Ajouter à l'ordonnance
              </Button>
            </div>
          </div>
        </div>
      </CredenzaContent>
    </Credenza>
  )
} 