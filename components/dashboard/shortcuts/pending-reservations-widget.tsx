"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ClockIcon,
  CalendarIcon,
  PawPrintIcon,
  UserIcon,
  PhoneIcon,
  ChevronRightIcon,
  ActivityIcon,
  TrendingUpIcon,
  ShieldIcon,
  AlertCircleIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  Credenza,
} from "@/components/ui";

type Reservation = {
  id: string;
  petName: string;
  petType: string;
  petBreed: string;
  ownerName: string;
  ownerPhone: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  status: "pending" | "confirmed" | "cancelled";
  notes?: string;
  conflicts?: Reservation[];
};

const PendingReservationsWidget = () => {
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);

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
  ];

  // Exemple de données pour les graphiques
  const metricData = {
    vaccine: [
      { month: "Jan", value: 2 },
      { month: "Fév", value: 3 },
      { month: "Mar", value: 1 },
      { month: "Avr", value: 4 },
      { month: "Mai", value: 2 },
      { month: "Juin", value: 5 },
    ],
    deworming: [
      { month: "Jan", value: 1 },
      { month: "Fév", value: 2 },
      { month: "Mar", value: 3 },
      { month: "Avr", value: 2 },
      { month: "Mai", value: 4 },
      { month: "Juin", value: 3 },
    ],
    chip: [
      { month: "Jan", value: 1 },
      { month: "Fév", value: 1 },
      { month: "Mar", value: 2 },
      { month: "Avr", value: 1 },
      { month: "Mai", value: 3 },
      { month: "Juin", value: 2 },
    ],
  };

  return (
    <>
      <Card className="rounded-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5 text-muted-foreground" />
              <CardTitle>Réservations en attente</CardTitle>
            </div>
            <Badge>{reservations.length}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className={`flex items-center gap-3 p-3 bg-background shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] rounded-lg hover:shadow-[0_3px_12px_-3px_rgba(0,0,0,0.1)] hover:scale-[1.01] transition-all duration-200 cursor-pointer ${
                reservation.conflicts
                  ? "ring-2 ring-red-200 dark:ring-red-900/30"
                  : ""
              }`}
              onClick={() => {
                setSelectedReservation(reservation);
                setIsDrawerOpen(true);
              }}
            >
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage
                  src={`/pets/${reservation.id}.jpg`}
                  alt={reservation.petName}
                />
                <AvatarFallback>
                  <PawPrintIcon className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="truncate">
                    <span className="font-medium">{reservation.petName}</span>
                    <span className="text-muted-foreground"> · </span>
                    <span className="text-sm text-muted-foreground">
                      {reservation.service}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {reservation.conflicts && (
                      <Badge variant="destructive" className="text-[10px]">
                        Conflit
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {reservation.duration}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    <span>
                      {reservation.date} à {reservation.time}
                    </span>
                  </div>
                  {reservation.notes && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center gap-1 hover:text-foreground transition-colors">
                          <AlertCircleIcon className="h-3 w-3" />
                          <span>Notes</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{reservation.notes}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent side="right" className="w-[600px] overflow-y-auto">
          <SheetHeader className="space-y-2 pb-4 border-b">
            <SheetTitle className="flex items-center justify-between">
              <span>Détails de la réservation</span>
              <Badge variant="outline" className="uppercase">
                En attente
              </Badge>
            </SheetTitle>
          </SheetHeader>

          {selectedReservation && (
            <div className="space-y-6 mt-6">
              {/* Service Information */}
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium text-lg">
                      {selectedReservation.service}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <ClockIcon className="h-4 w-4" />
                      <span>{selectedReservation.duration}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {selectedReservation.date}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedReservation.time}
                    </div>
                  </div>
                </div>
                {selectedReservation.notes && (
                  <div className="bg-background/80 p-3 rounded-md mt-2">
                    <p className="text-sm text-muted-foreground">
                      {selectedReservation.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Pet Information */}
              <div className="bg-muted/50 rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16 border-2 border-muted-foreground/10">
                      <AvatarImage
                        src={`/pets/${selectedReservation.id}.jpg`}
                        alt={selectedReservation.petName}
                      />
                      <AvatarFallback className="bg-primary/5">
                        <PawPrintIcon className="h-6 w-6 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-lg">
                              {selectedReservation.petName}
                            </span>
                            <Badge variant="secondary">
                              {selectedReservation.petType}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {selectedReservation.petBreed}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="text-muted-foreground">2 ans</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="text-muted-foreground">12 kg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t bg-background/50 p-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUpIcon className="h-4 w-4 text-primary" />
                      <span>Suivi régulier</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ShieldIcon className="h-4 w-4 text-primary" />
                      <span>Vacciné</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ActivityIcon className="h-4 w-4 text-primary" />
                      <span>Bon état</span>
                    </div>
                  </div>
                </div>
                <div className="border-t">
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">
                        Dernières consultations
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        5 visites
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm bg-background/80 p-2 rounded-md">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                          <span>15 Mars 2024</span>
                        </div>
                        <div className="text-muted-foreground">
                          Vaccins annuels
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm bg-background/80 p-2 rounded-md">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                          <span>1 Fév 2024</span>
                        </div>
                        <div className="text-muted-foreground">
                          Consultation de routine
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm bg-background/80 p-2 rounded-md">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                          <span>15 Déc 2023</span>
                        </div>
                        <div className="text-muted-foreground">Vermifuge</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Owner Information */}
              <Button
                variant="ghost"
                className="w-full p-0 h-auto hover:bg-muted group rounded-lg overflow-hidden"
                onClick={() => setIsOwnerModalOpen(true)}
              >
                <div className="flex flex-col w-full">
                  <div className="flex items-start gap-4 p-4">
                    <Avatar className="h-16 w-16 border-2 border-muted-foreground/10">
                      <AvatarImage
                        src={`/avatars/${selectedReservation.id}.jpg`}
                        alt={selectedReservation.ownerName}
                      />
                      <AvatarFallback className="bg-primary/5">
                        <UserIcon className="h-6 w-6 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left space-y-1 py-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-lg">
                            {selectedReservation.ownerName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Client régulier
                          </div>
                        </div>
                        <ChevronRightIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border border-t">
                    <div className="flex items-center gap-2 p-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      <PhoneIcon className="h-4 w-4" />
                      <span>{selectedReservation.ownerPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      <PawPrintIcon className="h-4 w-4" />
                      <span>3 animaux</span>
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          )}

          <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsDrawerOpen(false)}
              >
                Fermer
              </Button>
              <Button
                className="flex-1 bg-primary"
                onClick={() => setIsDrawerOpen(false)}
              >
                Confirmer la réservation
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Owner Modal */}
      <Credenza open={isOwnerModalOpen} onOpenChange={setIsOwnerModalOpen}>
        <CredenzaContent className="sm:max-w-[600px]">
          <CredenzaHeader>
            <CredenzaTitle>Profil du propriétaire</CredenzaTitle>
          </CredenzaHeader>
          {selectedReservation && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20 border-2 border-muted-foreground/10">
                  <AvatarImage
                    src={`/avatars/${selectedReservation.id}.jpg`}
                    alt={selectedReservation.ownerName}
                  />
                  <AvatarFallback className="bg-primary/5">
                    <UserIcon className="h-8 w-8 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">
                    {selectedReservation.ownerName}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <PhoneIcon className="h-4 w-4" />
                    <span>{selectedReservation.ownerPhone}</span>
                  </div>
                  <Badge variant="secondary">Client régulier</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg space-y-1">
                  <div className="text-sm text-muted-foreground">Animaux</div>
                  <div className="font-medium text-lg">3 animaux</div>
                  <div className="text-sm text-muted-foreground">
                    Enregistrés
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Rendez-vous
                  </div>
                  <div className="font-medium text-lg">12 visites</div>
                  <div className="text-sm text-muted-foreground">
                    Cette année
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Historique récent</h4>
                <div className="space-y-2">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">
                        Consultation vétérinaire
                      </div>
                      <Badge variant="outline">15 Mars 2024</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Luna - Vaccins annuels
                    </div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Toilettage</div>
                      <Badge variant="outline">1 Mars 2024</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Max - Toilettage complet
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Notes</h4>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Client fidèle depuis 2022. Préfère les rendez-vous en
                    matinée. Toujours ponctuel et attentif aux recommandations.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CredenzaContent>
      </Credenza>
    </>
  );
};

export default PendingReservationsWidget;
