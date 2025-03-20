"use server"

import { eq, and, or, desc } from "drizzle-orm"
import { z } from "zod"
import { requireAuth, requireFullOrganization } from "@/src/lib/action"

import { Appointment, appointments as appointmentsTable } from "../db/appointments"
import { ActionError, createServerAction, db } from "../lib"
import { user } from "../db"
import { petAppointments } from "../db/pet_appointments"

export const getAllAppointments = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const appointments = await db.query.appointments.findMany({
      where: eq(appointmentsTable.proId, ctx.organization?.id || ""),
      with: {
        pets: {
          with: {
            pet: {
              columns: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        slot: {
          columns: {
            id: true,
            start: true,
            end: true,
            remainingPlaces: true,
          },
        },
        service: {
          columns: {
            id: true,
            name: true,
            price: true,
            duration: true,
            places: true,
          },
        },
        client: {
          columns: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            image: true,
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

export const getConfirmedAndAboveAppointments = createServerAction(
  z.object({}),
  async (input, ctx) => {
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
        pro: {
          columns: {
            id: true,
            name: true,
            logo: true,
          },
        },
        observation: {
          columns: {
            id: true,
            content: true,
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
        pets: {
          with: {
            pet: {
              columns: {
                id: true,
                name: true,
                image: true,
                type: true,
                breed: true,
              },
            },
          },
        },
        client: {
          columns: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            image: true,
            address: true,
            city: true,
            country: true,
          },
        },
        slot: {
          columns: {
            id: true,
            start: true,
            end: true,
            remainingPlaces: true,
          },
          with: {
            service: {
              columns: {
                id: true,
                name: true,
                price: true,
                duration: true,
                places: true,
                type: true,
              },
            },
          },
        },
        service: {
          columns: {
            id: true,
            name: true,
            price: true,
            duration: true,
            places: true,
            type: true,
          },
        },
      },
      orderBy: [desc(appointmentsTable.createdAt)],
    })

    return appointmentQuery as Appointment[]
  },
  [requireAuth, requireFullOrganization]
)

export const cancelAppointment = createServerAction(
  z.object({
    appointmentId: z.string(),
    deniedReason: z.string(),
  }),
  async (input, ctx) => {
    const [appointment] = await db
      .update(appointmentsTable)
      .set({ status: "CANCELED", deniedReason: input.deniedReason })
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

export const deleteAppointment = createServerAction(
  z.object({
    appointmentId: z.string(),
  }),
  async (input, ctx) => {
    const [appointment] = await db
      .delete(appointmentsTable)
      .where(eq(appointmentsTable.id, input.appointmentId))
      .returning()
      .execute()

    if (!appointment) {
      throw new ActionError("Appointment not deleted")
    }

    return appointment
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
      with: {
        pets: {
          with: {
            pet: {
              columns: {
                id: true,
                name: true,
                image: true,
                breed: true,
                type: true,
              },
            },
          },
        },
        slot: {
          columns: {
            id: true,
            start: true,
            end: true,
            remainingPlaces: true,
          },
        },
        service: {
          columns: {
            id: true,
            name: true,
            price: true,
            duration: true,
            places: true,
          },
        },
        client: {
          columns: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            image: true,
            address: true,
            city: true,
            country: true,
          },
        },
      },
    })

    if (!appointments) {
      throw new ActionError("No appointments found")
    }

    return appointments
  },
  [requireAuth, requireFullOrganization]
)

export const getAllAppointmentForClient = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const appointments = await db.query.appointments.findMany({
      where: eq(appointmentsTable.clientId, ctx.user?.id || ""),
      with: {
        pets: {
          with: {
            pet: {
              columns: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        slot: {
          columns: {
            id: true,
            start: true,
            end: true,
            remainingPlaces: true,
          },
        },
        service: {
          columns: {
            id: true,
            name: true,
            price: true,
            duration: true,
            places: true,
          },
        },
        client: {
          columns: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            image: true,
          },
        },
        pro: {
          columns: {
            id: true,
            name: true,
            logo: true,
          },
        },
      },
    })

    if (!appointments) {
      throw new ActionError("Appointment not found")
    }

    return appointments
  },
  [requireAuth]
)

export const getAppointmentsByPetId = createServerAction(
  z.object({
    petId: z.string(),
  }),
  async (input, ctx) => {
    const appointments = await db.query.petAppointments.findMany({
      where: and(eq(petAppointments.petId, input.petId), eq(appointmentsTable.status, "COMPLETED")),
      with: {
        appointment: {
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
                remainingPlaces: true,
              },
            },
            service: {
              columns: {
                id: true,
                name: true,
                price: true,
                duration: true,
                places: true,
              },
            },
            pro: {
              columns: {
                id: true,
                name: true,
                logo: true,
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
        },
      },
    })

    return appointments.map(pa => pa.appointment)
  },
  [requireAuth, requireFullOrganization]
)

export const getProNextAppointment = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const now = new Date()

    const appointments = await db.query.appointments.findMany({
      where: and(eq(appointmentsTable.proId, ctx.organization?.id || ""), eq(appointmentsTable.status, "CONFIRMED")),
      with: {
        slot: {
          columns: {
            id: true,
            start: true,
            end: true,
          },
        },
        pets: {
          with: {
            pet: {
              columns: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        service: {
          columns: {
            id: true,
            name: true,
            price: true,
            duration: true,
            places: true,
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

    if (futureAppointments.length === 0) {
      return {
        nextAppointment: null,
        client: null,
        pet: null,
      }
    }

    const nextAppointment = futureAppointments[0]
    const client = await db.query.user.findFirst({
      where: eq(user.id, nextAppointment.clientId || ""),
      columns: {
        name: true,
        email: true,
        phoneNumber: true,
        image: true,
      },
    })

    return {
      nextAppointment,
      client,
      pet: nextAppointment.pets?.[0]?.pet || null,
    }
  },
  [requireAuth, requireFullOrganization]
)

export const getPreviousPros = createServerAction(
  z.object({
    userId: z.string(),
  }),
  async (input, ctx) => {
    const appointments = await db.query.appointments.findMany({
      where: and(
        eq(appointmentsTable.clientId, input.userId),
        or(eq(appointmentsTable.status, "COMPLETED"), eq(appointmentsTable.status, "CONFIRMED"))
      ),
      with: {
        pro: {
          with: {
            address: true,
            services: {
              columns: {
                id: true,
                name: true,
                price: true,
                duration: true,
                places: true,
              },
            },
            ratings: {
              with: {
                writer: {
                  columns: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: [desc(appointmentsTable.createdAt)],
    })

    // Filtrer pour obtenir des organisations uniques
    const uniqueOrganizations = [
      ...new Map(
        appointments
          .filter(
            (appointment): appointment is typeof appointment & { pro: NonNullable<typeof appointment.pro> } =>
              appointment.pro !== null && appointment.pro !== undefined
          )
          .map(appointment => [appointment.pro.id, appointment.pro])
      ).values(),
    ]

    return uniqueOrganizations
  },
  [requireAuth]
)
