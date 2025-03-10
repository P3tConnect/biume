"use client"

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
  Separator,
} from "@/components/ui"
import { Dispatch, SetStateAction, useState, useEffect } from "react"
import { Member, OrganizationSlots, Service } from "@/src/db"
import { Option, OptionsStep } from "./steps/OptionsStep"
import { PaymentMethodStep } from "./steps/PaymentMethodStep"
import { signIn, useSession } from "@/src/lib/auth-client"
import { steps, useStepper } from "./hooks/useBookingStepper"
import { useMutation, useQuery } from "@tanstack/react-query"

import AppointmentPicker from "@/components/ui/appointment-picker"
import Avvvatars from "avvvatars-react"
import { ChevronRight } from "lucide-react"
import { ConsultationTypeStep } from "./steps/ConsultationTypeStep"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { PetStep } from "./steps/PetStep"
import { SummaryStep } from "./steps/SummaryStep"
import { cn } from "@/src/lib/utils"
import { createBookingCheckoutSession } from "@/src/actions/booking-payment.action"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { getOptionsFromOrganization } from "@/src/actions/options.action"
import { getOrganizationSlotsByService } from "@/src/actions/organizationSlots.action"
import { getPets, createBooking } from "@/src/actions"
import { loginSchema } from "@/src/lib"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useParams } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

interface BookingCardProps {
  services: Service[]
  professionals: Member[]
  selectedService: string | null
  selectedPro: string | null
  selectedDate: Date | undefined
  selectedTime: string | null
  selectedSlot: OrganizationSlots | null
  setSelectedService: Dispatch<SetStateAction<string | null>>
  setSelectedPro: Dispatch<SetStateAction<string | null>>
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>
  setSelectedTime: Dispatch<SetStateAction<string | null>>
  setSelectedSlot: Dispatch<SetStateAction<OrganizationSlots | null>>
}

export function BookingCard({
  services,
  professionals,
  selectedService,
  selectedPro,
  selectedDate,
  selectedTime,
  selectedSlot,
  setSelectedService,
  setSelectedPro,
  setSelectedDate,
  setSelectedTime,
  setSelectedSlot,
}: BookingCardProps) {
  const { data: session } = useSession()
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const { handleSubmit, register } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  const { data: userPets } = useQuery({
    queryKey: ["user-pets"],
    queryFn: () => getPets({}),
  })

  // Récupération des slots d'organisation basés sur le service sélectionné
  const { data: organizationSlots, isLoading: isLoadingSlots } = useQuery({
    queryKey: ["organization-slots", selectedService],
    queryFn: async () => {
      if (!selectedService) return { data: [] }
      return getOrganizationSlotsByService({ serviceId: selectedService })
    },
    enabled: !!selectedService,
  })

  // Récupération des options de l'organisation
  const { data: organizationOptions, isLoading: isLoadingOptions } = useQuery({
    queryKey: ["organization-options"],
    queryFn: async () => {
      const options = await getOptionsFromOrganization({})
      return options
    },
  })

  const {
    switch: switchStep,
    current,
    metadata,
    setMetadata,
    isFirst,
    isLast,
    next,
    prev,
  } = useStepper({
    initialStep: "pet",
  })

  const selectedServiceData = selectedService ? (services.find(s => s.id === selectedService) ?? null) : null
  const selectedProData = selectedPro ? (professionals.find(p => p.id === selectedPro) ?? null) : null
  const selectedPet = userPets?.data?.find(p => p.id === metadata?.pet?.petId)

  const params = useParams()
  const companyId = params.companyId as string

  const { mutateAsync: bookPayment, isPending: isPaymentLoading } = useMutation({
    mutationFn: createBookingCheckoutSession,
    onSuccess: async response => {
      // Vérifier si la réponse contient une erreur
      if ("error" in response) {
        toast.error(`Erreur: ${response.error}`)
        return
      }

      // À ce stade, nous savons que response.data existe
      const data = response.data

      if (!data || !data.sessionUrl) {
        toast.error("Erreur lors du paiement, veuillez réessayer")
        return
      }

      // Rediriger vers la page de paiement Stripe
      window.location.href = data.sessionUrl
    },
    onError: (error: Error) => {
      console.error("Erreur de paiement:", error)
      toast.error(`Erreur: ${error.message || "Une erreur s'est produite"}`)
    },
  })

  // Fonction de callback pour AppointmentPicker
  const handleDateTimeSelect = (date: Date, time: string | null, slotId: OrganizationSlots | null) => {
    setSelectedDate(date)
    setSelectedTime(time)
    setSelectedSlot(slotId)
  }

  const handleOpenBookingModal = () => {
    if (!session) {
      // Si l'utilisateur n'est pas connecté, ouvrir la modale de connexion
      setIsLoginModalOpen(true)
    } else {
      // Si l'utilisateur est connecté, ouvrir la modale de réservation
      setIsConfirmModalOpen(true)
    }
  }

  const onLoginSubmit = handleSubmit(async data => {
    await signIn.email(
      {
        email: data.email,
        password: data.password,
        rememberMe: false,
      },
      {
        onRequest: () => {
          setLoginLoading(true)
        },
        onSuccess: () => {
          setLoginLoading(false)
          toast.success("Connexion réussie !")
          setIsLoginModalOpen(false)
          setIsConfirmModalOpen(true) // Ouvrir la modale de réservation après connexion
        },
        onError: error => {
          setLoginLoading(false)
          toast.error(`Erreur : ${error.error.message}`)
        },
      }
    )
  })

  const handleBooking = async () => {
    if (!selectedService || !selectedPro || !selectedDate || !selectedTime) {
      toast.error("Veuillez sélectionner tous les éléments nécessaires")
      return
    }

    // Récupérer le service sélectionné
    const servicePrice = selectedServiceData?.price ?? 0
    const optionsPrice = metadata?.options?.selectedOptions.reduce((acc: number, optionId: string) => {
      const option = organizationOptions?.data?.find(o => o.id === optionId)
      return acc + (option?.price ?? 0)
    }, 0)

    const homeVisitPrice = metadata?.consultationType?.isHomeVisit ? 10 : 0
    const amount = servicePrice + optionsPrice + homeVisitPrice

    if (!amount || amount <= 0) {
      toast.error("Le montant du paiement est invalide")
      return
    }

    try {
      const petId = selectedPet?.id
      if (!petId) {
        toast.error("Veuillez sélectionner un animal")
        return
      }

      // Si l'utilisateur n'est pas connecté, demander l'email
      if (!session?.user) {
        setIsLoginModalOpen(true)
        return
      }

      // Notes additionnelles si présentes dans les métadonnées
      const additionalNotes = metadata?.summary?.additionalInfo ?? ""

      // Si le mode de paiement est en personne, créer directement le rendez-vous sans passer par Stripe
      if (metadata?.paymentMethod?.method === "inPerson") {
        const result = await createBooking({
          serviceId: selectedService,
          professionalId: selectedPro,
          petId,
          isHomeVisit: !!metadata?.consultationType?.isHomeVisit,
          additionalInfo: additionalNotes,
          selectedOptions: metadata?.options?.selectedOptions || [],
          amount,
          companyId: companyId,
          status: "SCHEDULED",
          isPaid: false,
          slotId: selectedSlot?.id ?? undefined,
        })

        if (result.error) {
          toast.error(`Erreur: ${result.error}`)
          return
        }

        toast.success("Votre rendez-vous a été confirmé. Vous paierez sur place.")
        setIsConfirmModalOpen(false)
        return
      }

      // Pour le paiement en ligne, utiliser Stripe Checkout
      await bookPayment({
        serviceId: selectedService,
        professionalId: selectedPro,
        petId,
        isHomeVisit: !!metadata?.consultationType?.isHomeVisit,
        additionalInfo: additionalNotes,
        selectedOptions: metadata?.options?.selectedOptions || [],
        amount,
        companyId: companyId,
        slot: selectedSlot!,
      })
    } catch (error) {
      console.error("Erreur de paiement:", error)
      toast.error("Erreur lors du paiement, veuillez réessayer")
    }
  }

  // Transformer les options de l'organisation au format attendu par le composant OptionsStep
  const adaptedOptions: Option[] = (organizationOptions?.data || []).map(option => ({
    id: option.id,
    name: option.title,
    description: option.description || "",
    price: option.price || 0,
  }))

  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Prix */}
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold">À partir de 40€</span>
          </div>

          {/* Service Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Sélectionnez un service</label>
            <div className="space-y-2">
              {services.map(service => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border transition-all",
                    selectedService === service.id ? "border-2 border-primary" : "hover:border-primary/50"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-muted-foreground">{service.price} €</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{service.duration} min</p>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Professional Selection */}
          {selectedService && (
            <div>
              <label className="text-sm font-medium mb-2 block">Choisissez un professionnel</label>
              <div className="space-y-2">
                {professionals.map(pro => (
                  <button
                    key={pro.id}
                    onClick={() => setSelectedPro(pro.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border transition-all",
                      selectedPro === pro.id ? "border-2 border-primary" : "hover:border-primary/50"
                    )}
                  >
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <Avvvatars value={pro.user.name || ""} style="shape" size={48} />
                      </div>
                      <div>
                        <p className="font-medium">{pro.user.name}</p>
                        <p className="text-sm text-muted-foreground">{pro.role}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Date et Time Selection avec AppointmentPicker */}
          {selectedPro && (
            <div>
              <label className="text-sm font-medium mb-2 block">Sélectionnez date et heure</label>
              {isLoadingSlots ? (
                <div className="p-4 text-center text-muted-foreground">Chargement des disponibilités...</div>
              ) : (
                <div className="w-full">
                  <AppointmentPicker
                    timeSlots={organizationSlots?.data ?? []}
                    onSelectDateTime={handleDateTimeSelect}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button disabled={!selectedTime} className="w-full" size="lg" onClick={handleOpenBookingModal}>
          {selectedTime && selectedDate
            ? `Réserver pour ${format(selectedDate, "d MMMM", {
              locale: fr,
            })} à ${selectedTime}`
            : "Sélectionnez un créneau"}
        </Button>
      </CardFooter>

      {/* Modale de connexion */}
      <Credenza open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <CredenzaContent className="sm:max-w-[450px]">
          <CredenzaHeader>
            <CredenzaTitle>Connexion requise</CredenzaTitle>
            <CredenzaDescription>Veuillez vous connecter pour continuer votre réservation</CredenzaDescription>
          </CredenzaHeader>

          <form onSubmit={onLoginSubmit} className="py-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="votre@email.com" {...register("email")} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="********" {...register("password")} />
            </div>

            <CredenzaFooter className="px-0 pt-2">
              <div className="flex w-full justify-between">
                <Button variant="outline" onClick={() => setIsLoginModalOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" disabled={loginLoading}>
                  {loginLoading ? "Connexion..." : "Se connecter"}
                </Button>
              </div>
              <div className="w-full text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Vous n&apos;avez pas de compte ?{" "}
                  <Link href="/sign-up" className="text-primary hover:underline">
                    Inscrivez-vous
                  </Link>
                </p>
              </div>
            </CredenzaFooter>
          </form>
        </CredenzaContent>
      </Credenza>

      {/* Modale de réservation */}
      <Credenza open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <CredenzaContent className="sm:max-w-[600px]">
          <CredenzaHeader>
            <div className="flex items-center justify-center gap-2 mb-4 overflow-x-auto py-1 px-1 w-full">
              {Object.values(steps).map((stepItem, index) => (
                <div key={stepItem.id} className="flex items-center shrink-0">
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors text-xs",
                      current.id === stepItem.id
                        ? "border-primary text-primary"
                        : index < Object.values(steps).findIndex(s => s.id === current.id)
                          ? "border-primary bg-primary text-white"
                          : "border-muted-foreground/30 text-muted-foreground/50"
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
                    <ChevronRight className="h-3 w-3 text-muted-foreground/30 mx-1" />
                  )}
                </div>
              ))}
            </div>
            <CredenzaTitle className="text-lg">{current.title}</CredenzaTitle>
            <CredenzaDescription className="text-sm line-clamp-2">{current.description}</CredenzaDescription>
          </CredenzaHeader>

          <div className="py-4">
            {switchStep({
              pet: () => (
                <PetStep
                  userPets={userPets?.data ?? []}
                  selectedPetId={metadata?.pet?.petId ?? ""}
                  onSelectPet={petId => setMetadata("pet", { petId })}
                />
              ),
              consultationType: () => (
                <ConsultationTypeStep
                  isHomeVisit={metadata?.consultationType?.isHomeVisit ?? false}
                  onSelectType={isHomeVisit => setMetadata("consultationType", { isHomeVisit })}
                />
              ),
              options: () =>
                isLoadingOptions ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <p className="text-muted-foreground">Chargement des options...</p>
                  </div>
                ) : (
                  <OptionsStep
                    availableOptions={adaptedOptions}
                    selectedOptions={metadata?.options?.selectedOptions ?? []}
                    onToggleOption={(optionId: string) => {
                      const currentOptions = metadata?.options?.selectedOptions ?? []
                      const newOptions = currentOptions.includes(optionId)
                        ? currentOptions.filter((id: string) => id !== optionId)
                        : [...currentOptions, optionId]
                      setMetadata("options", { selectedOptions: newOptions })
                    }}
                  />
                ),
              paymentMethod: () => (
                <PaymentMethodStep
                  paymentMethod={metadata?.paymentMethod?.method ?? null}
                  onSelectPaymentMethod={method => setMetadata("paymentMethod", { method })}
                />
              ),
              summary: () => (
                <SummaryStep
                  selectedPet={selectedPet}
                  selectedService={selectedServiceData}
                  selectedPro={selectedProData}
                  selectedSlot={selectedSlot}
                  isHomeVisit={metadata?.consultationType?.isHomeVisit ?? false}
                  additionalInfo={metadata?.summary?.additionalInfo ?? ""}
                  onAdditionalInfoChange={value => setMetadata("summary", { additionalInfo: value })}
                  selectedOptions={
                    metadata?.options?.selectedOptions
                      ? metadata.options.selectedOptions.map((id: string) => adaptedOptions.find(o => o.id === id)!)
                      : []
                  }
                  paymentMethod={metadata?.paymentMethod?.method ?? null}
                />
              ),
            })}
          </div>

          <CredenzaFooter>
            <div className="flex w-full justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  if (isFirst) {
                    setIsConfirmModalOpen(false)
                  } else {
                    prev()
                  }
                }}
              >
                {isFirst ? "Annuler" : "Retour"}
              </Button>
              <Button
                onClick={() => {
                  if (isLast) {
                    handleBooking()
                  } else {
                    next()
                  }
                }}
                disabled={(current.id === "pet" && !metadata?.pet?.petId) || (isLast && !metadata?.pet?.petId) || (isLast && isPaymentLoading)}
              >
                {isLast
                  ? isPaymentLoading
                    ? "Redirection..."
                    : metadata?.paymentMethod?.method === "inPerson"
                      ? "Confirmer le rendez-vous"
                      : "Confirmer et payer"
                  : "Suivant"}
              </Button>
            </div>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </Card>
  )
}
