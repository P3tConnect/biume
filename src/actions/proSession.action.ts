"use server";

import { z } from "zod";
import { CreateAppointmentSchema, appointments } from "../db";
import { authedAction, ownerAction, db, ActionError } from "../lib";
import { eq } from "drizzle-orm";

export const getAppointments = authedAction.action(async () => {});

export const getAppointmentById = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});

export const getAppointmentByCompany = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});

export const createAppointment = ownerAction
  .schema(CreateAppointmentSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(appointments)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Appointment not created");
    }

    return data;
  });

export const updateAppointment = ownerAction
  .schema(CreateAppointmentSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(appointments)
      .set(parsedInput)
      .where(eq(appointments.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Appointment not updated");
    }

    return data;
  });

export const deleteAppointment = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(appointments)
      .where(eq(appointments.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Appointment not deleted");
    }
  });
