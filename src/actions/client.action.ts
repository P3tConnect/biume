"use server";

import { createServerAction, db, requireAuth } from "../lib";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import { appointments } from "@/src/db/appointments";
import { user, User } from "@/src/db/user";
import { ClientFilterSchema, ClientMetrics } from "../types/client";

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

    try {
      // Récupérer l'ID de l'organisation
      const organizationId = ctx.organization?.id;
      
      if (!organizationId) {
        throw new Error("ID d'organisation non trouvé");
      }

      // Récupérer les utilisateurs qui ont pris des rendez-vous avec cette organisation
      const clientsWithAppointments = await db.query.appointments.findMany({
        where: eq(appointments.proId, organizationId),
        with: {
          client: true
        },
        orderBy: (appointments, { desc }) => [desc(appointments.createdAt)]
      });

      // Extraire les utilisateurs uniques (éliminer les doublons)
      const uniqueClients = Array.from(
        new Map(
          clientsWithAppointments
            .filter(appointment => appointment.client !== null) // Filtrer les rendez-vous sans client
            .map(appointment => [appointment.client!.id, appointment.client!])
        ).values()
      ) as User[];

      // Déterminer si un client est actif (a des rendez-vous à venir)
      const now = new Date();
      const activeClientIds = new Set(
        clientsWithAppointments
          .filter(appointment => new Date(appointment.beginAt) > now)
          .map(appointment => appointment.clientId)
      );

      // Ajouter une propriété temporaire de statut aux utilisateurs
      const clientsWithStatus = uniqueClients.map(client => ({
        ...client,
        status: activeClientIds.has(client.id) ? "Active" : "Inactive"
      }));

      // Filtrage par recherche si spécifié
      let filteredClients = clientsWithStatus;
      if (input.search) {
        const searchLower = input.search.toLowerCase();
        filteredClients = filteredClients.filter(
          client => 
            client.name.toLowerCase().includes(searchLower) ||
            client.email.toLowerCase().includes(searchLower) ||
            (client.phoneNumber && client.phoneNumber.includes(input.search || '')) ||
            (client.city && client.city?.toLowerCase().includes(searchLower))
        );
      }

      // Filtrage par statut si spécifié
      if (input.status && input.status !== "all") {
        filteredClients = filteredClients.filter(client => client.status === input.status);
      }

      return filteredClients;
    } catch (error) {
      console.error("Erreur lors de la récupération des clients:", error);
      throw new Error("Impossible de récupérer les clients de l'organisation");
    }
  },
  [requireAuth],
);

// Action pour récupérer les métriques des clients
export const getClientMetrics = createServerAction(
  z.object({}),
  async (input, ctx) => {
    // Vérifier que l'utilisateur est un professionnel
    if (!ctx.user?.isPro) {
      throw new Error(
        "Vous devez être un professionnel pour accéder à cette ressource",
      );
    }

    try {
      // Récupérer l'ID de l'organisation
      const organizationId = ctx.organization?.id;
      
      if (!organizationId) {
        throw new Error("ID d'organisation non trouvé");
      }

      // Récupérer les utilisateurs qui ont pris des rendez-vous avec cette organisation
      const clientsWithAppointments = await db.query.appointments.findMany({
        where: eq(appointments.proId, organizationId),
        with: {
          client: true
        },
        orderBy: (appointments, { desc }) => [desc(appointments.createdAt)]
      });

      // Extraire les utilisateurs uniques (éliminer les doublons)
      const uniqueClients = Array.from(
        new Map(
          clientsWithAppointments
            .filter(appointment => appointment.client !== null) // Filtrer les rendez-vous sans client
            .map(appointment => [appointment.client!.id, appointment.client])
        ).values()
      );

      // Déterminer les clients actifs (ceux qui ont des rendez-vous à venir)
      const now = new Date();
      const activeClients = clientsWithAppointments.filter(
        appointment => new Date(appointment.beginAt) > now
      );
      
      // Récupérer le nombre unique de clients actifs
      const uniqueActiveClientsCount = new Set(
        activeClients.map(appointment => appointment.clientId)
      ).size;

      // Calculer le nombre total de rendez-vous
      const totalAppointments = clientsWithAppointments.length;

      // Dans un cas réel, on pourrait récupérer la notation moyenne depuis la table ratings
      // Pour l'instant on garde la valeur fictive
      const averageRating = 4.8; // Valeur fictive

      return {
        totalClients: uniqueClients.length,
        activeClients: uniqueActiveClientsCount,
        appointments: totalAppointments,
        averageRating: averageRating
      };
    } catch (error) {
      console.error("Erreur lors de la récupération des métriques client:", error);
      throw new Error("Impossible de récupérer les métriques des clients");
    }
  },
  [requireAuth],
);
