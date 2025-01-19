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
} from "@/components/ui";
import { Star } from "lucide-react";
import { fr } from "date-fns/locale";
import { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { cn } from "@/src/lib/utils";

interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
}

interface Professional {
  id: string;
  name: string;
  speciality: string;
  rating: number;
  reviews: number;
  image: string;
}

interface BookingCardProps {
  services: Service[];
  professionals: Professional[];
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
  const selectedServiceData = selectedService
    ? services.find((s) => s.id === selectedService)
    : null;

  const selectedProData = selectedPro
    ? professionals.find((p) => p.id === selectedPro)
    : null;

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
                  className={`w-full text-left p-4 rounded-xl border transition-all ${selectedService === service.id
                    ? "border-2 border-primary"
                    : "hover:border-primary/50"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-muted-foreground">{service.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {service.duration}
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
                    className={`w-full text-left p-4 rounded-xl border transition-all ${selectedPro === pro.id
                      ? "border-2 border-primary"
                      : "hover:border-primary/50"
                      }`}
                  >
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={pro.image} alt={pro.name} />
                        <AvatarFallback>
                          {pro.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{pro.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {pro.speciality}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{pro.rating}</span>
                          <span className="text-xs text-muted-foreground">
                            ({pro.reviews} avis)
                          </span>
                        </div>
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
                    "[&_table]:border-separate [&_table]:border-spacing-1"
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
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button disabled={!selectedTime} className="w-full" size="lg">
          {selectedTime
            ? `Réserver pour ${format(selectedDate!, "d MMMM", {
              locale: fr,
            })} à ${selectedTime}`
            : "Sélectionnez un créneau"}
        </Button>
      </CardFooter>
    </Card>
  );
} 