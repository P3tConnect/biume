import { eq, and, or } from "drizzle-orm"
import { z } from "zod"

import { requireAuth, requireFullOrganization } from "@/src/lib/action"

import { appointments as appointmentsTable } from "../db/appointments"
import { ActionError, createServerAction, db } from "../lib"

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

export const getPendingAndPayedAppointments = createServerAction(
  z.object({}),
  async (input, ctx) => {

    const appointments = await db.query.appointments.findMany({
      where: and(
        or(eq(appointmentsTable.status, "SCHEDULED"), eq(appointmentsTable.status, "PAYED")), 
        eq(appointmentsTable.proId, ctx.organization?.id || "")
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
          }
        },
        slot: {
          columns: {
            id: true,
            start: true,
            end: true,
          }
        },
        service: {
          columns: {
            id: true,
            name: true,
          }
        },
        client: {
          columns: {
            id: true,
            email: true,
            name: true,
          }
        },
        pro: {
          columns: {
            id: true,
            name: true,
          }
        }
      },
    });

    if (!appointments) {
      throw new ActionError("No appointments found")
    }

    return appointments
  },
  [requireAuth, requireFullOrganization]
);
