import { eq } from "drizzle-orm";
import { ActionError, createServerAction, db } from "../lib";
import { z } from "zod";
import { appointments as appointmentsTable } from "../db/appointments";
import { requireAuth, requireFullOrganization } from "@/src/lib/action";

export const getAllAppointments = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const appointments = await db
      .select()
      .from(appointmentsTable)
      .where(eq(appointmentsTable.proId, ctx.organization?.id || ""));

    if (!appointments) {
      throw new ActionError("No appointments found");
    }

    return appointments;
  },
  [requireAuth, requireFullOrganization],
);
