"use client"

import {
  ActivityIcon,
  CalendarCheck,
  CalendarIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  InfoIcon,
  MapPinIcon,
  MessageSquareIcon,
  PawPrintIcon,
  PhoneIcon,
  ShieldIcon,
  TimerIcon,
  TrendingUpIcon,
  UserIcon,
  XCircleIcon,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui"
import React, { useState } from "react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

type Reservation = {
  id: string
  petName: string
  petType: string
  petBreed: string
  ownerName: string
  ownerPhone: string
  service: string
  date: string
  time: string
  duration: string
  status: "pending" | "confirmed" | "cancelled"
  notes?: string
  conflicts?: Reservation[]
}

const PendingReservationsWidget = () => {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false)

  // Exemple de données (à remplacer par vos vraies données)
  const reservations: Reservation[] = [
    {
      id: "1",
      petName: "Luna",
      petType: "Chien",
      petBreed: "Golden Retriever",
      ownerName: "Sophie Martin",
      ownerPhone: "06 12 34 56 78",
      service: "Consultation vétérinaire",
      date: "2024-03-22",
      time: "14:30",
      duration: "30 min",
      status: "pending",
      notes: "Première visite - Vaccins à vérifier",
    },
    {
      id: "2",
      petName: "Max",
      petType: "Chat",
      petBreed: "Siamois",
      ownerName: "Pierre Dubois",
      ownerPhone: "06 98 76 54 32",
      service: "Toilettage complet",
      date: "2024-03-22",
      time: "16:00",
      duration: "1h",
      status: "pending",
      notes: "Sensible aux oreilles",
    },
    {
      id: "3",
      petName: "Rocky",
      petType: "Chien",
      petBreed: "Berger Allemand",
      ownerName: "Marie Leroy",
      ownerPhone: "06 11 22 33 44",
      service: "Vaccination annuelle",
      date: "2024-03-23",
      time: "09:15",
      duration: "15 min",
      status: "pending",
    },
  ]

  // Fonction pour formater la date au format français
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
    return new Date(dateString).toLocaleDateString("fr-FR", options)
  }

  const handleAction = (action: string) => {
    // Implémentation des actions (confirmer, reporter, annuler)
    console.log(`Action: ${action} pour la réservation ${selectedReservation?.id}`)
    setIsDrawerOpen(false)
  }

  const openDrawer = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setIsDrawerOpen(true)
  }

  return (
    <>
      <Card className="rounded-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-md">
                <CalendarCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-7xl">Demandes de rendez-vous</CardTitle>
            </div>
            <Badge variant="secondary" className="px-2 py-0.5">
              {reservations.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-3">
          <ScrollArea className="h-[280px] pr-4">
            <div className="space-y-2">
              {reservations.map(reservation => (
                <div
                  key={reservation.id}
                  className={`relative overflow-hidden group p-4 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-200 rounded-xl border-l-4 ${
                    reservation.conflicts ? "border-l-destructive" : "border-l-green-500"
                  }`}
                  onClick={() => openDrawer(reservation)}
                >
                  {/* Indicateur de conflit */}
                  {reservation.conflicts && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0 font-medium">
                        Conflit horaire
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    {/* Avatar et détails de l'animal */}
                    <div className="flex flex-col items-center space-y-1">
                      <Avatar className="h-14 w-14 border-2 border-background shadow">
                        <AvatarImage src={`/pets/${reservation.id}.jpg`} alt={reservation.petName} />
                        <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600">
                          <PawPrintIcon className="w-5 h-5 text-white" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-semibold text-center">{reservation.petName}</span>
                      <span className="text-[10px] bg-muted rounded-full px-2 py-0.5 text-muted-foreground">
                        {reservation.petType}
                      </span>
                    </div>

                    {/* Détails de la réservation */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-2">
                        <div className="font-medium text-sm">{reservation.service}</div>
                        <div className="text-xs text-muted-foreground">{reservation.petBreed}</div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <div className="bg-muted/40 rounded-lg p-1.5 flex flex-col items-center justify-center text-center">
                          <CalendarIcon className="h-3 w-3 text-muted-foreground mb-0.5" />
                          <span className="text-[10px] font-medium">{formatDate(reservation.date)}</span>
                        </div>
                        <div className="bg-muted/40 rounded-lg p-1.5 flex flex-col items-center justify-center text-center">
                          <ClockIcon className="h-3 w-3 text-muted-foreground mb-0.5" />
                          <span className="text-[10px] font-medium">{reservation.time}</span>
                        </div>
                        <div className="bg-muted/40 rounded-lg p-1.5 flex flex-col items-center justify-center text-center">
                          <TimerIcon className="h-3 w-3 text-muted-foreground mb-0.5" />
                          <span className="text-[10px] font-medium">{reservation.duration}</span>
                        </div>
                      </div>

                      {/* Informations du propriétaire */}
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1.5">
                          <UserIcon className="w-3 h-3 text-muted-foreground" />
                          <div className="text-xs">{reservation.ownerName}</div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <PhoneIcon className="w-3 h-3 text-muted-foreground" />
                          <div className="text-xs">{reservation.ownerPhone}</div>
                        </div>
                      </div>
                    </div>

                    {/* Actions rapides */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-0 top-0 bottom-0 flex flex-col justify-center pr-3 pl-6 bg-gradient-to-l from-background to-transparent dark:from-slate-800 dark:to-transparent">
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-background dark:bg-slate-700"
                          onClick={e => {
                            e.stopPropagation()
                            handleAction("confirm")
                          }}
                        >
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-background dark:bg-slate-700"
                          onClick={e => {
                            e.stopPropagation()
                            handleAction("cancel")
                          }}
                        >
                          <XCircleIcon className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Indicateur de notes */}
                  {reservation.notes && (
                    <div className="absolute bottom-1 right-1">
                      <MessageSquareIcon className="h-3 w-3 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {reservations.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full mb-3">
                    <CheckCircleIcon className="w-7 h-7 text-green-600" />
                  </div>
                  <p className="text-lg font-medium mb-1">Toutes à jour !</p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Aucune demande de rendez-vous en attente pour le moment.
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent side="right" className="w-[600px] overflow-y-auto p-0">
          {selectedReservation && (
            <>
              <div className="sticky top-0 z-10 bg-background border-b p-6">
                <SheetHeader className="text-left space-y-1">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="text-xl">Détails de la réservation</SheetTitle>
                    <Badge className="bg-amber-500/20 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 font-normal border-none">
                      En attente
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Demande reçue le {new Date().toLocaleDateString("fr-FR")}
                  </p>
                </SheetHeader>
              </div>

              <div className="p-6 space-y-6">
                {/* Carte de service avec mise en page améliorée */}
                <div className="bg-muted/30 rounded-xl p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                      <ActivityIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold text-lg">{selectedReservation.service}</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-background/60 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground mb-1" />
                      <span className="text-sm font-medium">{formatDate(selectedReservation.date)}</span>
                    </div>
                    <div className="bg-background/60 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                      <ClockIcon className="h-4 w-4 text-muted-foreground mb-1" />
                      <span className="text-sm font-medium">{selectedReservation.time}</span>
                    </div>
                    <div className="bg-background/60 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                      <TimerIcon className="h-4 w-4 text-muted-foreground mb-1" />
                      <span className="text-sm font-medium">{selectedReservation.duration}</span>
                    </div>
                  </div>

                  {selectedReservation.notes && (
                    <div className="bg-background/60 p-3 rounded-lg border border-border/50">
                      <div className="flex items-start gap-2">
                        <InfoIcon className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium mb-1">Note</h4>
                          <p className="text-sm text-muted-foreground">{selectedReservation.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Information sur l'animal avec onglets */}
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="info">Profil</TabsTrigger>
                    <TabsTrigger value="history">Historique</TabsTrigger>
                    <TabsTrigger value="health">Santé</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="mt-0">
                    <div className="bg-muted/30 rounded-xl overflow-hidden">
                      <div className="p-5">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-20 w-20 border-2 border-muted">
                            <AvatarImage
                              src={`/pets/${selectedReservation.id}.jpg`}
                              alt={selectedReservation.petName}
                            />
                            <AvatarFallback className="bg-green-600">
                              <PawPrintIcon className="h-8 w-8 text-white" />
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-xl">{selectedReservation.petName}</h3>
                              <Badge variant="secondary">{selectedReservation.petType}</Badge>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3">{selectedReservation.petBreed}</p>

                            <div className="grid grid-cols-3 gap-3">
                              <div className="bg-background/80 rounded-lg p-2 text-center">
                                <span className="text-xs text-muted-foreground">Âge</span>
                                <div className="font-medium">2 ans</div>
                              </div>
                              <div className="bg-background/80 rounded-lg p-2 text-center">
                                <span className="text-xs text-muted-foreground">Poids</span>
                                <div className="font-medium">12 kg</div>
                              </div>
                              <div className="bg-background/80 rounded-lg p-2 text-center">
                                <span className="text-xs text-muted-foreground">Visites</span>
                                <div className="font-medium">5</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t bg-background/20 p-4">
                        <div className="grid grid-cols-3 gap-2">
                          <div className="flex flex-col items-center gap-1 text-sm">
                            <div className="flex items-center gap-1">
                              <TrendingUpIcon className="h-4 w-4 text-green-600" />
                              <span>Suivi régulier</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-center gap-1 text-sm">
                            <div className="flex items-center gap-1">
                              <ShieldIcon className="h-4 w-4 text-green-600" />
                              <span>Vacciné</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-center gap-1 text-sm">
                            <div className="flex items-center gap-1">
                              <ActivityIcon className="h-4 w-4 text-green-600" />
                              <span>Bon état</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="mt-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Consultations récentes</h3>
                      <Badge variant="outline" className="text-xs">
                        5 visites
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-muted/30 p-3 rounded-xl border border-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">Vaccins annuels</div>
                          <Badge variant="secondary" className="text-xs">
                            15 Mars 2024
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">Rappel vaccins CHPPIL + rage</div>
                      </div>

                      <div className="bg-muted/30 p-3 rounded-xl border border-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">Consultation de routine</div>
                          <Badge variant="secondary" className="text-xs">
                            1 Fév 2024
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">Examen général, tout est normal</div>
                      </div>

                      <div className="bg-muted/30 p-3 rounded-xl border border-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">Vermifuge</div>
                          <Badge variant="secondary" className="text-xs">
                            15 Déc 2023
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">Traitement antiparasitaire interne</div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="health" className="mt-0 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">État de santé général</div>
                        <span className="text-sm text-green-500 font-medium">Excellent</span>
                      </div>
                      <Progress value={90} className="h-2 bg-muted" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-muted/30 p-3 rounded-xl border border-border/50">
                        <h4 className="text-sm font-medium mb-2">Vaccins</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">CHPPIL</span>
                          <Badge
                            variant="outline"
                            className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-900"
                          >
                            À jour
                          </Badge>
                        </div>
                        <Separator className="my-2 bg-border/50" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Rage</span>
                          <Badge
                            variant="outline"
                            className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-900"
                          >
                            À jour
                          </Badge>
                        </div>
                      </div>

                      <div className="bg-muted/30 p-3 rounded-xl border border-border/50">
                        <h4 className="text-sm font-medium mb-2">Antiparasites</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Externe</span>
                          <Badge
                            variant="outline"
                            className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900"
                          >
                            Dans 2 semaines
                          </Badge>
                        </div>
                        <Separator className="my-2 bg-border/50" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Interne</span>
                          <Badge
                            variant="outline"
                            className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-900"
                          >
                            À jour
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 p-3 rounded-xl border border-border/50">
                      <h4 className="text-sm font-medium mb-2">Allergies et conditions</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-background">
                          Aucune allergie connue
                        </Badge>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Information du propriétaire */}
                <div className="bg-muted/30 rounded-xl overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 border-2 border-muted">
                        <AvatarImage
                          src={`/avatars/${selectedReservation.id}.jpg`}
                          alt={selectedReservation.ownerName}
                        />
                        <AvatarFallback className="bg-green-600">
                          <UserIcon className="h-6 w-6 text-white" />
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{selectedReservation.ownerName}</h3>
                            <div className="text-sm text-muted-foreground">Client régulier</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsOwnerModalOpen(true)}
                            className="rounded-full h-8 w-8 p-0"
                          >
                            <ChevronRightIcon className="h-5 w-5" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div className="flex items-center gap-2 p-2 bg-background/60 rounded-lg text-sm">
                            <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedReservation.ownerPhone}</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-background/60 rounded-lg text-sm">
                            <PawPrintIcon className="h-4 w-4 text-muted-foreground" />
                            <span>3 animaux</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <SheetFooter className="sticky bottom-0 left-0 right-0 p-6 bg-background/80 backdrop-blur-sm border-t flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1 gap-2" onClick={() => handleAction("cancel")}>
                  <XCircleIcon className="h-4 w-4" />
                  Refuser
                </Button>
                <Button variant="outline" className="flex-1 gap-2" onClick={() => handleAction("reschedule")}>
                  <CalendarIcon className="h-4 w-4" />
                  Proposer autre horaire
                </Button>
                <Button
                  className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                  onClick={() => handleAction("confirm")}
                >
                  <CheckCircleIcon className="h-4 w-4" />
                  Confirmer
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Modal du propriétaire */}
      <Credenza open={isOwnerModalOpen} onOpenChange={setIsOwnerModalOpen}>
        <CredenzaContent className="sm:max-w-[600px] p-0 overflow-hidden">
          <div className="bg-gradient-to-b from-green-100/50 to-background p-6">
            <CredenzaHeader className="mb-6">
              <CredenzaTitle>Profil du propriétaire</CredenzaTitle>
            </CredenzaHeader>

            {selectedReservation && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20 border-4 border-background">
                    <AvatarImage src={`/avatars/${selectedReservation.id}.jpg`} alt={selectedReservation.ownerName} />
                    <AvatarFallback className="bg-green-600">
                      <UserIcon className="h-8 w-8 text-white" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{selectedReservation.ownerName}</h3>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <PhoneIcon className="h-4 w-4" />
                        <span>{selectedReservation.ownerPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <MapPinIcon className="h-4 w-4" />
                        <span>Paris, France</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <MessageSquareIcon className="h-4 w-4" />
                        <span>Préfère être contacté par SMS</span>
                      </div>
                    </div>
                    <Badge className="bg-green-600/20 text-green-700 hover:bg-green-600/30 mt-2">Client VIP</Badge>
                  </div>
                </div>
              </div>
            )}
          </div>

          {selectedReservation && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/30 p-4 rounded-xl text-center space-y-1">
                  <h4 className="text-xs text-muted-foreground uppercase tracking-wider">Animaux</h4>
                  <div className="font-semibold text-2xl">3</div>
                  <div className="text-xs text-muted-foreground">Enregistrés</div>
                </div>
                <div className="bg-muted/30 p-4 rounded-xl text-center space-y-1">
                  <h4 className="text-xs text-muted-foreground uppercase tracking-wider">Visites</h4>
                  <div className="font-semibold text-2xl">12</div>
                  <div className="text-xs text-muted-foreground">Cette année</div>
                </div>
                <div className="bg-muted/30 p-4 rounded-xl text-center space-y-1">
                  <h4 className="text-xs text-muted-foreground uppercase tracking-wider">Fidélité</h4>
                  <div className="font-semibold text-2xl">2</div>
                  <div className="text-xs text-muted-foreground">Années</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Animaux</h4>
                  <Badge variant="outline" className="text-xs">
                    Voir tous
                  </Badge>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  <div className="min-w-[120px] bg-muted/30 rounded-xl p-3 flex flex-col items-center text-center border border-border/50">
                    <Avatar className="h-12 w-12 mb-2">
                      <AvatarImage src="/pets/1.jpg" alt="Luna" />
                      <AvatarFallback>LU</AvatarFallback>
                    </Avatar>
                    <div className="font-medium text-sm">Luna</div>
                    <div className="text-xs text-muted-foreground">Golden Retriever</div>
                  </div>
                  <div className="min-w-[120px] bg-muted/30 rounded-xl p-3 flex flex-col items-center text-center border border-border/50">
                    <Avatar className="h-12 w-12 mb-2">
                      <AvatarImage src="/pets/2.jpg" alt="Max" />
                      <AvatarFallback>MA</AvatarFallback>
                    </Avatar>
                    <div className="font-medium text-sm">Max</div>
                    <div className="text-xs text-muted-foreground">Siamois</div>
                  </div>
                  <div className="min-w-[120px] bg-muted/30 rounded-xl p-3 flex flex-col items-center text-center border border-border/50">
                    <Avatar className="h-12 w-12 mb-2">
                      <AvatarImage src="/pets/3.jpg" alt="Bella" />
                      <AvatarFallback>BE</AvatarFallback>
                    </Avatar>
                    <div className="font-medium text-sm">Bella</div>
                    <div className="text-xs text-muted-foreground">Caniche</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Dernières visites</h4>
                <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Consultation vétérinaire</div>
                    <Badge variant="outline">15 Mars 2024</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Luna - Vaccins annuels</div>
                </div>
                <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Toilettage</div>
                    <Badge variant="outline">1 Mars 2024</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Max - Toilettage complet</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Notes</h4>
                <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                  <p className="text-sm text-muted-foreground">
                    Client fidèle depuis 2022. Préfère les rendez-vous en matinée. Toujours ponctuel et attentif aux
                    recommandations. Très attaché à ses animaux et prêt à suivre toutes les recommandations pour leur
                    bien-être.
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setIsOwnerModalOpen(false)}>
                  Fermer
                </Button>
              </div>
            </div>
          )}
        </CredenzaContent>
      </Credenza>
    </>
  )
}

export default PendingReservationsWidget
