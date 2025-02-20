import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { fr } from "date-fns/locale";
import { TimePicker } from "@/components/ui/time-picker";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface SlotCreationFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const SlotCreationForm = ({ onSubmit, onCancel }: SlotCreationFormProps) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [slotDuration, setSlotDuration] = React.useState("30");
  const [startTime, setStartTime] = React.useState("09:00");
  const [endTime, setEndTime] = React.useState("17:00");
  const [selectedDays, setSelectedDays] = React.useState<string[]>([]);
  const [endRecurrence, setEndRecurrence] = React.useState<Date | undefined>();
  const [step, setStep] = React.useState(1);
  const [type, setType] = React.useState<"unique" | "recurring">("unique");

  const weekDays = [
    { id: "monday", label: "Lun" },
    { id: "tuesday", label: "Mar" },
    { id: "wednesday", label: "Mer" },
    { id: "thursday", label: "Jeu" },
    { id: "friday", label: "Ven" },
    { id: "saturday", label: "Sam" },
    { id: "sunday", label: "Dim" },
  ];

  const durations = [
    { value: "15", label: "15 min" },
    { value: "30", label: "30 min" },
    { value: "45", label: "45 min" },
    { value: "60", label: "1h" },
  ];

  const handleDayToggle = (dayId: string) => {
    setSelectedDays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId],
    );
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onSubmit({
      type,
      date,
      slotDuration,
      startTime,
      endTime,
      selectedDays,
      endRecurrence,
    });
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-lg font-medium">Type de créneau</h3>
        <div className="flex gap-4 w-full max-w-md">
          <Button
            variant={type === "unique" ? "default" : "outline"}
            className="flex-1 h-24 flex-col gap-2"
            onClick={() => setType("unique")}
          >
            <CalendarIcon className="h-6 w-6" />
            <span>Créneau unique</span>
          </Button>
          <Button
            variant={type === "recurring" ? "default" : "outline"}
            className="flex-1 h-24 flex-col gap-2"
            onClick={() => setType("recurring")}
          >
            <Clock className="h-6 w-6" />
            <span>Créneaux récurrents</span>
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-lg font-medium">Configuration du créneau</h3>
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-4">
            <Label>Durée du créneau</Label>
            <div className="grid grid-cols-4 gap-2">
              {durations.map(({ value, label }) => (
                <Button
                  key={value}
                  variant={slotDuration === value ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setSlotDuration(value)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Label>Horaires</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <TimePicker value={startTime} onChange={setStartTime} />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1">
                <TimePicker value={endTime} onChange={setEndTime} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-lg font-medium">
          {type === "unique"
            ? "Sélection de la date"
            : "Configuration de la récurrence"}
        </h3>
        {type === "unique" ? (
          <div className="w-full max-w-md flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={fr}
              className="rounded-md border"
            />
          </div>
        ) : (
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-4">
              <Label>Jours de la semaine</Label>
              <div className="flex flex-wrap gap-2 justify-center">
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
            <div className="space-y-4">
              <Label>Date de fin de récurrence</Label>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={endRecurrence}
                  onSelect={setEndRecurrence}
                  locale={fr}
                  className="rounded-md border"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-border">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
        <div className="flex justify-between px-2 mt-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors",
                step >= s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-[400px] flex items-center justify-center p-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={step === 1 ? onCancel : handleBack}>
          {step === 1 ? "Annuler" : "Retour"}
        </Button>
        <Button onClick={handleNext}>
          {step === 3 ? "Créer les créneaux" : "Suivant"}
        </Button>
      </div>
    </div>
  );
};

export default SlotCreationForm;
