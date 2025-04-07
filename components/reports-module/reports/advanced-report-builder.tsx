"use client"

import { useState, useEffect } from "react"
import { AnimalCredenza } from "@/components/dashboard/shortcuts/pro/unified-metrics/AnimalCredenza"
import { ObservationsTab } from "./components/ClinicalTab"
import { NotesTab } from "./components/NotesTab"
import { RecommendationsTab } from "./components/RecommendationsTab"
import { AnatomicalEvaluationTab } from "./components/AnatomicalEvaluationTab"
import { AddObservationDialog } from "./components/AddObservationDialog"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PawPrintIcon,
  CalendarIcon,
  ClipboardIcon,
  CheckIcon,
  EyeIcon,
  SaveIcon,
  PenIcon,
  PlusIcon,
  FileTextIcon,
  ListTodoIcon,
  XIcon,
  AlertCircleIcon,
  ActivityIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface AdvancedReportBuilderProps {
  orgId: string
}

// Interface pour les problèmes anatomiques (dysfonctions et suspicions)
interface AnatomicalIssue {
  id: string
  type: "dysfunction" | "anatomicalSuspicion"
  region: string
  severity: number
  notes: string
}

export function AdvancedReportBuilder({ orgId }: AdvancedReportBuilderProps) {
  const [title, setTitle] = useState("Compte rendu détaillé du " + new Date().toLocaleDateString())
  const router = useRouter()
  const [selectedPetId, setSelectedPetId] = useState<string>("")
  const [isAnimalCredenzaOpen, setIsAnimalCredenzaOpen] = useState(false)
  const [observations, setObservations] = useState<Observation[]>([])
  const [notes, setNotes] = useState("")
  const [selectedView, setSelectedView] = useState<"left" | "right">("left")
  const [showPreview, setShowPreview] = useState(false)
  const [activeTab, setActiveTab] = useState<"clinical" | "notes" | "recommendations" | "anatomical">("clinical")
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  const [isAddAnatomicalIssueOpen, setIsAddAnatomicalIssueOpen] = useState(false)
  const [showInitDialog, setShowInitDialog] = useState(true)
  const [appointmentReference, setAppointmentReference] = useState<AppointmentReference | null>(null)
  const [diagnosisChecklist, setDiagnosisChecklist] = useState<string[]>([])
  const [consultationReason, setConsultationReason] = useState<string>("")
  const [step, setStep] = useState<"init" | "details" | "review">("init")
  const [recommendations, setRecommendations] = useState<{ id: string; content: string }[]>([])
  const [anatomicalIssues, setAnatomicalIssues] = useState<AnatomicalIssue[]>([])
  const [showExitConfirmDialog, setShowExitConfirmDialog] = useState(false)

  // État temporaire pour la nouvelle observation
  const [newObservation, setNewObservation] = useState<NewObservation>({
    region: "",
    severity: 1,
    notes: "",
    type: "staticObservation",
    dysfunctionType: undefined,
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

  const handleAddObservation = () => {
    if (!newObservation.region || !newObservation.type) return

    // Vérifier que le type de dysfonction est défini si c'est une dysfonction
    if (newObservation.type === "dysfunction" && !newObservation.dysfunctionType) return

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
      dysfunctionType: newObservation.type === "dysfunction" ? newObservation.dysfunctionType : undefined,
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
      consultationReason,
    })

    // Message de succès et/ou redirection
  }

  const handleOpenAnimalSelector = () => {
    setIsAnimalCredenzaOpen(true)
  }

  const handleInitComplete = () => {
    if (!selectedPetId || !appointmentReference?.appointmentId) return
    setShowInitDialog(false)
    setStep("details")
  }

  const handleToggleCheckpoint = (id: string) => {
    setDiagnosisChecklist(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
  }

  const handleTabChange = (tab: "clinical" | "notes" | "recommendations" | "anatomical") => {
    setActiveTab(tab)
  }

  const handleAddAnatomicalIssue = (issue: Omit<AnatomicalIssue, "id">) => {
    const newIssue: AnatomicalIssue = {
      id: crypto.randomUUID(),
      ...issue,
    }

    setAnatomicalIssues([...anatomicalIssues, newIssue])
  }

  const selectedPet = [
    { id: "pet-1", name: "Rex", species: "Chien" },
    { id: "pet-2", name: "Félix", species: "Chat" },
    { id: "pet-3", name: "Bunny", species: "Lapin" },
  ].find(pet => pet.id === selectedPetId)

  const selectedAppointment = mockAppointments.find(apt => apt.id === appointmentReference?.appointmentId)

  const handleGoBack = () => {
    // Vérifier s'il y a des modifications non enregistrées
    if (
      observations.length > 0 ||
      notes.trim().length > 0 ||
      recommendations.length > 0 ||
      anatomicalIssues.length > 0
    ) {
      setShowExitConfirmDialog(true)
    } else {
      // Rediriger directement s'il n'y a pas de modifications
      navigateBack()
    }
  }

  const navigateBack = () => {
    router.back()
  }

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      {/* En-tête amélioré avec Card */}
      <Card className="mb-4 border shadow">
        <CardHeader className="pb-0 flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleGoBack} className="rounded-full hover:bg-primary/10">
                  <ChevronLeftIcon className="h-5 w-5 text-primary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Retour au tableau de bord</TooltipContent>
            </Tooltip>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-xl">Rédaction de rapport médical</CardTitle>
              <CardDescription>
                Créez un rapport médical complet avec observations cliniques, recommandations et notes
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setShowPreview(true)}>
                  <EyeIcon className="h-4 w-4 mr-1" />
                  Aperçu
                </Button>
              </TooltipTrigger>
              <TooltipContent>Prévisualiser le rapport</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  onClick={handleSaveReport}
                  disabled={!title || !selectedPetId || observations.length === 0 || !appointmentReference}
                >
                  <SaveIcon className="h-4 w-4 mr-1" />
                  Enregistrer
                </Button>
              </TooltipTrigger>
              <TooltipContent>Enregistrer le rapport</TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>
        <CardContent className="pt-4 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <ClipboardIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="text-xl font-semibold border-none bg-transparent focus-visible:ring-1 focus-visible:ring-offset-0 p-0 h-auto"
                placeholder="Titre du rapport..."
              />
              <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                {selectedPet ? (
                  <>
                    <PawPrintIcon className="h-3.5 w-3.5" />
                    <span>
                      {selectedPet.name} ({selectedPet.species})
                    </span>
                    {selectedAppointment && (
                      <>
                        <span className="mx-1">•</span>
                        <CalendarIcon className="h-3.5 w-3.5" />
                        <span>
                          {selectedAppointment.date} - {selectedAppointment.type}
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <span className="text-muted-foreground/80 italic">Aucun animal sélectionné</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contenu principal avec onglets */}
      <div className="flex-1 overflow-hidden flex flex-col px-2 pb-6">
        {/* Interface principale */}
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
                <div className="h-full flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Observations cliniques</h2>
                    <Button onClick={() => setIsAddSheetOpen(true)} className="gap-1">
                      <PlusIcon className="h-4 w-4" />
                      Ajouter une observation
                    </Button>
                  </div>

                  {observations.length === 0 ? (
                    <Card className="border-dashed flex-1 flex items-center justify-center">
                      <CardContent className="text-center py-10">
                        <div className="mx-auto rounded-full bg-muted w-12 h-12 flex items-center justify-center mb-3">
                          <ClipboardIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Aucune observation</h3>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
                          Ajoutez des observations cliniques pour commencer à constituer le rapport médical.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="flex-1 overflow-auto">
                      <Tabs defaultValue="staticObservation" className="w-full">
                        <TabsList className="w-full justify-start mb-4 overflow-x-auto">
                          <TabsTrigger value="staticObservation">Observations statiques</TabsTrigger>
                          <TabsTrigger value="dynamicObservation">Observations dynamiques</TabsTrigger>
                          <TabsTrigger value="dysfunction">Dysfonctions</TabsTrigger>
                          <TabsTrigger value="recommendation">Recommandations</TabsTrigger>
                        </TabsList>

                        <TabsContent value="staticObservation">
                          <ObservationsTab
                            observations={observations}
                            activeType="staticObservation"
                            onRemoveObservation={handleRemoveObservation}
                            onOpenAddSheet={() => {
                              setNewObservation(prev => ({ ...prev, type: "staticObservation" }))
                              setIsAddSheetOpen(true)
                            }}
                            selectedView={selectedView}
                            setSelectedView={setSelectedView}
                          />
                        </TabsContent>

                        <TabsContent value="dynamicObservation">
                          <ObservationsTab
                            observations={observations}
                            activeType="dynamicObservation"
                            onRemoveObservation={handleRemoveObservation}
                            onOpenAddSheet={() => {
                              setNewObservation(prev => ({ ...prev, type: "dynamicObservation" }))
                              setIsAddSheetOpen(true)
                            }}
                            selectedView={selectedView}
                            setSelectedView={setSelectedView}
                          />
                        </TabsContent>

                        <TabsContent value="dysfunction">
                          <ObservationsTab
                            observations={observations}
                            activeType="dysfunction"
                            onRemoveObservation={handleRemoveObservation}
                            onOpenAddSheet={() => {
                              setNewObservation(prev => ({ ...prev, type: "dysfunction" }))
                              setIsAddSheetOpen(true)
                            }}
                            selectedView={selectedView}
                            setSelectedView={setSelectedView}
                          />
                        </TabsContent>

                        <TabsContent value="recommendation">
                          <ObservationsTab
                            observations={observations}
                            activeType="recommendation"
                            onRemoveObservation={handleRemoveObservation}
                            onOpenAddSheet={() => {
                              setNewObservation(prev => ({ ...prev, type: "recommendation" }))
                              setIsAddSheetOpen(true)
                            }}
                            selectedView={selectedView}
                            setSelectedView={setSelectedView}
                          />
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="anatomical" className="h-full mt-0 border-none">
                <div className="h-full flex flex-col gap-4">
                  <AnatomicalEvaluationTab
                    dysfunctions={anatomicalIssues}
                    setDysfunctions={setAnatomicalIssues}
                    onAddDysfunction={handleAddAnatomicalIssue}
                    isAddModalOpen={isAddAnatomicalIssueOpen}
                    setIsAddModalOpen={setIsAddAnatomicalIssueOpen}
                  />
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="h-full mt-0 border-none">
                <div className="h-full flex flex-col gap-4">
                  <h2 className="text-lg font-semibold">Conseils et recommandations</h2>
                  <RecommendationsTab recommendations={recommendations} setRecommendations={setRecommendations} />
                </div>
              </TabsContent>

              <TabsContent value="notes" className="h-full mt-0 border-none">
                <div className="h-full flex flex-col gap-4">
                  <h2 className="text-lg font-semibold">Notes complémentaires</h2>
                  <NotesTab notes={notes} setNotes={setNotes} />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>

      {/* Dialogue de confirmation pour quitter */}
      <Dialog open={showExitConfirmDialog} onOpenChange={setShowExitConfirmDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircleIcon className="h-5 w-5 text-amber-500" />
              Retour au tableau de bord
            </DialogTitle>
            <DialogDescription>
              Vous avez des modifications non enregistrées. Si vous retournez au tableau de bord, toutes vos
              modifications seront perdues.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setShowExitConfirmDialog(false)}>
              Continuer l'édition
            </Button>
            <Button variant="destructive" onClick={navigateBack}>
              Retourner au tableau de bord
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue modal pour ajouter une observation */}
      <AddObservationDialog
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
        recommendations={recommendations}
        anatomicalIssues={anatomicalIssues}
        images={[]}
      />

      {/* Modale de sélection d'animal */}
      {isAnimalCredenzaOpen && (
        <AnimalCredenza isOpen={isAnimalCredenzaOpen} onOpenChange={setIsAnimalCredenzaOpen} petId={selectedPetId} />
      )}

      {/* Modale d'initialisation du rapport */}
      <Dialog open={showInitDialog} onOpenChange={value => (value ? setShowInitDialog(true) : null)}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <ClipboardIcon className="h-5 w-5 text-primary" />
              Initialisation du rapport médical
            </DialogTitle>
            <DialogDescription className="text-base">
              Sélectionnez l'animal et le rendez-vous concerné par ce rapport
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <PawPrintIcon className="h-4 w-4 text-primary" />
                  Animal concerné
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Select value={selectedPetId} onValueChange={setSelectedPetId}>
                    <SelectTrigger id="pet-select">
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
              </CardContent>
            </Card>

            {selectedPetId && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    Rendez-vous associé
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            )}

            {selectedPetId && appointmentReference?.appointmentId && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Motif de la séance
                  </CardTitle>
                  <CardDescription>Indiquez le motif principal de la consultation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md p-3 bg-muted/20">
                    <Textarea
                      placeholder="Exemple : Boiterie membre postérieur gauche, Suivi post-opératoire..."
                      value={consultationReason}
                      onChange={e => setConsultationReason(e.target.value)}
                      className="w-full min-h-[80px] resize-y"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={handleInitComplete}
              disabled={!selectedPetId || !appointmentReference?.appointmentId}
              className="w-full sm:w-auto"
            >
              Continuer vers la rédaction
              <ChevronRightIcon className="ml-1 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
