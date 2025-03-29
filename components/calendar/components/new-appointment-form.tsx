import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza"

import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface NewAppointmentFormProps {
  date: Date
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
}

export function NewAppointmentForm({ date, isOpen, onOpenChange, onSubmit }: NewAppointmentFormProps) {
  return (
    <Credenza open={isOpen} onOpenChange={onOpenChange}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Nouveau rendez-vous</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-1">Date sélectionnée</h3>
              <p className="text-sm text-muted-foreground">{format(date, "EEEE d MMMM yyyy", { locale: fr })}</p>
              <p className="text-sm text-muted-foreground">{format(date, "HH:mm")}</p>
            </div>
            {/* Ajoutez ici vos champs de formulaire avec react-hook-form */}
          </div>
        </CredenzaBody>
        <CredenzaFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={() => onSubmit({})}>Créer le rendez-vous</Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}
