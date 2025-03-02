"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrganizationSlots } from "@/src/db";
import { format, isSameDay, parseISO } from "date-fns";
import { useEffect, useState } from "react";

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
  onSelectDateTime
}: AppointmentPickerProps) {
  const today = new Date();
  const [date, setDate] = useState<Date>(today);
  const [time, setTime] = useState<string | null>(null);
  const [filteredSlots, setFilteredSlots] = useState<OrganizationSlots[]>([]);
  // Mode de secours pour afficher tous les créneaux si le filtrage échoue
  const [showAllSlots, setShowAllSlots] = useState<boolean>(false);

  useEffect(() => {
    console.log("Date sélectionnée:", date);
    console.log("Structure des créneaux:", timeSlots);

    // Analyse détaillée de la structure des données
    if (timeSlots.length > 0) {
      const sample = timeSlots[0];
      console.log("Exemple de créneau:", sample);
      console.log("Propriétés du créneau:", Object.keys(sample));
    }

    // Essayer de filtrer les créneaux
    const filtered = filterSlotsByDate(timeSlots, date);
    console.log("Créneaux filtrés:", filtered);

    // Si aucun créneau n'est trouvé après filtrage, activer le mode de secours
    if (filtered.length === 0 && timeSlots.length > 0) {
      console.log("Aucun créneau filtré. Activation du mode de secours.");
      setShowAllSlots(true);
      setFilteredSlots(timeSlots);
    } else {
      setShowAllSlots(false);
      setFilteredSlots(filtered);
    }
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

  // Vérifie si le créneau est au format simple
  const isSimpleTimeSlot = (slot: any): slot is SimpleTimeSlot => {
    return 'time' in slot && 'available' in slot;
  };

  // Vérifie si le créneau est au format complexe
  const isComplexTimeSlot = (slot: any): slot is ComplexTimeSlot => {
    return 'start' in slot && 'isAvailable' in slot;
  };

  // Fonction pour s'assurer qu'une valeur est une chaîne
  const ensureString = (value: any): string => {
    if (value instanceof Date) {
      return format(value, 'HH:mm');
    }
    return String(value || '');
  };

  // Fonction pour convertir en objet Date de manière sécurisée
  const safeDate = (value: any): Date | null => {
    if (!value) return null;

    try {
      // Si c'est déjà une Date, on la retourne directement
      if (value instanceof Date) return value;

      // Si c'est une chaîne ISO, on utilise parseISO
      if (typeof value === 'string') {
        // Supprimer la partie heure si elle existe pour comparer uniquement les dates
        const datePart = value.split('T')[0];
        return parseISO(datePart || value);
      }

      // Sinon on essaie avec le constructeur Date standard
      const date = new Date(value);

      // Vérifier si la date est valide
      if (isNaN(date.getTime())) return null;

      return date;
    } catch (e) {
      console.error("Erreur lors de la conversion de la date:", e);
      return null;
    }
  };

  // Vérifier si une propriété existe dans un objet avec typage sécurisé
  const hasProperty = (obj: any, prop: string): boolean => {
    return obj && typeof obj === 'object' && prop in obj;
  };

  // Obtenir une valeur de propriété de manière sécurisée
  const getProperty = (obj: any, prop: string): any => {
    if (hasProperty(obj, prop)) {
      return obj[prop];
    }
    return undefined;
  };

  // Filtrer les créneaux pour la date sélectionnée
  const filterSlotsByDate = (slots: OrganizationSlots[], selectedDate: Date) => {
    // Assurons-nous que selectedDate n'a que la partie date (pas d'heures, minutes, etc.)
    const normalizedSelectedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );

    return slots.filter(slot => {
      try {
        // Vérifions toutes les propriétés possibles contenant des dates
        const dateFields = ['day', 'date', 'startDate', 'date_day', 'day_date', 'slotDate'];

        for (const field of dateFields) {
          if (hasProperty(slot, field)) {
            const fieldValue = getProperty(slot, field);
            if (fieldValue) {
              const slotDate = safeDate(fieldValue);

              if (slotDate) {
                // Normalisons également la date du créneau
                const normalizedSlotDate = new Date(
                  slotDate.getFullYear(),
                  slotDate.getMonth(),
                  slotDate.getDate()
                );

                // Comparer les dates normalisées
                if (normalizedSlotDate.getTime() === normalizedSelectedDate.getTime()) {
                  return true;
                }
              }
            }
          }
        }

        // Si aucune date n'est trouvée dans le créneau, vérifions si le créneau contient une référence au jour de la semaine
        const weekdayFields = ['dayOfWeek', 'weekday', 'day_of_week'];

        for (const field of weekdayFields) {
          if (hasProperty(slot, field)) {
            const dayOfWeek = getProperty(slot, field);
            if (dayOfWeek) {
              const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
              const selectedDayName = dayNames[selectedDate.getDay()];

              // Vérifier si le jour de la semaine correspond
              if (typeof dayOfWeek === 'string' && dayOfWeek.toLowerCase() === selectedDayName) {
                return true;
              }

              // Vérifier si c'est un nombre représentant le jour de la semaine (0 = dimanche, 1 = lundi, etc.)
              if (typeof dayOfWeek === 'number' && dayOfWeek === selectedDate.getDay()) {
                return true;
              }
            }
          }
        }

        return false;
      } catch (e) {
        console.error("Erreur lors du filtrage des créneaux:", e, slot);
        return false;
      }
    });
  };

  // Determiner si des créneaux sont disponibles pour cette date
  const hasSlots = filteredSlots.length > 0;

  return (
    <div>
      <div className="rounded-md border">
        <div className="flex max-sm:flex-col">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            className="p-2 sm:pe-5"
            disabled={[
              { before: today }, // Dates before today
            ]}
          />
          <div className="relative w-full max-sm:h-48 sm:w-40">
            <div className="absolute inset-0 py-4 max-sm:border-t">
              <ScrollArea className="h-full sm:border-s">
                <div className="space-y-3">
                  <div className="flex h-5 shrink-0 items-center px-5">
                    <p className="text-sm font-medium">{format(date, "EEEE, d")}</p>
                    {showAllSlots && (
                      <p className="ml-2 text-xs text-yellow-600">
                        (Tous les créneaux affichés)
                      </p>
                    )}
                  </div>
                  <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                    {!hasSlots ? (
                      <div className="text-center text-sm text-muted-foreground col-span-2 py-4">
                        Aucun créneau disponible pour cette date
                      </div>
                    ) : (
                      filteredSlots.map((slot, index) => {
                        if (isSimpleTimeSlot(slot)) {
                          // Format simple {time, available}
                          const timeString = ensureString(slot.time);
                          return (
                            <Button
                              key={index}
                              variant={time === timeString ? "default" : "outline"}
                              size="sm"
                              className="w-full"
                              onClick={() => handleTimeChange(timeString)}
                              disabled={!slot.available}
                            >
                              {timeString}
                            </Button>
                          );
                        } else if (isComplexTimeSlot(slot)) {
                          // Format complexe avec start et isAvailable
                          const slotTime = ensureString(slot.start);
                          return (
                            <Button
                              key={index}
                              variant={time === slotTime ? "default" : "outline"}
                              size="sm"
                              className="w-full"
                              onClick={() => handleTimeChange(slotTime)}
                              disabled={!slot.isAvailable}
                            >
                              <p className="text-sm font-medium">{slotTime}</p>
                            </Button>
                          );
                        }
                        // Si le format n'est pas reconnu, on ne l'affiche pas
                        return null;
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
