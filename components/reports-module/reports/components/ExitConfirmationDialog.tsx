"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircleIcon } from "lucide-react"

interface ExitConfirmationDialogProps {
  showExitConfirmDialog: boolean
  setShowExitConfirmDialog: (show: boolean) => void
  onConfirmExit: () => void
}

export function ExitConfirmationDialog({
  showExitConfirmDialog,
  setShowExitConfirmDialog,
  onConfirmExit,
}: ExitConfirmationDialogProps) {
  return (
    <Dialog open={showExitConfirmDialog} onOpenChange={setShowExitConfirmDialog}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircleIcon className="h-5 w-5 text-amber-500" />
            Retour au tableau de bord
          </DialogTitle>
          <DialogDescription>
            Vous avez des modifications non enregistrées. Si vous retournez au tableau de bord, toutes vos
            modifications seront perdues.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <Button variant="outline" onClick={() => setShowExitConfirmDialog(false)}>
            Continuer l'édition
          </Button>
          <Button variant="destructive" onClick={onConfirmExit}>
            Retourner au tableau de bord
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 