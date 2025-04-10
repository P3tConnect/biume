"use client";

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  Input,
} from "@/components/ui";
import { useState, useEffect } from "react";
import {
  Member,
  OrganizationSlots,
  Service,
  Option,
  Organization,
  Pet,
} from "@/src/db";
import { signIn, useSession } from "@/src/lib/auth-client";
import { steps, useStepper } from "./hooks/useBookingStepper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Calendar, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { PetStep } from "./steps/PetStep";
import { cn } from "@/src/lib/utils";
// import { createBookingCheckoutSession } from "@/src/actions/booking-payment.action";
import { format, addDays, isAfter, isFuture } from "date-fns";
import { fr } from "date-fns/locale";
// import { getOrganizationSlotsByCompanyId } from "@/src/actions";
// import { createBooking as createBookingAction } from "@/src/actions";
import { loginSchema } from "@/src/lib";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { ServiceAndOptionsStep } from "./steps/ServiceAndOptionsStep";
// import { ProfessionalStep } from "./steps/ProfessionalStep";
// import { SummaryStep } from "./steps/SummaryStep";
// import { PaymentStep } from "./steps/PaymentStep";
// import { DateStep } from "./steps/DateStep";
import { getOptionsFromOrganization } from "@/src/actions/options.action";
// import { SuccessStep } from "./steps/SuccessStep";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Création d'un type pour les slots d'affichage
interface DisplaySlot {
  date: Date;
  slot: OrganizationSlots;
}

export function BookingCard({ organization }: { organization: Organization }) {
  const { data: session } = useSession();
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [upcomingSlots, setUpcomingSlots] = useState<DisplaySlot[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPro, setSelectedPro] = useState<Member | null>(null);
  const [selectedPets, setSelectedPets] = useState<Pet[] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<OrganizationSlots | null>(
    null,
  );
  const [consultationType, setConsultationType] = useState<boolean | null>(
    null,
  );
  const [selectedOptions, setSelectedOptions] = useState<Option[] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<
    "online" | "inPerson" | null
  >(null);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const { handleSubmit, register } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const params = useParams();
  const companyId = params.companyId as string;

  // Récupération des slots d'organisation
  // const { data: organizationSlots, isLoading: isLoadingSlots } = useQuery({
  //   queryKey: ["organization-slots", companyId],
  //   queryFn: () => getOrganizationSlotsByCompanyId({ companyId }),
  // });

  const { data: organizationOptions } = useQuery({
    queryKey: ["organization-options", organization.id],
    queryFn: () =>
      getOptionsFromOrganization({ organizationId: organization.id }),
    enabled: !!organization.id,
  });

  // Filtrage des créneaux pour affichage
  // useEffect(() => {
  //   if (
  //     organizationSlots &&
  //     "data" in organizationSlots &&
  //     organizationSlots.data &&
  //     organizationSlots.data.length > 0
  //   ) {
  //     const now = new Date();
  //     const nextSevenDays = addDays(now, 7);

  //     // Filtrer les créneaux disponibles pour les 7 prochains jours
  //     const availableSlots = organizationSlots.data
  //       .filter((slot: OrganizationSlots) => {
  //         const slotDate = new Date(slot.start || "");
  //         return (
  //           isFuture(slotDate) &&
  //           !isAfter(slotDate, nextSevenDays) &&
  //           slot.isAvailable
  //         );
  //       })
  //       .map((slot: OrganizationSlots) => ({
  //         date: new Date(slot.start || ""),
  //         slot,
  //       }))
  //       .sort(
  //         (
  //           a: { date: Date; slot: OrganizationSlots },
  //           b: { date: Date; slot: OrganizationSlots },
  //         ) => a.date.getTime() - b.date.getTime(),
  //       )
  //       .slice(0, 8); // Afficher jusqu'à 8 créneaux pour montrer plus d'options

  //     setUpcomingSlots(availableSlots);
  //   }
  // }, [organizationSlots]);

  // const {
  //   switch: switchStep,
  //   current,
  //   isFirst,
  //   isLast,
  //   next,
  //   prev,
  //   goTo,
  // } = useStepper({
  //   initialStep: "serviceAndOptions",
  // });

  // const { mutateAsync: bookPayment, isPending: isPaymentLoading } = useMutation(
  //   {
  //     mutationFn: createBookingCheckoutSession,
  //     onSuccess: async (response) => {
  //       // Vérifier si la réponse contient une erreur
  //       if ("error" in response) {
  //         toast.error(`Erreur: ${response.error}`);
  //         return;
  //       }

  //       // À ce stade, nous savons que response.data existe
  //       const data = response.data;

  //       if (!data || !data.sessionUrl) {
  //         toast.error("Erreur lors du paiement, veuillez réessayer");
  //         return;
  //       }

  //       // Rediriger vers la page de paiement Stripe
  //       window.location.href = data.sessionUrl;
  //     },
  //     onError: (error: Error) => {
  //       console.error("Erreur de paiement:", error);
  //       toast.error(`Erreur: ${error.message || "Une erreur s'est produite"}`);
  //     },
  //   },
  // );

  // const { mutateAsync: createBooking, isPending: isBookingLoading } =
  //   useMutation({
  //     mutationFn: createBookingAction,
  //     onSuccess: () => {
  //       toast.success(
  //         "Votre rendez-vous a été confirmé. Vous paierez sur place.",
  //       );
  //       goTo("success");
  //     },
  //     onError: (error: Error) => {
  //       console.error("Erreur de création de rendez-vous:", error);
  //       toast.error(`Erreur: ${error.message || "Une erreur s'est produite"}`);
  //     },
  //   });

  // const handleOpenReservationModal = (selectedDisplaySlot?: DisplaySlot) => {
  //   if (!session) {
  //     setIsLoginModalOpen(true);
  //   } else {
  //     const service = selectedDisplaySlot?.slot.service || null;
  //     setSelectedService(service);
  //     setSelectedPro(null);
  //     setSelectedDate(
  //       selectedDisplaySlot ? selectedDisplaySlot.date : undefined,
  //     );
  //     setSelectedTime(
  //       selectedDisplaySlot ? format(selectedDisplaySlot.date, "HH:mm") : null,
  //     );
  //     setSelectedSlot(selectedDisplaySlot?.slot || null);
  //     setSelectedPets(null);
  //     setConsultationType(null);
  //     setSelectedOptions(null);
  //     setPaymentMethod(null);
  //     setAdditionalNotes("");
  //     goTo("serviceAndOptions");
  //     setIsReservationModalOpen(true);
  //   }
  // };

  const onLoginSubmit = handleSubmit(async (data) => {
    await signIn.email(
      {
        email: data.email,
        password: data.password,
        rememberMe: false,
      },
      {
        onRequest: () => {
          setLoginLoading(true);
        },
        onSuccess: () => {
          setLoginLoading(false);
          toast.success("Connexion réussie !");
          setIsLoginModalOpen(false);
          setIsReservationModalOpen(true);
        },
        onError: (error) => {
          setLoginLoading(false);
          toast.error(`Erreur : ${error.error.message}`);
        },
      },
    );
  });

  const handleBooking = async () => {
    if (!selectedService || !selectedPro || !selectedDate || !selectedTime) {
      toast.error("Veuillez sélectionner tous les éléments nécessaires");
      return;
    }

    if (!selectedPets) {
      toast.error("Veuillez sélectionner un animal");
      return;
    }

    if (!session?.user) {
      setIsLoginModalOpen(true);
      return;
    }

    const servicePrice = selectedService.price || 0;
    const optionsPrice = selectedOptions?.reduce(
      (acc: number, option: Option) => {
        return acc + (option.price ?? 0);
      },
      0,
    );
    const homeVisitPrice = consultationType ? 10 : 0;
    const amount = servicePrice + (optionsPrice ?? 0) + homeVisitPrice;

    if (!amount || amount <= 0) {
      toast.error("Le montant du paiement est invalide");
      return;
    }

    try {
      const petIds = selectedPets?.map((pet) => pet.id);
      if (!petIds) {
        toast.error("Veuillez sélectionner un animal");
        return;
      }
      if (!selectedSlot) {
        toast.error("Veuillez sélectionner un créneau");
        return;
      }

      console.log(petIds, "petIds");

      // await createBooking({
      //   service: {
      //     id: selectedService.id,
      //     places: selectedService.places ?? 0,
      //   },
      //   professionalId: selectedPro.id,
      //   selectedPets: petIds,
      //   isHomeVisit: !!consultationType,
      //   additionalInfo: additionalNotes,
      //   selectedOptions: selectedOptions?.map((option) => option.id) || [],
      //   amount,
      //   companyId: companyId,
      //   status: "SCHEDULED",
      //   isPaid: false,
      //   slot: {
      //     id: selectedSlot.id,
      //     start: selectedSlot.start,
      //     remainingPlaces: selectedSlot.remainingPlaces,
      //   },
      // });
    } catch (err) {
      console.error("Erreur de création de rendez-vous:", err);
      toast.error(
        `Erreur: ${err instanceof Error ? err.message : "Une erreur s'est produite"}`,
      );
    }
  };

  const handleBookingPayment = async () => {
    if (!selectedService || !selectedPro || !selectedDate || !selectedTime) {
      toast.error("Veuillez sélectionner tous les éléments nécessaires");
      return;
    }

    if (!selectedPets) {
      toast.error("Veuillez sélectionner un animal");
      return;
    }

    if (!session?.user) {
      setIsLoginModalOpen(true);
      return;
    }

    const servicePrice = selectedService.price || 0;
    const optionsPrice = selectedOptions?.reduce(
      (acc: number, option: Option) => {
        return acc + (option.price ?? 0);
      },
      0,
    );
    const homeVisitPrice = consultationType ? 10 : 0;
    const amount = servicePrice + (optionsPrice ?? 0) + homeVisitPrice;

    if (!amount || amount <= 0) {
      toast.error("Le montant du paiement est invalide");
      return;
    }

    try {
      const petIds = selectedPets?.map((pet) => pet.id);
      if (!petIds) {
        toast.error("Veuillez sélectionner un animal");
        return;
      }

      if (!selectedSlot) {
        toast.error("Veuillez sélectionner un créneau");
        return;
      }

      console.log(petIds, "petIds");

      // await bookPayment({
      //   service: {
      //     id: selectedService.id,
      //     places: selectedService.places ?? 0,
      //   },
      //   professionalId: organization.id,
      //   selectedPets: petIds,
      //   isHomeVisit: !!consultationType,
      //   additionalInfo: additionalNotes,
      //   selectedOptions: selectedOptions?.map((option) => option.id) || [],
      //   amount,
      //   companyId: companyId,
      //   slot: {
      //     id: selectedSlot.id,
      //     start: selectedSlot.start,
      //     remainingPlaces: selectedSlot.remainingPlaces,
      //   },
      // });
    } catch (error) {
      console.error("Erreur de paiement:", error);
      toast.error("Erreur lors du paiement, veuillez réessayer");
    }
  };

  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Titre */}
          <div className="flex items-baseline gap-1">
            <h3 className="text-xl font-semibold">
              Prochains créneaux disponibles
            </h3>
          </div>

          {/* Affichage des prochains créneaux */}
          <div className="space-y-3">
            {/* {isLoadingSlots ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Chargement des disponibilités...
                </span>
              </div>
            ) : upcomingSlots.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {upcomingSlots.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-md border border-muted-foreground/20 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
                    onClick={() => handleOpenReservationModal(item)}
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-medium">
                        {format(item.date, "EEE d MMM", { locale: fr })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs">
                          {format(item.date, "HH'h'mm")}
                        </span>
                      </div>
                      {item.slot.service && (
                        <span className="text-xs text-primary font-medium truncate max-w-[100px]">
                          {item.slot.service.name}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 text-sm text-muted-foreground">
                Aucun créneau disponible pour les prochains jours
              </div>
            )} */}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full"
          size="lg"
          // onClick={() => handleOpenReservationModal()}
        >
          Prendre rendez-vous
        </Button>
      </CardFooter>

      {/* Modale de connexion */}
      <Credenza open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <CredenzaContent className="sm:max-w-[500px]">
          <CredenzaHeader className="space-y-3 pb-4">
            <CredenzaTitle className="text-2xl font-semibold tracking-tight">
              Connexion requise
            </CredenzaTitle>
            <CredenzaDescription className="text-base text-muted-foreground">
              Veuillez vous connecter pour continuer votre réservation
            </CredenzaDescription>
          </CredenzaHeader>

          <form onSubmit={onLoginSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Adresse email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nom@exemple.fr"
                  className="w-full text-base"
                  {...register("email")}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mot de passe
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:text-primary/80 hover:underline transition-colors"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full"
                  {...register("password")}
                />
              </div>
            </div>

            <div className="flex flex-col px-0 pt-4">
              <Button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] mb-6"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>

              <div className="space-y-4">
                <p className="text-center text-muted-foreground">
                  Pas encore de compte ?
                </p>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsLoginModalOpen(false)}
                    className="w-full"
                  >
                    Annuler
                  </Button>
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                  >
                    Créer un compte
                  </Link>
                </div>

                <div className="text-center">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </CredenzaContent>
      </Credenza>

      {/* Modale de réservation */}
      <Credenza
        open={isReservationModalOpen}
        onOpenChange={setIsReservationModalOpen}
      >
        <CredenzaContent className="sm:max-w-[800px] sm:max-h-[90vh]">
          {/* {isLast ? (
            <VisuallyHidden>
              <CredenzaTitle>Rendez-vous confirmé</CredenzaTitle>
            </VisuallyHidden>
          ) : (
            <CredenzaHeader>
              <div className="flex items-center justify-center gap-2 mb-4 overflow-x-auto py-1 px-1 w-full">
                {Object.values(steps)
                  .filter((step) => step.id !== "success")
                  .map((stepItem, index) => (
                    <div
                      key={stepItem.id}
                      className="flex items-center shrink-0"
                    >
                      <div
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors text-xs",
                          current.id === stepItem.id
                            ? "border-primary text-primary"
                            : index <
                                Object.values(steps)
                                  .filter((s) => s.id !== "success")
                                  .findIndex((s) => s.id === current.id)
                              ? "border-primary bg-primary text-white"
                              : "border-muted-foreground/30 text-muted-foreground/50",
                        )}
                        role="button"
                        tabIndex={0}
                      >
                        {index + 1}
                      </div>
                      {index <
                        Object.values(steps).filter((s) => s.id !== "success")
                          .length -
                          1 && (
                        <ChevronRight className="h-3 w-3 text-muted-foreground/30 mx-1" />
                      )}
                    </div>
                  ))}
              </div>
              <CredenzaTitle className="text-lg">{current.title}</CredenzaTitle>
              <CredenzaDescription className="text-sm line-clamp-2">
                {current.description}
              </CredenzaDescription>
            </CredenzaHeader>
          )} */}

          <div className="py-4">
            {/* {switchStep({
              serviceAndOptions: () => (
                <ServiceAndOptionsStep
                  services={organization.services}
                  selectedService={selectedService}
                  selectedOptions={selectedOptions || []}
                  onSelectService={(service: Service) =>
                    setSelectedService(service)
                  }
                  onToggleOption={(option: Option) => {
                    const currentOptions = selectedOptions || [];
                    if (currentOptions.some((o) => o.id === option.id)) {
                      setSelectedOptions(
                        currentOptions.filter((o) => o.id !== option.id),
                      );
                    } else {
                      setSelectedOptions([...currentOptions, option]);
                    }
                  }}
                  organizationOptions={organizationOptions?.data || []}
                />
              ),
              professional: () => (
                <ProfessionalStep
                  professionals={organization.members}
                  selectedService={selectedService}
                  selectedPro={selectedPro}
                  onSelectPro={(pro: Member) => setSelectedPro(pro)}
                />
              ),
              date: () => (
                <DateStep
                  selectedService={selectedService}
                  selectedPro={selectedPro}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  selectedSlot={selectedSlot}
                  isHomeVisit={!!consultationType}
                  onSelectDateTime={(date, time, slot) => {
                    setSelectedDate(date);
                    setSelectedTime(time);
                    setSelectedSlot(slot);
                  }}
                  onToggleHomeVisit={(value) => setConsultationType(value)}
                />
              ),
              pet: () => (
                <PetStep
                  selectedPets={selectedPets}
                  onSelectPets={(pets) => setSelectedPets(pets)}
                  selectedService={selectedService}
                  selectedSlot={selectedSlot}
                />
              ),
              summary: () => (
                <SummaryStep
                  selectedService={selectedService}
                  selectedPro={selectedPro}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  selectedPets={selectedPets}
                  isHomeVisit={!!consultationType}
                  selectedOptions={selectedOptions || []}
                  additionalInfo={additionalNotes}
                  onAdditionalInfoChange={(info: string) =>
                    setAdditionalNotes(info)
                  }
                />
              ),
              payment: () => (
                <PaymentStep
                  selectedService={selectedService}
                  isHomeVisit={!!consultationType}
                  selectedOptions={selectedOptions || []}
                  paymentMethod={paymentMethod}
                  onSelectPaymentMethod={(method: string) =>
                    setPaymentMethod(method as "online" | "inPerson" | null)
                  }
                />
              ),
              success: () => (
                <SuccessStep onClose={() => setIsReservationModalOpen(false)} />
              ),
            })} */}
          </div>

          <CredenzaFooter>
            <div className="flex w-full justify-between">
              {/* {isLast ? null : (
                <Button
                  variant="outline"
                  onClick={() => {
                    if (isFirst) {
                      setIsReservationModalOpen(false);
                    } else {
                      prev();
                    }
                  }}
                >
                  {isFirst ? "Annuler" : "Retour"}
                </Button>
              )}
              {current.id !== "success" && (
                <Button
                  onClick={() => {
                    if (current.id === "payment") {
                      if (paymentMethod === "inPerson") {
                        handleBooking();
                      } else {
                        handleBookingPayment();
                      }
                    } else {
                      next();
                    }
                  }}
                  disabled={
                    (current.id === "serviceAndOptions" && !selectedService) ||
                    (current.id === "professional" && !selectedPro) ||
                    (current.id === "date" &&
                      (!selectedDate || !selectedTime)) ||
                    (current.id === "pet" && !selectedPets) ||
                    (current.id === "payment" && !paymentMethod) ||
                    (current.id === "payment" &&
                      (isPaymentLoading || isBookingLoading))
                  }
                >
                  {current.id === "payment" ? (
                    isPaymentLoading || isBookingLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                        Traitement en cours...
                      </>
                    ) : paymentMethod === "inPerson" ? (
                      "Confirmer le rendez-vous"
                    ) : (
                      "Confirmer et payer"
                    )
                  ) : (
                    "Suivant"
                  )}
                </Button>
              )} */}
            </div>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </Card>
  );
}
