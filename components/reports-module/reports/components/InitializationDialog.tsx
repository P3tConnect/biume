"use client"

import { useState } from "react"
import { AppointmentReference } from "../types"
import { AnimalCredenza } from "@/components/dashboard/shortcuts/pro/unified-metrics/AnimalCredenza"
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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PawPrintIcon, CalendarIcon, CheckIcon, ChevronRightIcon, ClipboardIcon } from "lucide-react"

interface InitializationDialogProps {
  showInitDialog: boolean
  setShowInitDialog: (show: boolean) => void
  selectedPetId: string
  setSelectedPetId: (id: string) => void
  appointmentReference: AppointmentReference | null
  setAppointmentReference: (ref: AppointmentReference | null) => void
  consultationReason: string
  setConsultationReason: (reason: string) => void
  onComplete: () => void
}

// Simulons des données de rendez-vous pour la démo
const mockAppointments = [
  { id: "apt-1", date: new Date().toLocaleDateString(), type: "Consultation standard" },
  { id: "apt-2", date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(), type: "Vaccination" },
  { id: "apt-3", date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString(), type: "Contrôle" },
]

export function InitializationDialog({
  showInitDialog,
  setShowInitDialog,
  selectedPetId,
  setSelectedPetId,
  appointmentReference,
  setAppointmentReference,
  consultationReason,
  setConsultationReason,
  onComplete,
}: InitializationDialogProps) {
  const [isAnimalCredenzaOpen, setIsAnimalCredenzaOpen] = useState(false)

  const handleOpenAnimalSelector = () => {
    setIsAnimalCredenzaOpen(true)
  }

  return (
    <>
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

          <div className="space-y-8 py-4">
            <div className="space-y-3">
              <Label htmlFor="pet-select" className="flex items-center gap-2 text-base font-medium">
                <PawPrintIcon className="h-4 w-4 text-primary" />
                Animal concerné
              </Label>
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
              <div className="space-y-3">
                <Label htmlFor="appointment-select" className="flex items-center gap-2 text-base font-medium">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  Rendez-vous associé
                </Label>
                <Select
                  value={appointmentReference?.appointmentId || ""}
                  onValueChange={value => setAppointmentReference({ appointmentId: value, petId: selectedPetId })}
                >
                  <SelectTrigger id="appointment-select" className="w-full">
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
                <div>
                  <Label htmlFor="consultation-reason" className="flex items-center gap-2 text-base font-medium">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Motif de la séance
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Indiquez le motif principal de la consultation
                  </p>
                </div>
                <Textarea
                  id="consultation-reason"
                  placeholder="Exemple : Boiterie membre postérieur gauche, Suivi post-opératoire..."
                  value={consultationReason}
                  onChange={e => setConsultationReason(e.target.value)}
                  className="w-full min-h-[80px] resize-y"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={onComplete}
              disabled={!selectedPetId || !appointmentReference?.appointmentId}
              className="w-full sm:w-auto"
            >
              Continuer vers la rédaction
              <ChevronRightIcon className="ml-1 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isAnimalCredenzaOpen && (
        <AnimalCredenza isOpen={isAnimalCredenzaOpen} onOpenChange={setIsAnimalCredenzaOpen} petId={selectedPetId} />
      )}
    </>
  )
} 