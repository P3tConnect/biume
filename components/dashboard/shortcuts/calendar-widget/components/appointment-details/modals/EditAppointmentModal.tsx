"use client"

import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CalendarClock } from "lucide-react"
import { cn } from "@/src/lib/utils"
import type { Appointment, Pet } from "@/src/db"
import type { Service } from "../types"
import { appointmentColors, appointmentLabels } from "../constants"
import { appointmentTypeToColorKey } from "../types"

interface EditAppointmentModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  appointment: Appointment
  editedAppointment: Partial<Appointment>
  setEditedAppointment: (appointment: Partial<Appointment>) => void
  selectedService: string | null
  onServiceSelect: (serviceId: string) => void
  services: Service[]
  isLoadingServices: boolean
  onSave: () => void
  allPets: Pet[]
  group: Appointment[]
}

export function EditAppointmentModal({
  isOpen,
  onOpenChange,
  appointment,
  editedAppointment,
  setEditedAppointment,
  selectedService,
  onServiceSelect,
  services,
  isLoadingServices,
  onSave,
  allPets,
  group,
}: EditAppointmentModalProps) {
  return (
    <Credenza open={isOpen} onOpenChange={onOpenChange}>
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
                  <Label htmlFor="animals">Animaux</Label>
                  <Input id="animals" value={allPets.map(pet => pet.name).join(", ")} className="mt-2" readOnly />
                </div>

                <div>
                  <Label htmlFor="owner">Propriétaire</Label>
                  <Input id="owner" value={group.map(app => app.client?.name).join(", ")} className="mt-2" readOnly />
                </div>

                <div>
                  <Label htmlFor="date">Date & Heure</Label>
                  <Input
                    id="date"
                    value={`${
                      appointment.slot?.start
                        ? new Date(appointment.slot.start).toLocaleDateString("fr-FR")
                        : "Date non définie"
                    }, ${
                      appointment.slot?.start
                        ? new Date(appointment.slot.start).toLocaleTimeString("fr-FR")
                        : "Horaire non défini"
                    }`}
                    className="mt-2"
                    readOnly
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Durée</Label>
                  <Input
                    id="duration"
                    value={`${group.reduce((sum, app) => sum + (app.service.duration || 0), 0)} min`}
                    className="mt-2"
                    readOnly
                  />
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
                          onClick={() => onServiceSelect(service.id)}
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
                  value={editedAppointment.observation?.content || appointment.observation?.content || ""}
                  onChange={e =>
                    setEditedAppointment({
                      ...editedAppointment,
                      observation: {
                        ...(appointment.observation || {}),
                        content: e.target.value,
                        title: appointment.observation?.title || "Note de rendez-vous",
                      },
                    })
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={onSave}>Enregistrer</Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}
