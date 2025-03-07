import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceStepSchema } from "./appointmentDialogStepper";
import { StethoscopeIcon, ClockIcon, CheckIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/src/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppointmentFormValues } from "./AppointmentDialog";

const ServiceStep = () => {
  const form = useFormContext<AppointmentFormValues>();

  // Services disponibles (simulés pour l'exemple)
  const services = [
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

  // Récupérer le service sélectionné
  const selectedService = services.find(
    (s) => s.id === form.watch("serviceId"),
  );

  // Définir la durée automatiquement basée sur le service sélectionné
  React.useEffect(() => {
    if (selectedService) {
      form.setValue("duration", selectedService.duration);
    }
  }, [form.watch("serviceId"), selectedService, form]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-base flex items-center mb-4">
          <StethoscopeIcon className="w-4 h-4 mr-2 text-primary" />
          Type de rendez-vous
        </h3>

        <RadioGroup
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
          value={form.watch("serviceId")}
          onValueChange={(value) => form.setValue("serviceId", value)}
        >
          {services.map((service) => (
            <div
              key={service.id}
              className={cn(
                "relative flex items-center rounded-lg border p-3 cursor-pointer transition-all hover:bg-muted/50",
                form.watch("serviceId") === service.id
                  ? "border-primary bg-primary/5"
                  : "border-border",
              )}
              onClick={() => form.setValue("serviceId", service.id)}
            >
              <div
                className={`w-3 h-3 rounded-full mr-3 ${service.color}`}
              ></div>
              <div className="flex flex-col w-full">
                <RadioGroupItem
                  value={service.id}
                  id={service.id}
                  className="sr-only"
                />
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
          ))}
        </RadioGroup>

        {form.formState.errors.serviceId && (
          <FormMessage className="mt-2">
            {form.formState.errors.serviceId.message}
          </FormMessage>
        )}
      </div>

      {selectedService && (
        <div className="rounded-lg border border-dashed p-4">
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
