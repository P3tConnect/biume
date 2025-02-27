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
import SlotsForm from "./components/slots/slots-form";
import SlotsGrid from "./components/slots/slots-grid";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useActionMutation } from "@/src/hooks/action-hooks";
import { deleteOrganizationSlot } from "@/src/actions";
import { toast } from "sonner";
import { OrganizationSlots } from "@/src/db/organizationSlots";

const SlotsSection = ({ slots }: { slots: OrganizationSlots[] }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedSlotId, setSelectedSlotId] = React.useState<string | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const { mutateAsync: deleteSlot } = useActionMutation(deleteOrganizationSlot, {
    onSuccess: () => {
      toast.success("Le créneau a été supprimé avec succès");
      setIsDeleteDialogOpen(false);
      setSelectedSlotId(null);
    },
  });

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

  const handleFormSuccess = () => {
    setIsOpen(false);
    setIsEditing(false);
    setSelectedSlotId(null);
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
                onSubmit={handleFormSuccess}
                onCancel={() => {
                  setIsOpen(false);
                  setIsEditing(false);
                  setSelectedSlotId(null);
                }}
                isEditing={isEditing}
                selectedSlotId={selectedSlotId}
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
