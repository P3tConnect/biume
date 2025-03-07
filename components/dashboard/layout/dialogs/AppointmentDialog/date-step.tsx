import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { DateStepSchema, ServiceStepSchema } from "./appointmentDialogStepper";
import { CalendarIcon, ClockIcon, CheckIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { format, addDays, addMonths, isSameDay } from "date-fns";
import { cn } from "@/src/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AppointmentFormValues } from "./AppointmentDialog";

const DateStep = () => {
  const form = useFormContext<AppointmentFormValues>();
  const [activeTab, setActiveTab] = useState<string>("calendar");

  // Récupérer la durée définie à l'étape précédente
  const duration = form.watch("duration");

  // Créneaux horaires disponibles (simulés pour l'exemple)
  const timeSlots = [
    { time: "09:00", available: true },
    { time: "09:30", available: false },
    { time: "10:00", available: true },
    { time: "10:30", available: true },
    { time: "11:00", available: true },
    { time: "11:30", available: false },
    { time: "14:00", available: true },
    { time: "14:30", available: true },
    { time: "15:00", available: true },
    { time: "15:30", available: false },
    { time: "16:00", available: true },
    { time: "16:30", available: true },
    { time: "17:00", available: true },
    { time: "17:30", available: false },
    { time: "18:00", available: true },
  ];

  // Jours où des créneaux sont disponibles (simulés pour l'exemple)
  const availableDates = [
    new Date(),
    addDays(new Date(), 1),
    addDays(new Date(), 2),
    addDays(new Date(), 5),
    addDays(new Date(), 7),
    addDays(new Date(), 8),
    addDays(new Date(), 12),
    addDays(new Date(), 15),
  ];

  // Fonctions utilitaires
  const isSuggestedDate = (date: Date) => {
    return availableDates.some((d) => isSameDay(d, date));
  };

  const dateHasTimeSlots = (date: Date) => {
    // Simulation: certains jours ont des créneaux disponibles
    return isSuggestedDate(date);
  };

  // Raccourcis pour sélectionner rapidement une date
  const quickDateOptions = [
    {
      label: "Aujourd'hui",
      date: new Date(),
      available: dateHasTimeSlots(new Date()),
    },
    {
      label: "Demain",
      date: addDays(new Date(), 1),
      available: dateHasTimeSlots(addDays(new Date(), 1)),
    },
    {
      label: "Dans une semaine",
      date: addDays(new Date(), 7),
      available: dateHasTimeSlots(addDays(new Date(), 7)),
    },
    {
      label: "Dans un mois",
      date: addMonths(new Date(), 1),
      available: dateHasTimeSlots(addMonths(new Date(), 1)),
    },
  ];

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="calendar"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="calendar" className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Calendrier
          </TabsTrigger>
          <TabsTrigger value="quickSelect" className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-2" />
            Sélection rapide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-base flex items-center mb-4">
                <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
                Choisir une date
              </h3>

              <div className="border rounded-lg p-3">
                <Calendar
                  mode="single"
                  selected={form.watch("date")}
                  onSelect={(date) => {
                    if (date) form.setValue("date", date);
                  }}
                  locale={fr}
                  className="mx-auto"
                  disabled={(date) =>
                    date < new Date() || !dateHasTimeSlots(date)
                  }
                  modifiers={{
                    suggested: (date) => isSuggestedDate(date),
                  }}
                  modifiersClassNames={{
                    suggested: "border border-primary ring-1 ring-primary/20",
                  }}
                />
              </div>
            </div>

            {form.watch("date") && (
              <div>
                <h3 className="font-medium text-base flex items-center mb-4">
                  <ClockIcon className="w-4 h-4 mr-2 text-primary" />
                  Choisir un horaire
                  <span className="ml-2 text-xs text-muted-foreground">
                    {format(form.watch("date"), "EEEE d MMMM", { locale: fr })}
                  </span>
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      type="button"
                      variant="outline"
                      className={cn(
                        "h-12",
                        !slot.available && "opacity-50 cursor-not-allowed",
                        form.watch("startTime") === slot.time &&
                          "border-primary bg-primary/5",
                      )}
                      disabled={!slot.available}
                      onClick={() => form.setValue("startTime", slot.time)}
                    >
                      {slot.time}
                      {form.watch("startTime") === slot.time && (
                        <CheckIcon className="h-4 w-4 ml-2 text-primary" />
                      )}
                    </Button>
                  ))}
                </div>

                {form.watch("startTime") && (
                  <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-lg">
                    <h4 className="text-sm font-medium mb-1">
                      Horaire sélectionné
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        {format(form.watch("date"), "EEEE d MMMM", {
                          locale: fr,
                        })}{" "}
                        à {form.watch("startTime")}
                      </span>
                      <Badge variant="secondary">{duration} min</Badge>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="quickSelect" className="space-y-4">
          <div>
            <h3 className="font-medium text-base flex items-center mb-4">
              <ClockIcon className="w-4 h-4 mr-2 text-primary" />
              Sélection rapide
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {quickDateOptions.map((option, index) => (
                <Card
                  key={index}
                  className={cn(
                    "cursor-pointer transition-all hover:bg-muted/50",
                    !option.available && "opacity-50 cursor-not-allowed",
                    form.watch("date") &&
                      isSameDay(form.watch("date"), option.date)
                      ? "border-primary"
                      : "border-border",
                  )}
                  onClick={() => {
                    if (option.available) {
                      form.setValue("date", option.date);
                      setActiveTab("calendar");
                    }
                  }}
                >
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {format(option.date, "EEEE d MMMM", { locale: fr })}
                      </div>
                    </div>

                    {option.available ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-600 border-green-200"
                      >
                        Disponible
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-600 border-red-200"
                      >
                        Indisponible
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {form.formState.errors.date && (
        <FormMessage>{form.formState.errors.date.message}</FormMessage>
      )}

      {form.formState.errors.startTime && (
        <FormMessage>{form.formState.errors.startTime.message}</FormMessage>
      )}

      {form.watch("date") && form.watch("startTime") && (
        <div className="mt-4 p-4 bg-primary/5 border border-primary/10 rounded-lg">
          <h3 className="font-medium mb-1">Résumé</h3>
          <div className="text-muted-foreground space-y-1">
            <p>
              Rendez-vous le{" "}
              <span className="font-medium text-foreground">
                {format(form.watch("date"), "EEEE d MMMM", { locale: fr })}
              </span>{" "}
              à{" "}
              <span className="font-medium text-foreground">
                {form.watch("startTime")}
              </span>
            </p>
            <p>
              Durée prévue:{" "}
              <span className="font-medium text-foreground">
                {duration} minutes
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateStep;
