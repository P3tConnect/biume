"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar, Phone, Sparkles } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

export type Client = {
  id: string
  name: string
  email: string
  phoneNumber: string | null
  image: string | null
  createdAt: Date
  city: string | null
  country: string | null
  emailVerified: boolean
  isPro: boolean
  onBoardingComplete: boolean
  stripeId: string | null
  address: string | null
  zipCode: string | null
  lang: string | null
  emailNotifications: boolean
  smsNotifications: boolean
  updatedAt: Date
  twoFactorEnabled?: boolean
  // Métriques additionnelles
  lastVisit?: Date
  appointmentsCount?: number
  petsCount?: number
  loyaltyPoints?: number
}

type ClientItemProps = {
  client: Client
  onClick: () => void
}

export const ClientItem = ({ client, onClick }: ClientItemProps) => {
  // Calcul de la date relative
  const timeAgo = formatDistanceToNow(new Date(client.createdAt), {
    addSuffix: true,
    locale: fr
  })

  // Déterminer si le client est nouveau (moins de 30 jours)
  const isNewClient = new Date().getTime() - new Date(client.createdAt).getTime() < 30 * 24 * 60 * 60 * 1000

  return (
    <Card
      className="group p-4 cursor-pointer hover:bg-accent/10 hover:shadow-md transition-all duration-300 border shadow-sm overflow-hidden relative"
      onClick={onClick}
    >
      {isNewClient && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-2 right-2 z-10 text-primary animate-pulse">
                <Sparkles className="h-5 w-5 fill-primary/20" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Nouveau client</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12 transition-transform duration-300 group-hover:scale-110">
          <AvatarImage src={client.image || undefined} />
          <AvatarFallback className="bg-primary/10 text-primary">{client.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground truncate group-hover:text-primary transition-colors duration-300">
            {client.name}
          </p>
          <p className="text-sm text-muted-foreground truncate">{client.email}</p>

          <div className="flex items-center gap-3 mt-2 opacity-80 text-xs text-muted-foreground">
            {client.phoneNumber ? (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span className="truncate max-w-[100px]">{client.phoneNumber}</span>
              </div>
            ) : null}

            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </Card>
  )
} 