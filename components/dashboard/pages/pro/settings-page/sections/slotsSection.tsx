"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SlotsForm from "./components/slots/slots-form";
import SlotsGrid from "./components/slots/slots-grid";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Slot {
  id: string;
  type: "unique" | "recurring";
  startTime: string;
  endTime: string;
  duration: string;
  date: string;
  selectedDays: string[];
  serviceId: string;
}

const SlotsSection = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedSlotId, setSelectedSlotId] = React.useState<string | null>(
    null,
  );
  const [isEditing, setIsEditing] = React.useState(false);

  // Exemple de données de créneaux (à remplacer par les vraies données)
  const exampleSlots: Slot[] = [
    {
      id: "1",
      type: "unique",
      startTime: "09:00",
      endTime: "09:30",
      duration: "30",
      date: "Lundi 15 Avril 2024",
      selectedDays: [],
      serviceId: "1",
    },
    {
      id: "2",
      type: "recurring",
      startTime: "09:30",
      endTime: "10:00",
      duration: "30",
      date: "Lundi 15 Avril 2024",
      selectedDays: ["monday", "wednesday", "friday"],
      serviceId: "2",
    },
  ];

  const handleSubmit = (data: any) => {
    if (isEditing && selectedSlotId) {
      console.log("Modification du créneau:", selectedSlotId, data);
      // Ajouter ici la logique de modification
    } else {
      console.log("Création d'un nouveau créneau:", data);
      // Ajouter ici la logique de création
    }
    setIsOpen(false);
    setIsEditing(false);
    setSelectedSlotId(null);
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
      console.log("Suppression du créneau:", selectedSlotId);
      // Ajouter ici la logique de suppression
    }
    setIsDeleteDialogOpen(false);
    setSelectedSlotId(null);
  };

  const getInitialData = () => {
    if (!isEditing || !selectedSlotId) return undefined;
    const slot = exampleSlots.find((s) => s.id === selectedSlotId);
    if (!slot) return undefined;
    return {
      type: slot.type,
      startTime: slot.startTime,
      endTime: slot.endTime,
      serviceId: slot.serviceId,
      date: new Date(), // À remplacer par la vraie date
      selectedDays: slot.selectedDays,
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
            <CredenzaTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter des créneaux
              </Button>
            </CredenzaTrigger>
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
            slots={exampleSlots}
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
