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
import { appointmentColors, appointmentLabels, statusColors } from "../data/constants"

// Importer le type Appointment depuis la DB
import type { Appointment } from "@/src/db"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/src/lib/utils"

// Type pour mapper les types d'appointments vers les clés dans appointmentColors et appointmentLabels
type AppointmentColorKey = keyof typeof appointmentColors
type AppointmentLabelKey = keyof typeof appointmentLabels
type StatusColorKey = keyof typeof statusColors

const appointmentTypeToColorKey: Record<"oneToOne" | "multiple", AppointmentColorKey> = {
  oneToOne: "consultation", // Par défaut on utilise consultation pour oneToOne
  multiple: "grooming", // Par défaut on utilise grooming pour multiple
}

// Type pour les services du professionnel
interface Service {
  id: string
  name: string
  duration: string
  type: "oneToOne" | "multiple"
  price?: number
  description?: string
}

interface AppointmentDetailsProps {
  appointment: Appointment
  onEdit?: (id: string, updatedAppointment: Partial<Appointment>) => void
  onDelete?: (id: string) => void
  services?: Service[]
  isLoadingServices?: boolean
}

export function AppointmentDetails({
  appointment,
  onEdit,
  onDelete,
  services = [],
  isLoadingServices = false,
}: AppointmentDetailsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editedAppointment, setEditedAppointment] = useState<Partial<Appointment>>({})
  const [selectedService, setSelectedService] = useState<string | null>(null)

  // Obtenir la clé de couleur correspondante au type d'appointment
  const getColorKey = (type: "oneToOne" | "multiple"): AppointmentColorKey => {
    return appointmentTypeToColorKey[type]
  }

  const handleEditOpen = () => {
    // Initialisation des données du formulaire
    setEditedAppointment({
      type: appointment.type,
      status: appointment.status,
      // Autres propriétés à ajouter selon le modèle Appointment
    })

    // Ouverture de la modale
    setIsEditOpen(true)
  }

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)

    // Mise à jour de l'appointment avec les infos du service sélectionné
    const service = services.find(s => s.id === serviceId)
    if (service) {
      setEditedAppointment({
        ...editedAppointment,
        type: service.type,
        // Autres propriétés à mettre à jour selon le service
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

  // Déterminer la clé de couleur pour ce rendez-vous
  const colorKey = getColorKey(appointment.type)

  // Déterminer le nom du propriétaire et du pet à partir du rendez-vous
  const petName = appointment.pet?.name || "Animal"
  const ownerName = appointment.client?.name || "Client"
  const appointmentTime = appointment.slot?.start
    ? new Date(appointment.slot.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "Horaire non défini"
  const appointmentDuration =
    appointment.slot?.end && appointment.slot?.start
      ? `${Math.round((new Date(appointment.slot.end).getTime() - new Date(appointment.slot.start).getTime()) / 1000 / 60)} min`
      : "Durée inconnue"

  // Simplifier la gestion de l'adresse pour éviter les erreurs de type
  const location = appointment.pro ? appointment.pro.name || "" : ""

  // Récupérer les notes depuis les propriétés disponibles
  const notes = appointment.observation?.content || ""

  return (
    <div className="p-5 rounded-lg border border-border space-y-4 hover:border-border/80 transition-colors">
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-lg">{petName}</h3>
            <Badge
              variant="default"
              className={cn(
                "capitalize text-sm px-2.5 py-0.5",
                statusColors[appointment.status as StatusColorKey] || statusColors["PENDING PAYMENT"]
              )}
            >
              {appointment.status === "CONFIRMED"
                ? "Confirmé"
                : appointment.status === "PENDING PAYMENT"
                  ? "En attente"
                  : appointment.status === "COMPLETED"
                    ? "Terminé"
                    : appointment.status === "CANCELED"
                      ? "Annulé"
                      : appointment.status}
            </Badge>
          </div>
          <p className="text-base text-muted-foreground">{ownerName}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-base">
        <Badge
          variant="outline"
          className={cn("text-sm px-2.5 py-0.5", appointmentColors[colorKey].replace("bg-", "border-"))}
        >
          {appointmentLabels[colorKey]}
        </Badge>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{appointmentTime}</span>
          <span>•</span>
          <span>{appointmentDuration}</span>
        </div>
      </div>

      {location && <p className="text-sm text-muted-foreground">{location}</p>}

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
                      {/* Informations du rendez-vous - À adapter selon la structure de vos données */}
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="pet" className="text-base">
                            Nom de l&apos;animal
                          </Label>
                          <Input id="pet" className="mt-1.5" value={petName} readOnly />
                        </div>

                        <div>
                          <Label htmlFor="time" className="text-base">
                            Heure du rendez-vous
                          </Label>
                          <Input id="time" className="mt-1.5" value={appointmentTime} readOnly />
                        </div>

                        <div>
                          <Label htmlFor="location" className="text-base">
                            Lieu
                          </Label>
                          <Input id="location" className="mt-1.5" value={location} readOnly />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="owner" className="text-base">
                            Nom du propriétaire
                          </Label>
                          <Input id="owner" className="mt-1.5" value={ownerName} readOnly />
                        </div>

                        <div>
                          <Label htmlFor="status" className="text-base">
                            Statut
                          </Label>
                          <Select
                            value={editedAppointment.status || appointment.status}
                            onValueChange={(value: any) =>
                              setEditedAppointment({ ...editedAppointment, status: value })
                            }
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Sélectionnez un statut" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CONFIRMED">Confirmé</SelectItem>
                              <SelectItem value="SCHEDULED">En attente</SelectItem>
                              <SelectItem value="COMPLETED">Terminé</SelectItem>
                              <SelectItem value="CANCELED">Annulé</SelectItem>
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

                    {isLoadingServices ? (
                      <div className="py-8 text-center text-muted-foreground">Chargement des services...</div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services.map(service => {
                          const serviceColorKey = appointmentTypeToColorKey[service.type]
                          return (
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
                                    appointmentColors[serviceColorKey].replace("bg-", "border-"),
                                    appointmentColors[serviceColorKey]
                                      .replace("bg-", "text-")
                                      .replace(" text-white", "")
                                      .replace(" hover:bg-", " hover:text-")
                                  )}
                                >
                                  {appointmentLabels[serviceColorKey]}
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
                          )
                        })}
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
                          value={notes}
                          onChange={e =>
                            setEditedAppointment({
                              ...editedAppointment,
                              observation: { ...appointment.observation, content: e.target.value },
                            })
                          }
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
              Voulez-vous vraiment supprimer le rendez-vous de {petName} ? Cette action est irréversible.
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
