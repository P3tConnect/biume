"use server"

import { eq, and, or } from "drizzle-orm"
import { z } from "zod"
import { requireAuth, requireFullOrganization, requireOwner } from "@/src/lib/action"

import { Appointment, appointments as appointmentsTable } from "../db/appointments"
import { ActionError, createServerAction, db } from "../lib"
import { revalidatePath } from "next/cache"

export const getAllAppointments = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const appointments = await db
      .select()
      .from(appointmentsTable)
      .where(eq(appointmentsTable.proId, ctx.organization?.id || ""))

    if (!appointments) {
      throw new ActionError("No appointments found")
    }

    return appointments
  },
  [requireAuth, requireFullOrganization]
)

export const confirmAppointment = createServerAction(
  z.object({
    appointmentId: z.string(),
  }),
  async (input, ctx) => {
    await db.update(appointmentsTable).set({ status: "CONFIRMED" }).where(eq(appointmentsTable.id, input.appointmentId))

    revalidatePath("/dashboard/calendar")
  },
  [requireAuth, requireFullOrganization]
)

export const denyAppointment = createServerAction(
  z.object({
    appointmentId: z.string(),
    deniedReason: z.string(),
  }),
  async (input, ctx) => {
    await db
      .update(appointmentsTable)
      .set({ status: "DENIED", deniedReason: input.deniedReason })
      .where(eq(appointmentsTable.id, input.appointmentId))

    revalidatePath("/dashboard/calendar")
  },
  [requireAuth, requireFullOrganization]
)

// "CONFIRMED", "DENIED", "CANCELED", "POSTPONED", "ONGOING", "COMPLETED"

export const getConfirmedAndAboveAppointments = createServerAction(
  z.object({}),
  async (input, ctx) => {
    console.log("Organisation ID:", ctx.organization?.id)

    // Récupérer les rendez-vous avec une condition SQL plus explicite
    const appointmentQuery = await db.query.appointments.findMany({
      where: and(
        eq(appointmentsTable.proId, ctx.organization?.id || ""),
        or(
          eq(appointmentsTable.status, "CONFIRMED"),
          eq(appointmentsTable.status, "ONGOING"),
          eq(appointmentsTable.status, "COMPLETED")
        )
      ),
      with: {
        pet: {
          columns: {
            id: true,
            name: true,
            type: true,
          },
        },
        slot: {
          columns: {
            id: true,
            start: true,
            end: true,
          },
        },
      },
    })

    if (!appointmentQuery.length) {
      throw new ActionError("No appointments found")
    }

    return appointmentQuery as unknown as Appointment[]
  },
  [requireAuth, requireFullOrganization]
)

export const getPendingAndPayedAppointments = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const appointments = await db.query.appointments.findMany({
      where: and(
        eq(appointmentsTable.proId, ctx.organization?.id || ""),
        or(eq(appointmentsTable.status, "SCHEDULED"), eq(appointmentsTable.status, "PAYED"))
      ),
      columns: {
        atHome: true,
        status: true,
        type: true,
        id: true,
      },
      with: {
        pet: {
          columns: {
            id: true,
            name: true,
            type: true,
          },
        },
        slot: {
          columns: {
            id: true,
            start: true,
            end: true,
          },
        },
        service: {
          columns: {
            id: true,
            name: true,
            price: true,
            duration: true,
          },
        },
        client: {
          columns: {
            id: true,
            email: true,
            name: true,
            image: true,
            phoneNumber: true,
          },
        },
      },
    })

    if (!appointments) {
      throw new ActionError("No appointments found")
    }

    return appointments as unknown as Appointment[]
  },
  [requireAuth, requireOwner, requireFullOrganization]
)

export const getAllAppointmentForClient = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const appointments = await db.query.appointments.findMany({
      where: eq(appointmentsTable.clientId, ctx.user?.id || ""),
      with: {
        pet: {
          columns: {
            id: true,
            name: true,
            type: true,
          },
        },
        slot: {
          columns: {
            id: true,
            start: true,
            end: true,
          },
        },
        service: {
          columns: {
            id: true,
            name: true,
          },
        },
        client: {
          columns: {
            id: true,
            email: true,
            name: true,
          },
        },
        pro: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (!appointments) {
      throw new ActionError("Appointment not found")
    }

    return appointments as unknown as Appointment[]
  },
  [requireAuth]
)
