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
  XIcon,
  ChevronRightIcon,
  ActivityIcon,
  TrendingUpIcon,
  ShieldIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

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
};

type MetricType = "vaccine" | "deworming" | "chip";

const PendingReservationsWidget = () => {
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<MetricType | null>(null);
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

  const metricTitles = {
    vaccine: "Historique des vaccinations",
    deworming: "Historique des vermifuges",
    chip: "Historique des puces électroniques",
  };

  const metricColors = {
    vaccine: "#22c55e", // green-500
    deworming: "#eab308", // yellow-500
    chip: "#3b82f6", // blue-500
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
              className="flex flex-col gap-2 p-3 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
              onClick={() => {
                setSelectedReservation(reservation);
                setIsDrawerOpen(true);
              }}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={`/pets/${reservation.id}.jpg`}
                    alt={reservation.petName}
                  />
                  <AvatarFallback>
                    <PawPrintIcon className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {reservation.petName}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {reservation.petType}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {reservation.petBreed}
                      </div>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      En attente
                    </Badge>
                  </div>

                  <div className="mt-1 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <UserIcon className="h-3 w-3 text-muted-foreground" />
                      <span>{reservation.ownerName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <PhoneIcon className="h-3 w-3 text-muted-foreground" />
                      <span>{reservation.ownerPhone}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1 bg-background/50 rounded-md p-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">
                    {reservation.service}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {reservation.duration}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarIcon className="h-3 w-3" />
                  <span>
                    {reservation.date} à {reservation.time}
                  </span>
                </div>

                {reservation.notes && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="text-xs text-muted-foreground hover:text-foreground transition-colors text-left">
                        Notes: {reservation.notes}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{reservation.notes}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent
          side="right"
          className="w-[440px] sm:w-[540px] overflow-y-auto"
        >
          <SheetHeader className="space-y-2">
            <SheetTitle>Détails de la réservation</SheetTitle>
          </SheetHeader>

          {selectedReservation && (
            <div className="space-y-6 mt-6">
              {/* Pet Information */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">
                  Information de l'animal
                </h3>
                <div className="bg-muted/50 rounded-lg overflow-hidden">
                  <div className="flex items-start gap-4 p-4">
                    <Avatar className="h-16 w-16 border-2 border-muted-foreground/10">
                      <AvatarImage
                        src={`/pets/${selectedReservation.id}.jpg`}
                        alt={selectedReservation.petName}
                      />
                      <AvatarFallback className="bg-primary/5">
                        <PawPrintIcon className="h-6 w-6 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-lg">
                              {selectedReservation.petName}
                            </span>
                            <Badge variant="secondary">
                              {selectedReservation.petType}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {selectedReservation.petBreed}
                          </p>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          Actif
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 divide-x divide-border border-t">
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 p-3 h-auto hover:bg-muted/50"
                      onClick={() => setSelectedMetric("vaccine")}
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm text-muted-foreground">
                        Vacciné
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 p-3 h-auto hover:bg-muted/50"
                      onClick={() => setSelectedMetric("deworming")}
                    >
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-sm text-muted-foreground">
                        Vermifugé
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 p-3 h-auto hover:bg-muted/50"
                      onClick={() => setSelectedMetric("chip")}
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-sm text-muted-foreground">
                        Pucé
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Âge</div>
                    <div className="font-medium">2 ans</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Poids</div>
                    <div className="font-medium">12 kg</div>
                  </div>
                </div>
              </div>

              {/* Owner Information */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">
                  Information du propriétaire
                </h3>
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
                            <div className="font-semibold text-lg">
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

              {/* Appointment Details */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">
                  Détails du rendez-vous
                </h3>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="font-medium mb-2">
                      {selectedReservation.service}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{selectedReservation.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4" />
                        <span>{selectedReservation.time}</span>
                      </div>
                      <Badge variant="secondary">
                        {selectedReservation.duration}
                      </Badge>
                    </div>
                  </div>

                  {selectedReservation.notes && (
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Notes</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedReservation.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsDrawerOpen(false)}
              >
                Fermer
              </Button>
              <Button className="flex-1">Confirmer la réservation</Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Owner Modal */}
      <Dialog open={isOwnerModalOpen} onOpenChange={setIsOwnerModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Profil du propriétaire</DialogTitle>
          </DialogHeader>
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
        </DialogContent>
      </Dialog>

      {/* Metrics Modal */}
      <Dialog
        open={selectedMetric !== null}
        onOpenChange={() => setSelectedMetric(null)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedMetric === "vaccine" && (
                <ShieldIcon className="w-5 h-5 text-green-500" />
              )}
              {selectedMetric === "deworming" && (
                <ActivityIcon className="w-5 h-5 text-yellow-500" />
              )}
              {selectedMetric === "chip" && (
                <TrendingUpIcon className="w-5 h-5 text-blue-500" />
              )}
              {selectedMetric && metricTitles[selectedMetric]}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="h-[300px] w-full">
              {selectedMetric && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={metricData[selectedMetric]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={metricColors[selectedMetric]}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Dernière intervention
                </span>
                <span className="font-medium">15 Mars 2024</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Prochaine intervention
                </span>
                <span className="font-medium">15 Juin 2024</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fréquence moyenne</span>
                <span className="font-medium">3 mois</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PendingReservationsWidget;
