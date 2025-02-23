"use client";

import React from "react";
import {
  Credenza,
  CredenzaContent,
  CredenzaTitle,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui";
import SlotsForm, { FormValues } from "./components/slots/slots-form";
import SlotsGrid from "./components/slots/slots-grid";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useActionMutation } from "@/src/hooks/action-hooks";
import { createOrganizationSlot, deleteOrganizationSlot, updateOrganizationSlot } from "@/src/actions";
import { toast } from "sonner";
import { OrganizationSlots } from "@/src/db/organizationSlots";

interface SlotFormData {
  type: "unique" | "recurring";
  date?: Date;
  serviceId: string;
  startTime: string;
  endTime: string;
  selectedDays: string[];
  endRecurrence?: Date;
  serviceDuration: number;
}

const weekDays = [
  { id: "monday", label: "Lun" },
  { id: "tuesday", label: "Mar" },
  { id: "wednesday", label: "Mer" },
  { id: "thursday", label: "Jeu" },
  { id: "friday", label: "Ven" },
  { id: "saturday", label: "Sam" },
  { id: "sunday", label: "Dim" },
] as const;

const SlotsSection = ({ slots }: { slots: OrganizationSlots[] }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedSlotId, setSelectedSlotId] = React.useState<string | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const createSlotMutation = useActionMutation(createOrganizationSlot, {
    onSuccess: () => {
      toast.success("Le créneau a été créé avec succès");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error("Erreur: " + error);
    },
  });

  const updateSlotMutation = useActionMutation(updateOrganizationSlot, {
    onSuccess: () => {
      toast.success("Le créneau a été modifié avec succès");
      setIsOpen(false);
      setIsEditing(false);
      setSelectedSlotId(null);
    },
    onError: (error) => {
      toast.error("Erreur: " + error);
    },
  });

  const { mutateAsync: deleteSlot } = useActionMutation(deleteOrganizationSlot, {
    onSuccess: () => {
      toast.success("Le créneau a été supprimé avec succès");
      setIsDeleteDialogOpen(false);
      setSelectedSlotId(null);
    },
  });

  const handleSubmit = async (formData: FormValues) => {
    try {
      const slot = formData.slots[0];
      if (slot.type === "unique") {
        const data = {
          serviceId: slot.serviceId,
          start: new Date(slot.date!.setHours(
            parseInt(slot.startTime.split(":")[0]),
            parseInt(slot.startTime.split(":")[1])
          )).toISOString(),
          end: new Date(slot.date!.setHours(
            parseInt(slot.endTime.split(":")[0]),
            parseInt(slot.endTime.split(":")[1])
          )).toISOString(),
          isAvailable: true,
        };

        if (isEditing && selectedSlotId) {
          await updateSlotMutation.mutateAsync({
            ...data,
            id: selectedSlotId,
          });
        } else {
          await createSlotMutation.mutateAsync(data);
        }
      } else {
        // Créneaux récurrents
        if (!slot.date || !slot.endRecurrence || !slot.selectedDays?.length) {
          toast.error("Veuillez sélectionner une période et des jours de récurrence");
          return;
        }

        const startDate = new Date(slot.date);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(slot.endRecurrence);
        endDate.setHours(23, 59, 59, 999);

        // Convertir les heures en minutes pour faciliter les calculs
        const [startHour, startMinute] = slot.startTime.split(":").map(Number);
        const [endHour, endMinute] = slot.endTime.split(":").map(Number);
        const startMinutes = startHour * 60 + startMinute;
        const endMinutes = endHour * 60 + endMinute;

        // Créer un créneau pour chaque jour sélectionné dans la période
        const slotsToCreate = [];
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
          const dayOfWeek = currentDate.getDay();
          const dayName = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][dayOfWeek];

          if (slot.selectedDays.includes(dayName)) {
            // Pour chaque jour sélectionné, créer des créneaux en fonction de la durée du service
            let currentMinute = startMinutes;
            while (currentMinute + slot.serviceDuration <= endMinutes) {
              const slotStart = new Date(currentDate);
              slotStart.setHours(Math.floor(currentMinute / 60), currentMinute % 60);

              const slotEnd = new Date(currentDate);
              const endMinute = currentMinute + slot.serviceDuration;
              slotEnd.setHours(Math.floor(endMinute / 60), endMinute % 60);

              slotsToCreate.push({
                serviceId: slot.serviceId,
                start: slotStart.toISOString(),
                end: slotEnd.toISOString(),
                isAvailable: true,
              });

              currentMinute += slot.serviceDuration;
            }
          }

          currentDate.setDate(currentDate.getDate() + 1);
        }

        // Créer tous les créneaux
        await Promise.all(slotsToCreate.map(slot => createSlotMutation.mutateAsync(slot)));
        toast.success(`${slotsToCreate.length} créneaux ont été créés avec succès`);
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la création des créneaux");
    }
  };

  const handleEditClick = (slotId: string) => {
    setSelectedSlotId(slotId);
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleDeleteClick = (slotId: string) => {
    setSelectedSlotId(slotId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedSlotId) {
      deleteSlot({
        id: selectedSlotId,
      });
    }
  };

  const getInitialData = () => {
    if (!isEditing || !selectedSlotId) return undefined;
    const slot = slots.find((s) => s.id === selectedSlotId);
    if (!slot) return undefined;

    return {
      slots: [{
        type: "unique" as const,
        date: new Date(slot.start),
        serviceId: slot.serviceId || "",
        startTime: new Date(slot.start).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false }),
        endTime: new Date(slot.end).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false }),
        selectedDays: [] as string[],
        serviceDuration: 60,
      }]
    };
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Créneaux disponibles</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Gérez vos créneaux horaires et leur disponibilité
            </p>
          </div>
          <Credenza open={isOpen} onOpenChange={setIsOpen}>
            <CredenzaContent className="sm:max-w-[800px]">
              <VisuallyHidden>
                <CredenzaTitle>
                  {isEditing ? "Modifier le créneau" : "Ajouter des créneaux"}
                </CredenzaTitle>
              </VisuallyHidden>
              <SlotsForm
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsOpen(false);
                  setIsEditing(false);
                  setSelectedSlotId(null);
                }}
                isEditing={isEditing}
                initialData={getInitialData()}
              />
            </CredenzaContent>
          </Credenza>
        </CardHeader>

        <CardContent>
          <SlotsGrid
            slots={slots || []}
            onAddClick={() => {
              setIsEditing(false);
              setSelectedSlotId(null);
              setIsOpen(true);
            }}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        </CardContent>
      </Card>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Le créneau sera
              définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SlotsSection;
