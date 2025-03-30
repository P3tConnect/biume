"use client"

import { useState } from "react"
import { AnimalCredenza } from "@/components/dashboard/shortcuts/pro/unified-metrics/AnimalCredenza"
import { Header } from "./components/Header"
import { TabNavigation } from "./components/TabNavigation"
import { ItemsTab } from "./components/ItemsTab"
import { ImagesTab } from "./components/ImagesTab"
import { NotesTab } from "./components/NotesTab"
import { AddItemSheet } from "./components/AddItemSheet"
import { ReportPreview } from "./components/ReportPreview"
import { FileText } from "lucide-react"
import { ReportItem, NewReportItem, Observation } from "./components/types"

interface SimpleReportBuilderProps {
  orgId: string
}

export function SimpleReportBuilder({ orgId }: SimpleReportBuilderProps) {
  const [title, setTitle] = useState("Compte rendu de visite du " + new Date().toLocaleDateString())
  const [selectedPetId, setSelectedPetId] = useState<string>("")
  const [isAnimalCredenzaOpen, setIsAnimalCredenzaOpen] = useState(false)
  const [items, setItems] = useState<ReportItem[]>([])
  const [notes, setNotes] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [activeTab, setActiveTab] = useState<"clinical" | "images" | "notes">("clinical")
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [observations, setObservations] = useState<Observation[]>([])

  // État temporaire pour le nouvel élément
  const [newItem, setNewItem] = useState<NewReportItem>({
    type: "observation",
    content: ""
  })

  const handleAddItem = () => {
    if (!newItem.content) return

    const item: ReportItem = {
      id: crypto.randomUUID(),
      ...newItem
    }

    setItems([...items, item])

    // Réinitialiser le formulaire
    setNewItem({
      type: "observation",
      content: ""
    })

    // Fermer le sheet
    setIsAddSheetOpen(false)
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files)
      const validFiles = newFiles.filter(file => file.type.startsWith("image/"))

      if (validFiles.length !== newFiles.length) {
        // Gestion d'erreur: certains fichiers ne sont pas des images
        console.error("Certains fichiers sélectionnés ne sont pas des images")
      }

      const fileUrls = validFiles.map(file => URL.createObjectURL(file))

      setSelectedFiles(prev => [...prev, ...validFiles])
      setPreviewUrls(prev => [...prev, ...fileUrls])
    }
  }

  const handleRemoveFile = (index: number) => {
    URL.revokeObjectURL(previewUrls[index])
    setPreviewUrls(prev => prev.filter((_, i) => i !== index))
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSaveReport = () => {
    // Ici on appellerait une server action pour sauvegarder le rapport
    console.log({
      title,
      petId: selectedPetId,
      items,
      notes,
      images: selectedFiles.map(file => file.name),
    })

    // Message de succès et/ou redirection
  }

  const handleOpenAnimalSelector = () => {
    setIsAnimalCredenzaOpen(true)
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
        canSave={!!title && !!selectedPetId && items.length > 0}
      />

      {/* Barre d'onglets */}
      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showImagesTab={true}
      />

      {/* Contenu principal */}
      <div className="flex-1 p-4 overflow-hidden">
        {activeTab === "clinical" ? (
          <ItemsTab
            items={items}
            onRemoveItem={handleRemoveItem}
            onOpenAddSheet={() => setIsAddSheetOpen(true)}
          />
        ) : activeTab === "images" ? (
          <ImagesTab
            previewUrls={previewUrls}
            onFileChange={handleFileChange}
            onRemoveFile={handleRemoveFile}
          />
        ) : (
          <NotesTab
            notes={notes}
            setNotes={setNotes}
          />
        )}
      </div>

      {/* Sheet pour ajouter un élément */}
      <AddItemSheet
        isOpen={isAddSheetOpen}
        onOpenChange={setIsAddSheetOpen}
        newItem={newItem}
        setNewItem={setNewItem}
        onAdd={handleAddItem}
      />

      {/* Modale de prévisualisation */}
      <ReportPreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title={title}
        observations={observations}
        notes={notes}
        images={previewUrls}
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
