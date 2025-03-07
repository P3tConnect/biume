"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ReminderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReminderDialog = ({ open, onOpenChange }: ReminderDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Créer un nouveau rappel</DialogTitle>
          <DialogDescription>
            Créez un rappel pour ne pas oublier vos tâches importantes.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {/* Contenu du formulaire pour créer un rappel */}
          <p>Formulaire de création de rappel à venir...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReminderDialog;
