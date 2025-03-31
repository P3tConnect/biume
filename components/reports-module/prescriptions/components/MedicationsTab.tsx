"use client"

import { AlertCircle, FileText } from "lucide-react"
import { MedicationCard } from "./MedicationCard"

interface PrescriptionItem {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  notes?: string
}

interface MedicationsTabProps {
  selectedPetId: string
  items: PrescriptionItem[]
  onRemoveItem: (id: string) => void
}

export function MedicationsTab({
  selectedPetId,
  items,
  onRemoveItem
}: MedicationsTabProps) {
  return (
    <div className="flex flex-col h-full">
      {/* En-tête d'information */}
      {!selectedPetId && (
        <div className="bg-muted/50 rounded-lg p-3 mb-4 flex items-center text-sm text-muted-foreground">
          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>Veuillez sélectionner un animal pour l'ordonnance</span>
        </div>
      )}

      {/* Liste des médicaments */}
      <div className="flex-1 overflow-auto">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map(item => (
              <MedicationCard
                key={item.id}
                id={item.id}
                name={item.name}
                dosage={item.dosage}
                frequency={item.frequency}
                duration={item.duration}
                notes={item.notes}
                onRemove={onRemoveItem}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 bg-muted/20 rounded-lg border border-dashed">
            <FileText className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-center">
              Aucun médicament ajouté à l'ordonnance
            </p>
            <p className="text-xs text-muted-foreground/70">
              Utilisez le bouton en haut pour ajouter des médicaments
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 