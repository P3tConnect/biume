"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PatientDialog = ({ open, onOpenChange }: PatientDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Créer un nouveau patient</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau patient à votre base de données.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {/* Contenu du formulaire pour créer un patient */}
          <p>Formulaire de création de patient à venir...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDialog;
