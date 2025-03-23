"use client"

import { useState } from "react"
import { cn } from "@/src/lib/utils"
import { Separator } from "@/components/ui/separator"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { cancelAppointment } from "@/src/actions/appointments.action"
import { statusColors } from "./constants"
import { groupAppointmentsByTimeSlot } from "./utils"
import type { AppointmentDetailsProps } from "./types"
import { AppointmentHeader, AppointmentList, AppointmentInfo, AppointmentNotes, AppointmentActions } from "./components"
import { EditAppointmentModal } from "./modals/EditAppointmentModal"
import { DeleteAppointmentModal } from "./modals/DeleteAppointmentModal"
import { AnimalCredenza } from "../../../pro/unified-metrics/AnimalCredenza"
import { Appointment } from "@/src/db/appointments"

export function AppointmentDetails({
  appointments,
  onEdit,
  onDelete,
  services = [],
  isLoadingServices = false,
  onViewPetDetails,
}: AppointmentDetailsProps) {
  // Grouper les rendez-vous par créneau horaire
  const appointmentGroups = groupAppointmentsByTimeSlot(appointments)
  const [selectedGroup, setSelectedGroup] = useState<Appointment[]>(appointmentGroups[0] || [])

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isAnimalCredenzaOpen, setIsAnimalCredenzaOpen] = useState<Record<string, boolean>>({})
  const [editedAppointment, setEditedAppointment] = useState<Partial<Appointment>>({})
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [cancelReason, setCancelReason] = useState<string>("")

  const handleEditOpen = () => {
    const mainAppointment = selectedGroup[0]
    setEditedAppointment({
      type: mainAppointment.type,
      status: mainAppointment.status,
      observation: mainAppointment.observation,
    })
    setIsEditOpen(true)
  }

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    const service = services.find(s => s.id === serviceId)
    if (service) {
      setEditedAppointment({
        ...editedAppointment,
        type: service.type,
      })
    }
  }

  const handleEditSave = () => {
    const mainAppointment = selectedGroup[0]
    if (onEdit) {
      onEdit(mainAppointment.id, editedAppointment)
    }
    setIsEditOpen(false)
  }

  const handleDeleteConfirm = () => {
    const mainAppointment = selectedGroup[0]
    if (onDelete) {
      onDelete(mainAppointment.id)
    }
    setIsDeleteOpen(false)
  }

  const handleViewPetDetails = (petId: string) => {
    setIsAnimalCredenzaOpen(prev => ({
      ...prev,
      [petId]: true,
    }))

    if (onViewPetDetails) {
      onViewPetDetails(petId)
    }
  }

  const { mutateAsync: cancel } = useMutation({
    mutationFn: ({ appointmentId, deniedReason }: { appointmentId: string; deniedReason: string }) =>
      cancelAppointment({ appointmentId, deniedReason }),
    onSuccess: () => {
      toast.success("Rendez-vous annulé avec succès")
    },
    onError: () => {
      toast.error("Erreur lors de l'annulation du rendez-vous")
    },
  })

  if (!appointmentGroups.length || !appointmentGroups[0].length) {
    return <div className="p-4 text-center text-muted-foreground">Données du rendez-vous incomplètes</div>
  }

  return (
    <div className="space-y-4">
      {appointmentGroups.map((group, groupIndex) => {
        const mainAppointment = group[0]
        const totalInSlot = group.length
        const allPets = group.flatMap(app => app.pets?.map(pa => pa.pet).filter(Boolean) || [])

        return (
          <div key={groupIndex}>
            {groupIndex > 0 && <Separator className="my-4" />}
            <div className="bg-white dark:bg-card rounded-xl border border-border/40 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
              <div
                className={cn(
                  "h-1 w-full transition-colors",
                  statusColors[mainAppointment.status as keyof typeof statusColors] || statusColors["PENDING PAYMENT"]
                )}
              />
              <div className="p-4 space-y-4">
                <AppointmentHeader
                  mainAppointment={mainAppointment}
                  allPets={allPets}
                  totalInSlot={totalInSlot}
                  onViewPetDetails={handleViewPetDetails}
                />

                {totalInSlot > 1 && <AppointmentList appointments={group} />}

                <AppointmentInfo appointment={mainAppointment} />

                {mainAppointment.observation?.content && (
                  <AppointmentNotes content={mainAppointment.observation.content} />
                )}

                <AppointmentActions onEdit={handleEditOpen} onDelete={() => setIsDeleteOpen(true)} />
              </div>
            </div>

            <EditAppointmentModal
              isOpen={isEditOpen}
              onOpenChange={setIsEditOpen}
              appointment={mainAppointment}
              editedAppointment={editedAppointment}
              setEditedAppointment={setEditedAppointment}
              selectedService={selectedService}
              onServiceSelect={handleServiceSelect}
              services={services}
              isLoadingServices={isLoadingServices}
              onSave={handleEditSave}
              allPets={allPets}
              group={group}
            />

            <DeleteAppointmentModal
              isOpen={isDeleteOpen}
              onOpenChange={setIsDeleteOpen}
              allPets={allPets}
              cancelReason={cancelReason}
              setCancelReason={setCancelReason}
              onConfirm={async () => {
                if (!cancelReason) {
                  toast.error("Veuillez entrer une raison de l'annulation")
                  return
                }
                await cancel({ appointmentId: group[0].id, deniedReason: cancelReason })
                setIsDeleteOpen(false)
              }}
            />

            {allPets.map((pet, index) => (
              <AnimalCredenza
                key={index}
                isOpen={isAnimalCredenzaOpen[pet.id] || false}
                onOpenChange={open =>
                  setIsAnimalCredenzaOpen(prev => ({
                    ...prev,
                    [pet.id]: open,
                  }))
                }
                petId={pet.id}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}
