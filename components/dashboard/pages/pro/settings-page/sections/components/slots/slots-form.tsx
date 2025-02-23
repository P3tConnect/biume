import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { fr } from "date-fns/locale";
import { TimePicker } from "@/components/ui/time-picker";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/src/actions/service.action";
import { DatePicker } from "@/components/ui/date-picker";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useActiveOrganization } from "@/src/lib/auth-client";

const slotSchema = z.object({
  type: z.enum(["unique", "recurring"]),
  date: z.date().optional(),
  serviceId: z.string().min(1, "Veuillez sélectionner un service"),
  startTime: z.string(),
  endTime: z.string(),
  selectedDays: z.array(z.string()).min(1, "Veuillez sélectionner au moins un jour").optional(),
  endRecurrence: z.date().optional(),
  serviceDuration: z.number(),
});

export type SlotFormValues = z.infer<typeof slotSchema>;

const formSchema = z.object({
  slots: z.array(slotSchema)
});

export type FormValues = z.infer<typeof formSchema>;

interface SlotsFormProps {
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
  initialData?: FormValues;
  isEditing?: boolean;
}

const steps = {
  type: {
    id: "type",
    title: "Type de créneau",
    description: "Choisissez le type de créneau à créer",
  },
  service: {
    id: "service",
    title: "Service et horaires",
    description: "Sélectionnez le service et les horaires du créneau",
  },
  date: {
    id: "date",
    title: "Date",
    description: "Sélectionnez la date ou la récurrence",
  },
} as const;

const weekDays = [
  { id: "monday", label: "Lun" },
  { id: "tuesday", label: "Mar" },
  { id: "wednesday", label: "Mer" },
  { id: "thursday", label: "Jeu" },
  { id: "friday", label: "Ven" },
  { id: "saturday", label: "Sam" },
  { id: "sunday", label: "Dim" },
];

const SlotsForm = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing,
}: SlotsFormProps) => {
  const { data: organization } = useActiveOrganization();
  const [currentStep, setCurrentStep] = React.useState<keyof typeof steps>(
    isEditing ? "service" : "type",
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slots: initialData?.slots || [{
        type: "unique",
        startTime: "09:00",
        endTime: "17:00",
        serviceDuration: 60,
        selectedDays: [],
      }],
    },
  });

  const { fields, append, update } = useFieldArray({
    control: form.control,
    name: "slots",
  });

  const { handleSubmit, watch, setValue, formState: { errors } } = form;
  const currentSlot = fields[0];

  const type = watch(`slots.0.type`);
  const date = watch(`slots.0.date`);
  const endRecurrence = watch(`slots.0.endRecurrence`);
  const selectedDays = watch(`slots.0.selectedDays`);
  const serviceId = watch(`slots.0.serviceId`);
  const startTime = watch(`slots.0.startTime`);
  const endTime = watch(`slots.0.endTime`);

  const handleDayToggle = (dayId: string) => {
    const currentDays = form.getValues("slots.0.selectedDays") || [];
    setValue(
      "slots.0.selectedDays",
      currentDays.includes(dayId)
        ? currentDays.filter((d) => d !== dayId)
        : [...currentDays, dayId],
      { shouldValidate: true }
    );
  };

  const handleNext = () => {
    const stepOrder: (keyof typeof steps)[] = ["type", "service", "date"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    } else {
      handleSubmit(onSubmit)();
    }
  };

  const handleBack = () => {
    const stepOrder: (keyof typeof steps)[] = ["type", "service", "date"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: () => getServices({}),
  });

  const renderTypeStep = () => (
    <div className="grid grid-cols-2 gap-4 h-full">
      <button
        onClick={() => setValue("slots.0.type", "unique")}
        className={cn(
          "h-full text-left p-6 rounded-xl border transition-all flex items-stretch",
          type === "unique"
            ? "border-2 border-primary"
            : "hover:border-primary/50",
        )}
      >
        <div className="flex flex-col justify-between h-full w-full">
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <CalendarIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Créneau unique</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Créez un créneau pour une date spécifique
              </p>
            </div>
          </div>
        </div>
      </button>

      <button
        onClick={() => setValue("slots.0.type", "recurring")}
        className={cn(
          "h-full text-left p-6 rounded-xl border transition-all flex items-stretch",
          type === "recurring"
            ? "border-2 border-primary"
            : "hover:border-primary/50",
        )}
      >
        <div className="flex flex-col justify-between h-full w-full">
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Créneaux récurrents</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Créez des créneaux qui se répètent chaque semaine
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );

  const renderServiceStep = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium mb-2 block">
          Sélectionnez un service
        </Label>
        <div className="space-y-2">
          {services?.data?.map((service) => (
            <button
              key={service.id}
              onClick={() => {
                setValue(`slots.0.serviceId`, service.id);
                setValue(`slots.0.serviceDuration`, service.duration || 60);
              }}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all",
                serviceId === service.id
                  ? "border-2 border-primary"
                  : "hover:border-primary/50",
              )}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {service.duration} min
                  </p>
                </div>
                <span className="text-muted-foreground">{service.price}</span>
              </div>
            </button>
          ))}
        </div>
        {errors.slots?.[0]?.serviceId?.message && (
          <p className="text-sm text-destructive mt-2">{errors.slots[0].serviceId.message}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Heure de début
          </Label>
          <TimePicker
            value={startTime}
            onChange={(value) => setValue(`slots.0.startTime`, value)}
          />
        </div>
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Heure de fin
          </Label>
          <TimePicker
            value={endTime}
            onChange={(value) => setValue(`slots.0.endTime`, value)}
          />
        </div>
      </div>
    </div>
  );

  const renderDateStep = () => (
    <div className="space-y-6">
      {type === "unique" ? (
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Sélectionnez une date
          </Label>
          <div className="p-3 rounded-xl border">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(value) => setValue(`slots.0.date`, value)}
              locale={fr}
              className={cn(
                "w-full [&_table]:w-full [&_table_td]:p-0 [&_table_td_button]:w-full [&_table_td_button]:h-9",
                "[&_table]:border-separate [&_table]:border-spacing-1",
              )}
            />
          </div>
        </div>
      ) : (
        <>
          <div>
            <Label className="text-sm font-medium mb-2 block">
              Jours de récurrence
            </Label>
            <div className="p-4 rounded-xl border">
              <div className="flex flex-wrap gap-2">
                {weekDays.map((day) => (
                  <Badge
                    key={day.id}
                    variant={
                      selectedDays?.includes(day.id) ? "default" : "outline"
                    }
                    className="cursor-pointer hover:bg-accent/50 transition-colors px-4 py-2"
                    onClick={() => handleDayToggle(day.id)}
                  >
                    {day.label}
                  </Badge>
                ))}
              </div>
            </div>
            {errors.slots?.[0]?.selectedDays?.message && (
              <p className="text-sm text-destructive mt-2">{errors.slots[0].selectedDays.message}</p>
            )}
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">
              Période de récurrence
            </Label>
            <DateRangePicker
              label="Période de récurrence"
              date={date && endRecurrence ? { from: date, to: endRecurrence } : undefined}
              onSelect={(range: DateRange | undefined) => {
                if (range?.from) setValue(`slots.0.date`, range.from);
                if (range?.to) setValue(`slots.0.endRecurrence`, range.to);
              }}
            />
          </div>
          {services?.data && serviceId && (
            <div className="mt-4 p-4 rounded-xl bg-muted">
              <p className="text-sm text-muted-foreground">
                {calculateNumberOfSlots()} créneaux de {services.data.find(s => s.id === serviceId)?.duration} minutes seront créés entre {startTime} et {endTime}
                les {selectedDays?.map(d => weekDays.find(w => w.id === d)?.label).join(", ")}
                {date && endRecurrence && ` du ${date.toLocaleDateString('fr-FR')} au ${endRecurrence.toLocaleDateString('fr-FR')}`}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );

  const calculateNumberOfSlots = () => {
    if (!services?.data || !serviceId || !selectedDays?.length) return 0;

    const service = services.data.find(s => s.id === serviceId);
    if (!service || !service.duration) return 0;

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    const slotsPerDay = Math.floor((endMinutes - startMinutes) / service.duration);

    if (!date || !endRecurrence) return slotsPerDay * selectedDays.length;

    const days = Math.ceil((endRecurrence.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    const weeks = Math.ceil(days / 7);

    return slotsPerDay * selectedDays.length * weeks;
  };

  const isFirstStep = currentStep === "type";
  const isLastStep = currentStep === "date";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {!isEditing && (
        <div className="flex items-center gap-4 mb-4">
          {Object.values(steps).map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                  currentStep === step.id
                    ? "border-primary text-primary"
                    : index <
                      Object.values(steps).findIndex(
                        (s) => s.id === currentStep,
                      )
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground text-muted-foreground",
                )}
              >
                {index + 1}
              </div>
              {index < Object.values(steps).length - 1 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
              )}
            </div>
          ))}
        </div>
      )}

      <div>
        <h2 className="font-semibold text-lg">
          {isEditing ? "Modifier le créneau" : steps[currentStep].title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isEditing
            ? "Modifiez les paramètres de votre créneau"
            : steps[currentStep].description}
        </p>
      </div>

      <div className="max-h-[500px] overflow-y-auto">
        {!isEditing && currentStep === "type" && renderTypeStep()}
        {((!isEditing && currentStep === "service") || isEditing) &&
          renderServiceStep()}
        {((!isEditing && currentStep === "date") ||
          (isEditing && type === "recurring")) &&
          renderDateStep()}
      </div>

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          className="rounded-xl"
          onClick={isEditing ? onCancel : isFirstStep ? onCancel : handleBack}
        >
          {isEditing ? "Annuler" : isFirstStep ? "Annuler" : "Retour"}
        </Button>
        <Button
          type={isLastStep || isEditing ? "submit" : "button"}
          className="rounded-xl"
          onClick={isLastStep || isEditing ? undefined : handleNext}
        >
          {isEditing
            ? "Enregistrer"
            : isLastStep
              ? "Créer les créneaux"
              : "Suivant"}
        </Button>
      </div>
    </form>
  );
};

export default SlotsForm;
