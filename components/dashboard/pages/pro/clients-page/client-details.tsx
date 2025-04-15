import { Calendar, Clock, FileText, Mail, MapPin, PawPrint, Phone, Star, Plus, Edit2, ArrowRight } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {
  Credenza,
  CredenzaContent,
  CredenzaTitle,
  CredenzaBody,
} from "@/components/ui/credenza"

type ClientDetailsProps = {
  client: {
    id: string
    name: string
    email: string
    phoneNumber: string
    city: string
    country: string
    createdAt: string
    status: "Active" | "Inactive"
  }
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const appointments = [
  {
    id: "1",
    date: "2024-02-15",
    time: "14:30",
    service: "Consultation",
    status: "upcoming",
  },
  {
    id: "2",
    date: "2024-02-01",
    time: "10:00",
    service: "Vaccination",
    status: "completed",
  },
  {
    id: "3",
    date: "2024-01-15",
    time: "16:00",
    service: "Checkup",
    status: "completed",
  },
]

const pets = [
  {
    id: "1",
    name: "Max",
    type: "Dog",
    breed: "Golden Retriever",
    age: 3,
  },
  {
    id: "2",
    name: "Luna",
    type: "Cat",
    breed: "Siamese",
    age: 2,
  },
]

export function ClientDetails({ client, isOpen, onOpenChange }: ClientDetailsProps) {
  return (
    <Credenza open={isOpen} onOpenChange={onOpenChange}>
      <CredenzaContent className="max-w-3xl h-[800px] overflow-y-auto">
        <VisuallyHidden>
          <CredenzaTitle>{client.name}</CredenzaTitle>
        </VisuallyHidden>
        <CredenzaBody className="p-6">
          {/* En-tête avec gradient et informations principales */}
          <div className="relative mb-8 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-4 border-background">
                  <AvatarFallback className="text-xl bg-primary/10">
                    {client.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{client.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={client.status === "Active" ? "default" : "destructive"}
                      className="rounded-full">
                      {client.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Client depuis {new Date(client.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-background/60 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">RDV Total</span>
                </div>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="bg-background/60 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <PawPrint className="h-4 w-4" />
                  <span className="text-sm">Animaux</span>
                </div>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="bg-background/60 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Star className="h-4 w-4" />
                  <span className="text-sm">Note</span>
                </div>
                <p className="text-2xl font-bold">4.8</p>
              </div>
              <div className="bg-background/60 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">Documents</span>
                </div>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors overflow-hidden">
              <div className="p-2 rounded-full bg-primary/10">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{client.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="p-2 rounded-full bg-primary/10">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Téléphone</p>
                <p className="font-medium">{client.phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="p-2 rounded-full bg-primary/10">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Localisation</p>
                <p className="font-medium">{client.city}, {client.country}</p>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="appointments" className="w-full">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="appointments" className="flex-1 md:flex-none">Rendez-vous</TabsTrigger>
              <TabsTrigger value="pets" className="flex-1 md:flex-none">Animaux</TabsTrigger>
              <TabsTrigger value="notes" className="flex-1 md:flex-none">Notes</TabsTrigger>
              <TabsTrigger value="billing" className="flex-1 md:flex-none">Facturation</TabsTrigger>
            </TabsList>

            <TabsContent value="appointments">
              <div className="space-y-4">
                {appointments.map(appointment => (
                  <div key={appointment.id}
                    className="group flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          {new Date(appointment.date).toLocaleDateString()} à {appointment.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{appointment.service}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={appointment.status === "upcoming" ? "default" : "secondary"}>
                        {appointment.status === "upcoming" ? "À venir" : "Terminé"}
                      </Badge>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pets">
              <div className="grid md:grid-cols-2 gap-4">
                {pets.map(pet => (
                  <div key={pet.id}
                    className="group flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <PawPrint className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{pet.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {pet.breed} • {pet.age} ans
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{pet.type}</Badge>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="notes">
              <div className="rounded-lg border">
                <div className="p-4 text-center text-muted-foreground">
                  <p>Aucune note disponible</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="billing">
              <div className="rounded-lg border">
                <div className="p-4 text-center text-muted-foreground">
                  <p>Historique des paiements à venir</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}
