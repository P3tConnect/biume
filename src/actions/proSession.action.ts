"use server";

import { z } from "zod";
import { CreateAppointmentSchema, appointments } from "../db";
import { clientAction, ownerAction, db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getAppointments = clientAction.handler(async () => {});

export const getAppointmentById = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {});

export const getAppointmentByCompany = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {});

export const createAppointment = ownerAction
  .input(CreateAppointmentSchema)
  .handler(async ({ input }) => {
    const data = await db
      .insert(appointments)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Appointment not created");
    }

    return data;
  });

export const updateAppointment = ownerAction
  .input(CreateAppointmentSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(appointments)
      .set(input)
      .where(eq(appointments.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Appointment not updated");
    }

    return data;
  });

export const deleteAppointment = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(appointments)
      .where(eq(appointments.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Appointment not deleted");
    }
  });
