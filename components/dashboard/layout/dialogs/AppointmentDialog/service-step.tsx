import React, { useMemo, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { StethoscopeIcon, ClockIcon, CheckIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AppointmentFormValues } from "./AppointmentDialog";
import { Card } from "@/components/ui/card";

// Services disponibles (définis en dehors du composant pour éviter les recréations)
const SERVICES = [
  {
    id: "service1",
    name: "Consultation générale",
    duration: 30,
    color: "bg-blue-500",
  },
  {
    id: "service2",
    name: "Vaccination",
    duration: 15,
    color: "bg-green-500",
  },
  { id: "service3", name: "Chirurgie", duration: 60, color: "bg-red-500" },
  {
    id: "service4",
    name: "Contrôle annuel",
    duration: 45,
    color: "bg-purple-500",
  },
  { id: "service5", name: "Toilettage", duration: 90, color: "bg-amber-500" },
];

const ServiceStep = () => {
  const form = useFormContext<AppointmentFormValues>();

  // Une seule utilisation de watch pour éviter les re-rendus multiples
  const selectedServiceId = form.watch("serviceId");

  // Récupérer le service sélectionné avec useMemo
  const selectedService = useMemo(
    () => SERVICES.find((s) => s.id === selectedServiceId),
    [selectedServiceId]
  );

  // Fonction mémorisée de sélection du service avec useCallback
  const handleServiceSelection = useCallback((serviceId: string) => {
    const service = SERVICES.find(s => s.id === serviceId);

    // Mettre à jour serviceId et duration en une seule opération
    form.setValue("serviceId", serviceId);
    if (service) {
      form.setValue("duration", service.duration);
    }
  }, [form]);

  // Rendu mémorisé des cartes de service pour éviter les recréations inutiles
  const serviceCards = useMemo(() => {
    return SERVICES.map((service) => (
      <Card
        key={service.id}
        className={cn(
          "border p-0 cursor-pointer transition-all hover:bg-muted/50",
          service.id === selectedServiceId
            ? "border-primary bg-primary/5"
            : "border-border"
        )}
        onClick={() => handleServiceSelection(service.id)}
      >
        <div className="p-3 flex items-center">
          {service.id === selectedServiceId && (
            <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
              <CheckIcon className="h-3 w-3 text-white" />
            </div>
          )}
          <div
            className={`w-3 h-3 rounded-full mr-3 ${service.color}`}
          ></div>
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">{service.name}</span>
              <Badge variant="outline" className="ml-3">
                {service.duration} min
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground mt-1">
              Durée fixe pour ce service
            </span>
          </div>
        </div>
      </Card>
    ));
  }, [selectedServiceId, handleServiceSelection]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-base flex items-center mb-4">
          <StethoscopeIcon className="w-4 h-4 mr-2 text-primary" />
          Type de rendez-vous
        </h3>

        <FormField
          control={form.control}
          name="serviceId"
          render={() => (
            <FormItem>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {serviceCards}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {selectedService && (
        <div className="rounded-lg border border-dashed p-4 mt-6">
          <div className="flex items-center mb-3">
            <ClockIcon className="w-4 h-4 mr-2 text-primary" />
            <h3 className="font-medium text-base">Durée du rendez-vous</h3>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              La durée est définie automatiquement selon le type de service
              sélectionné.
            </p>
            <div className="bg-primary/10 text-primary font-medium text-lg px-4 py-2 rounded-md">
              {selectedService.duration} min
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceStep;
