"use client"

import { useState } from "react"
import { AnimalCredenza } from "@/components/dashboard/shortcuts/pro/unified-metrics/AnimalCredenza"
import { Header } from "./components/Header"
import { TabNavigation } from "./components/TabNavigation"
import { ClinicalTab } from "./components/ClinicalTab"
import { NotesTab } from "./components/NotesTab"
import { AddObservationSheet } from "./components/AddObservationSheet"
import { ReportPreview } from "./components/ReportPreview"
import { Observation, NewObservation } from "./components/types"

interface AdvancedReportBuilderProps {
  orgId: string
}

export function AdvancedReportBuilder({ orgId }: AdvancedReportBuilderProps) {
  const [title, setTitle] = useState("Compte rendu détaillé du " + new Date().toLocaleDateString())
  const [selectedPetId, setSelectedPetId] = useState<string>("")
  const [isAnimalCredenzaOpen, setIsAnimalCredenzaOpen] = useState(false)
  const [observations, setObservations] = useState<Observation[]>([])
  const [notes, setNotes] = useState("")
  const [selectedView, setSelectedView] = useState<"left" | "right">("left")
  const [showPreview, setShowPreview] = useState(false)
  const [activeTab, setActiveTab] = useState<"clinical" | "notes">("clinical")
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)

  // État temporaire pour la nouvelle observation
  const [newObservation, setNewObservation] = useState<NewObservation>({
    region: "",
    severity: 1,
    notes: ""
  })

  const handleAddObservation = () => {
    if (!newObservation.region) return

    const observation: Observation = {
      id: crypto.randomUUID(),
      ...newObservation
    }

    setObservations([...observations, observation])

    // Réinitialiser le formulaire
    setNewObservation({
      region: "",
      severity: 1,
      notes: ""
    })

    // Fermer le sheet
    setIsAddSheetOpen(false)
  }

  const handleRemoveObservation = (id: string) => {
    setObservations(observations.filter(obs => obs.id !== id))
  }

  const handleSaveReport = () => {
    // Ici on appellerait une server action pour sauvegarder le rapport
    console.log({
      title,
      petId: selectedPetId,
      observations,
      notes
    })

    // Message de succès et/ou redirection
  }

  const handleOpenAnimalSelector = () => {
    setIsAnimalCredenzaOpen(true)
  }

  // Fonction pour gérer le changement d'onglet de manière sécurisée
  const handleTabChange = (tab: "clinical" | "images" | "notes") => {
    // Ignorer l'onglet "images" et rester sur l'onglet actuel
    if (tab === "images") return
    setActiveTab(tab as "clinical" | "notes")
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
        onSave={handleSaveReport}
        canSave={!!title && !!selectedPetId && observations.length > 0}
      />

      {/* Barre d'onglets */}
      <TabNavigation
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        showImagesTab={false}
      />

      {/* Contenu principal */}
      <div className="flex-1 p-4 overflow-hidden">
        {activeTab === "clinical" ? (
          <ClinicalTab
            observations={observations}
            onRemoveObservation={handleRemoveObservation}
            onOpenAddSheet={() => setIsAddSheetOpen(true)}
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />
        ) : (
          <NotesTab
            notes={notes}
            setNotes={setNotes}
          />
        )}
      </div>

      {/* Sheet pour ajouter une observation */}
      <AddObservationSheet
        isOpen={isAddSheetOpen}
        onOpenChange={setIsAddSheetOpen}
        newObservation={newObservation}
        setNewObservation={setNewObservation}
        onAdd={handleAddObservation}
      />

      {/* Modale de prévisualisation */}
      <ReportPreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title={title}
        observations={observations}
        notes={notes}
        images={[]}
      />

      {/* Modale de sélection d'animal */}
      {isAnimalCredenzaOpen && selectedPetId && (
        <AnimalCredenza
          isOpen={isAnimalCredenzaOpen}
          onOpenChange={setIsAnimalCredenzaOpen}
          petId={selectedPetId}
        />
      )}
    </div>
  )
}
