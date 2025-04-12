"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ObservationsTab } from "./components/ClinicalTab"
import { NotesTab } from "./components/NotesTab"
import { RecommendationsTab } from "./components/RecommendationsTab"
import { AnatomicalEvaluationTab } from "./components/AnatomicalEvaluationTab"
import { AddObservationDialog } from "./components/AddObservationDialog"
import { ReportPreview } from "./components/ReportPreview"
import { InitializationDialog } from "./components/InitializationDialog"
import { ExitConfirmationDialog } from "./components/ExitConfirmationDialog"
import { ReportHeader } from "./components/ReportHeader"
import { Observation, NewObservation, AppointmentReference, AnatomicalIssue, AdvancedReportBuilderProps } from "./types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { ListTodoIcon, ActivityIcon, CheckIcon, FileTextIcon, PlusIcon } from "lucide-react"

export function AdvancedReportBuilder({ orgId }: AdvancedReportBuilderProps) {
  const [title, setTitle] = useState("Compte rendu détaillé du " + new Date().toLocaleDateString())
  const router = useRouter()
  const [selectedPetId, setSelectedPetId] = useState<string>("")
  const [observations, setObservations] = useState<Observation[]>([])
  const [notes, setNotes] = useState("")
  const [selectedView, setSelectedView] = useState<"left" | "right">("left")
  const [showPreview, setShowPreview] = useState(false)
  const [activeTab, setActiveTab] = useState<"clinical" | "notes" | "recommendations" | "anatomical">("clinical")
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  const [showInitDialog, setShowInitDialog] = useState(true)
  const [appointmentReference, setAppointmentReference] = useState<AppointmentReference | null>(null)
  const [consultationReason, setConsultationReason] = useState<string>("")
  const [recommendations, setRecommendations] = useState<{ id: string; content: string }[]>([])
  const [anatomicalIssues, setAnatomicalIssues] = useState<AnatomicalIssue[]>([])
  const [showExitConfirmDialog, setShowExitConfirmDialog] = useState(false)
  const [isAddAnatomicalIssueOpen, setIsAddAnatomicalIssueOpen] = useState(false)
  const [activeObservationType, setActiveObservationType] = useState<"staticObservation" | "dynamicObservation">("staticObservation")

  // État temporaire pour la nouvelle observation
  const [newObservation, setNewObservation] = useState<NewObservation>({
    region: "",
    severity: 1,
    notes: "",
    type: "staticObservation",
    dysfunctionType: undefined,
    interventionZone: undefined
  })

  const handleAddObservation = () => {
    if (!newObservation.region || !newObservation.type) return

    const observation: Observation = {
      id: crypto.randomUUID(),
      ...newObservation,
    }

    setObservations([...observations, observation])
    setNewObservation({
      region: "",
      severity: 1,
      notes: "",
      type: newObservation.type,
      dysfunctionType: undefined,
      interventionZone: undefined,
    })
    setIsAddSheetOpen(false)
  }

  const handleRemoveObservation = (id: string) => {
    setObservations(observations.filter(obs => obs.id !== id))
  }

  const handleSaveReport = () => {
    console.log({
      title,
      petId: selectedPetId,
      appointmentId: appointmentReference?.appointmentId,
      observations,
      notes,
      consultationReason,
    })
  }

  const handleInitComplete = () => {
    if (!selectedPetId || !appointmentReference?.appointmentId) return
    setShowInitDialog(false)
  }

  const handleTabChange = (tab: "clinical" | "notes" | "recommendations" | "anatomical") => {
    setActiveTab(tab)
  }

  const handleAddAnatomicalIssue = (issue: Omit<AnatomicalIssue, "id">) => {
    const newIssue: AnatomicalIssue = {
      id: crypto.randomUUID(),
      ...issue,
      laterality: issue.laterality || "left"
    }
    setAnatomicalIssues([...anatomicalIssues, newIssue])
  }

  const selectedPet = [
    { id: "pet-1", name: "Rex", species: "Chien" },
    { id: "pet-2", name: "Félix", species: "Chat" },
    { id: "pet-3", name: "Bunny", species: "Lapin" },
  ].find(pet => pet.id === selectedPetId)

  const selectedAppointment = [
    { id: "apt-1", date: new Date().toLocaleDateString(), type: "Consultation standard" },
    { id: "apt-2", date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(), type: "Vaccination" },
    { id: "apt-3", date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString(), type: "Contrôle" },
  ].find(apt => apt.id === appointmentReference?.appointmentId)

  const handleGoBack = () => {
    if (
      observations.length > 0 ||
      notes.trim().length > 0 ||
      recommendations.length > 0 ||
      anatomicalIssues.length > 0
    ) {
      setShowExitConfirmDialog(true)
    } else {
      navigateBack()
    }
  }

  const navigateBack = () => {
    router.back()
  }

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <ReportHeader
        title={title}
        selectedPet={selectedPet}
        selectedAppointment={selectedAppointment}
        handleGoBack={handleGoBack}
        setShowPreview={setShowPreview}
        handleSaveReport={handleSaveReport}
      />

      <div className="flex-1 overflow-hidden flex flex-col px-2 pb-6">
        <Card className="flex-1 overflow-hidden shadow border">
          <Tabs
            defaultValue="clinical"
            value={activeTab}
            onValueChange={val => handleTabChange(val as "clinical" | "notes" | "recommendations" | "anatomical")}
            className="h-full flex flex-col"
          >
            <div className="px-6 py-3 border-b">
              <TabsList className="grid grid-cols-4 max-w-3xl mx-auto">
                <TabsTrigger value="clinical" className="flex items-center gap-1.5">
                  <ListTodoIcon className="h-4 w-4" />
                  Observations
                </TabsTrigger>
                <TabsTrigger value="anatomical" className="flex items-center gap-1.5">
                  <ActivityIcon className="h-4 w-4" />
                  Évaluation anatomique
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="flex items-center gap-1.5">
                  <CheckIcon className="h-4 w-4" />
                  Conseils
                </TabsTrigger>
                <TabsTrigger value="notes" className="flex items-center gap-1.5">
                  <FileTextIcon className="h-4 w-4" />
                  Notes
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <TabsContent value="clinical" className="h-full mt-0 border-none">
                <ObservationsTab
                  observations={observations}
                  activeType={activeObservationType}
                  onRemoveObservation={handleRemoveObservation}
                  onOpenAddSheet={() => setIsAddSheetOpen(true)}
                  selectedView={selectedView}
                  setSelectedView={setSelectedView}
                />
              </TabsContent>

              <TabsContent value="anatomical" className="h-full mt-0 border-none">
                <AnatomicalEvaluationTab
                  dysfunctions={anatomicalIssues}
                  setDysfunctions={setAnatomicalIssues}
                  onAddDysfunction={handleAddAnatomicalIssue}
                  isAddModalOpen={isAddAnatomicalIssueOpen}
                  setIsAddModalOpen={setIsAddAnatomicalIssueOpen}
                />
              </TabsContent>

              <TabsContent value="recommendations" className="h-full mt-0 border-none">
                <RecommendationsTab recommendations={recommendations} setRecommendations={setRecommendations} />
              </TabsContent>

              <TabsContent value="notes" className="h-full mt-0 border-none">
                <NotesTab notes={notes} setNotes={setNotes} />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>

      <InitializationDialog
        showInitDialog={showInitDialog}
        setShowInitDialog={setShowInitDialog}
        selectedPetId={selectedPetId}
        setSelectedPetId={setSelectedPetId}
        appointmentReference={appointmentReference}
        setAppointmentReference={setAppointmentReference}
        consultationReason={consultationReason}
        setConsultationReason={setConsultationReason}
        onComplete={handleInitComplete}
      />

      <ExitConfirmationDialog
        showExitConfirmDialog={showExitConfirmDialog}
        setShowExitConfirmDialog={setShowExitConfirmDialog}
        onConfirmExit={navigateBack}
      />

      <AddObservationDialog
        isOpen={isAddSheetOpen}
        onOpenChange={setIsAddSheetOpen}
        newObservation={newObservation}
        setNewObservation={setNewObservation}
        onAdd={handleAddObservation}
      />

      <ReportPreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title={title}
        observations={observations}
        notes={notes}
        recommendations={recommendations}
        anatomicalIssues={anatomicalIssues}
        images={[]}
      />
    </div>
  )
}
