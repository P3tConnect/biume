"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { type Client } from "./client-item"
import { Phone, Mail, Calendar, Clock, MapPin, Star, PawPrint, Activity, Bell, Ban } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

type ClientDialogProps = {
  client: Client | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const ClientDialog = ({ client, isOpen, onOpenChange }: ClientDialogProps) => {
  if (!client) return null

  const timeAgo = formatDistanceToNow(new Date(client.createdAt), {
    addSuffix: true,
    locale: fr
  })

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <VisuallyHidden>
          <DialogTitle>{client.name}</DialogTitle>
        </VisuallyHidden>
        {/* En-tête avec informations principales */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg -z-10" />
          <div className="flex items-start gap-6 p-4">
            <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
              <AvatarImage src={client.image || undefined} />
              <AvatarFallback className="text-2xl bg-primary/5">{client.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-semibold truncate">{client.name}</h2>
                <Badge variant={client.emailVerified ? "default" : "secondary"} className="h-6">
                  {client.emailVerified ? "Vérifié" : "Non vérifié"}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4" />
                  <span>{client.email}</span>
                </div>
                {client.phoneNumber && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4" />
                    <span>{client.phoneNumber}</span>
                  </div>
                )}
                {(client.city || client.country) && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{[client.city, client.country].filter(Boolean).join(", ")}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Star className="h-4 w-4" />
                  Ajouter aux favoris
                </Button>
                <Button variant="outline" size="sm" className="gap-2 text-destructive">
                  <Ban className="h-4 w-4" />
                  Bloquer
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Onglets d'information */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="activity">Activité</TabsTrigger>
            <TabsTrigger value="preferences">Préférences</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-primary/5 border-none">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-full">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rendez-vous</p>
                    <p className="text-2xl font-semibold">{client.appointmentsCount || 0}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-primary/5 border-none">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-full">
                    <PawPrint className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Animaux</p>
                    <p className="text-2xl font-semibold">{client.petsCount || 0}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-primary/5 border-none">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-full">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Points fidélité</p>
                    <p className="text-2xl font-semibold">{client.loyaltyPoints || 0}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Informations temporelles */}
            <Card className="p-4">
              <h3 className="font-medium mb-3">Chronologie</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-muted-foreground">Inscrit </span>
                    <span>{timeAgo}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-muted-foreground">Dernière visite </span>
                    <span>
                      {formatDistanceToNow(new Date(client.lastVisit || client.createdAt), {
                        addSuffix: true,
                        locale: fr
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-medium mb-3">Activité récente</h3>
              <p className="text-sm text-muted-foreground">Historique des rendez-vous et interactions...</p>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-medium mb-3">Préférences de notification</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p>Notifications par email: <span className={client.emailNotifications ? "text-primary" : "text-muted-foreground"}>{client.emailNotifications ? "Activées" : "Désactivées"}</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p>Notifications SMS: <span className={client.smsNotifications ? "text-primary" : "text-muted-foreground"}>{client.smsNotifications ? "Activées" : "Désactivées"}</span></p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 