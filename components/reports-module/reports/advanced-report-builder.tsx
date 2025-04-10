"use client"

import { useState } from "react"
import { AnimalCredenza } from "@/components/dashboard/shortcuts/pro/unified-metrics/AnimalCredenza"
import { ObservationsTab } from "./components/ClinicalTab"
import { NotesTab } from "./components/NotesTab"
import { RecommendationsTab } from "./components/RecommendationsTab"
import { AnatomicalEvaluationTab } from "./components/AnatomicalEvaluationTab"
import { AddObservationDialog } from "./components/AddObservationDialog"
import { ReportPreview } from "./components/ReportPreview"
import { Observation, NewObservation, AppointmentReference, anatomicalRegions, interventionZones } from "./components/types"
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
  PlusIcon,
  FileTextIcon,
  ListTodoIcon,
  AlertCircleIcon,
  ActivityIcon,
  Trash2,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/src/lib/utils"
import Header from "@/components/Header"

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
    interventionZone: undefined
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
      dysfunctionType: undefined,
      interventionZone: undefined,
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
      <Header
        title={title}
        selectedPet={selectedPet}
        selectedAppointment={selectedAppointment}
        handleGoBack={handleGoBack}
        setShowPreview={setShowPreview}
        handleSaveReport={handleSaveReport}
      />

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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                      {/* Vue anatomique - partie gauche */}
                      <Card className="flex flex-col h-full">
                        <div className="p-3 border-b flex items-center justify-between">
                          <h2 className="font-medium">Vue anatomique</h2>
                          <div className="flex gap-1">
                            <Button
                              variant={selectedView === "left" ? "secondary" : "ghost"}
                              size="sm"
                              onClick={() => setSelectedView("left")}
                            >
                              Gauche
                            </Button>
                            <Button
                              variant={selectedView === "right" ? "secondary" : "ghost"}
                              size="sm"
                              onClick={() => setSelectedView("right")}
                            >
                              Droite
                            </Button>
                          </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                          <div className="flex items-center justify-center h-full text-muted-foreground">
                            <p className="text-center">
                              Visualisation anatomique {selectedView === "left" ? "(gauche)" : "(droite)"}
                              <br />
                              <span className="text-sm text-muted-foreground/70">
                                Cette fonctionnalité sera améliorée prochainement
                              </span>
                            </p>
                          </div>
                        </div>
                      </Card>

                      {/* Liste des observations - partie droite */}
                      <Card className="flex flex-col h-full">
                        <div className="p-3 border-b flex items-center justify-between">
                          <h2 className="font-medium">Observations cliniques</h2>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newType = newObservation.type === "staticObservation" ? "dynamicObservation" : "staticObservation";
                              setNewObservation(prev => ({ ...prev, type: newType }));
                              setIsAddSheetOpen(true);
                            }}
                            className="flex items-center gap-1"
                          >
                            <PlusIcon className="h-4 w-4" />
                            Ajouter
                          </Button>
                        </div>

                        <div className="p-3 flex-1 overflow-y-auto">
                          <div className="space-y-3">
                            {observations.map(obs => (
                              <div key={obs.id} className="p-3 border rounded-md flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <div
                                      className={cn(
                                        "w-3 h-3 rounded-full",
                                        obs.severity === 1
                                          ? "bg-green-500"
                                          : obs.severity === 2
                                            ? "bg-yellow-500"
                                            : obs.severity === 3
                                              ? "bg-orange-500"
                                              : obs.severity === 4
                                                ? "bg-red-500"
                                                : "bg-purple-500"
                                      )}
                                    />
                                    <span className="font-medium">{anatomicalRegions.find(r => r.value === obs.region)?.label}</span>
                                    {obs.interventionZone && (
                                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                                        {interventionZones.find(z => z.value === obs.interventionZone)?.label}
                                      </span>
                                    )}
                                    <span className="text-xs text-muted-foreground">
                                      ({obs.severity === 1
                                        ? "Légère"
                                        : obs.severity === 2
                                          ? "Modérée"
                                          : obs.severity === 3
                                            ? "Importante"
                                            : obs.severity === 4
                                              ? "Sévère"
                                              : "Critique"})
                                    </span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                                      {obs.type === "staticObservation"
                                        ? "Statique"
                                        : "Dynamique"}
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{obs.notes}</p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => handleRemoveObservation(obs.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
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
