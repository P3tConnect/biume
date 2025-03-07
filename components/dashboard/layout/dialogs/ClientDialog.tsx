"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ClientDialog = ({ open, onOpenChange }: ClientDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Créer un nouveau client</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau client à votre tableau de bord.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {/* Contenu du formulaire pour créer un client */}
          <p>Formulaire de création de client à venir...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDialog;
