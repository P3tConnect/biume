"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  CalendarIcon,
  Clock,
  CheckIcon,
  User,
  PawPrint,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/src/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createAppointmentAction } from "@/src/actions/create-appointment.action";

interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Schéma de validation pour le formulaire
const appointmentFormSchema = z.object({
  clientId: z.string({
    required_error: "Veuillez sélectionner un client",
  }),
  patientId: z.string({
    required_error: "Veuillez sélectionner un patient",
  }),
  serviceId: z.string({
    required_error: "Veuillez sélectionner un service",
  }),
  date: z.date({
    required_error: "Veuillez sélectionner une date",
  }),
  startTime: z.string({
    required_error: "Veuillez sélectionner une heure de début",
  }),
  duration: z
    .number({
      required_error: "Veuillez indiquer une durée",
    })
    .min(15, "La durée minimum est de 15 minutes"),
  atHome: z.boolean().default(false),
  notes: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

// Configuration des étapes
type Step = {
  title: string;
  description: string;
  icon: React.ReactNode;
  fields: (keyof AppointmentFormValues)[];
};

const AppointmentDialog = ({ open, onOpenChange }: AppointmentDialogProps) => {
  // État pour suivre l'étape courante
  const [currentStep, setCurrentStep] = useState(0);

  // Configuration des étapes du stepper
  const steps: Step[] = [
    {
      title: "Client et Patient",
      description: "Sélectionnez le client et son animal",
      icon: <User className="h-5 w-5 mr-2" />,
      fields: ["clientId", "patientId"],
    },
    {
      title: "Service et Planning",
      description: "Choisissez le service et la date du rendez-vous",
      icon: <Stethoscope className="h-5 w-5 mr-2" />,
      fields: ["serviceId", "date", "startTime", "duration"],
    },
    {
      title: "Options et Confirmation",
      description: "Ajoutez des options supplémentaires et confirmez",
      icon: <Clock className="h-5 w-5 mr-2" />,
      fields: ["atHome", "notes"],
    },
  ];

  // Initialiser le formulaire avec hook-form et validation zod
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      atHome: false,
      duration: 30,
      notes: "",
    },
    mode: "onChange",
  });

  // État pour suivre si les champs de l'étape courante sont valides
  const [isStepValid, setIsStepValid] = useState(false);

  // Réinitialiser l'étape lorsque le dialogue s'ouvre/se ferme
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setCurrentStep(0);
      }, 300); // Attendre la fin de l'animation de fermeture
    }
  }, [open]);

  // Vérifier la validité des champs de l'étape actuelle
  useEffect(() => {
    const validateCurrentStep = async () => {
      const currentFields = steps[currentStep].fields;

      // Pour l'étape finale, on considère qu'elle est toujours valide car les champs sont optionnels
      if (currentStep === steps.length - 1) {
        setIsStepValid(true);
        return;
      }

      // Vérifier si tous les champs de l'étape actuelle sont valides
      try {
        const result = await form.trigger(currentFields as any);
        setIsStepValid(result);
      } catch (error) {
        setIsStepValid(false);
      }
    };

    validateCurrentStep();
  }, [currentStep, form.watch(), steps]);

  // Mutation pour créer un rendez-vous en utilisant l'action serveur
  const createAppointmentMutation = useMutation({
    mutationFn: async (
      data: AppointmentFormValues & { beginAt: Date; endAt: Date },
    ) => {
      const result = await createAppointmentAction(data);
      return result;
    },
    onSuccess: () => {
      // Réinitialiser le formulaire et fermer la modal
      form.reset();
      onOpenChange(false);
      toast.success("Rendez-vous créé avec succès !");
    },
    onError: (error) => {
      console.error("Erreur lors de la création du rendez-vous:", error);
      toast.error(
        "Erreur lors de la création du rendez-vous. Veuillez réessayer.",
      );
    },
  });

  // Passer à l'étape suivante
  const handleNext = async () => {
    const currentFields = steps[currentStep].fields;
    const isValid = await form.trigger(currentFields as any);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  // Revenir à l'étape précédente
  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // Gérer la soumission du formulaire
  const onSubmit = (data: AppointmentFormValues) => {
    // Calculer l'heure de début en ajoutant la durée à l'heure de début
    const [hours, minutes] = data.startTime.split(":").map(Number);
    const startDate = new Date(data.date);
    startDate.setHours(hours, minutes);

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + data.duration);

    // Préparer les données complètes pour l'envoi
    const appointmentData = {
      ...data,
      beginAt: startDate,
      endAt: endDate,
    };

    // Lancer la mutation pour créer le rendez-vous
    createAppointmentMutation.mutate(appointmentData);
  };

  // Formater l'affichage de la durée
  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours} heure${hours > 1 ? "s" : ""}${mins > 0 ? ` ${mins} min` : ""}`;
    }
    return `${minutes} minutes`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            {steps[currentStep].icon}
            {steps[currentStep].title}
          </DialogTitle>
          <DialogDescription>
            {steps[currentStep].description}
          </DialogDescription>
        </DialogHeader>

        {/* Indicateur de progression */}
        <div className="relative mb-6">
          <div className="w-full h-1 bg-gray-200 rounded-full">
            <div
              className="h-1 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    currentStep >= index
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > index ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-xs mt-1 transition-colors ${
                    currentStep >= index
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  Étape {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 py-4">
              {/* Étape 1: Client et Patient */}
              {currentStep === 0 && (
                <>
                  <FormField
                    control={form.control}
                    name="clientId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un client" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="client1">Jean Dupont</SelectItem>
                            <SelectItem value="client2">
                              Sophie Martin
                            </SelectItem>
                            <SelectItem value="client3">
                              Pierre Durand
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="patientId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un animal" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pet1">Rex (Chien)</SelectItem>
                            <SelectItem value="pet2">Félix (Chat)</SelectItem>
                            <SelectItem value="pet3">Titi (Oiseau)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* Étape 2: Service et Planning */}
              {currentStep === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="serviceId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="service1">
                              Consultation standard
                            </SelectItem>
                            <SelectItem value="service2">
                              Vaccination
                            </SelectItem>
                            <SelectItem value="service3">
                              Contrôle annuel
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: fr })
                                ) : (
                                  <span>Sélectionner une date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              locale={fr}
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Heure de début</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Heure" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="09:00">09:00</SelectItem>
                              <SelectItem value="09:30">09:30</SelectItem>
                              <SelectItem value="10:00">10:00</SelectItem>
                              <SelectItem value="10:30">10:30</SelectItem>
                              <SelectItem value="11:00">11:00</SelectItem>
                              <SelectItem value="11:30">11:30</SelectItem>
                              <SelectItem value="14:00">14:00</SelectItem>
                              <SelectItem value="14:30">14:30</SelectItem>
                              <SelectItem value="15:00">15:00</SelectItem>
                              <SelectItem value="15:30">15:30</SelectItem>
                              <SelectItem value="16:00">16:00</SelectItem>
                              <SelectItem value="16:30">16:30</SelectItem>
                              <SelectItem value="17:00">17:00</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Durée</FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(parseInt(value, 10))
                            }
                            defaultValue={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Durée" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="15">15 min</SelectItem>
                              <SelectItem value="30">30 min</SelectItem>
                              <SelectItem value="45">45 min</SelectItem>
                              <SelectItem value="60">1h</SelectItem>
                              <SelectItem value="90">1h30</SelectItem>
                              <SelectItem value="120">2h</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              {/* Étape 3: Options supplémentaires et confirmation */}
              {currentStep === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name="atHome"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Consultation à domicile</FormLabel>
                          <FormDescription>
                            Ce rendez-vous se fera-t-il au domicile du client ?
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Informations complémentaires sur le rendez-vous..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Résumé du rendez-vous */}
                  <div className="border rounded-md p-4 space-y-3 bg-muted/30 mt-4">
                    <h3 className="font-medium">Résumé du rendez-vous</h3>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Client</p>
                        <p className="text-sm">
                          {form.getValues("clientId") === "client1"
                            ? "Jean Dupont"
                            : form.getValues("clientId") === "client2"
                              ? "Sophie Martin"
                              : "Pierre Durand"}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium">Patient</p>
                        <p className="text-sm">
                          {form.getValues("patientId") === "pet1"
                            ? "Rex (Chien)"
                            : form.getValues("patientId") === "pet2"
                              ? "Félix (Chat)"
                              : "Titi (Oiseau)"}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium">Service</p>
                        <p className="text-sm">
                          {form.getValues("serviceId") === "service1"
                            ? "Consultation standard"
                            : form.getValues("serviceId") === "service2"
                              ? "Vaccination"
                              : "Contrôle annuel"}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium">Date et heure</p>
                        <p className="text-sm">
                          {format(form.getValues("date"), "PPP", {
                            locale: fr,
                          })}{" "}
                          à {form.getValues("startTime")}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium">Durée</p>
                        <p className="text-sm">
                          {formatDuration(form.getValues("duration"))}
                        </p>
                      </div>

                      {form.getValues("atHome") && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Lieu</p>
                          <p className="text-sm">À domicile</p>
                        </div>
                      )}
                    </div>

                    {form.getValues("notes") && (
                      <div className="space-y-1 col-span-2 pt-2 border-t">
                        <p className="text-sm font-medium">Notes</p>
                        <p className="text-sm whitespace-pre-wrap">
                          {form.getValues("notes")}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Barre de navigation */}
            <DialogFooter className="flex justify-between mt-6 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={
                  currentStep === 0 ? () => onOpenChange(false) : handlePrevious
                }
                className="flex items-center"
              >
                {currentStep === 0 ? (
                  "Annuler"
                ) : (
                  <>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Précédent
                  </>
                )}
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid}
                  className="flex items-center"
                >
                  Suivant
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={createAppointmentMutation.isPending}
                  className="flex items-center"
                >
                  {createAppointmentMutation.isPending ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Création en cours...
                    </span>
                  ) : (
                    <>
                      Créer le rendez-vous
                      <CheckIcon className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
