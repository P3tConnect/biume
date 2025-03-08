import { eq } from "drizzle-orm"
import { z } from "zod"

import { requireAuth, requireFullOrganization } from "@/src/lib/action"

import { askAppointmentOptions as askAppointmentOptionsTable, CreateAskAppointmentSchema } from "../db"
import { askAppointment as askAppointmentTable } from "../db/askAppointment"
import { ActionError, createServerAction, db } from "../lib"

export const getAllAskAppointments = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const appointments = await db.query.askAppointment.findMany({
      where: eq(askAppointmentTable.creator, ctx.user?.id || ""),
      with: {
        askAppointmentOptions: {
          with: {
            option: true,
          },
        },
      },
    })

    if (!appointments) {
      throw new ActionError("No appointments found")
    }

    return appointments
  },
  [requireAuth]
)

export const createAskAppointment = createServerAction(
  z.object({
    askAppointment: CreateAskAppointmentSchema,
    options: z.array(z.string()),
  }),
  async (input, ctx) => {
    const [askAppointment] = await db.insert(askAppointmentTable).values(input.askAppointment).returning().execute()

    if (!askAppointment) {
      throw new ActionError("Failed to create appointment")
    }

    const [askAppointmentOptions] = await db
      .insert(askAppointmentOptionsTable)
      .values(
        input.options.map(option => ({
          askAppointmentId: askAppointment.id,
          optionId: option,
        }))
      )
      .returning()
      .execute()

    return {
      askAppointment,
      askAppointmentOptions,
    }
  },
  [requireAuth]
)

export const getAllAskAppoitmentForOrganization = createServerAction(
  z.object({
    organizationId: z.string(),
  }),
  async (input, ctx) => {
    try {
      const appointments = await db.query.askAppointment.findMany({
        where: eq(askAppointmentTable.for, input.organizationId),
        with: {
          askAppointmentOptions: {
            with: {
              option: true,
            },
          },
        },
      })

      if (!appointments) {
        throw new ActionError("No appointments found")
      }

      return appointments
    } catch (error) {
      console.error(error)
      throw new ActionError("Failed to get appointments")
    }
  },
  [requireAuth, requireFullOrganization]
)
