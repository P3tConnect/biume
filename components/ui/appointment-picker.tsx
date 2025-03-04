"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrganizationSlots } from "@/src/db";
import { format, isSameDay, parseISO } from "date-fns";
import { useEffect, useState, useMemo } from "react";

// Interfaces pour les différents types de créneaux
interface SimpleTimeSlot {
  time: string;
  available: boolean;
  date?: Date | string;
}

interface ComplexTimeSlot {
  start: string;
  isAvailable: boolean;
  date?: Date | string;
  day?: Date | string;
  startDate?: Date | string;
}

// Type permettant de supporter plusieurs formats de créneaux
type TimeSlotType = SimpleTimeSlot | ComplexTimeSlot;

interface AppointmentPickerProps {
  timeSlots: OrganizationSlots[];
  onSelectDateTime?: (date: Date, time: string | null) => void;
}

export default function AppointmentPicker({
  timeSlots = [],
  onSelectDateTime,
}: AppointmentPickerProps) {
  const today = new Date();
  const [date, setDate] = useState<Date>(today);
  const [time, setTime] = useState<string | null>(null);
  const [filteredSlots, setFilteredSlots] = useState<OrganizationSlots[]>([]);

  // Calculer les dates pour lesquelles nous avons des créneaux et leur disponibilité
  const { daysWithSlots, disabledDays } = useMemo(() => {
    // Grouper les créneaux par date
    const slotsByDate = new Map<string, OrganizationSlots[]>();

    // Enregistrer toutes les dates avec des créneaux
    const daysWithSlots = new Set<string>();

    timeSlots.forEach((slot) => {
      const slotDate = new Date(slot.start);
      const dateKey = format(slotDate, "yyyy-MM-dd");

      // Ajouter cette date à notre ensemble de dates avec créneaux
      daysWithSlots.add(dateKey);

      if (!slotsByDate.has(dateKey)) {
        slotsByDate.set(dateKey, []);
      }

      slotsByDate.get(dateKey)?.push(slot);
    });

    // Trouver les dates où tous les créneaux sont indisponibles
    const unavailableDates: Date[] = [];

    slotsByDate.forEach((slots, dateKey) => {
      // Vérifier si tous les créneaux de cette date sont indisponibles
      const allUnavailable =
        slots.length > 0 && slots.every((slot) => !slot.isAvailable);

      if (allUnavailable) {
        unavailableDates.push(parseISO(dateKey));
      }
    });

    return {
      daysWithSlots,
      disabledDays: unavailableDates,
    };
  }, [timeSlots]);

  // Fonction pour désactiver les dates
  const isDayDisabled = useMemo(() => {
    return (day: Date) => {
      // 1. Désactiver les dates strictement antérieures à aujourd'hui (pas aujourd'hui)
      const isBeforeToday = day < today && !isSameDay(day, today);
      if (isBeforeToday) {
        return true;
      }

      const dayKey = format(day, "yyyy-MM-dd");

      // 2. Désactiver les dates sans aucun créneau
      if (!daysWithSlots.has(dayKey)) {
        return true;
      }

      // 3. Désactiver les dates où tous les créneaux sont indisponibles
      return disabledDays.some((disabledDay) => isSameDay(disabledDay, day));
    };
  }, [today, daysWithSlots, disabledDays]);

  useEffect(() => {
    // Filtrer les créneaux pour la date sélectionnée
    const filtered = timeSlots.filter((slot) => {
      // Convertir les dates de début et de fin en objets Date
      const startDate = new Date(slot.start);
      return isSameDay(startDate, date);
    });

    console.log("Date sélectionnée:", format(date, "yyyy-MM-dd"));
    console.log("Créneaux filtrés:", filtered);

    setFilteredSlots(filtered);
  }, [timeSlots, date]);

  // Handler pour mettre à jour la date
  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setTime(null);
      if (onSelectDateTime) onSelectDateTime(newDate, null);
    }
  };

  // Handler pour mettre à jour l'heure
  const handleTimeChange = (timeSlot: string) => {
    setTime(timeSlot);
    if (onSelectDateTime) onSelectDateTime(date, timeSlot);
  };

  // Fonction pour formater l'heure à partir d'une date
  const formatTime = (dateStr: string | Date): string => {
    const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
    return format(date, "HH:mm");
  };

  // Determiner si des créneaux sont disponibles pour cette date
  const hasSlots = filteredSlots.length > 0;

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <div className="flex max-sm:flex-col">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            className="p-2 sm:pe-5"
            disabled={isDayDisabled}
          />
          <div className="relative w-full max-sm:h-48 sm:w-52">
            <div className="absolute inset-0 py-4 max-sm:border-t">
              <ScrollArea className="h-full sm:border-s">
                <div className="space-y-3">
                  <div className="flex h-5 shrink-0 items-center px-5">
                    <p className="text-sm font-medium">
                      {format(date, "EEEE, d")}
                    </p>
                  </div>
                  <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                    {!hasSlots ? (
                      <div className="text-center text-sm text-muted-foreground col-span-2 py-4">
                        Aucun créneau disponible pour cette date
                      </div>
                    ) : (
                      filteredSlots.map((slot, index) => {
                        const timeString = formatTime(slot.start);
                        return (
                          <Button
                            key={index}
                            variant={
                              time === timeString ? "default" : "outline"
                            }
                            size="sm"
                            className="w-full"
                            onClick={() => handleTimeChange(timeString)}
                          >
                            {timeString}
                          </Button>
                        );
                      })
                    )}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
