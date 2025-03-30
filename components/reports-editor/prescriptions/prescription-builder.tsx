"use client"

import { useState } from "react"
import { AnimalCredenza } from "@/components/dashboard/shortcuts/pro/unified-metrics/AnimalCredenza"
import { Header } from "./components/Header"
import { TabNavigation } from "./components/TabNavigation"
import { MedicationsTab } from "./components/MedicationsTab"
import { NotesTab } from "./components/NotesTab"
import { AddMedicationSheet } from "./components/AddMedicationSheet"
import { PrescriptionPreview } from "./components/PrescriptionPreview"
import { PrescriptionItem, NewPrescriptionItem } from "./components/types"

interface PrescriptionBuilderProps {
  orgId: string
}

export function PrescriptionBuilder({ orgId }: PrescriptionBuilderProps) {
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

  return (
    <div className="h-full w-full bg-background flex flex-col">
      {/* En-tête compact */}
      <Header
        title={title}
        setTitle={setTitle}
        selectedPetId={selectedPetId}
        setSelectedPetId={setSelectedPetId}
        onOpenAnimalSelector={handleOpenAnimalSelector}
        onOpenPreview={() => setShowPreview(true)}
        onSave={handleSavePrescription}
        canSave={!!title && !!selectedPetId && items.length > 0}
      />

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
