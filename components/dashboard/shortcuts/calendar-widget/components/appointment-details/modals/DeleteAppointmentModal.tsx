"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Pet } from "@/src/db"

interface DeleteAppointmentModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  allPets: Pet[]
  cancelReason: string
  setCancelReason: (reason: string) => void
  onConfirm: () => void
}

export function DeleteAppointmentModal({
  isOpen,
  onOpenChange,
  allPets,
  cancelReason,
  setCancelReason,
  onConfirm,
}: DeleteAppointmentModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Voulez-vous vraiment supprimer le rendez-vous de {allPets.map(pet => pet.name).join(", ")} ? Cette action
            est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Label htmlFor="deniedReason">Raison de l'annulation</Label>
        <Textarea
          id="deniedReason"
          value={cancelReason}
          onChange={e => setCancelReason(e.target.value)}
          placeholder="Exemple: Patient trop excité, pro absent, etc."
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
