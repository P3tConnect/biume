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
  CredenzaClose,
} from "@/components/ui/credenza"
import React, { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { appointmentColors, appointmentLabels, statusColors } from "../data/constants"

// Importer le type Appointment depuis la DB
import type { Appointment, Organization, Pet, User } from "@/src/db"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  CalendarClock,
  CalendarDays,
  Clock,
  Edit,
  Eye,
  FolderOpen,
  MapPin,
  Trash2,
  User as UserIcon,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/src/lib/utils"
import { Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { AnimalCredenza } from "../../pro/unified-metrics/AnimalCredenza"
import { useMutation, useQuery } from "@tanstack/react-query"
import { cancelAppointment } from "@/src/actions/appointments.action"
import { toast } from "sonner"
import { useActiveOrganization } from "@/src/lib/auth-client"
import { getCurrentOrganization, getPetById } from "@/src/actions"

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
  onViewPetDetails?: (petId: string) => void // Pour la compatibilité avec l'ancien comportement
}

export function AppointmentDetails({
  appointment,
  onEdit,
  onDelete,
  services = [],
  isLoadingServices = false,
  onViewPetDetails,
}: AppointmentDetailsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isAnimalCredenzaOpen, setIsAnimalCredenzaOpen] = useState(false)
  const [editedAppointment, setEditedAppointment] = useState<Partial<Appointment>>({})
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [cancelReason, setCancelReason] = useState<string>("")

  // Obtenir la clé de couleur correspondante au type d'appointment
  const getColorKey = (type: "oneToOne" | "multiple"): AppointmentColorKey => {
    return appointmentTypeToColorKey[type]
  }

  const handleEditOpen = () => {
    // Initialisation des données du formulaire
    setEditedAppointment({
      type: appointment.type,
      status: appointment.status,
      observation: appointment.observation,
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

  const handleViewPetDetails = () => {
    // Ouvre l'AnimalCredenza directement
    setIsAnimalCredenzaOpen(true)

    // Appelle aussi l'ancienne fonction si elle existe (pour compatibilité)
    if (onViewPetDetails && appointment.pet?.id) {
      onViewPetDetails(appointment.pet.id)
    }
  }

  const { mutateAsync: cancel } = useMutation({
    mutationFn: ({ appointmentId, deniedReason }: { appointmentId: string; deniedReason: string }) =>
      cancelAppointment({ appointmentId, deniedReason }),
    onSuccess: () => {
      toast.success("Rendez-vous annulé avec succès")
    },
    onError: () => {
      toast.error("Erreur lors de l'annulation du rendez-vous")
    },
  })

  // Déterminer la clé de couleur pour ce rendez-vous
  const colorKey = getColorKey(appointment.type)

  // Déterminer le nom du propriétaire et du pet à partir du rendez-vous
  const petName = appointment.pet?.name || "Animal"
  const ownerName = appointment.client?.name || "Client"
  const appointmentTime = appointment.slot?.start
    ? new Date(appointment.slot.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "Horaire non défini"
  const appointmentDate = appointment.slot?.start
    ? new Date(appointment.slot.start).toLocaleDateString([], { day: "numeric", month: "long", year: "numeric" })
    : "Date non définie"
  const appointmentDuration =
    appointment.slot?.end && appointment.slot?.start
      ? `${Math.round((new Date(appointment.slot.end).getTime() - new Date(appointment.slot.start).getTime()) / 1000 / 60)} min`
      : "Durée inconnue"

  // Simplifier la gestion de l'adresse pour éviter les erreurs de type
  const location = appointment.pro ? appointment.pro.name || "" : ""

  // Récupérer les notes depuis les propriétés disponibles
  const notes = appointment.observation?.content || ""

  // Détermine les initiales pour l'avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Rendu du badge de statut
  const renderStatusBadge = (status: string) => {
    let label = "Statut inconnu"

    switch (status) {
      case "CONFIRMED":
        label = "Confirmé"
        break
      case "SCHEDULED":
      case "PENDING PAYMENT":
        label = "En attente"
        break
      case "COMPLETED":
        label = "Terminé"
        break
      case "CANCELED":
        label = "Annulé"
        break
    }

    return (
      <Badge
        className={cn("capitalize text-xs", statusColors[status as StatusColorKey] || statusColors["PENDING PAYMENT"])}
      >
        {label}
      </Badge>
    )
  }

  return (
    <div className="bg-white dark:bg-card rounded-xl border border-border/40 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      {/* En-tête de la carte avec statut */}
      <div
        className={cn(
          "h-1 w-full transition-colors",
          statusColors[appointment.status as StatusColorKey] || statusColors["PENDING PAYMENT"]
        )}
      />

      <div className="p-4 space-y-3">
        {/* Informations principales */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleViewPetDetails}
              className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Avatar
                className={cn(
                  "h-10 w-10 text-white text-xs font-medium flex items-center justify-center group-hover:ring-2 ring-offset-2 ring-offset-background transition-all",
                  appointmentColors[colorKey]
                )}
              >
                {getInitials(petName)}
              </Avatar>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-background" />
            </button>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-base">{petName}</h3>
                {renderStatusBadge(appointment.status)}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <UserIcon className="h-3 w-3 mr-0.5" />
                <span>{ownerName}</span>
              </div>
            </div>
          </div>

          <Badge
            variant="outline"
            className={cn("text-xs px-2 py-0.5 rounded-full", appointmentColors[colorKey].replace("bg-", "border-"))}
          >
            {appointmentLabels[colorKey]}
          </Badge>
        </div>

        {/* Date et lieu */}
        <div className="grid grid-cols-1 gap-1.5">
          <div className="flex items-center gap-2 text-sm text-foreground/80">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{appointmentDate}</span>
            </div>
            <span className="inline-block mx-0.5 w-1 h-1 rounded-full bg-muted-foreground/30"></span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{appointmentTime}</span>
              <span className="text-xs text-muted-foreground">({appointmentDuration})</span>
            </div>
          </div>

          {location && (
            <div className="flex items-center gap-1.5 text-sm text-foreground/80">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{location}</span>
            </div>
          )}
        </div>

        {/* Notes (aperçu) */}
        {notes && (
          <div className="pt-1 pb-0">
            <p className="text-xs text-muted-foreground line-clamp-1">{notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1.5">
          <Button variant="outline" size="sm" className="flex-1 gap-1.5 h-8" onClick={handleEditOpen}>
            <Edit className="h-3.5 w-3.5" />
            <span>Modifier</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1.5" onClick={handleViewPetDetails}>
            <FolderOpen className="h-3.5 w-3.5" />
            <span>Dossier</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-red-600 hover:text-red-600 hover:bg-red-600/10"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Modale de modification simplifiée */}
      <Credenza open={isEditOpen} onOpenChange={setIsEditOpen}>
        <CredenzaContent className="max-w-lg">
          <CredenzaHeader className="pb-4">
            <CredenzaTitle className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-primary" />
              Modifier le rendez-vous
            </CredenzaTitle>
          </CredenzaHeader>

          <Tabs defaultValue="informations" className="w-full">
            <TabsList className="mb-6 w-full">
              <TabsTrigger value="informations">Informations</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <CredenzaBody>
              <TabsContent value="informations" className="space-y-4 mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select
                      value={editedAppointment.status || appointment.status}
                      onValueChange={(value: any) => setEditedAppointment({ ...editedAppointment, status: value })}
                    >
                      <SelectTrigger className="mt-2">
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

                  <div>
                    <Label htmlFor="animal">Animal</Label>
                    <Input id="animal" value={petName} className="mt-2" readOnly />
                  </div>

                  <div>
                    <Label htmlFor="owner">Propriétaire</Label>
                    <Input id="owner" value={ownerName} className="mt-2" readOnly />
                  </div>

                  <div>
                    <Label htmlFor="date">Date & Heure</Label>
                    <Input id="date" value={`${appointmentDate}, ${appointmentTime}`} className="mt-2" readOnly />
                  </div>

                  <div>
                    <Label htmlFor="duration">Durée</Label>
                    <Input id="duration" value={appointmentDuration} className="mt-2" readOnly />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="services" className="mt-0">
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground mb-2">Sélectionnez un service pour ce rendez-vous</div>

                  {isLoadingServices ? (
                    <div className="py-8 text-center text-muted-foreground">
                      <div className="animate-pulse w-8 h-8 rounded-full bg-muted mx-auto mb-2"></div>
                      Chargement des services...
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
                      {services.map(service => {
                        const serviceColorKey = appointmentTypeToColorKey[service.type]
                        return (
                          <div
                            key={service.id}
                            className={cn(
                              "flex items-center justify-between border border-input rounded-lg p-3 cursor-pointer transition-all",
                              selectedService === service.id
                                ? "border-primary ring-1 ring-primary/30 bg-primary/5"
                                : "hover:border-border/80 hover:bg-muted/30"
                            )}
                            onClick={() => handleServiceSelect(service.id)}
                          >
                            <div className="flex flex-col">
                              <div className="font-medium text-sm">{service.name}</div>
                              <div className="flex items-center gap-2 mt-1">
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
                            </div>

                            {service.price && <div className="text-sm font-semibold">{service.price}€</div>}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="notes" className="mt-0">
                <div className="space-y-4">
                  <Label htmlFor="notes">Notes sur le rendez-vous</Label>
                  <Textarea
                    id="notes"
                    className="min-h-[200px] resize-none"
                    placeholder="Informations complémentaires sur le rendez-vous"
                    value={editedAppointment.observation?.content || notes}
                    onChange={e =>
                      setCancelReason(e.target.value)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Ces notes sont visibles uniquement par vous et votre équipe.
                  </p>
                </div>
              </TabsContent>
            </CredenzaBody>
          </Tabs>

          <CredenzaFooter className="flex justify-between pt-4 mt-4 border-t">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditSave}>Enregistrer</Button>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>

      {/* Intégration de l'AnimalCredenza pour le dossier animal */}
      {appointment.pet && appointment.client && (
        <AnimalCredenza
          isOpen={isAnimalCredenzaOpen}
          onOpenChange={setIsAnimalCredenzaOpen}
          petId={appointment.pet.id}
        />
      )}

      {/* AlertDialog pour confirmer la suppression */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Voulez-vous vraiment supprimer le rendez-vous de {petName} ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Label htmlFor="deniedReason">Raison de l'annulation</Label>
          <Textarea
            id="deniedReason"
            value={cancelReason}
            onChange={e => setCancelReason(e.target.value)}
            placeholder="Exemple: Patient trop excité, pro absent, etc."
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!cancelReason) {
                  toast.error("Veuillez entrer une raison de l'annulation")
                  return
                }
                await cancel({ appointmentId: appointment.id, deniedReason: cancelReason })
                setIsDeleteOpen(false)
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

/**
 * Composant réutilisable pour afficher un rendez-vous dans différents contextes
 */
export function AppointmentCard({
  appointment,
  onEdit,
  onDelete,
  onViewPetDetails,
  compact = false,
}: AppointmentDetailsProps & { compact?: boolean }) {
  // Réutilise la logique du composant principal mais avec un rendu différent
  // Version compacte pour les listes, tableaux, etc.

  if (compact) {
    // Rendu compact
    const petName = appointment.pet?.name || "Animal"
    const ownerName = appointment.client?.name || "Client"
    const appointmentTime = appointment.slot?.start
      ? new Date(appointment.slot.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "Horaire non défini"
    const colorKey = appointmentTypeToColorKey[appointment.type]

    return (
      <div className="flex items-center justify-between p-2 border-b gap-3 hover:bg-muted/20 transition-colors">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-1 h-8 rounded-full",
              statusColors[appointment.status as StatusColorKey] || statusColors["PENDING PAYMENT"]
            )}
          />
          <div>
            <h4 className="text-sm font-medium">{petName}</h4>
            <p className="text-xs text-muted-foreground">{ownerName}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-xs text-muted-foreground">
            <Clock className="h-3 w-3 inline mr-1" />
            {appointmentTime}
          </div>
          <Badge
            variant="outline"
            className={cn("text-xs px-1.5 py-0 rounded-full", appointmentColors[colorKey].replace("bg-", "border-"))}
          >
            {appointmentLabels[colorKey]}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onViewPetDetails?.(appointment.pet?.id || "")}
          >
            <Eye className="h-3 w-3" />
          </Button>
        </div>
      </div>
    )
  }

  // Si non compact, utilise le composant principal
  return (
    <AppointmentDetails
      appointment={appointment}
      onEdit={onEdit}
      onDelete={onDelete}
      onViewPetDetails={onViewPetDetails}
    />
  )
}
