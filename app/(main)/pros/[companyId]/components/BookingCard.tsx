import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Calendar,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Separator,
  Textarea,
  Label,
  Badge,
  Credenza,
  CredenzaHeader,
  CredenzaContent,
  CredenzaTitle,
  CredenzaDescription,
  CredenzaFooter,
} from "@/components/ui";
import {
  Star,
  Home,
  Dog,
  Cat,
  Bird,
  ChevronRight,
  PawPrint,
} from "lucide-react";
import { fr } from "date-fns/locale";
import { Dispatch, SetStateAction, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";
import Avvvatars from "avvvatars-react";
import { Service, Member, Pet } from "@/src/db";
import Image from "next/image";
import { getPets } from "@/src/actions";
import { useActionQuery } from "@/src/hooks/action-hooks";

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
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [selectedPet, setSelectedPet] = useState<string>("");
  const [isHomeVisit, setIsHomeVisit] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const { data: userPets = [] } = useActionQuery(getPets, {}, "user-pets");

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
    ? services.find((s) => s.id === selectedService)
    : null;

  const selectedProData = selectedPro
    ? professionals.find((p) => p.id === selectedPro)
    : null;

  const handleBooking = () => {
    // TODO: Implémenter la logique de réservation
    console.log({
      service: selectedServiceData,
      professional: selectedProData,
      date: selectedDate,
      time: selectedTime,
      additionalInfo,
      pet: userPets.find((p) => p.id === selectedPet),
      isHomeVisit,
    });
    setIsConfirmModalOpen(false);
  };

  const steps = [
    {
      title: "Animal",
      description: "Choisissez l'animal pour la consultation",
      content: (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userPets?.map((pet) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={pet.id}
                onClick={() => setSelectedPet(pet.id)}
                className={cn(
                  "relative cursor-pointer rounded-xl border-2 p-4 transition-all",
                  selectedPet === pet.id
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50",
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                    {pet.image ? (
                      <Image
                        width={64}
                        height={64}
                        src={pet.image}
                        alt={pet.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <PawPrint className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{pet.name}</h4>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      {getPetIcon(pet.type)}
                      <span>{pet.type}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {!userPets?.length && (
              <div className="col-span-2 flex flex-col items-center justify-center p-8 text-center">
                <PawPrint className="h-12 w-12 text-muted-foreground/20 mb-4" />
                <p className="text-muted-foreground">
                  Vous n'avez pas encore enregistré d'animal.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      ),
    },
    {
      title: "Type de consultation",
      description: "Choisissez le type de consultation",
      content: (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsHomeVisit(false)}
              className={cn(
                "relative cursor-pointer rounded-xl border-2 p-6 transition-all",
                !isHomeVisit
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50",
              )}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="rounded-full bg-primary/10 p-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Au cabinet</h4>
                  <p className="text-sm text-muted-foreground">
                    Consultation classique au cabinet vétérinaire
                  </p>
                </div>
                <Badge variant="secondary">Prix standard</Badge>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsHomeVisit(true)}
              className={cn(
                "relative cursor-pointer rounded-xl border-2 p-6 transition-all",
                isHomeVisit
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50",
              )}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="rounded-full bg-primary/10 p-4">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">À domicile</h4>
                  <p className="text-sm text-muted-foreground">
                    Le vétérinaire se déplace chez vous
                  </p>
                </div>
                <Badge variant="secondary">+10€</Badge>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "Récapitulatif",
      description: "Vérifiez les détails de votre réservation",
      content: (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="rounded-xl border bg-muted/50 p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                <Image
                  width={64}
                  height={64}
                  src={userPets.find((p) => p.id === selectedPet)?.image!}
                  alt="Animal"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">
                  {userPets.find((p) => p.id === selectedPet)?.name}
                </h4>
                <div className="flex items-center gap-1 text-muted-foreground">
                  {getPetIcon(
                    userPets.find((p) => p.id === selectedPet)?.type || "",
                  )}
                  <span>
                    {userPets.find((p) => p.id === selectedPet)?.type}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium">{selectedServiceData?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Professionnel</span>
                <div className="flex items-center gap-2">
                  {selectedProData?.user.image ? (
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={selectedProData.user.image} />
                      <AvatarFallback>
                        {selectedProData.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-6 w-6 rounded-full overflow-hidden">
                      <Avvvatars
                        value={selectedProData?.user.name || ""}
                        style="shape"
                        size={24}
                      />
                    </div>
                  )}
                  <span className="font-medium">
                    {selectedProData?.user.name}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Date et heure</span>
                <span className="font-medium">
                  {selectedDate && selectedTime
                    ? `${format(selectedDate, "d MMMM yyyy", { locale: fr })} à ${selectedTime}`
                    : "Non spécifié"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">
                  Type de consultation
                </span>
                <div className="flex items-center gap-2">
                  {isHomeVisit ? (
                    <>
                      <Home className="h-4 w-4" />
                      <span className="font-medium">À domicile</span>
                    </>
                  ) : (
                    <>
                      <Star className="h-4 w-4" />
                      <span className="font-medium">Au cabinet</span>
                    </>
                  )}
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Prix total</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-semibold">
                    {isHomeVisit
                      ? `${parseInt(selectedServiceData?.price?.toString() || "0") + 10}€`
                      : selectedServiceData?.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Informations complémentaires</Label>
            <Textarea
              placeholder="Ajoutez des informations utiles pour le professionnel..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
        </motion.div>
      ),
    },
  ];

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return format(date, "d MMMM", { locale: fr });
  };

  const formatFullDate = (date: Date | undefined) => {
    if (!date) return "";
    return format(date, "d MMMM yyyy", { locale: fr });
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
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedService === service.id
                      ? "border-2 border-primary"
                      : "hover:border-primary/50"
                  }`}
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
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedPro === pro.id
                        ? "border-2 border-primary"
                        : "hover:border-primary/50"
                    }`}
                  >
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={pro.user.image || ""}
                          alt={pro.user.name || ""}
                        />
                        <AvatarFallback>
                          {pro.user.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || ""}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{pro.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {pro.role}
                        </p>
                        {/* <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{pro.user.ratings.length}</span>
                          <span className="text-xs text-muted-foreground">
                            ({pro.user.ratings.length} avis)
                          </span>
                        </div> */}
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
            ? `Réserver pour ${formatDate(selectedDate)} à ${selectedTime}`
            : "Sélectionnez un créneau"}
        </Button>
      </CardFooter>

      <Credenza open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <CredenzaContent className="sm:max-w-[600px]">
          <CredenzaHeader>
            <div className="flex items-center gap-4 mb-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                      currentStep > index + 1
                        ? "border-primary bg-primary text-white"
                        : currentStep === index + 1
                          ? "border-primary text-primary"
                          : "border-muted-foreground text-muted-foreground",
                    )}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
                  )}
                </div>
              ))}
            </div>
            <CredenzaTitle>{steps[currentStep - 1].title}</CredenzaTitle>
            <CredenzaDescription>
              {steps[currentStep - 1].description}
            </CredenzaDescription>
          </CredenzaHeader>

          <div className="py-4">{steps[currentStep - 1].content}</div>

          <CredenzaFooter>
            <div className="flex w-full justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  if (currentStep === 1) {
                    setIsConfirmModalOpen(false);
                  } else {
                    setCurrentStep(currentStep - 1);
                  }
                }}
              >
                {currentStep === 1 ? "Annuler" : "Retour"}
              </Button>
              <Button
                onClick={() => {
                  if (currentStep === steps.length) {
                    handleBooking();
                  } else {
                    setCurrentStep(currentStep + 1);
                  }
                }}
                disabled={
                  (currentStep === 1 && !selectedPet) ||
                  (currentStep === steps.length && !selectedPet)
                }
              >
                {currentStep === steps.length ? "Confirmer" : "Suivant"}
              </Button>
            </div>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </Card>
  );
}
