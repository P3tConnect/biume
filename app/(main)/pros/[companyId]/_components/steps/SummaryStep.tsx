import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import { Star, Home, PawPrint, Dog, Cat, Bird } from "lucide-react";
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Separator,
  Textarea,
  Label,
} from "@/components/ui";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Avvvatars from "avvvatars-react";
import { Pet, Service, Member } from "@/src/db";

interface SummaryStepProps {
  selectedPet: Pet | undefined;
  selectedService: Service | null;
  selectedPro: Member | null;
  selectedDate: Date | undefined;
  selectedTime: string | null;
  isHomeVisit: boolean;
  additionalInfo: string;
  onAdditionalInfoChange: (value: string) => void;
}

export function SummaryStep({
  selectedPet,
  selectedService,
  selectedPro,
  selectedDate,
  selectedTime,
  isHomeVisit,
  additionalInfo,
  onAdditionalInfoChange,
}: SummaryStepProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="rounded-xl border bg-muted/50 p-6 space-y-4">
        <div className="flex items-center gap-4">
          {selectedPet?.image ? (
            <div className="relative h-20 w-20 overflow-hidden rounded-lg">
              <Image
                width={80}
                height={80}
                src={selectedPet.image}
                alt="Animal"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-muted">
              <PawPrint className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          <div>
            <h4 className="font-medium">{selectedPet?.name}</h4>
            <div className="flex items-center gap-1 text-muted-foreground">
              {getPetIcon(selectedPet?.type || "")}
              <span>{selectedPet?.type}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Service</span>
            <span className="font-medium">{selectedService?.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Professionnel</span>
            <div className="flex items-center gap-2">
              {selectedPro?.user.image ? (
                <Avatar className="h-6 w-6">
                  <AvatarImage src={selectedPro.user.image} />
                  <AvatarFallback>
                    {selectedPro.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-6 w-6 rounded-full overflow-hidden">
                  <Avvvatars
                    value={selectedPro?.user.name || ""}
                    style="shape"
                    size={24}
                  />
                </div>
              )}
              <span className="font-medium">{selectedPro?.user.name}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Date et heure</span>
            <span className="font-medium">
              {selectedDate && selectedTime
                ? `${format(selectedDate, "d MMMM yyyy", {
                  locale: fr,
                })} à ${selectedTime}`
                : "Non spécifié"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Type de consultation</span>
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
                  ? `${parseInt(selectedService?.price?.toString() || "0") + 10}€`
                  : selectedService?.price}
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
          onChange={(e) => onAdditionalInfoChange(e.target.value)}
          className="min-h-[100px] resize-none"
        />
      </div>
    </motion.div>
  );
}
