"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, CalendarDays, List, Calendar as CalendarIcon, Clock, Info, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { getDaysInMonth, getFirstDayOfMonth } from "@/src/lib/dateUtils";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { useMediaQuery } from "@/src/hooks/useMediaQuery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type Appointment = {
  id: string;
  petName: string;
  ownerName: string;
  type: "consultation" | "surgery" | "grooming" | "vaccination" | "checkup";
  time: string;
  duration: string;
  status: "confirmed" | "pending" | "completed";
  petAvatar?: string;
  petInitial?: string;
  ownerAvatar?: string;
  ownerInitial?: string;
  location?: string;
  notes?: string;
};

type DayAppointments = {
  [key: string]: Appointment[];
};

const appointmentColors = {
  consultation: "bg-blue-500 text-white hover:bg-blue-600",
  surgery: "bg-red-500 text-white hover:bg-red-600",
  grooming: "bg-purple-500 text-white hover:bg-purple-600",
  vaccination: "bg-green-500 text-white hover:bg-green-600",
  checkup: "bg-amber-500 text-white hover:bg-amber-600",
};

const appointmentLabels = {
  consultation: "Consultation",
  surgery: "Chirurgie",
  grooming: "Toilettage",
  vaccination: "Vaccination",
  checkup: "Contrôle",
};

const CALENDAR_VIEW_MODE_KEY = "calendar-widget-view-mode";

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"calendar" | "list">(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem(CALENDAR_VIEW_MODE_KEY);
      return (savedMode === "calendar" || savedMode === "list") ? savedMode : "calendar";
    }
    return "calendar";
  });

  useEffect(() => {
    localStorage.setItem(CALENDAR_VIEW_MODE_KEY, viewMode);
  }, [viewMode]);

  // Exemple de données (à remplacer par vos vraies données)
  const appointments: DayAppointments = {
    [new Date().toDateString()]: [
      {
        id: "1",
        petName: "Luna",
        ownerName: "Sophie Martin",
        type: "consultation",
        time: "09:00",
        duration: "30min",
        status: "confirmed",
        petAvatar: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec",
        petInitial: "L",
        location: "Cabinet principal - Paris 15ème",
        notes: "Première visite - Consultation de routine",
      },
      {
        id: "2",
        petName: "Max",
        ownerName: "Pierre Dubois",
        type: "vaccination",
        time: "10:30",
        duration: "15min",
        status: "confirmed",
        petAvatar: "https://images.unsplash.com/photo-1552053831-71594a27632d",
        petInitial: "M",
        location: "Cabinet principal - Paris 15ème",
        notes: "Rappel vaccin annuel",
      },
    ],
    [new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()]: [
      {
        id: "3",
        petName: "Rocky",
        ownerName: "Marie Leroy",
        type: "surgery",
        time: "14:00",
        duration: "1h30",
        status: "confirmed",
        petAvatar: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
        petInitial: "R",
        location: "Bloc opératoire - Paris 15ème",
        notes: "Stérilisation - À jeun depuis la veille",
      },
    ],
    [new Date(new Date().setDate(new Date().getDate() + 3)).toDateString()]: [
      {
        id: "4",
        petName: "Milo",
        ownerName: "Jean Bernard",
        type: "grooming",
        time: "11:00",
        duration: "1h",
        status: "pending",
        petAvatar: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
        petInitial: "M",
        location: "Salon de toilettage - Paris 15ème",
        notes: "Toilettage complet - Prévoir un shampooing anti-puces",
      },
      {
        id: "5",
        petName: "Felix",
        ownerName: "Alice Renard",
        type: "checkup",
        time: "15:30",
        duration: "30min",
        status: "confirmed",
        petAvatar: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
        petInitial: "F",
        location: "Cabinet principal - Paris 15ème",
        notes: "Visite de contrôle post-opératoire",
      },
    ],
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1),
    );
  };

  const isToday = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    return date.toDateString() === new Date().toDateString();
  };

  const isSelected = (day: number) => {
    if (!selectedDate || day === 0) return false;
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    return date.toDateString() === selectedDate.toDateString();
  };

  const isWeekend = (dayIndex: number) => {
    return dayIndex === 0 || dayIndex === 6;
  };

  const handleDayClick = (day: number) => {
    if (day !== 0) {
      const newSelectedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
      );
      setSelectedDate(newSelectedDate);
      setIsDrawerOpen(true);
    }
  };

  const renderAppointments = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    const dateString = date.toDateString();
    const dayAppointments = appointments[dateString] || [];

    return dayAppointments.map((appointment) => (
      <Tooltip key={appointment.id}>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex items-center gap-2 text-xs rounded-lg px-2 py-1.5 mb-1 cursor-pointer transition-all",
              appointmentColors[appointment.type],
              "hover:ring-2 hover:ring-white/20",
            )}
          >
            <div className="relative flex-shrink-0">
              <Avatar className="h-5 w-5">
                <AvatarImage src={appointment.petAvatar} alt={appointment.petName} />
                <AvatarFallback>{appointment.petInitial || appointment.petName[0]}</AvatarFallback>
              </Avatar>
              <div className={cn(
                "absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-background",
                appointment.status === "confirmed" ? "bg-primary" : "bg-secondary"
              )} />
            </div>
            <div className="flex-1 truncate">
              <span>{appointment.time}</span>
              <span className="mx-1">•</span>
              <span>{appointment.petName}</span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" align="start" className="p-0">
          <div className="w-72">
            <div className={cn(
              "flex items-center gap-2 p-3 border-b",
              appointmentColors[appointment.type],
            )}>
              <Avatar className="h-10 w-10 ring-2 ring-white/20">
                <AvatarImage src={appointment.petAvatar} alt={appointment.petName} />
                <AvatarFallback>{appointment.petInitial || appointment.petName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white">{appointment.petName}</p>
                  <Badge
                    variant={appointment.status === "confirmed" ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {appointment.status === "confirmed" ? "Confirmé" : "En attente"}
                  </Badge>
                </div>
                <p className="text-sm text-white/80">{appointment.ownerName}</p>
              </div>
            </div>

            <div className="p-3 space-y-3 bg-card">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={cn(
                    "text-xs",
                    appointmentColors[appointment.type].replace("bg-", "border-"),
                  )}>
                    {appointmentLabels[appointment.type]}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Horaire</p>
                    <p className="font-medium">{appointment.time}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Durée</p>
                    <p className="font-medium">{appointment.duration}</p>
                  </div>
                </div>
              </div>

              {appointment.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{appointment.location}</span>
                </div>
              )}

              {appointment.notes && (
                <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-2">
                  {appointment.notes}
                </div>
              )}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    ));
  };

  const getWeeksInMonth = () => {
    const weeks: number[][] = [];
    let currentWeek: number[] = [];

    // Remplir les jours vides du début
    for (let i = 0; i < firstDayOfMonth; i++) {
      currentWeek.push(0);
    }

    // Remplir les jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Remplir les jours vides de fin
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(0);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const renderSelectedDateAppointments = () => {
    if (!selectedDate) return null;
    const dateString = selectedDate.toDateString();
    const dayAppointments = appointments[dateString] || [];

    return (
      <div className="space-y-6">
        {dayAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-muted-foreground mb-2">
              Aucun rendez-vous pour cette journée
            </p>
            <p className="text-sm text-muted-foreground">
              Cliquez sur un autre jour pour voir les rendez-vous
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {dayAppointments.length} rendez-vous
              </p>
              <Button variant="outline" size="sm">
                + Nouveau rendez-vous
              </Button>
            </div>
            <div className="space-y-3">
              {dayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 rounded-lg border border-border space-y-3 hover:border-border/80 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{appointment.petName}</h3>
                        <Badge
                          variant={
                            appointment.status === "confirmed"
                              ? "default"
                              : "secondary"
                          }
                          className="capitalize"
                        >
                          {appointment.status === "confirmed"
                            ? "Confirmé"
                            : "En attente"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {appointment.ownerName}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full -mt-1"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        appointmentColors[appointment.type].replace(
                          "bg-",
                          "border-",
                        ),
                      )}
                    >
                      {appointmentLabels[appointment.type]}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <span>{appointment.time}</span>
                      <span>•</span>
                      <span>{appointment.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Annuler
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-lg font-semibold">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <div className="flex items-center gap-2">
            {viewMode === "calendar" && (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handlePrevMonth}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-xl hover:bg-secondary/5"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mois précédent</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleNextMonth}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-xl hover:bg-secondary/5"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mois suivant</p>
                  </TooltipContent>
                </Tooltip>
              </>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-xl hover:bg-secondary/5"
                  onClick={() => setViewMode(viewMode === "calendar" ? "list" : "calendar")}
                >
                  {viewMode === "calendar" ? (
                    <List className="h-4 w-4" />
                  ) : (
                    <CalendarIcon className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Basculer en vue {viewMode === "calendar" ? "liste" : "calendrier"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {viewMode === "calendar" ? (
          <>
            <div className="flex-1 overflow-auto px-1">
              <div className="grid grid-cols-7 gap-2 mb-2">
                {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
                  <div
                    key={day}
                    className={cn(
                      "text-center text-sm font-medium p-1",
                      day === "Dim" || day === "Sam"
                        ? "text-red-500"
                        : "text-gray-600 dark:text-gray-300",
                    )}
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {getWeeksInMonth().map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-7 gap-2">
                    {week.map((day, dayIndex) => (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={cn(
                          "relative overflow-y-auto p-1.5 transition-all duration-200",
                          "min-h-[110px]",
                          day === 0
                            ? "invisible"
                            : cn(
                              "rounded-xl border border-border hover:border-border/80",
                              "dark:border-gray-700 dark:hover:border-gray-600",
                              isToday(day) && "bg-primary/5 ring-2 ring-primary",
                              isSelected(day) &&
                              "bg-secondary/5 ring-2 ring-secondary",
                              isWeekend(dayIndex) && "bg-muted/50",
                              "cursor-pointer",
                            ),
                        )}
                        onClick={() => handleDayClick(day)}
                      >
                        {day !== 0 && (
                          <>
                            <div
                              className={cn(
                                "text-sm font-medium mb-1.5",
                                isToday(day) && "text-primary",
                                isSelected(day) && "text-secondary",
                              )}
                            >
                              {day}
                            </div>
                            {renderAppointments(day)}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <Card className="rounded-xl shadow-lg">
            <CardHeader className="border-b border-border pb-4 bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="size-6 text-primary" />
                    Rendez-vous du jour
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <motion.div className="space-y-4 py-4" layout>
                  {(appointments[new Date().toDateString()] || []).map((appointment, index) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="relative m-2 rounded-xl border bg-card hover:bg-accent/5 cursor-pointer group"
                      onClick={() => {
                        setSelectedDate(new Date());
                        setIsDrawerOpen(true);
                      }}
                    >
                      {/* Bande de statut */}
                      <div
                        className={cn(
                          "absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-colors",
                          appointment.status === "confirmed" ? "bg-primary" : "bg-secondary"
                        )}
                      />

                      <div className="p-4 pl-6">
                        {/* En-tête avec l'heure et le statut */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{appointment.time}</span>
                            <span className="text-muted-foreground">•</span>
                            <span>{appointment.duration}</span>
                          </div>
                          <Badge
                            variant={appointment.status === "confirmed" ? "default" : "secondary"}
                            className="capitalize"
                          >
                            {appointment.status === "confirmed" ? "Confirmé" : "En attente"}
                          </Badge>
                        </div>

                        {/* Contenu principal */}
                        <div className="flex items-center gap-4">
                          {/* Informations sur l'animal */}
                          <div className="relative">
                            <Avatar className="h-16 w-16 ring-4 ring-background">
                              <AvatarImage src={appointment.petAvatar} alt={appointment.petName} />
                              <AvatarFallback>{appointment.petInitial}</AvatarFallback>
                            </Avatar>
                          </div>

                          {/* Détails du rendez-vous */}
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg tracking-tight">{appointment.petName}</h3>
                              <Badge variant="outline" className={cn(
                                "ml-2",
                                appointmentColors[appointment.type].replace("bg-", "border-").replace("text-white", ""),
                              )}>
                                {appointmentLabels[appointment.type]}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Propriétaire: {appointment.ownerName}
                            </p>
                            {appointment.location && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>{appointment.location}</span>
                              </div>
                            )}
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
        )}
      </div>

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="sm:max-w-md w-full">
          <SheetHeader className="space-y-1 mb-6">
            <SheetTitle className="text-lg">
              {selectedDate?.toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </SheetTitle>
            <p className="text-sm text-muted-foreground">
              Gérez les rendez-vous de cette journée
            </p>
          </SheetHeader>
          <div className="mt-2">{renderSelectedDateAppointments()}</div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CalendarWidget;
