"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza"
import React, { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { appointmentColors, appointmentLabels } from "../data/constants"

import type { Appointment } from "../types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/src/lib/utils"

// Type pour les services du professionnel
interface Service {
  id: string
  name: string
  duration: string
  type: Appointment["type"]
  price?: number
  description?: string
}

interface AppointmentDetailsProps {
  appointment: Appointment
  onEdit?: (id: string, updatedAppointment: Partial<Appointment>) => void
  onDelete?: (id: string) => void
}

export function AppointmentDetails({ appointment, onEdit, onDelete }: AppointmentDetailsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editedAppointment, setEditedAppointment] = useState<Partial<Appointment>>({})
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Fonction simulée pour récupérer les services du professionnel
  // Dans un cas réel, cela ferait un appel API
  const fetchServices = async () => {
    setIsLoading(true)

    try {
      // Simulation d'un délai d'API
      await new Promise(resolve => setTimeout(resolve, 300))

      // Données simulées - à remplacer par un vrai appel API
      const mockServices: Service[] = [
        {
          id: "1",
          name: "Consultation standard",
          duration: "30min",
          type: "consultation",
          price: 50,
          description: "Consultation médicale de routine",
        },
        {
          id: "2",
          name: "Consultation approfondie",
          duration: "45min",
          type: "consultation",
          price: 75,
          description: "Examen complet pour problèmes complexes",
        },
        {
          id: "3",
          name: "Vaccination complète",
          duration: "15min",
          type: "vaccination",
          price: 40,
          description: "Ensemble des vaccins recommandés",
        },
        {
          id: "4",
          name: "Toilettage standard",
          duration: "1h",
          type: "grooming",
          price: 60,
          description: "Toilettage incluant bain et coupe",
        },
        {
          id: "5",
          name: "Toilettage premium",
          duration: "1h30",
          type: "grooming",
          price: 90,
          description: "Toilettage complet avec soins spécifiques",
        },
        {
          id: "6",
          name: "Chirurgie mineure",
          duration: "1h",
          type: "surgery",
          price: 150,
          description: "Opérations simples sous anesthésie locale",
        },
        {
          id: "7",
          name: "Contrôle post-opératoire",
          duration: "20min",
          type: "checkup",
          price: 35,
          description: "Suivi après chirurgie",
        },
      ]

      setServices(mockServices)

      // Trouver un service correspondant (duration + type)
      const matchingService = mockServices.find(
        service => service.duration === appointment.duration && service.type === appointment.type
      )

      if (matchingService) {
        setSelectedService(matchingService.id)
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des services:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditOpen = () => {
    // Initialisation des données du formulaire
    setEditedAppointment({
      petName: appointment.petName,
      ownerName: appointment.ownerName,
      type: appointment.type,
      time: appointment.time,
      duration: appointment.duration,
      status: appointment.status,
      location: appointment.location,
      notes: appointment.notes,
    })

    // Ouverture de la modale et récupération des services
    setIsEditOpen(true)
    fetchServices()
  }

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)

    // Mise à jour de l'appointment avec les infos du service sélectionné
    const service = services.find(s => s.id === serviceId)
    if (service) {
      setEditedAppointment({
        ...editedAppointment,
        type: service.type,
        duration: service.duration,
      })
    }
  }

  const handleEditSave = () => {
    if (onEdit) {
      onEdit(appointment.id, editedAppointment)
    }
    setIsEditOpen(false)
  }

  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete(appointment.id)
    }
    setIsDeleteOpen(false)
  }

  return (
    <div className="p-5 rounded-lg border border-border space-y-4 hover:border-border/80 transition-colors">
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-lg">{appointment.petName}</h3>
            <Badge
              variant={appointment.status === "confirmed" ? "default" : "secondary"}
              className="capitalize text-sm px-2.5 py-0.5"
            >
              {appointment.status === "confirmed" ? "Confirmé" : "En attente"}
            </Badge>
          </div>
          <p className="text-base text-muted-foreground">{appointment.ownerName}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-base">
        <Badge
          variant="outline"
          className={cn("text-sm px-2.5 py-0.5", appointmentColors[appointment.type].replace("bg-", "border-"))}
        >
          {appointmentLabels[appointment.type]}
        </Badge>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{appointment.time}</span>
          <span>•</span>
          <span>{appointment.duration}</span>
        </div>
      </div>

      {appointment.location && <p className="text-sm text-muted-foreground">{appointment.location}</p>}

      <div className="flex items-center gap-3 pt-1">
        <Button variant="outline" size="default" className="w-full" onClick={handleEditOpen}>
          Modifier
        </Button>
        <Button
          variant="outline"
          size="default"
          className="w-full text-red-600 hover:text-red-600/80"
          onClick={() => setIsDeleteOpen(true)}
        >
          Supprimer
        </Button>
      </div>

      {/* Credenza pour modifier le rendez-vous - Nouvelle approche de design */}
      <Credenza open={isEditOpen} onOpenChange={setIsEditOpen}>
        <CredenzaContent className="max-w-4xl flex flex-col max-h-[600px]">
          <div className="flex-none">
            <CredenzaHeader>
              <CredenzaTitle>Modifier le rendez-vous</CredenzaTitle>
            </CredenzaHeader>

            <Tabs defaultValue="informations" className="w-full pt-2">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="informations">Informations</TabsTrigger>
                <TabsTrigger value="service">Service</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <div className="overflow-y-auto pr-1 pb-4" style={{ maxHeight: "calc(500px - 170px)" }}>
                <TabsContent value="informations" className="mt-0">
                  <CredenzaBody className="space-y-5 py-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="petName" className="text-base">
                            Nom de l&apos;animal
                          </Label>
                          <Input
                            id="petName"
                            className="mt-1.5"
                            value={editedAppointment.petName || ""}
                            onChange={e => setEditedAppointment({ ...editedAppointment, petName: e.target.value })}
                          />
                        </div>

                        <div>
                          <Label htmlFor="time" className="text-base">
                            Heure du rendez-vous
                          </Label>
                          <Input
                            id="time"
                            className="mt-1.5"
                            value={editedAppointment.time || ""}
                            onChange={e => setEditedAppointment({ ...editedAppointment, time: e.target.value })}
                          />
                        </div>

                        <div>
                          <Label htmlFor="location" className="text-base">
                            Lieu
                          </Label>
                          <Input
                            id="location"
                            className="mt-1.5"
                            value={editedAppointment.location || ""}
                            onChange={e => setEditedAppointment({ ...editedAppointment, location: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="ownerName" className="text-base">
                            Nom du propriétaire
                          </Label>
                          <Input
                            id="ownerName"
                            className="mt-1.5"
                            value={editedAppointment.ownerName || ""}
                            onChange={e => setEditedAppointment({ ...editedAppointment, ownerName: e.target.value })}
                          />
                        </div>

                        <div>
                          <Label htmlFor="status" className="text-base">
                            Statut
                          </Label>
                          <Select
                            value={editedAppointment.status}
                            onValueChange={(value: any) =>
                              setEditedAppointment({ ...editedAppointment, status: value })
                            }
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Sélectionnez un statut" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="confirmed">Confirmé</SelectItem>
                              <SelectItem value="pending">En attente</SelectItem>
                              <SelectItem value="completed">Terminé</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CredenzaBody>
                </TabsContent>

                <TabsContent value="service" className="mt-0">
                  <CredenzaBody className="space-y-4 py-2">
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-base font-medium">Services disponibles</Label>
                    </div>

                    {isLoading ? (
                      <div className="py-8 text-center text-muted-foreground">Chargement des services...</div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services.map(service => (
                          <div
                            key={service.id}
                            className={cn(
                              "flex flex-col border rounded-lg p-2.5 cursor-pointer transition-all",
                              selectedService === service.id
                                ? "border-primary bg-primary/5 shadow-sm"
                                : "border-border hover:border-border/80"
                            )}
                            onClick={() => handleServiceSelect(service.id)}
                          >
                            <div className="mb-1.5 flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-xs",
                                  appointmentColors[service.type].replace("bg-", "border-"),
                                  appointmentColors[service.type]
                                    .replace("bg-", "text-")
                                    .replace(" text-white", "")
                                    .replace(" hover:bg-", " hover:text-")
                                )}
                              >
                                {appointmentLabels[service.type]}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{service.duration}</span>
                            </div>

                            <div className="text-sm font-medium mb-1">{service.name}</div>

                            {service.description && (
                              <p className="text-xs text-muted-foreground flex-grow line-clamp-2">
                                {service.description}
                              </p>
                            )}

                            {service.price && (
                              <div className="mt-2 text-right">
                                <span className="text-sm font-semibold">{service.price}€</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CredenzaBody>
                </TabsContent>

                <TabsContent value="notes" className="mt-0">
                  <CredenzaBody className="py-2">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="notes" className="text-base">
                          Notes sur le rendez-vous
                        </Label>
                        <Textarea
                          id="notes"
                          className="min-h-[150px] mt-1.5"
                          placeholder="Informations complémentaires sur le rendez-vous"
                          value={editedAppointment.notes || ""}
                          onChange={e => setEditedAppointment({ ...editedAppointment, notes: e.target.value })}
                        />
                      </div>
                    </div>
                  </CredenzaBody>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <div className="flex-none mt-auto pt-4 border-t">
            <CredenzaFooter>
              <div className="flex justify-between w-full">
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleEditSave}>Enregistrer les modifications</Button>
              </div>
            </CredenzaFooter>
          </div>
        </CredenzaContent>
      </Credenza>

      {/* AlertDialog pour confirmer la suppression */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Voulez-vous vraiment supprimer le rendez-vous de {appointment.petName} ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive/70 text-destructive-foreground hover:bg-destructive/80"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
