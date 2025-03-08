"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MessageDialog = ({ open, onOpenChange }: MessageDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Créer un nouveau message</DialogTitle>
          <DialogDescription>
            Envoyez un nouveau message à vos clients ou collaborateurs.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {/* Contenu du formulaire pour créer un message */}
          <p>Formulaire de création de message à venir...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
