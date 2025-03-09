"use client";

// Modifications pour la vue compacte:
// - Réduction des espacements et des marges
// - Diminution de la hauteur des cellules à 60px pour un aspect plus carré
// - Icônes et textes plus petits
// - En-tête simplifié
// - Structure visuelle optimisée pour un affichage compact

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  List,
  Calendar as CalendarIcon,
  CalendarDays,
} from "lucide-react";
import {
  ScrollArea,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Button,
} from "@/components/ui";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import { CalendarGrid } from "./components/calendar-grid";
import { AppointmentListItem } from "./components/appointment-list-item";
import { AppointmentDetails } from "./components/appointment-details";
import { CALENDAR_VIEW_MODE_KEY, mockAppointments } from "./data/constants";

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");

  // Charger la préférence utilisateur au montage du composant
  useEffect(() => {
    const savedMode = localStorage.getItem(CALENDAR_VIEW_MODE_KEY);
    if (savedMode === "calendar" || savedMode === "list") {
      setViewMode(savedMode);
    }
  }, []);

  // Sauvegarder la préférence utilisateur quand elle change
  useEffect(() => {
    localStorage.setItem(CALENDAR_VIEW_MODE_KEY, viewMode);
  }, [viewMode]);

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

  const renderSelectedDateAppointments = () => {
    if (!selectedDate) return null;
    const dateString = selectedDate.toDateString();
    const dayAppointments = mockAppointments[dateString] || [];

    return (
      <div className="space-y-4">
        {dayAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-5 text-center">
            <p className="text-muted-foreground mb-1">
              Aucun rendez-vous pour cette journée
            </p>
            <p className="text-xs text-muted-foreground">
              Cliquez sur un autre jour pour voir les rendez-vous
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {dayAppointments.length} rendez-vous
              </p>
            </div>
            <div className="space-y-2">
              {dayAppointments.map((appointment) => (
                <AppointmentDetails
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="h-full w-full flex flex-col p-2">
      <div className="flex items-center justify-between pb-1">
        {viewMode === "calendar" ? (
          <div className="flex items-center justify-between gap-2 flex-1">
            <div className="flex items-center gap-1">
              <div className="p-0.5 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                <CalendarDays className="size-3 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold">
                {capitalizeFirstLetter(
                  currentDate.toLocaleString("fr-FR", {
                    month: "long",
                    year: "numeric",
                  }),
                )}
              </h3>
            </div>
            <div className="flex items-center">
              <Button
                onClick={handlePrevMonth}
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-xl p-0 mr-1 hover:bg-secondary/10"
              >
                <ChevronLeft
                  className="h-5 w-5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Button>
              <Button
                onClick={handleNextMonth}
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-xl p-0 hover:bg-secondary/10"
              >
                <ChevronRight
                  className="h-5 w-5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <h3 className="flex items-center gap-1 text-lg font-semibold">
                <div className="p-0.5 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                  <CalendarDays className="size-3 text-blue-600 dark:text-blue-400" />
                </div>
                Rendez-vous du jour
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {capitalizeFirstLetter(
                  format(new Date(), "EEEE d MMMM yyyy", { locale: fr }),
                )}
              </p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-xl p-0 hover:bg-secondary/10"
          onClick={() =>
            setViewMode(viewMode === "calendar" ? "list" : "calendar")
          }
        >
          {viewMode === "calendar" ? (
            <List className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <CalendarIcon
              className="h-5 w-5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          )}
        </Button>
      </div>

      {viewMode === "calendar" ? (
        <div className="flex-1 overflow-auto pt-1 px-1 rounded-md bg-muted/10">
          <CalendarGrid
            currentDate={currentDate}
            selectedDate={selectedDate}
            appointments={mockAppointments}
            onDayClick={handleDayClick}
          />
        </div>
      ) : (
        <ScrollArea className="h-[500px] pr-3 pt-1 rounded-md bg-muted/10">
          {(mockAppointments[new Date().toDateString()] || []).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-5 text-center">
              <div className="p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-3">
                <CalendarDays className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-muted-foreground mb-1 text-sm">
                Aucun rendez-vous pour aujourd&apos;hui
              </p>
              <p className="text-xs text-muted-foreground">
                Profitez de cette journée tranquille!
              </p>
            </div>
          ) : (
            (mockAppointments[new Date().toDateString()] || []).map(
              (appointment, index) => (
                <AppointmentListItem
                  key={appointment.id}
                  appointment={appointment}
                  index={index}
                  onSelect={() => {
                    setSelectedDate(new Date());
                    setIsDrawerOpen(true);
                  }}
                />
              ),
            )
          )}
        </ScrollArea>
      )}

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-full sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>
              {selectedDate &&
                capitalizeFirstLetter(
                  format(selectedDate, "EEEE d MMMM yyyy", { locale: fr }),
                )}
            </SheetTitle>
          </SheetHeader>
          {renderSelectedDateAppointments()}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CalendarWidget;
