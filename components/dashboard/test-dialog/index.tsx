"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function TestDialogPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-10 space-y-8">
      <h1 className="text-2xl font-bold">Page de test de dialogue</h1>

      <Button onClick={() => setIsOpen(true)}>
        Ouvrir le dialogue
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialogue de test</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p>Ce dialogue fonctionne correctement.</p>
            <Button onClick={() => setIsOpen(false)} className="mt-4">
              Fermer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
