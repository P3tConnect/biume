"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Separator,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui";
import { CalendarDays, Clock, MapPin, Info, Calendar, X } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/lib/utils";

interface Event {
  id: string;
  title: string;
  category: "appointment" | "reminder";
  time: string;
  doctor: string;
  doctorAvatar?: string;
  doctorSpeciality?: string;
  doctorExperience?: string;
  location: string;
  status: "en_attente" | "confirmé";
  petName: string;
  petAvatar: string;
  petInitial: string;
  petAge?: string;
  petBreed?: string;
  petWeight?: string;
  lastVisit?: string;
}

interface DayEvents {
  [key: string]: Event[];
}

const ClientTimetableWidget = () => {
  const [events] = useState<Event[]>(
    appointments.map((apt, index) => ({
      ...apt,
      id: `event-${index}`,
      category: "appointment" as const,
    })),
  );
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <>
      <Card className="rounded-xl shadow-lg">
        <CardHeader className="border-b border-border pb-4 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="size-6 text-primary" />
                Mes rendez-vous à venir
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <motion.div className="space-y-4" layout>
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative m-2 rounded-xl border bg-card hover:bg-accent/5 cursor-pointer group"
                  onClick={() => setSelectedEvent(event)}
                >
                  {/* Bande de statut */}
                  <div
                    className={cn(
                      "absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-colors",
                      event.status === "confirmé"
                        ? "bg-primary"
                        : "bg-secondary",
                    )}
                  />

                  <div className="p-4 pl-6">
                    {/* En-tête avec l'heure et le statut */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <Badge
                        variant={
                          event.status === "confirmé" ? "default" : "secondary"
                        }
                        className="capitalize"
                      >
                        {event.status}
                      </Badge>
                    </div>

                    {/* Contenu principal */}
                    <div className="flex items-center gap-4">
                      {/* Informations sur l'animal */}
                      <div className="relative">
                        <Avatar className="h-16 w-16 ring-4 ring-background">
                          <AvatarImage
                            src={event.petAvatar}
                            alt={event.petName}
                          />
                          <AvatarFallback>{event.petInitial}</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8 absolute -bottom-2 -right-2 ring-2 ring-background">
                          <AvatarImage
                            src={event.doctorAvatar}
                            alt={event.doctor}
                          />
                          <AvatarFallback>{event.doctor[0]}</AvatarFallback>
                        </Avatar>
                      </div>

                      {/* Détails du rendez-vous */}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg tracking-tight">
                            {event.title}
                          </h3>
                          <Badge variant="outline" className="ml-2">
                            {event.doctorSpeciality}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <span>avec</span>
                          <span className="font-medium text-foreground">
                            {event.doctor}
                          </span>
                          <span>pour</span>
                          <span className="font-medium text-foreground">
                            {event.petName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      {/* Indicateur de clic */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Info className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </CardContent>
      </Card>

      <AnimatePresence>
        {selectedEvent && (
          <Sheet
            open={!!selectedEvent}
            onOpenChange={() => setSelectedEvent(null)}
          >
            <SheetContent className="sm:max-w-[500px] overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <SheetHeader className="space-y-4 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                      >
                        <Avatar className="h-16 w-16 ring-4 ring-primary/10">
                          <AvatarImage
                            src={selectedEvent.petAvatar}
                            alt={selectedEvent.petName}
                          />
                          <AvatarFallback>
                            {selectedEvent.petInitial}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div className="space-y-1">
                        <SheetTitle className="text-xl">
                          {selectedEvent.title}
                        </SheetTitle>
                        <SheetDescription>
                          Rendez-vous pour {selectedEvent.petName}
                        </SheetDescription>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedEvent(null)}
                      className="rounded-full h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </SheetHeader>

                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Badge
                    className="w-fit"
                    variant={
                      selectedEvent.status === "confirmé"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {selectedEvent.status}
                  </Badge>

                  <div className="space-y-4">
                    <motion.div
                      className="flex items-start gap-4 rounded-xl border p-4 bg-muted/50"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Clock className="h-5 w-5 mt-0.5 text-primary" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Horaire</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedEvent.time}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start gap-4 rounded-xl border p-4 bg-muted/50"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Lieu</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedEvent.location}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Professionnel</h4>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-8 w-8"
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="flex justify-between space-x-4">
                            <div className="space-y-1">
                              <h4 className="text-sm font-semibold">
                                {selectedEvent.doctor}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Professionnel expérimenté avec plus de{" "}
                                {selectedEvent.doctorExperience}{" "}
                                d&apos;expérience
                              </p>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="shadow-md">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16 ring-4 ring-primary/10">
                              <AvatarImage
                                src={selectedEvent.doctorAvatar}
                                alt={selectedEvent.doctor}
                              />
                              <AvatarFallback>
                                {selectedEvent.doctor[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg">
                                  {selectedEvent.doctor}
                                </h3>
                                <Badge variant="outline" className="ml-2">
                                  {selectedEvent.doctorSpeciality}
                                </Badge>
                              </div>
                              <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-primary" />
                                  <span>{selectedEvent.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-primary" />
                                  <span>
                                    {selectedEvent.doctorExperience}{" "}
                                    d&apos;expérience
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  <Separator className="my-6" />

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className="text-sm font-medium">Instructions</h4>
                    <div className="rounded-xl border p-4 bg-muted/50">
                      <p className="text-sm text-muted-foreground">
                        Veuillez arriver 5 minutes avant votre rendez-vous. En
                        cas d&apos;empêchement, merci de nous prévenir au moins
                        24h à l&apos;avance.
                      </p>
                    </div>
                  </motion.div>

                  <SheetFooter className="mt-6">
                    <Button
                      variant="default"
                      className="w-full"
                      onClick={() => setSelectedEvent(null)}
                    >
                      Fermer
                    </Button>
                  </SheetFooter>
                </motion.div>
              </motion.div>
            </SheetContent>
          </Sheet>
        )}
      </AnimatePresence>
    </>
  );
};

const appointments = [
  {
    time: "09:00-10:00",
    title: "Toilettage complet",
    doctor: "Sophie Martin",
    doctorAvatar: "https://ui.shadcn.com/avatars/01.png",
    doctorSpeciality: "Toiletteur canin",
    doctorExperience: "8 ans",
    location: "Paris 15ème",
    status: "confirmé" as const,
    petName: "Luna",
    petAvatar: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec",
    petInitial: "L",
    petAge: "3 ans",
    petBreed: "Berger Australien",
    petWeight: "25kg",
    lastVisit: "15 février 2024",
  },
  {
    time: "14:30-15:30",
    title: "Consultation vétérinaire",
    doctor: "Thomas Dubois",
    doctorAvatar: "https://ui.shadcn.com/avatars/02.png",
    doctorSpeciality: "Vétérinaire",
    doctorExperience: "12 ans",
    location: "Paris 12ème",
    status: "en_attente" as const,
    petName: "Max",
    petAvatar: "https://images.unsplash.com/photo-1552053831-71594a27632d",
    petInitial: "M",
    petAge: "5 ans",
    petBreed: "Golden Retriever",
    petWeight: "32kg",
    lastVisit: "3 mars 2024",
  },
];

export default ClientTimetableWidget;
