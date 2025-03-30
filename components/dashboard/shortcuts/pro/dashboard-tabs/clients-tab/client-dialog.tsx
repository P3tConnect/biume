"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { type Client } from "./client-item"

type ClientDialogProps = {
  client: Client | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const ClientDialog = ({ client, isOpen, onOpenChange }: ClientDialogProps) => {
  if (!client) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Détails du client</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={client.image || undefined} />
            <AvatarFallback className="text-xl">{client.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h3 className="text-xl font-semibold">{client.name}</h3>
            <p className="text-muted-foreground">{client.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">Téléphone</div>
            <div>{client.phoneNumber || "Non renseigné"}</div>

            <div className="text-muted-foreground">Date d'inscription</div>
            <div>{new Date(client.createdAt).toLocaleDateString("fr-FR", {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 