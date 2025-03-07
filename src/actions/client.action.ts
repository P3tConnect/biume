"use server";

import { createServerAction, db, requireAuth } from "../lib";
import { user, User } from "@/src/db/user";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Type pour les clients
export type Client = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  city: string;
  country: string;
  createdAt: string;
  status: "Active" | "Inactive";
};

// Schema pour filtrer les clients
export const ClientFilterSchema = z.object({
  organizationId: z.string().optional(),
  status: z.enum(["Active", "Inactive", "all"]).optional(),
  search: z.string().optional(),
});

// Action pour récupérer tous les clients d'une organisation
export const getClients = createServerAction(
  ClientFilterSchema,
  async (input, ctx) => {
    // Vérifier que l'utilisateur est un professionnel
    if (!ctx.user?.isPro) {
      throw new Error(
        "Vous devez être un professionnel pour accéder à cette ressource",
      );
    }

    // Récupérer l'ID de l'organisation de l'utilisateur
    const organizationId = input.organizationId;

    // Simuler la récupération des clients pour l'instant
    // Dans une vraie implémentation, cela devrait interroger une table de clients
    // ou filtrer les utilisateurs qui sont clients de cette organisation

    // Pour cette démo, nous allons créer des clients fictifs comme dans le composant d'origine
    const clients: Client[] = [
      {
        id: "1",
        name: "Sophie Martin",
        email: "sophie.martin@email.com",
        phoneNumber: "+33 6 12 34 56 78",
        city: "Paris",
        country: "France",
        createdAt: "2023-12-01",
        status: "Active",
      },
      {
        id: "2",
        name: "Jean Dupont",
        email: "jean.dupont@email.com",
        phoneNumber: "+33 6 98 76 54 32",
        city: "Lyon",
        country: "France",
        createdAt: "2023-12-05",
        status: "Active",
      },
      // Ajoutez plus de clients si nécessaire
    ];

    // Filtrage par statut si spécifié
    let filteredClients = clients;
    if (input.status && input.status !== "all") {
      filteredClients = clients.filter(
        (client) => client.status === input.status,
      );
    }

    // Filtrage par recherche si spécifié
    if (input.search) {
      const searchLower = input.search.toLowerCase();
      filteredClients = filteredClients.filter(
        (client) =>
          client.name.toLowerCase().includes(searchLower) ||
          client.email.toLowerCase().includes(searchLower),
      );
    }

    return filteredClients;
  },
  [requireAuth],
);

// Type pour les métriques des clients
export type ClientMetrics = {
  totalClients: number;
  activeClients: number;
  appointments: number;
  averageRating: number;
};

// Action pour récupérer les métriques des clients
export const getClientMetrics = createServerAction(
  z.object({ organizationId: z.string().optional() }),
  async (input, ctx) => {
    // Vérifier que l'utilisateur est un professionnel
    if (!ctx.user?.isPro) {
      throw new Error(
        "Vous devez être un professionnel pour accéder à cette ressource",
      );
    }

    // Dans une vraie implémentation, récupérer les clients de la base de données
    const clientsResult = await getClients({
      organizationId: input.organizationId,
    });

    // Gérer les erreurs potentielles
    if ("error" in clientsResult) {
      throw new Error(clientsResult.error);
    }

    const clients = clientsResult.data || [];
    const activeClients = clients.filter(
      (client) => client.status === "Active",
    );

    return {
      totalClients: clients.length,
      activeClients: activeClients.length,
      appointments: 156, // Valeur fictive comme dans le composant d'origine
      averageRating: 4.8, // Valeur fictive comme dans le composant d'origine
    };
  },
  [requireAuth],
);
