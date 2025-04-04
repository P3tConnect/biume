"use client"

import { useState, useEffect } from "react"
import { AnimalCredenza } from "@/components/dashboard/shortcuts/pro/unified-metrics/AnimalCredenza"
import { Header } from "./components/Header"
import { TabNavigation } from "./components/TabNavigation"
import { ObservationsTab } from "./components/ClinicalTab"
import { NotesTab } from "./components/NotesTab"
import { AddObservationSheet } from "./components/AddObservationSheet"
import { ReportPreview } from "./components/ReportPreview"
import { Observation, NewObservation, ObservationType, AppointmentReference } from "./components/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

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
  const [activeTab, setActiveTab] = useState<ObservationType | "notes">("staticObservation")
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  const [showInitDialog, setShowInitDialog] = useState(true)
  const [appointmentReference, setAppointmentReference] = useState<AppointmentReference | null>(null)
  const [diagnosisChecklist, setDiagnosisChecklist] = useState<string[]>([])

  // État temporaire pour la nouvelle observation
  const [newObservation, setNewObservation] = useState<NewObservation>({
    region: "",
    severity: 1,
    notes: "",
    type: "staticObservation",
  })

  // Simulons des données de rendez-vous pour la démo
  const mockAppointments = [
    { id: "apt-1", date: new Date().toLocaleDateString(), type: "Consultation standard" },
    { id: "apt-2", date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(), type: "Vaccination" },
    { id: "apt-3", date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString(), type: "Contrôle" },
  ]

  // Liste des points à vérifier pour le diagnostic d'exclusion
  const diagnosisCheckpoints = [
    { id: "cp-1", label: "Vérification des signes vitaux" },
    { id: "cp-2", label: "Examen des yeux" },
    { id: "cp-3", label: "Examen des oreilles" },
    { id: "cp-4", label: "Palpation du cou et de la gorge" },
    { id: "cp-5", label: "Auscultation cardiaque" },
    { id: "cp-6", label: "Auscultation pulmonaire" },
    { id: "cp-7", label: "Palpation abdominale" },
    { id: "cp-8", label: "Évaluation des membres" },
    { id: "cp-9", label: "Examen neurologique" },
    { id: "cp-10", label: "Prise de température" },
  ]

  // Mettre à jour le type d'observation dans le formulaire quand on change d'onglet
  useEffect(() => {
    if (activeTab !== "notes" && activeTab !== newObservation.type) {
      setNewObservation(prev => ({ ...prev, type: activeTab as ObservationType }))
    }
  }, [activeTab])

  const handleAddObservation = () => {
    if (!newObservation.region || !newObservation.type) return

    const observation: Observation = {
      id: crypto.randomUUID(),
      ...newObservation,
    }

    setObservations([...observations, observation])

    // Réinitialiser le formulaire mais garder le type
    setNewObservation({
      region: "",
      severity: 1,
      notes: "",
      type: newObservation.type,
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
      appointmentId: appointmentReference?.appointmentId,
      observations,
      notes,
      diagnosisChecklist,
    })

    // Message de succès et/ou redirection
  }

  const handleOpenAnimalSelector = () => {
    setIsAnimalCredenzaOpen(true)
  }

  const handleInitDialogComplete = () => {
    if (!selectedPetId || !appointmentReference?.appointmentId) return
    setShowInitDialog(false)
  }

  // Fonction pour gérer le changement d'onglet
  const handleTabChange = (
    tab: "staticObs" | "dynamicObs" | "dysfunctions" | "recommendations" | "notes" | "images"
  ) => {
    // Ignorer l'onglet "images" et rester sur l'onglet actuel
    if (tab === "images") return

    // Mapping des onglets de navigation vers les types d'observation
    const tabMapping: Record<string, ObservationType | "notes"> = {
      staticObs: "staticObservation",
      dynamicObs: "dynamicObservation",
      dysfunctions: "dysfunction",
      recommendations: "recommendation",
      notes: "notes",
    }

    setActiveTab(tabMapping[tab])
  }

  const handleToggleCheckpoint = (id: string) => {
    setDiagnosisChecklist(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
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
        canSave={!!title && !!selectedPetId && observations.length > 0 && appointmentReference !== null}
      />

      {/* Barre d'onglets */}
      <TabNavigation
        activeTab={
          activeTab === "staticObservation"
            ? "staticObs"
            : activeTab === "dynamicObservation"
              ? "dynamicObs"
              : activeTab === "dysfunction"
                ? "dysfunctions"
                : activeTab === "recommendation"
                  ? "recommendations"
                  : activeTab
        }
        setActiveTab={handleTabChange}
        showImagesTab={false}
      />

      {/* Contenu principal */}
      <div className="flex-1 p-4 overflow-hidden">
        {activeTab !== "notes" ? (
          <ObservationsTab
            observations={observations}
            activeType={activeTab as ObservationType}
            onRemoveObservation={handleRemoveObservation}
            onOpenAddSheet={() => setIsAddSheetOpen(true)}
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />
        ) : (
          <NotesTab notes={notes} setNotes={setNotes} />
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
      {isAnimalCredenzaOpen && (
        <AnimalCredenza isOpen={isAnimalCredenzaOpen} onOpenChange={setIsAnimalCredenzaOpen} petId={selectedPetId} />
      )}

      {/* Modale d'initialisation du rapport */}
      <Dialog open={showInitDialog} onOpenChange={setShowInitDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Initialisation du rapport médical</DialogTitle>
            <DialogDescription>Sélectionnez l'animal et le rendez-vous concerné par ce rapport</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="pet-select">Animal concerné</Label>
              <div className="flex items-center gap-2">
                <Select value={selectedPetId} onValueChange={setSelectedPetId}>
                  <SelectTrigger id="pet-select" className="w-full">
                    <SelectValue placeholder="Sélectionner un animal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pet-1">Rex (Chien)</SelectItem>
                    <SelectItem value="pet-2">Félix (Chat)</SelectItem>
                    <SelectItem value="pet-3">Bunny (Lapin)</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" onClick={handleOpenAnimalSelector} className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </Button>
              </div>
            </div>

            {selectedPetId && (
              <div className="space-y-2">
                <Label htmlFor="appointment-select">Rendez-vous associé</Label>
                <Select
                  value={appointmentReference?.appointmentId || ""}
                  onValueChange={value => setAppointmentReference({ appointmentId: value, petId: selectedPetId })}
                >
                  <SelectTrigger id="appointment-select">
                    <SelectValue placeholder="Sélectionner un rendez-vous" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAppointments.map(apt => (
                      <SelectItem key={apt.id} value={apt.id}>
                        {apt.date} - {apt.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedPetId && appointmentReference?.appointmentId && (
              <div className="space-y-3">
                <Label>Diagnostic d'exclusion</Label>
                <div className="border rounded-md p-3 max-h-[200px] overflow-y-auto">
                  <div className="space-y-2">
                    {diagnosisCheckpoints.map(checkpoint => (
                      <div key={checkpoint.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={checkpoint.id}
                          checked={diagnosisChecklist.includes(checkpoint.id)}
                          onCheckedChange={() => handleToggleCheckpoint(checkpoint.id)}
                        />
                        <label
                          htmlFor={checkpoint.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {checkpoint.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={handleInitDialogComplete}
              disabled={!selectedPetId || !appointmentReference?.appointmentId}
            >
              Continuer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
