"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnimalCredenza } from "@/components/dashboard/shortcuts/pro/unified-metrics/AnimalCredenza"
import { TabNavigation } from "./components/TabNavigation"
import { MedicationsTab } from "./components/MedicationsTab"
import { NotesTab } from "./components/NotesTab"
import { AddMedicationSheet } from "./components/AddMedicationSheet"
import { PrescriptionPreview } from "./components/PrescriptionPreview"
import { PrescriptionItem, NewPrescriptionItem } from "./components/types"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, EyeIcon, SaveIcon } from "lucide-react"

interface PrescriptionBuilderProps {
  orgId: string
}

// Mock pet data structure (replace with actual data fetching later)
const mockPets = [
  { id: "pet-1", name: "Rex", species: "Chien" },
  { id: "pet-2", name: "Félix", species: "Chat" },
  { id: "pet-3", name: "Bunny", species: "Lapin" },
]

export function PrescriptionBuilder({ orgId }: PrescriptionBuilderProps) {
  const router = useRouter()
  const [title, setTitle] = useState("Ordonnance du " + new Date().toLocaleDateString())
  const [selectedPetId, setSelectedPetId] = useState<string>("")
  const [isAnimalCredenzaOpen, setIsAnimalCredenzaOpen] = useState(false)
  const [items, setItems] = useState<PrescriptionItem[]>([])
  const [notes, setNotes] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [activeTab, setActiveTab] = useState<"medications" | "notes">("medications")
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)

  // État temporaire pour le nouveau médicament
  const [newItem, setNewItem] = useState<NewPrescriptionItem>({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    notes: ""
  })

  // Find the selected pet from mock data
  const selectedPet = mockPets.find(pet => pet.id === selectedPetId)

  const handleAddItem = () => {
    if (!newItem.name) return

    const item: PrescriptionItem = {
      id: crypto.randomUUID(),
      ...newItem
    }

    setItems([...items, item])

    // Réinitialiser le formulaire
    setNewItem({
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      notes: ""
    })

    // Fermer le sheet
    setIsAddSheetOpen(false)
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleSavePrescription = () => {
    // Ici on appellerait une server action pour sauvegarder l'ordonnance
    console.log({
      title,
      petId: selectedPetId,
      items,
      notes,
    })

    // Message de succès et/ou redirection
  }

  const handleOpenAnimalSelector = () => {
    setIsAnimalCredenzaOpen(true)
  }

  const handleOpenAddSheet = () => {
    setIsAddSheetOpen(true)
  }

  // Added function to handle back navigation
  const handleGoBack = () => {
    // Add confirmation logic if needed
    router.back()
  }

  // Determine if the save button should be enabled
  const canSave = !!title && !!selectedPetId && items.length > 0

  return (
    <div className="h-full w-full bg-background flex flex-col">
      {/* New Header Structure */}
      <div className="flex items-center justify-between border-b px-6 py-3">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleGoBack}>
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>
          <div>
            {/* Display title using state, maybe make it editable differently later */}
            <h1 className="text-xl font-semibold">{title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {selectedPet ? (
                <button onClick={() => setIsAnimalCredenzaOpen(true)} className="hover:underline">
                  {selectedPet.name} ({selectedPet.species})
                </button>
              ) : (
                <button onClick={() => setIsAnimalCredenzaOpen(true)} className="text-primary hover:underline">
                  Sélectionner un animal
                </button>
              )}
              {/* Maybe add appointment info later if needed */}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowPreview(true)}>
            <EyeIcon className="h-4 w-4 mr-1" />
            Aperçu
          </Button>
          <Button onClick={handleSavePrescription} disabled={!canSave}>
            <SaveIcon className="h-4 w-4 mr-1" />
            Enregistrer
          </Button>
        </div>
      </div>
      {/* End New Header Structure */}

      {/* Barre d'onglets */}
      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAddMedication={handleOpenAddSheet}
      />

      {/* Contenu principal */}
      <div className="flex-1 p-4 h-[calc(100vh-104px)] overflow-hidden">
        {activeTab === "medications" ? (
          <MedicationsTab
            selectedPetId={selectedPetId}
            items={items}
            onRemoveItem={handleRemoveItem}
          />
        ) : (
          <NotesTab
            notes={notes}
            setNotes={setNotes}
          />
        )}
      </div>

      {/* Sheet pour ajouter un médicament */}
      <AddMedicationSheet
        isOpen={isAddSheetOpen}
        onOpenChange={setIsAddSheetOpen}
        newItem={newItem}
        setNewItem={setNewItem}
        onAdd={handleAddItem}
      />

      {/* Modale de prévisualisation */}
      <PrescriptionPreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title={title}
        items={items}
        notes={notes}
      />

      {/* Modale de sélection d'animal */}
      {selectedPetId && (
        <AnimalCredenza isOpen={isAnimalCredenzaOpen} onOpenChange={setIsAnimalCredenzaOpen} petId={selectedPetId} />
      )}
    </div>
  )
}
