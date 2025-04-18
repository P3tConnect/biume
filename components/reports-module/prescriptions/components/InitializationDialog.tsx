"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getClients } from "@/src/actions/client.action"
import { getPetsAction, getPetById } from "@/src/actions/pet.action"
import { User as UserType } from "@/src/db/user"
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaDescription,
  CredenzaFooter,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Label,
  Button,
} from "@/components/ui"
import { ChevronRightIcon, Loader2, PawPrintIcon, CalendarIcon, Search } from "lucide-react"

interface InitializationDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  selectedClientId: string
  setSelectedClientId: (id: string) => void
  selectedPetId: string
  setSelectedPetId: (id: string) => void
  selectedAppointmentId: string
  setSelectedAppointmentId: (id: string) => void
  onComplete: () => void
}

export function InitializationDialog({
  isOpen,
  onOpenChange,
  selectedClientId,
  setSelectedClientId,
  selectedPetId,
  setSelectedPetId,
  selectedAppointmentId,
  setSelectedAppointmentId,
  onComplete,
}: InitializationDialogProps) {
  const [clientSearchTerm, setClientSearchTerm] = useState<string>("")
  const [petSearchTerm, setPetSearchTerm] = useState<string>("")

  // Récupération des clients
  const { data: clientsData, isLoading: isLoadingClients } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients({}),
  })

  // Filtrer les clients selon le terme de recherche
  const filteredClients =
    clientsData?.data?.filter((client: UserType) =>
      client.name?.toLowerCase().includes(clientSearchTerm.toLowerCase())
    ) || []

  // Récupération des animaux du client sélectionné
  const { data: petsData, isLoading: isLoadingClientPets } = useQuery({
    queryKey: ["pets", selectedClientId],
    queryFn: () => getPetsAction({ ownerId: selectedClientId }),
    enabled: !!selectedClientId,
  })

  // Filtrer les animaux selon le terme de recherche
  const filteredPets =
    petsData?.data?.filter(
      pet =>
        pet.name.toLowerCase().includes(petSearchTerm.toLowerCase()) ||
        pet.type.toLowerCase().includes(petSearchTerm.toLowerCase()) ||
        (pet.breed && pet.breed.toLowerCase().includes(petSearchTerm.toLowerCase()))
    ) || []

  // Récupération des détails de l'animal sélectionné
  const { data: petData, isLoading: isLoadingPet } = useQuery({
    queryKey: ["pet", selectedPetId],
    queryFn: async () => getPetById({ petId: selectedPetId }),
    enabled: !!selectedPetId,
  })

  // Rendez-vous de l'animal sélectionné
  const petAppointments =
    petData?.data?.appointments?.map(pa => ({
      id: pa.appointment.id,
      date: pa.appointment.slot ? new Date(pa.appointment.slot.start).toLocaleDateString() : "Date inconnue",
      type: pa.appointment.service?.name || "Consultation",
    })) || []

  // Réinitialiser l'animal sélectionné lorsqu'un nouveau client est choisi
  useEffect(() => {
    if (selectedClientId) {
      setSelectedPetId("")
      setSelectedAppointmentId("")
    }
  }, [selectedClientId, setSelectedPetId, setSelectedAppointmentId])

  return (
    <Credenza open={isOpen} onOpenChange={onOpenChange}>
      <CredenzaContent className="sm:max-w-[550px]">
        <CredenzaHeader>
          <CredenzaTitle className="text-xl flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M8 3H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1" />
              <path d="M12 17v4" />
              <path d="M8 13h8" />
              <path d="M15 13v-3h3V7l-4-4-4 4v3h3v3z" />
            </svg>
            Initialisation de l'ordonnance
          </CredenzaTitle>
          <CredenzaDescription className="text-base">
            Sélectionnez le client et l'animal concerné par cette ordonnance
          </CredenzaDescription>
        </CredenzaHeader>

        <div className="space-y-8 py-4">
          {isLoadingClients ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2">Chargement des clients...</span>
            </div>
          ) : (
            <>
              {/* Sélection du client */}
              <div className="space-y-3">
                <Label htmlFor="client-select" className="flex items-center gap-2 text-base font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M18 20a6 6 0 0 0-12 0" />
                    <circle cx="12" cy="10" r="4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  Client
                </Label>
                <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                  <SelectTrigger id="client-select" className="w-full">
                    <SelectValue placeholder="Sélectionner un client" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="px-2 py-2">
                      <div className="flex items-center px-1 mb-2 border rounded-md">
                        <Search className="h-4 w-4 text-muted-foreground ml-1 mr-1" />
                        <Input
                          placeholder="Rechercher un client..."
                          className="h-8 border-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                          value={clientSearchTerm}
                          onChange={e => setClientSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    {filteredClients.length > 0 ? (
                      filteredClients.map((client: UserType) => (
                        <SelectItem key={client.id} value={client.id} className="h-auto p-0 pl-8 pr-2">
                          <div className="flex items-center gap-2 py-1.5">
                            <Avatar className="h-6 w-6 flex-shrink-0">
                              <AvatarImage src={client.image!} alt={client.name ?? ""} />
                              <AvatarFallback className="text-xs bg-muted">
                                {client.name?.charAt(0).toUpperCase() ?? "U"}
                              </AvatarFallback>
                            </Avatar>
                            <span className="truncate">{client.name}</span>
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <div className="px-2 py-4 text-center text-sm text-muted-foreground">Aucun client trouvé</div>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Sélection de l'animal */}
              <div className="space-y-3">
                <Label htmlFor="pet-select" className="flex items-center gap-2 text-base font-medium">
                  <PawPrintIcon className="h-4 w-4 text-primary" />
                  Animal concerné
                </Label>
                <div className="flex items-center gap-2">
                  <Select
                    value={selectedPetId}
                    onValueChange={setSelectedPetId}
                    disabled={!selectedClientId || isLoadingClientPets}
                  >
                    <SelectTrigger id="pet-select" className="w-full">
                      {isLoadingClientPets ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Chargement des animaux...</span>
                        </div>
                      ) : (
                        <SelectValue placeholder="Sélectionner un animal" />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {petsData?.data?.length! > 0 ? (
                        <>
                          <div className="px-2 py-2">
                            <div className="flex items-center px-1 mb-2 border rounded-md">
                              <Search className="h-4 w-4 text-muted-foreground ml-1 mr-1" />
                              <Input
                                placeholder="Rechercher un animal..."
                                className="h-8 border-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                                value={petSearchTerm}
                                onChange={e => setPetSearchTerm(e.target.value)}
                              />
                            </div>
                          </div>

                          {filteredPets.length > 0 ? (
                            filteredPets.map(pet => (
                              <SelectItem key={pet.id} value={pet.id} className="h-auto p-0 pl-8 pr-2">
                                <div className="flex items-center gap-2 py-1.5">
                                  <Avatar className="h-6 w-6 flex-shrink-0">
                                    <AvatarImage src={pet.image!} alt={pet.name ?? ""} />
                                    <AvatarFallback className="text-xs bg-muted">
                                      <PawPrintIcon className="h-3.5 w-3.5" />
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="truncate">
                                    {pet.name} ({pet.type}
                                    {pet.breed ? ` - ${pet.breed}` : ""})
                                  </span>
                                </div>
                              </SelectItem>
                            ))
                          ) : (
                            <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                              Aucun animal trouvé
                            </div>
                          )}
                        </>
                      ) : (
                        <SelectItem value="no-pets" disabled>
                          {selectedClientId
                            ? "Aucun animal trouvé pour ce client"
                            : "Veuillez d'abord sélectionner un client"}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          {selectedPetId && (
            <div className="space-y-3">
              <Label htmlFor="appointment-select" className="flex items-center gap-2 text-base font-medium">
                <CalendarIcon className="h-4 w-4 text-primary" />
                Rendez-vous associé (optionnel)
              </Label>
              {isLoadingPet ? (
                <div className="flex items-center py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary mr-2" />
                  <span>Chargement des rendez-vous...</span>
                </div>
              ) : (
                <Select value={selectedAppointmentId} onValueChange={setSelectedAppointmentId}>
                  <SelectTrigger id="appointment-select" className="w-full">
                    <SelectValue placeholder="Sélectionner un rendez-vous" />
                  </SelectTrigger>
                  <SelectContent>
                    {petAppointments.length > 0 ? (
                      petAppointments.map(apt => (
                        <SelectItem key={apt.id} value={apt.id}>
                          {apt.date} - {apt.type}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-appointments" disabled>
                        Aucun rendez-vous disponible
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}
        </div>

        <CredenzaFooter>
          <Button
            onClick={onComplete}
            disabled={!selectedPetId || isLoadingClients || isLoadingPet || isLoadingClientPets}
            className="w-full sm:w-auto"
          >
            {isLoadingClients || isLoadingPet || isLoadingClientPets ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Chargement...
              </>
            ) : (
              <>
                Continuer
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}
