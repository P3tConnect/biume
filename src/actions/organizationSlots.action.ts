"use server"

import { and, eq, gte, asc } from "drizzle-orm"
import { z } from "zod"

import { organizationSlots } from "../db"
import { CreateOrganizationSlotsSchema, OrganizationSlots } from "../db/organizationSlots"
import { ActionError, createServerAction, db, requireAuth, requireFullOrganization } from "../lib"

export const getOrganizationSlots = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const slots = await db.query.organizationSlots.findMany({
      where: eq(organizationSlots.organizationId, ctx.fullOrganization?.id as string),
      with: {
        service: true,
      },
      columns: {
        id: true,
        start: true,
        end: true,
        serviceId: true,
        type: true,
        recurrenceId: true,
      },
    })

    if (!slots) {
      throw new ActionError("Aucun créneau trouvé")
    }

    return slots as OrganizationSlots[]
  },
  [requireAuth, requireFullOrganization]
)

export const getOrganizationSlotsByService = createServerAction(
  z.object({
    serviceId: z.string(),
  }),
  async (input, ctx) => {
    const slots = await db.query.organizationSlots.findMany({
      where: and(eq(organizationSlots.serviceId, input.serviceId), eq(organizationSlots.isAvailable, true)),
    })

    if (!slots) {
      throw new ActionError("Aucun créneau trouvé")
    }

    return slots as OrganizationSlots[]
  },
  []
)

export const createOrganizationSlot = createServerAction(
  z.array(
    CreateOrganizationSlotsSchema.extend({
      start: z.union([z.date(), z.string()]),
      end: z.union([z.date(), z.string()]),
    })
  ),
  async (input, ctx) => {
    try {
      const creationData = input.map(slot => {
        const startDate = slot.start instanceof Date ? slot.start : new Date(slot.start)
        const endDate = slot.end instanceof Date ? slot.end : new Date(slot.end)

        const formattedStart = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          startDate.getHours(),
          startDate.getMinutes(),
          0,
          0
        )

        const formattedEnd = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate(),
          endDate.getHours(),
          endDate.getMinutes(),
          0,
          0
        )

        return {
          ...slot,
          organizationId: slot.organizationId || ctx.organization?.id,
          start: formattedStart,
          end: formattedEnd,
        }
      })

      const slots = await db.insert(organizationSlots).values(creationData).returning().execute()

      if (!slots) {
        throw new ActionError("Erreur lors de la création des créneaux")
      }

      return slots
    } catch (error) {
      throw new ActionError(
        `Erreur lors de la création des créneaux: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  },
  [requireAuth, requireFullOrganization]
)

export const updateOrganizationSlot = createServerAction(
  CreateOrganizationSlotsSchema.extend({
    start: z.union([z.date(), z.string()]),
    end: z.union([z.date(), z.string()]),
  }),
  async (input, ctx) => {
    try {
      const startDate = input.start instanceof Date ? input.start : new Date(input.start)
      const endDate = input.end instanceof Date ? input.end : new Date(input.end)

      const formattedInput = {
        ...input,
        start: startDate,
        end: endDate,
      }

      const [slot] = await db
        .update(organizationSlots)
        .set(formattedInput)
        .where(
          and(
            eq(organizationSlots.id, input.id as string),
            eq(organizationSlots.organizationId, ctx.organization?.id as string)
          )
        )
        .returning()
        .execute()

      if (!slot) {
        throw new ActionError("Erreur lors de la modification du créneau")
      }

      return slot
    } catch (error) {
      throw new ActionError(
        `Erreur lors de la modification du créneau: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  },
  [requireAuth, requireFullOrganization]
)

export const deleteOrganizationSlot = createServerAction(
  z.object({
    id: z.string(),
  }),
  async (input, ctx) => {
    const [slot] = await db
      .delete(organizationSlots)
      .where(
        and(eq(organizationSlots.id, input.id), eq(organizationSlots.organizationId, ctx.organization?.id as string))
      )
      .returning()
      .execute()

    if (!slot) {
      throw new ActionError("Erreur lors de la suppression du créneau")
    }

    return slot
  },
  [requireAuth, requireFullOrganization]
)

export const deleteRecurrentOrganizationSlots = createServerAction(
  z.object({
    recurrenceId: z.string(),
  }),
  async (input, ctx) => {
    const slots = await db
      .delete(organizationSlots)
      .where(
        and(
          eq(organizationSlots.recurrenceId, input.recurrenceId),
          eq(organizationSlots.organizationId, ctx.organization?.id as string)
        )
      )
      .returning()
      .execute()

    if (!slots || slots.length === 0) {
      throw new ActionError("Erreur lors de la suppression des créneaux récurrents")
    }

    return slots
  },
  [requireAuth, requireFullOrganization]
)

export const getOrganizationSlotsByCompanyId = createServerAction(
  z.object({
    companyId: z.string(),
  }),
  async (input, ctx) => {
    try {
      const slots = await db.query.organizationSlots.findMany({
        where: and(
          eq(organizationSlots.organizationId, input.companyId),
          eq(organizationSlots.isAvailable, true),
          gte(organizationSlots.start, new Date()) // Seulement les créneaux futurs
        ),
        with: {
          service: {
            columns: {
              id: true,
              name: true,
              price: true,
            }
          }
        },
        orderBy: asc(organizationSlots.start),
        columns: {
          id: true,
          start: true,
          end: true,
          isAvailable: true,
          organizationId: true,
          serviceId: true,
        },
      })

      return slots as OrganizationSlots[]
    } catch (error) {
      throw new ActionError(
        `Erreur lors de la récupération des créneaux: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  },
  [] // Pas besoin d'authentification pour cette fonction publique
)
