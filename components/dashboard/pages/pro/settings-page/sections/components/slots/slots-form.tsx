import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { fr } from "date-fns/locale";
import { TimePicker } from "@/components/ui/time-picker";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface SlotsFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: {
    type: "unique" | "recurring";
    date?: Date;
    serviceId: string;
    startTime: string;
    endTime: string;
    selectedDays: string[];
    endRecurrence?: Date;
  };
  isEditing?: boolean;
}

interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
}

// Exemple de services (à remplacer par les vrais services)
const services: Service[] = [
  { id: "1", name: "Consultation standard", duration: "30", price: "35€" },
  { id: "2", name: "Consultation longue", duration: "60", price: "65€" },
  { id: "3", name: "Suivi rapide", duration: "15", price: "20€" },
  { id: "4", name: "Bilan complet", duration: "45", price: "50€" },
];

interface FormData {
  type: "unique" | "recurring";
  date?: Date;
  serviceId: string;
  startTime: string;
  endTime: string;
  selectedDays: string[];
  endRecurrence?: Date;
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
  const [date, setDate] = React.useState<Date | undefined>(
    initialData?.date || new Date(),
  );
  const [serviceId, setServiceId] = React.useState(
    initialData?.serviceId || "",
  );
  const [startTime, setStartTime] = React.useState(
    initialData?.startTime || "09:00",
  );
  const [endTime, setEndTime] = React.useState(initialData?.endTime || "17:00");
  const [selectedDays, setSelectedDays] = React.useState<string[]>(
    initialData?.selectedDays || [],
  );
  const [endRecurrence, setEndRecurrence] = React.useState<Date | undefined>(
    initialData?.endRecurrence,
  );
  const [type, setType] = React.useState<"unique" | "recurring">(
    initialData?.type || "unique",
  );
  const [currentStep, setCurrentStep] = React.useState<keyof typeof steps>(
    isEditing ? "service" : "type",
  );

  const handleDayToggle = (dayId: string) => {
    setSelectedDays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId],
    );
  };

  const handleNext = () => {
    const stepOrder: (keyof typeof steps)[] = ["type", "service", "date"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    const stepOrder: (keyof typeof steps)[] = ["type", "service", "date"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleSubmit = () => {
    const formData: FormData = {
      type,
      date,
      serviceId,
      startTime,
      endTime,
      selectedDays,
      endRecurrence,
    };
    onSubmit(formData);
  };

  const renderTypeStep = () => (
    <div className="grid grid-cols-2 gap-4 h-full">
      <button
        onClick={() => setType("unique")}
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
        onClick={() => setType("recurring")}
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
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setServiceId(service.id)}
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
              onSelect={setDate}
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
                      selectedDays.includes(day.id) ? "default" : "outline"
                    }
                    className="cursor-pointer hover:bg-accent/50 transition-colors px-4 py-2"
                    onClick={() => handleDayToggle(day.id)}
                  >
                    {day.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">
              Date de fin de récurrence
            </Label>
            <div className="p-4 rounded-xl border">
              <Calendar
                mode="single"
                selected={endRecurrence}
                onSelect={setEndRecurrence}
                locale={fr}
                className={cn(
                  "w-full [&_table]:w-full [&_table_td]:p-0 [&_table_td_button]:w-full [&_table_td_button]:h-9",
                  "[&_table]:border-separate [&_table]:border-spacing-1",
                )}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );

  const isFirstStep = currentStep === "type";
  const isLastStep = currentStep === "date";

  return (
    <div className="space-y-6">
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
          variant="outline"
          className="rounded-xl"
          onClick={isEditing ? onCancel : isFirstStep ? onCancel : handleBack}
        >
          {isEditing ? "Annuler" : isFirstStep ? "Annuler" : "Retour"}
        </Button>
        <Button
          className="rounded-xl"
          onClick={isEditing ? handleSubmit : handleNext}
        >
          {isEditing
            ? "Enregistrer"
            : isLastStep
              ? "Créer les créneaux"
              : "Suivant"}
        </Button>
      </div>
    </div>
  );
};

export default SlotsForm;
