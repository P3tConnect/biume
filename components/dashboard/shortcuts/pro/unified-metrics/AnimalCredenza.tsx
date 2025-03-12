"use client"

import { ActiveTab } from "./types"
import { CredenzaClose, CredenzaContent, CredenzaTitle } from "@/components/ui"
import { FileClock, FileText, HeartPulseIcon, Info } from "lucide-react"

import { AnimalDetailsSidebar } from "./AnimalDetailsSidebar"
import { AppointmentsTab } from "./AppointmentsTab"
import { Button } from "@/components/ui/button"
import { Credenza } from "@/components/ui"
import { DocumentsTab } from "./DocumentsTab"
import { InfoTab } from "./InfoTab"
import { MedicalTab } from "./MedicalTab"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useState } from "react"
import { Pet, User, Appointment } from "@/src/db"

interface AnimalCredenzaProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  animalDetails: Pet
  nextAppointmentClient: User
  nextAppointmentData: Appointment
}

export const AnimalCredenza = ({
  isOpen,
  onOpenChange,
  animalDetails,
  nextAppointmentClient,
  nextAppointmentData,
}: AnimalCredenzaProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("info")

  return (
    <Credenza open={isOpen} onOpenChange={onOpenChange}>
      <VisuallyHidden asChild>
        <CredenzaTitle>Fiche de l&apos;animal</CredenzaTitle>
      </VisuallyHidden>
      <CredenzaContent className="sm:max-w-[900px] p-0 overflow-hidden">
        {/* Interface à deux panneaux avec navigation latérale */}
        <div className="flex flex-col md:flex-row h-[80vh] max-h-[700px]">
          {/* Sidebar avec photo et navigation */}
          <AnimalDetailsSidebar
            animal={animalDetails}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            nextAppointmentClient={nextAppointmentClient}
            nextAppointmentData={nextAppointmentData}
          />

          {/* Contenu principal */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white dark:bg-slate-950 z-10">
              <h3 className="text-lg font-medium flex items-center gap-2">
                {activeTab === "info" && (
                  <>
                    <Info className="h-5 w-5 text-blue-500" />
                    Informations générales
                  </>
                )}
                {activeTab === "medical" && (
                  <>
                    <HeartPulseIcon className="h-5 w-5 text-red-500" />
                    Dossier médical
                  </>
                )}
                {activeTab === "appointments" && (
                  <>
                    <FileClock className="h-5 w-5 text-indigo-500" />
                    Rendez-vous
                  </>
                )}
                {activeTab === "documents" && (
                  <>
                    <FileText className="h-5 w-5 text-amber-500" />
                    Documents
                  </>
                )}
              </h3>
              <CredenzaClose asChild>
                <Button variant="ghost" size="sm">
                  Fermer
                </Button>
              </CredenzaClose>
            </div>

            {/* Contenu dynamique en fonction de l'onglet actif */}
            {activeTab === "info" && (
              <InfoTab
                animal={animalDetails}
                setActiveTab={setActiveTab}
                nextAppointmentClient={nextAppointmentClient}
              />
            )}
            {activeTab === "medical" && (
              <MedicalTab
                animal={animalDetails}
                nextAppointmentClient={nextAppointmentClient}
                nextAppointmentData={nextAppointmentData}
              />
            )}
            {activeTab === "appointments" && (
              <AppointmentsTab
                animal={animalDetails}
                nextAppointmentClient={nextAppointmentClient}
                nextAppointmentData={nextAppointmentData}
              />
            )}
            {activeTab === "documents" && (
              <DocumentsTab
                animal={animalDetails}
                nextAppointmentClient={nextAppointmentClient}
                nextAppointmentData={nextAppointmentData}
              />
            )}
          </div>
        </div>
      </CredenzaContent>
    </Credenza>
  )
}
