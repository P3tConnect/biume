"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarIcon, Clock, Loader2, Bell, BellRing, Info, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/src/lib/utils";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Credenza, CredenzaContent, CredenzaHeader, CredenzaTitle } from "@/components/ui";

interface ReminderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Définir le schéma du formulaire
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Le titre doit contenir au moins 2 caractères.",
  }),
  description: z.string().optional(),
  date: z.date({
    required_error: "La date est requise.",
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Format d'heure invalide. Utilisez HH:MM.",
  }),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "La priorité est requise.",
  }),
  status: z.enum(["pending", "completed"], {
    required_error: "Le statut est requis.",
  }).default("pending"),
  notifyBefore: z.number().min(0).default(15),
  repeat: z.enum(["none", "daily", "weekly", "monthly"], {
    required_error: "La répétition est requise.",
  }).default("none"),
});

type FormValues = z.infer<typeof formSchema>;

// Fonction simulée pour créer un rappel
const createReminder = async (data: FormValues) => {
  // Simulation d'un appel API
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Rappel créé:", data);
      resolve({ success: true, data });
    }, 1000);
  });
};

const ReminderDialog = ({ open, onOpenChange }: ReminderDialogProps) => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      status: "pending",
      notifyBefore: 15,
      repeat: "none",
      time: "09:00",
    },
  });

  const selectedTitle = form.watch("title");
  const selectedPriority = form.watch("priority");
  const selectedDate = form.watch("date");
  const selectedTime = form.watch("time");
  const selectedStatus = form.watch("status");

  const mutation = useMutation({
    mutationFn: createReminder,
    onSuccess: () => {
      toast.success("Le rappel a été créé avec succès");
      form.reset();
      onOpenChange(false);
      router.refresh();
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la création du rappel");
    },
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  // Fonction pour obtenir la couleur en fonction de la priorité
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-rose-500";
      case "medium": return "text-amber-500";
      case "low": return "text-emerald-500";
      default: return "text-slate-500";
    }
  };

  // Fonction pour obtenir le libellé de la priorité en français
  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high": return "Haute";
      case "medium": return "Moyenne";
      case "low": return "Basse";
      default: return "Non définie";
    }
  };

  // Fonction pour obtenir l'icône en fonction de la priorité
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return <BellRing className="h-4 w-4" />;
      case "medium": return <Bell className="h-4 w-4" />;
      case "low": return <Bell className="h-4 w-4 opacity-70" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <CredenzaHeader>
          <CredenzaTitle className="text-xl font-bold">Créer un nouveau rappel</CredenzaTitle>
        </CredenzaHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Prévisualisation du rappel */}
              <Card className="md:w-1/3 p-4 flex flex-col space-y-4 border-dashed">
                <div className="flex items-center justify-center">
                  <Avatar className={cn("h-14 w-14",
                    selectedPriority === "high" ? "bg-rose-100" :
                      selectedPriority === "medium" ? "bg-amber-100" :
                        selectedPriority === "low" ? "bg-emerald-100" : "bg-slate-100"
                  )}>
                    <AvatarFallback className={cn("text-xl",
                      selectedPriority === "high" ? "text-rose-600" :
                        selectedPriority === "medium" ? "text-amber-600" :
                          selectedPriority === "low" ? "text-emerald-600" : "text-slate-600"
                    )}>
                      {getPriorityIcon(selectedPriority)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-medium text-lg truncate">
                    {selectedTitle || "Titre du rappel"}
                  </h3>
                  <p className={cn("text-sm flex items-center justify-center gap-1",
                    getPriorityColor(selectedPriority)
                  )}>
                    {getPriorityIcon(selectedPriority)}
                    <span>{getPriorityLabel(selectedPriority)}</span>
                  </p>
                </div>

                <div className="flex flex-col text-sm space-y-2 pt-2">
                  {selectedDate && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{format(selectedDate, "PPP", { locale: fr })}</span>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{selectedTime}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{selectedStatus === "completed" ? "Complété" : "En attente"}</span>
                  </div>
                </div>
              </Card>

              {/* Formulaire à onglets */}
              <div className="md:w-2/3">
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="info" className="flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      <span className="hidden sm:inline">Informations</span>
                    </TabsTrigger>
                    <TabsTrigger value="notification" className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <span className="hidden sm:inline">Notification</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Onglet informations principales */}
                  <TabsContent value="info" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre</FormLabel>
                          <FormControl>
                            <Input placeholder="Rendez-vous vétérinaire" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
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
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP", { locale: fr })
                                    ) : (
                                      <span>Sélectionnez une date</span>
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
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Heure</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Priorité</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez une priorité" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="low">Basse</SelectItem>
                                <SelectItem value="medium">Moyenne</SelectItem>
                                <SelectItem value="high">Haute</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Statut</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez un statut" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="pending">En attente</SelectItem>
                                <SelectItem value="completed">Complété</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Informations supplémentaires sur le rappel"
                              className="resize-none min-h-24"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  {/* Onglet notification */}
                  <TabsContent value="notification" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="notifyBefore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notification avant (minutes)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="15"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="repeat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Répétition</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une répétition" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">Aucune</SelectItem>
                              <SelectItem value="daily">Quotidienne</SelectItem>
                              <SelectItem value="weekly">Hebdomadaire</SelectItem>
                              <SelectItem value="monthly">Mensuelle</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="min-w-28"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Création...
                  </>
                ) : (
                  "Créer le rappel"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CredenzaContent>
    </Credenza>
  );
};

export default ReminderDialog;
