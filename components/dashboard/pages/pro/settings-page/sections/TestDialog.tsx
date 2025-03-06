"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TestDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TestDialog({ isOpen, onOpenChange }: TestDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p>Ceci est un dialogue de test pour vérifier que les modals fonctionnent.</p>
          <Button
            onClick={() => onOpenChange(false)}
            className="mt-4"
          >
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 