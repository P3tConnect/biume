"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AnimalCredenza } from "@/components/dashboard/shortcuts/pro/unified-metrics/AnimalCredenza"
import { TabNavigation } from "./components/TabNavigation"
import { MedicationsTab } from "./components/MedicationsTab"
import { NotesTab } from "./components/NotesTab"
import { AddMedicationSheet } from "./components/AddMedicationSheet"
import { PrescriptionPreview } from "./components/PrescriptionPreview"
import { InitializationDialog } from "./components/InitializationDialog"
import { PrescriptionItem, NewPrescriptionItem } from "./components/types"
import { Button } from "@/components/ui/button"
import {
  ChevronLeftIcon,
  EyeIcon,
  SaveIcon,
  Loader2,
  PawPrintIcon,
  CalendarIcon,
  Search,
  ChevronRightIcon,
} from "lucide-react"
import { toast } from "sonner"
import { createPrescriptionAction } from "@/src/actions/prescription.action"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getClients } from "@/src/actions/client.action"
import { getPetsAction, getPetById } from "@/src/actions/pet.action"
import { User as UserType } from "@/src/db/user"
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaDescription,
  CredenzaFooter,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Label,
} from "@/components/ui"

interface PrescriptionBuilderProps {
  orgId: string
}

export function PrescriptionBuilder({ orgId }: PrescriptionBuilderProps) {
  const router = useRouter()
  const [title, setTitle] = useState("Ordonnance du " + new Date().toLocaleDateString())
  const [selectedClientId, setSelectedClientId] = useState<string>("")
  const [selectedPetId, setSelectedPetId] = useState<string>("")
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>("")
  const [isInitDialogOpen, setIsInitDialogOpen] = useState(true)
  const [isAnimalCredenzaOpen, setIsAnimalCredenzaOpen] = useState(false)
  const [items, setItems] = useState<PrescriptionItem[]>([])
  const [notes, setNotes] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [activeTab, setActiveTab] = useState<"medications" | "notes">("medications")
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  const [clientSearchTerm, setClientSearchTerm] = useState<string>("")
  const [petSearchTerm, setPetSearchTerm] = useState<string>("")

  // Utiliser React Query pour gérer la mutation
  const { mutateAsync: createPrescription, isPending: isSaving } = useMutation({
    mutationFn: (data: {
      title: string
      petId: string
      description: string
      appointmentId: string
      items: Array<{
        name: string
        dosage: string
        frequency: string
        duration: string
        notes?: string
      }>
    }) => createPrescriptionAction(data),
    onSuccess: () => {
      toast.success("Prescription créée avec succès")
      router.push(`/dashboard/prescriptions`)
    },
    onError: (error: any) => {
      console.error("Erreur lors de la sauvegarde de la prescription:", error)
      toast.error(error.message || "Erreur lors de la sauvegarde de la prescription")
    },
  })

  // Récupération des clients
  const { data: clientsData, isLoading: isLoadingClients } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients({}),
  })

  // Filtrer les clients selon le terme de recherche
  const filteredClients =
    clientsData?.data?.filter((client: UserType) =>
      client.name?.toLowerCase().includes(clientSearchTerm.toLowerCase())
    ) || []

  // Récupération des animaux du client sélectionné
  const { data: petsData, isLoading: isLoadingClientPets } = useQuery({
    queryKey: ["pets", selectedClientId],
    queryFn: () => getPetsAction({ ownerId: selectedClientId }),
    enabled: !!selectedClientId,
  })

  // Filtrer les animaux selon le terme de recherche
  const filteredPets =
    petsData?.data?.filter(
      pet =>
        pet.name.toLowerCase().includes(petSearchTerm.toLowerCase()) ||
        pet.type.toLowerCase().includes(petSearchTerm.toLowerCase()) ||
        (pet.breed && pet.breed.toLowerCase().includes(petSearchTerm.toLowerCase()))
    ) || []

  // Récupération des détails de l'animal sélectionné
  const { data: petData, isLoading: isLoadingPet } = useQuery({
    queryKey: ["pet", selectedPetId],
    queryFn: async () => getPetById({ petId: selectedPetId }),
    enabled: !!selectedPetId,
  })

  // Rendez-vous de l'animal sélectionné
  const petAppointments =
    petData?.data?.appointments?.map(pa => ({
      id: pa.appointment.id,
      date: pa.appointment.slot ? new Date(pa.appointment.slot.start).toLocaleDateString() : "Date inconnue",
      type: pa.appointment.service?.name || "Consultation",
    })) || []

  // Réinitialiser l'animal sélectionné lorsqu'un nouveau client est choisi
  useEffect(() => {
    if (selectedClientId) {
      setSelectedPetId("")
      setSelectedAppointmentId("")
    }
  }, [selectedClientId])

  const handleAddItem = (newItem: NewPrescriptionItem) => {
    if (!newItem.name) return

    const item: PrescriptionItem = {
      id: crypto.randomUUID(),
      ...newItem,
    }

    setItems([...items, item])
    setIsAddSheetOpen(false)
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleSavePrescription = async () => {
    if (!selectedPetId || items.length === 0) {
      toast.error("Veuillez sélectionner un animal et ajouter au moins un médicament")
      return
    }

    await createPrescription({
      title,
      petId: selectedPetId,
      description: notes,
      appointmentId: selectedAppointmentId || "",
      items: items.map(item => ({
        name: item.name,
        dosage: item.dosage,
        frequency: item.frequency,
        duration: item.duration,
        notes: item.notes || undefined,
      })),
    })
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

  const handleInitializationComplete = () => {
    setIsInitDialogOpen(false)
  }

  // Determine if the save button should be enabled
  const canSave = !!title && !!selectedPetId && items.length > 0 && !isSaving

  // Find the selected pet
  const selectedPet = petData?.data

  return (
    <>
      {/* Dialog d'initialisation */}
      <InitializationDialog
        isOpen={isInitDialogOpen}
        onOpenChange={setIsInitDialogOpen}
        selectedClientId={selectedClientId}
        setSelectedClientId={setSelectedClientId}
        selectedPetId={selectedPetId}
        setSelectedPetId={setSelectedPetId}
        selectedAppointmentId={selectedAppointmentId}
        setSelectedAppointmentId={setSelectedAppointmentId}
        onComplete={handleInitializationComplete}
      />

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
                  <button onClick={() => setIsInitDialogOpen(true)} className="hover:underline">
                    {selectedPet.name} ({selectedPet.type}
                    {selectedPet.breed ? ` - ${selectedPet.breed}` : ""})
                    {selectedAppointmentId &&
                      petAppointments.find(apt => apt.id === selectedAppointmentId) &&
                      ` • RDV du ${petAppointments.find(apt => apt.id === selectedAppointmentId)?.date}`}
                  </button>
                ) : (
                  <button onClick={() => setIsInitDialogOpen(true)} className="text-primary hover:underline">
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
            <Button onClick={handleSavePrescription} disabled={!canSave || isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <SaveIcon className="h-4 w-4 mr-1" />}
              {isSaving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </div>
        {/* End New Header Structure */}

        {/* Barre d'onglets */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} onAddMedication={handleOpenAddSheet} />

        {/* Contenu principal */}
        <div className="flex-1 p-4 h-[calc(100vh-104px)] overflow-hidden">
          {activeTab === "medications" ? (
            <MedicationsTab selectedPetId={selectedPetId} items={items} onRemoveItem={handleRemoveItem} />
          ) : (
            <NotesTab notes={notes} setNotes={setNotes} />
          )}
        </div>

        {/* Sheet pour ajouter un médicament */}
        <AddMedicationSheet isOpen={isAddSheetOpen} onOpenChange={setIsAddSheetOpen} onAdd={handleAddItem} />

        {/* Modale de prévisualisation */}
        <PrescriptionPreview
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          title={title}
          items={items}
          notes={notes}
        />

        {/* Modale de sélection d'animal détaillée */}
        {selectedPetId && (
          <AnimalCredenza isOpen={isAnimalCredenzaOpen} onOpenChange={setIsAnimalCredenzaOpen} petId={selectedPetId} />
        )}
      </div>
    </>
  )
}
