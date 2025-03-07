import {
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ConfirmationStepSchema } from "./appointmentDialogStepper";
import { Card, CardContent } from "@/components/ui/card";
import {
  HomeIcon,
  MessageSquareIcon,
  CalendarIcon,
  ClockIcon,
  StethoscopeIcon,
  UserIcon,
  PawPrintIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { cn } from "@/src/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AppointmentFormValues } from "./AppointmentDialog";

const ConfirmationStep = () => {
  const form = useFormContext<AppointmentFormValues>();

  // Simulation de données pour l'exemple
  const clients = [
    { id: "client1", name: "Marie Dupont", email: "marie@example.com" },
    { id: "client2", name: "Jean Martin", email: "jean@example.com" },
    { id: "client3", name: "Sophie Laurent", email: "sophie@example.com" },
  ];

  const pets = [
    { id: "pet1", name: "Rex", type: "Chien", clientId: "client1" },
    { id: "pet2", name: "Félix", type: "Chat", clientId: "client2" },
    { id: "pet3", name: "Titi", type: "Oiseau", clientId: "client3" },
  ];

  const services = [
    { id: "service1", name: "Consultation générale", duration: 30 },
    { id: "service2", name: "Vaccination", duration: 15 },
    { id: "service3", name: "Chirurgie", duration: 60 },
    { id: "service4", name: "Contrôle annuel", duration: 45 },
    { id: "service5", name: "Toilettage", duration: 90 },
  ];

  // Récupérer les informations
  const selectedClient = clients.find((c) => c.id === form.watch("clientId"));
  const selectedPet = pets.find((p) => p.id === form.watch("patientId"));
  const selectedService = services.find(
    (s) => s.id === form.watch("serviceId"),
  );

  // Calculer l'heure de fin estimée
  const calculateEndTime = () => {
    if (!form.watch("startTime") || !form.watch("duration")) return "...";

    const [hours, minutes] = form.watch("startTime").split(":").map(Number);
    let endHours = hours + Math.floor((minutes + form.watch("duration")) / 60);
    let endMinutes = (minutes + form.watch("duration")) % 60;

    return `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-muted h-full">
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">
                Récapitulatif du rendez-vous
              </h3>

              <div className="grid gap-3">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Date et heure
                    </span>
                    <p className="font-medium">
                      {form.watch("date")
                        ? format(form.watch("date"), "EEEE d MMMM yyyy", {
                          locale: fr,
                        })
                        : "Date non sélectionnée"}
                      <span> à {form.watch("startTime") || "..."}</span>
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <ClockIcon className="h-3 w-3 mr-1 inline" />
                      <span>{form.watch("startTime") || "..."} - {calculateEndTime()}</span>
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {form.watch("duration") || "..."} min
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <StethoscopeIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Service
                    </span>
                    <p className="font-medium">
                      {selectedService?.name || "Service non sélectionné"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Durée fixe: {selectedService?.duration || "..."} minutes
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <UserIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Client
                    </span>
                    <p className="font-medium">
                      {selectedClient?.name || "Client non sélectionné"}
                    </p>
                    {selectedClient?.email && (
                      <p className="text-xs text-muted-foreground">
                        {selectedClient.email}
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <PawPrintIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Patient
                    </span>
                    <p className="font-medium">
                      {selectedPet?.name || "Animal non sélectionné"}
                    </p>
                    {selectedPet && (
                      <Badge variant="outline" className="mt-1">
                        {selectedPet.type}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-muted h-full">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Options supplémentaires</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="atHome"
                    className="flex items-center text-base font-medium"
                  >
                    <HomeIcon className="h-4 w-4 mr-2 text-primary" />
                    Rendez-vous à domicile
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Le vétérinaire se déplacera au domicile du client
                  </p>
                </div>
                <Switch
                  id="atHome"
                  checked={form.watch("atHome")}
                  onCheckedChange={(checked) =>
                    form.setValue("atHome", checked)
                  }
                />
              </div>

              <div className="space-y-2 pt-4">
                <Label
                  htmlFor="notes"
                  className="flex items-center text-base font-medium"
                >
                  <MessageSquareIcon className="h-4 w-4 mr-2 text-primary" />
                  Notes et informations complémentaires
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Ajoutez des informations spécifiques pour ce rendez-vous..."
                  className="min-h-[180px] resize-none"
                  value={form.watch("notes") || ""}
                  onChange={(e) => form.setValue("notes", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {form.formState.errors.atHome && (
        <FormMessage>{form.formState.errors.atHome.message}</FormMessage>
      )}

      {form.formState.errors.notes && (
        <FormMessage>{form.formState.errors.notes.message}</FormMessage>
      )}
    </div>
  );
};

export default ConfirmationStep;
