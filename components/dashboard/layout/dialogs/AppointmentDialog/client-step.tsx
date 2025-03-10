import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormMessage,
  FormLabel,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import {
  UserIcon,
  PawPrintIcon,
  SearchIcon,
  PlusIcon,
  XCircleIcon,
  InfoIcon,
  CheckIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppointmentFormValues } from "./AppointmentDialog";
import { cn } from "@/src/lib/utils";

// Schéma de validation pour le nouveau client
const newClientSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide").min(1, "L'email est requis"),
  phone: z.string().min(1, "Le téléphone est requis"),
});

type NewClientFormValues = z.infer<typeof newClientSchema>;

const ClientStep = () => {
  const form = useFormContext<AppointmentFormValues>();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewClientDialog, setShowNewClientDialog] = useState(false);

  // Formulaire pour nouveau client
  const clientForm = useForm<NewClientFormValues>({
    resolver: zodResolver(newClientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // Clients et animaux (simulés pour l'exemple)
  const [clients, setClients] = useState([
    {
      id: "client1",
      name: "Marie Dupont",
      email: "marie@example.com",
      phone: "06 12 34 56 78",
    },
    {
      id: "client2",
      name: "Jean Martin",
      email: "jean@example.com",
      phone: "06 23 45 67 89",
    },
    {
      id: "client3",
      name: "Sophie Laurent",
      email: "sophie@example.com",
      phone: "06 34 56 78 90",
    },
  ]);

  const [pets, setPets] = useState([
    {
      id: "pet1",
      name: "Rex",
      type: "Chien",
      race: "Berger Allemand",
      clientId: "client1",
    },
    {
      id: "pet2",
      name: "Félix",
      type: "Chat",
      race: "Européen",
      clientId: "client2",
    },
    {
      id: "pet3",
      name: "Titi",
      type: "Oiseau",
      race: "Canari",
      clientId: "client3",
    },
  ]);

  // Filtrer les clients en fonction de la recherche
  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery),
  );

  // Filtrer les animaux en fonction du client sélectionné
  const selectedClientPets = pets.filter(
    (pet) => pet.clientId === form.watch("clientId"),
  );

  // Gérer la soumission du formulaire de nouveau client
  const handleCreateClient = (data: NewClientFormValues) => {
    const newClientId = `client${clients.length + 1}`;
    const clientToAdd = {
      id: newClientId,
      ...data,
    };

    setClients([...clients, clientToAdd]);
    form.setValue("clientId", newClientId);

    // Fermer le dialog
    setShowNewClientDialog(false);

    // Réinitialiser le formulaire
    clientForm.reset();
  };

  // Pour annuler la création
  const handleCancel = () => {
    setShowNewClientDialog(false);
    clientForm.reset();
  };

  return (
    <div className="space-y-5">
      {/* En-tête avec description */}
      <div className="flex justify-between items-start mb-2">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Détails du rendez-vous</h3>
          <p className="text-sm text-muted-foreground">
            Sélectionnez le client et l'animal concernés par ce rendez-vous
          </p>
        </div>
        <Button
          type="button"
          variant="default"
          size="sm"
          className="flex items-center"
          onClick={() => setShowNewClientDialog(true)}
        >
          <PlusIcon className="h-3.5 w-3.5 mr-1.5" />
          Nouveau client
        </Button>
      </div>

      {/* Ligne de séparation */}
      <div className="h-px bg-border" />

      {/* Section principale - disposition horizontale */}
      <div className="space-y-3">
        {/* En-têtes côte à côte */}
        <div className="grid grid-cols-2 gap-4">
          <label
            htmlFor="client-select"
            className="text-sm font-medium flex items-center"
          >
            <UserIcon className="w-4 h-4 mr-2 text-primary" />
            Client
            <span className="text-destructive ml-1">*</span>
          </label>

          <label
            htmlFor="animal-select"
            className="text-sm font-medium flex items-center"
          >
            <PawPrintIcon className="w-4 h-4 mr-2 text-primary" />
            Animal de compagnie
            <span className="text-destructive ml-1">*</span>
          </label>
        </div>

        {/* Barre de recherche */}
        <div className="relative mb-3">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 border-muted-foreground/20"
            placeholder="Rechercher un client..."
          />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
              onClick={() => setSearchQuery("")}
            >
              <XCircleIcon className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          )}
        </div>

        {/* Listes côte à côte */}
        <div className="grid grid-cols-2 gap-4">
          {/* Liste des clients */}
          <div className="space-y-2">
            <div className="border rounded-md h-[180px] overflow-y-auto">
              {filteredClients.length > 0 ? (
                <div className="divide-y">
                  {filteredClients.map((client) => (
                    <button
                      key={client.id}
                      type="button"
                      className={cn(
                        "w-full flex items-center p-2.5 text-left hover:bg-muted/50 transition-colors",
                        form.watch("clientId") === client.id &&
                          "bg-primary/5 hover:bg-primary/10",
                      )}
                      onClick={() => form.setValue("clientId", client.id)}
                    >
                      <Avatar className="h-8 w-8 mr-3">
                        <div className="bg-primary/10 h-full w-full flex items-center justify-center rounded-full">
                          <UserIcon className="h-4 w-4 text-primary" />
                        </div>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{client.name}</p>
                        <div className="flex text-xs text-muted-foreground gap-2">
                          <span className="truncate">{client.email}</span>
                        </div>
                      </div>
                      {form.watch("clientId") === client.id && (
                        <CheckIcon className="h-4 w-4 text-primary ml-2 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    {searchQuery
                      ? `Aucun résultat pour "${searchQuery}"`
                      : "Aucun client disponible"}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowNewClientDialog(true)}
                  >
                    <PlusIcon className="h-3.5 w-3.5 mr-1" />
                    {searchQuery ? "Créer ce client" : "Ajouter un client"}
                  </Button>
                </div>
              )}
            </div>

            {form.formState.errors.clientId && (
              <FormMessage>
                {form.formState.errors.clientId.message}
              </FormMessage>
            )}
          </div>

          {/* Liste des animaux */}
          <div className="space-y-2">
            <div className="border rounded-md h-[180px] overflow-y-auto">
              {form.watch("clientId") ? (
                selectedClientPets.length > 0 ? (
                  <div className="divide-y">
                    {selectedClientPets.map((pet) => (
                      <button
                        key={pet.id}
                        type="button"
                        className={cn(
                          "w-full flex items-center p-2.5 text-left hover:bg-muted/50 transition-colors",
                          form.watch("patientId") === pet.id &&
                            "bg-primary/5 hover:bg-primary/10",
                        )}
                        onClick={() => form.setValue("patientId", pet.id)}
                      >
                        <div className="flex items-center justify-center h-8 w-8 bg-secondary/10 rounded-full mr-3 flex-shrink-0">
                          <PawPrintIcon className="h-4 w-4 text-secondary-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{pet.name}</p>
                          <div className="flex items-center gap-1">
                            <Badge
                              variant="outline"
                              className="text-xs font-normal py-0 h-4 px-1.5"
                            >
                              {pet.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground truncate">
                              {pet.race}
                            </span>
                          </div>
                        </div>
                        {form.watch("patientId") === pet.id && (
                          <CheckIcon className="h-4 w-4 text-primary ml-2 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      Ce client n'a pas encore d'animaux
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Le client doit créer ses animaux de compagnie dans son
                      espace personnel.
                    </p>
                  </div>
                )
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Veuillez d'abord sélectionner un client
                  </p>
                </div>
              )}
            </div>

            {form.formState.errors.patientId && (
              <FormMessage>
                {form.formState.errors.patientId.message}
              </FormMessage>
            )}
          </div>
        </div>

        {/* Ligne d'information */}
        {form.watch("clientId") && (
          <div className="py-2 px-3 bg-muted/30 rounded-md text-xs text-muted-foreground flex items-center">
            <InfoIcon className="h-3.5 w-3.5 mr-2 text-primary" />
            <span>
              {clients.find((c) => c.id === form.watch("clientId"))?.name}
              {form.watch("patientId") && (
                <>
                  {" avec "}
                  <span className="font-medium">
                    {pets.find((p) => p.id === form.watch("patientId"))?.name}
                  </span>{" "}
                  <span className="text-xs">
                    ({pets.find((p) => p.id === form.watch("patientId"))?.type})
                  </span>
                </>
              )}
            </span>
          </div>
        )}
      </div>

      {/* Dialog pour créer un nouveau client */}
      <Dialog open={showNewClientDialog} onOpenChange={setShowNewClientDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Créer un nouveau client</DialogTitle>
            <DialogDescription>
              Saisissez les informations du nouveau client
            </DialogDescription>
          </DialogHeader>

          <form
            className="space-y-4 py-4"
            onSubmit={clientForm.handleSubmit(handleCreateClient)}
          >
            <FormItem>
              <FormLabel>Nom complet</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nom du client"
                  {...clientForm.register("name")}
                  autoFocus
                />
              </FormControl>
              {clientForm.formState.errors.name && (
                <FormMessage>
                  {clientForm.formState.errors.name.message}
                </FormMessage>
              )}
            </FormItem>

            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email@exemple.com"
                  {...clientForm.register("email")}
                />
              </FormControl>
              {clientForm.formState.errors.email && (
                <FormMessage>
                  {clientForm.formState.errors.email.message}
                </FormMessage>
              )}
            </FormItem>

            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input
                  placeholder="06 12 34 56 78"
                  {...clientForm.register("phone")}
                />
              </FormControl>
              {clientForm.formState.errors.phone && (
                <FormMessage>
                  {clientForm.formState.errors.phone.message}
                </FormMessage>
              )}
            </FormItem>

            <div className="flex justify-between pt-4 mt-6">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Annuler
              </Button>
              <Button type="submit">Ajouter le client</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientStep;
