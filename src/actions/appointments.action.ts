"use server"

import { eq, and, or, desc, asc } from "drizzle-orm"
import { z } from "zod"
import { requireAuth, requireFullOrganization, requireOwner } from "@/src/lib/action"

import { Appointment, appointments as appointmentsTable } from "../db/appointments"
import { ActionError, createServerAction, db } from "../lib"
import { revalidatePath } from "next/cache"
import { Pet, pets, User, user } from "../db"

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
    const [appointment] = await db
      .update(appointmentsTable)
      .set({ status: "CONFIRMED" })
      .where(eq(appointmentsTable.id, input.appointmentId))
      .returning()
      .execute()

    if (!appointment) {
      throw new ActionError("Appointment not updated")
    }

    return appointment
  },
  [requireAuth, requireFullOrganization]
)

export const denyAppointment = createServerAction(
  z.object({
    appointmentId: z.string(),
    deniedReason: z.string(),
  }),
  async (input, ctx) => {
    const [appointment] = await db
      .update(appointmentsTable)
      .set({ status: "DENIED", deniedReason: input.deniedReason })
      .where(eq(appointmentsTable.id, input.appointmentId))
      .returning()
      .execute()

    if (!appointment) {
      throw new ActionError("Appointment not updated")
    }

    return appointment
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
          eq(appointmentsTable.status, "SCHEDULED"),
          eq(appointmentsTable.status, "PAYED"),
          eq(appointmentsTable.status, "CONFIRMED"),
          eq(appointmentsTable.status, "ONGOING"),
          eq(appointmentsTable.status, "COMPLETED")
        )
      ),
      with: {
        options: {
          with: {
            option: {
              columns: {
                id: true,
                title: true,
                price: true,
              },
            },
          },
        },
        pet: {
          columns: {
            id: true,
            name: true,
            type: true,
          },
        },
        client: {
          columns: {
            id: true,
            name: true,
            image: true,
            phoneNumber: true,
            email: true,
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
      },
    })

    if (!appointmentQuery.length) {
      throw new ActionError("No appointments found")
    }

    // Trier les rendez-vous par date de début du créneau
    const sortedAppointments = appointmentQuery.sort((a, b) => {
      if (a.slot && b.slot) {
        return new Date(a.slot.start).getTime() - new Date(b.slot.start).getTime()
      }
      return 0
    })

    return sortedAppointments as unknown as Appointment[]
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
      orderBy: [desc(appointmentsTable.status)],
    })

    if (!appointments) {
      throw new ActionError("Appointment not found")
    }

    return appointments as unknown as Appointment[]
  },
  [requireAuth]
)

export const getAppointmentsByPetId = createServerAction(
  z.object({
    petId: z.string(),
  }),
  async (input, ctx) => {
    const appointments = await db.query.appointments.findMany({
      where: and(eq(appointmentsTable.patientId, input.petId), eq(appointmentsTable.status, "COMPLETED")),
      columns: {
        id: true,
        beginAt: true,
        endAt: true,
        status: true,
        type: true,
        atHome: true,
      },
      with: {
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
        options: {
          with: {
            option: {
              columns: {
                id: true,
                title: true,
                price: true,
                description: true,
              },
            },
          },
        },
      },
    })
    return appointments as unknown as Appointment[]
  },
  [requireAuth, requireFullOrganization]
)

export const getProNextAppointment = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const now = new Date()

    // Récupérer tous les rendez-vous programmés pour ce pet
    const appointments = await db.query.appointments.findMany({
      where: and(eq(appointmentsTable.proId, ctx.organization?.id || ""), eq(appointmentsTable.status, "CONFIRMED")),
      with: {
        slot: {
          columns: {
            id: true,
            start: true,
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
        options: {
          with: {
            option: {
              columns: {
                id: true,
                title: true,
                price: true,
                description: true,
              },
            },
          },
        },
      },
    })

    // Filtrer pour ne conserver que les rendez-vous futurs et trier par date
    const futureAppointments = appointments
      .filter(appointment => appointment.slot && new Date(appointment.slot.start) > now)
      .sort((a, b) => {
        if (a.slot && b.slot) {
          return new Date(a.slot.start).getTime() - new Date(b.slot.start).getTime()
        }
        return 0
      })

    const client = await db.query.user.findFirst({
      where: eq(user.id, futureAppointments[0]?.clientId || ""),
      columns: {
        name: true,
        email: true,
        phoneNumber: true,
        image: true,
      },
    })

    const pet = await db.query.pets.findFirst({
      where: eq(pets.id, futureAppointments[0]?.patientId || ""),
      columns: {
        id: true,
        name: true,
        image: true,
        type: true,
        breed: true,
        birthDate: true,
        gender: true,
      },
      with: {
        appointments: {
          where: and(eq(appointmentsTable.status, "CONFIRMED"), eq(appointmentsTable.status, "COMPLETED")),
          columns: {
            id: true,
            status: true,
            type: true,
            atHome: true,
          },
          with: {
            invoices: {
              columns: {
                id: true,
                total: true,
                checkoutSessionId: true,
              },
            },
          },
        },
      },
    })

    // Retourner le premier rendez-vous (le plus proche) s'il existe
    return {
      nextAppointment: futureAppointments.length > 0 ? (futureAppointments[0] as unknown as Appointment) : null,
      client: client ? (client as unknown as User) : null,
      pet: pet ? (pet as unknown as Pet) : null,
    }
  },
  [requireAuth, requireFullOrganization]
)
