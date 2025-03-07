"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DocumentDialog = ({ open, onOpenChange }: DocumentDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Créer un nouveau document</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau document à votre bibliothèque.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {/* Contenu du formulaire pour créer un document */}
          <p>Formulaire de création de document à venir...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDialog;
