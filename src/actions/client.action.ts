"use server"

import { eq } from "drizzle-orm"
import { z } from "zod"

import { appointments } from "@/src/db/appointments"
import { CreateUserSchema, user, User } from "@/src/db/user"

import { ActionError, createServerAction, db, requireAuth, requireFullOrganization } from "../lib"
import { Pet, PetSchema } from "../db"

// Action pour récupérer tous les clients d'une organisation
export const getClients = createServerAction(
  z.object({
    search: z.string().optional(),
    status: z.string().optional(),
  }),
  async (input, ctx) => {
    // Vérifier que l'utilisateur est un professionnel
    if (!ctx.user?.isPro) {
      throw new Error("Vous devez être un professionnel pour accéder à cette ressource")
    }

    try {
      // Récupérer l'ID de l'organisation
      const organizationId = ctx.organization?.id

      if (!organizationId) {
        throw new Error("ID d'organisation non trouvé")
      }

      // Récupérer les utilisateurs qui ont pris des rendez-vous avec cette organisation
      const clientsWithAppointments = await db.query.appointments.findMany({
        where: eq(appointments.proId, organizationId),
        with: {
          client: {
            columns: {
              id: true,
              name: true,
              email: true,
              phoneNumber: true,
              city: true,
              country: true,
              createdAt: true,
            },
          },
          slot: {
            columns: {
              start: true,
            },
          },
        },
        orderBy: (appointments, { desc }) => [desc(appointments.createdAt)],
      })

      // Extraire les utilisateurs uniques (éliminer les doublons)
      const uniqueClients = Array.from(
        new Map(
          clientsWithAppointments
            .filter(appointment => appointment.client !== null) // Filtrer les rendez-vous sans client
            .map(appointment => [appointment.client!.id, appointment.client!])
        ).values()
      ) as User[]

      // Déterminer si un client est actif (a des rendez-vous à venir)
      const now = new Date()
      const activeClientIds = new Set(
        clientsWithAppointments
          .filter(appointment => new Date(appointment.slot!.start) > now)
          .map(appointment => appointment.clientId)
      )

      // Ajouter une propriété temporaire de statut aux utilisateurs
      const clientsWithStatus = uniqueClients.map(client => ({
        ...client,
        status: activeClientIds.has(client.id) ? "Active" : "Inactive",
      }))

      // Filtrage par recherche si spécifié
      let filteredClients = clientsWithStatus
      if (input.search) {
        const searchLower = input.search.toLowerCase()
        filteredClients = filteredClients.filter(
          client =>
            client.name.toLowerCase().includes(searchLower) ||
            client.email.toLowerCase().includes(searchLower) ||
            (client.phoneNumber && client.phoneNumber.includes(input.search || "")) ||
            (client.city && client.city?.toLowerCase().includes(searchLower))
        )
      }

      // Filtrage par statut si spécifié
      if (input.status && input.status !== "all") {
        filteredClients = filteredClients.filter(client => client.status === input.status)
      }

      return filteredClients as User[]
    } catch (error) {
      console.error("Erreur lors de la récupération des clients:", error)
      throw new Error("Impossible de récupérer les clients de l'organisation")
    }
  },
  [requireAuth, requireFullOrganization]
)

// Action pour récupérer les métriques des clients
export const getClientMetrics = createServerAction(
  z.object({}),
  async (input, ctx) => {
    try {
      // Récupérer l'ID de l'organisation
      const organizationId = ctx.fullOrganization?.id

      if (!organizationId) {
        throw new ActionError("ID d'organisation non trouvé")
      }

      // Récupérer les utilisateurs qui ont pris des rendez-vous avec cette organisation
      const clientsWithAppointments = await db.query.appointments.findMany({
        where: eq(appointments.proId, organizationId),
        with: {
          client: {
            columns: {
              id: true,
              name: true,
              email: true,
              phoneNumber: true,
              city: true,
            },
          },
          slot: {
            columns: {
              start: true,
            },
          },
        },
        orderBy: (appointments, { desc }) => [desc(appointments.createdAt)],
      })

      // Filtrer d'abord les rendez-vous avec des clients valides
      const validAppointments = clientsWithAppointments.filter(
        (appointment): appointment is typeof appointment & { client: NonNullable<typeof appointment.client> } =>
          appointment.client !== null
      )

      // Extraire les utilisateurs uniques
      const uniqueClients = Array.from(
        new Map(validAppointments.map(appointment => [appointment.client.id, appointment.client])).values()
      )

      // Déterminer les clients actifs (ceux qui ont des rendez-vous à venir)
      const now = new Date()
      const activeAppointments = validAppointments.filter(
        appointment => appointment.slot && new Date(appointment.slot.start) > now
      )

      // Récupérer le nombre unique de clients actifs
      const uniqueActiveClientsCount = new Set(activeAppointments.map(appointment => appointment.client.id)).size

      // Calculer le nombre total de rendez-vous valides
      const totalAppointments = validAppointments.length

      // Dans un cas réel, on pourrait récupérer la notation moyenne depuis la table ratings
      const averageRating = 4.8 // Valeur fictive

      return {
        totalClients: uniqueClients.length,
        activeClients: uniqueActiveClientsCount,
        appointments: totalAppointments,
        averageRating: averageRating,
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des métriques client:", error)
      throw new ActionError("Impossible de récupérer les métriques des clients")
    }
  },
  [requireAuth, requireFullOrganization]
)

// Action pour créer un client
export const createClient = createServerAction(
  z.object({
    user: CreateUserSchema,
    pets: z.array(PetSchema),
  }),
  async (input, ctx) => {
    try {
      const { name, email, phoneNumber, city, country, pets } = input

      // Vérifier que l'utilisateur est un professionnel
      if (!ctx.user?.isPro) {
        throw new Error("Vous devez être un professionnel pour accéder à cette ressource")
      }

      // Récupérer l'ID de l'organisation
      const organizationId = ctx.fullOrganization?.id

      if (!organizationId) {
        throw new ActionError("ID d'organisation non trouvé")
      }

      // Créer le client
      const [client] = await db
        .insert(user)
        .values({
          ...input.user,
        })
        .returning()
        .execute()

      // Créer les animaux
      const petIds = await db.insert(pets).values(
        pets.map((pet: Pet) => ({
          name: pet.name,
          type: pet.type,
          breed: pet.breed,
          gender: pet.gender,
          birthDate: pet.birthDate,
          description: pet.description,
          nacType: pet.nacType,
          clientId: client.id,
        }))
      )

      // Retourner le client avec ses animaux
      return {
        client: {
          id: client.id,
          name: client.name,
          email: client.email,
          phoneNumber: client.phoneNumber,
          city: client.city,
          country: client.country,
          pets: petIds,
        },
      }
    } catch (error) {
      console.error("Erreur lors de la création du client:", error)
      throw new ActionError("Impossible de créer le client")
    }
  },
  [requireAuth, requireFullOrganization]
)
