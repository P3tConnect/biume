"use client"

import {
  Activity,
  Bird,
  Calendar,
  CalendarClock,
  Cat,
  ClipboardList,
  Clock,
  Dog,
  Edit2,
  Eye,
  House,
  Mail,
  MapPin,
  Palette,
  Phone,
  Ruler,
  Stethoscope,
  Trash2,
  Weight,
} from "lucide-react"
import React from "react"

import {
  Badge,
  Button,
  Card,
  ScrollArea,
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui"

import { type Patient } from "./patients-page"

interface PatientDetailsDrawerProps {
  patient: Patient | null
  isOpen: boolean
  onClose: () => void
  onEdit?: (patient: Patient) => void
  onDelete?: (patient: Patient) => void
}

const getAnimalIcon = (type: string) => {
  switch (type) {
    case "Dog":
      return <Dog className="h-5 w-5" />
    case "Cat":
      return <Cat className="h-5 w-5" />
    case "Bird":
      return <Bird className="h-5 w-5" />
    case "Horse":
      return <House className="h-5 w-5" />
    default:
      return null
  }
}

const PatientDetailsDrawer = ({ patient, isOpen, onClose, onEdit, onDelete }: PatientDetailsDrawerProps) => {
  if (!patient) return null

  const age = Math.floor(
    (new Date().getTime() - new Date(patient.birthDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  )

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-3xl p-0 bg-background">
        {/* Hero Section */}
        <div className="relative h-48 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
          <SheetHeader className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent pt-24">
            <div className="flex items-center justify-between w-full mx-auto">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-background rounded-xl shadow-sm">{getAnimalIcon(patient.type)}</div>
                <div>
                  <div className="flex items-center gap-3">
                    <SheetTitle className="text-3xl font-bold">{patient.name}</SheetTitle>
                    <Badge variant="secondary" className="font-normal text-sm">
                      {patient.type} {patient.nacType ? `• ${patient.nacType}` : ""}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground mt-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{age} ans</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(patient.birthDate).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {onEdit && (
                  <Button variant="outline" size="default" onClick={() => onEdit(patient)}>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                )}
                {onDelete && (
                  <Button variant="destructive" size="default" onClick={() => onDelete(patient)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                )}
              </div>
            </div>
          </SheetHeader>
        </div>

        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="w-full mx-auto px-6">
            <div className="space-y-6 py-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                  <Stethoscope className="h-5 w-5" />
                  <span>Nouvelle consultation</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                  <CalendarClock className="h-5 w-5" />
                  <span>Planifier RDV</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                  <ClipboardList className="h-5 w-5" />
                  <span>Historique</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                  <Activity className="h-5 w-5" />
                  <span>Statistiques</span>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {/* Physical Characteristics */}
                <div className="col-span-2">
                  <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Caractéristiques physiques</h3>
                    <div className="grid grid-cols-2 gap-6">
                      {patient.weight && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Weight className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Poids</p>
                            <p className="font-medium">{patient.weight} kg</p>
                          </div>
                        </div>
                      )}
                      {patient.height && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Ruler className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Taille</p>
                            <p className="font-medium">{patient.height} cm</p>
                          </div>
                        </div>
                      )}
                      {patient.furColor && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Palette className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Couleur du pelage</p>
                            <p className="font-medium">{patient.furColor}</p>
                          </div>
                        </div>
                      )}
                      {patient.eyeColor && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Eye className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Couleur des yeux</p>
                            <p className="font-medium">{patient.eyeColor}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>

                {/* Owner Information */}
                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Propriétaire</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-medium">
                        {patient.ownerName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium text-lg">{patient.ownerName}</h4>
                        <p className="text-sm text-muted-foreground">Client depuis 2023</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>+33 6 XX XX XX XX</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>email@example.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>Paris, France</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Activité récente</h3>
                  <Button variant="outline" size="sm">
                    Voir tout
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-muted-foreground">Dernières consultations</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg mt-1">
                          <Activity className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Consultation de routine</p>
                          <p className="text-sm text-muted-foreground">Il y a 2 jours</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg mt-1">
                          <Activity className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Vaccination</p>
                          <p className="text-sm text-muted-foreground">Il y a 2 semaines</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-muted-foreground">Prochains rendez-vous</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg mt-1">
                          <CalendarClock className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Contrôle annuel</p>
                          <p className="text-sm text-muted-foreground">Dans 3 semaines</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg mt-1">
                          <CalendarClock className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Rappel vaccin</p>
                          <p className="text-sm text-muted-foreground">Dans 2 mois</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default PatientDetailsDrawer
