import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Calendar,
  Separator,
  Credenza,
  CredenzaHeader,
  CredenzaContent,
  CredenzaTitle,
  CredenzaDescription,
  CredenzaFooter,
} from "@/components/ui";
import { ChevronRight, Dog, Cat, Bird, PawPrint } from "lucide-react";
import { fr } from "date-fns/locale";
import { Dispatch, SetStateAction, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/src/lib/utils";
import { Service, Member } from "@/src/db";
import { getPets } from "@/src/actions";
import { useActionQuery } from "@/src/hooks/action-hooks";
import { steps, useStepper, StepId } from "../hooks/useBookingStepper";
import { PetStep } from "./steps/PetStep";
import { ConsultationTypeStep } from "./steps/ConsultationTypeStep";
import { SummaryStep } from "./steps/SummaryStep";
import Avvvatars from "avvvatars-react";

interface BookingCardProps {
  services: Service[];
  professionals: Member[];
  selectedService: string | null;
  selectedPro: string | null;
  selectedDate: Date | undefined;
  selectedTime: string | null;
  setSelectedService: Dispatch<SetStateAction<string | null>>;
  setSelectedPro: Dispatch<SetStateAction<string | null>>;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
  setSelectedTime: Dispatch<SetStateAction<string | null>>;
}

export function BookingCard({
  services,
  professionals,
  selectedService,
  selectedPro,
  selectedDate,
  selectedTime,
  setSelectedService,
  setSelectedPro,
  setSelectedDate,
  setSelectedTime,
}: BookingCardProps) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { data: userPets = [] } = useActionQuery(getPets, {}, "user-pets");

  const stepper = useStepper({
    initialStep: "pet",
  });

  const getPetIcon = (type: string) => {
    switch (type) {
      case "Dog":
        return <Dog className="h-5 w-5" />;
      case "Cat":
        return <Cat className="h-5 w-5" />;
      case "Bird":
        return <Bird className="h-5 w-5" />;
      default:
        return <PawPrint className="h-5 w-5" />;
    }
  };

  const selectedServiceData = selectedService
    ? (services.find((s) => s.id === selectedService) ?? null)
    : null;

  const selectedProData = selectedPro
    ? (professionals.find((p) => p.id === selectedPro) ?? null)
    : null;

  const selectedPet = userPets.find(
    (p) => p.id === stepper.metadata?.pet?.petId,
  );

  const handleBooking = () => {
    // TODO: Implémenter la logique de réservation
    console.log({
      service: selectedServiceData,
      professional: selectedProData,
      date: selectedDate,
      time: selectedTime,
      additionalInfo: stepper.metadata?.summary?.additionalInfo,
      pet: selectedPet,
      isHomeVisit: stepper.metadata?.consultationType?.isHomeVisit,
    });
    setIsConfirmModalOpen(false);
  };

  const stepContent = {
    pet: (
      <PetStep
        userPets={userPets}
        selectedPetId={stepper.metadata?.pet?.petId ?? ""}
        onSelectPet={(petId) => stepper.setMetadata("pet", { petId })}
      />
    ),
    consultationType: (
      <ConsultationTypeStep
        isHomeVisit={stepper.metadata?.consultationType?.isHomeVisit ?? false}
        onSelectType={(isHomeVisit) =>
          stepper.setMetadata("consultationType", { isHomeVisit })
        }
      />
    ),
    summary: (
      <SummaryStep
        selectedPet={selectedPet}
        selectedService={selectedServiceData}
        selectedPro={selectedProData}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        isHomeVisit={stepper.metadata?.consultationType?.isHomeVisit ?? false}
        additionalInfo={stepper.metadata?.summary?.additionalInfo ?? ""}
        onAdditionalInfoChange={(value) =>
          stepper.setMetadata("summary", { additionalInfo: value })
        }
      />
    ),
  };

  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Prix */}
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold">
              {selectedServiceData?.price || "À partir de 40€"}
            </span>
            {selectedServiceData && (
              <span className="text-muted-foreground">
                · {selectedServiceData.duration}
              </span>
            )}
          </div>

          {/* Service Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Sélectionnez un service
            </label>
            <div className="space-y-2">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border transition-all",
                    selectedService === service.id
                      ? "border-2 border-primary"
                      : "hover:border-primary/50",
                  )}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-muted-foreground">
                      {service.price} €
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {service.duration} min
                  </p>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Professional Selection */}
          {selectedService && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Choisissez un professionnel
              </label>
              <div className="space-y-2">
                {professionals.map((pro) => (
                  <button
                    key={pro.id}
                    onClick={() => setSelectedPro(pro.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border transition-all",
                      selectedPro === pro.id
                        ? "border-2 border-primary"
                        : "hover:border-primary/50",
                    )}
                  >
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <Avvvatars
                          value={pro.user.name || ""}
                          style="shape"
                          size={48}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{pro.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {pro.role}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Date Selection */}
          {selectedPro && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Sélectionnez une date
              </label>
              <div className="p-3 rounded-xl border">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={fr}
                  className={cn(
                    "w-full [&_table]:w-full [&_table_td]:p-0 [&_table_td_button]:w-full [&_table_td_button]:h-9",
                    "[&_table]:border-separate [&_table]:border-spacing-1",
                  )}
                />
              </div>
            </div>
          )}

          {/* Time Selection */}
          {selectedDate && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Choisissez un horaire
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"].map(
                  (time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          disabled={!selectedTime}
          className="w-full"
          size="lg"
          onClick={() => setIsConfirmModalOpen(true)}
        >
          {selectedTime && selectedDate
            ? `Réserver pour ${format(selectedDate, "d MMMM", {
                locale: fr,
              })} à ${selectedTime}`
            : "Sélectionnez un créneau"}
        </Button>
      </CardFooter>

      <Credenza open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <CredenzaContent className="sm:max-w-[600px]">
          <CredenzaHeader>
            <div className="flex items-center gap-4 mb-4">
              {Object.values(steps).map((stepItem, index) => (
                <div key={stepItem.id} className="flex items-center">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                      stepper.current.id === stepItem.id
                        ? "border-primary text-primary"
                        : index <
                            Object.values(steps).findIndex(
                              (s) => s.id === stepper.current.id,
                            )
                          ? "border-primary bg-primary text-white"
                          : "border-muted-foreground text-muted-foreground",
                    )}
                    onClick={() => {
                      // stepper.switch(stepItem.id);
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    {index + 1}
                  </div>
                  {index < Object.values(steps).length - 1 && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
                  )}
                </div>
              ))}
            </div>
            <CredenzaTitle>{stepper.current.title}</CredenzaTitle>
            <CredenzaDescription>
              {stepper.current.description}
            </CredenzaDescription>
          </CredenzaHeader>

          <div className="py-4">
            {stepContent[stepper.current.id as keyof typeof stepContent]}
          </div>

          <CredenzaFooter>
            <div className="flex w-full justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  if (stepper.isFirst) {
                    setIsConfirmModalOpen(false);
                  } else {
                    stepper.prev();
                  }
                }}
              >
                {stepper.isFirst ? "Annuler" : "Retour"}
              </Button>
              <Button
                onClick={() => {
                  if (stepper.isLast) {
                    handleBooking();
                  } else {
                    stepper.next();
                  }
                }}
                disabled={
                  (stepper.current.id === "pet" &&
                    !stepper.metadata?.pet?.petId) ||
                  (stepper.isLast && !stepper.metadata?.pet?.petId)
                }
              >
                {stepper.isLast ? "Confirmer" : "Suivant"}
              </Button>
            </div>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </Card>
  );
}
