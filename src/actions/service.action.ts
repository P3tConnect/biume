"use server";

import { z } from "zod";
import { ActionError, proAction, userAction } from "../lib/action";
import { CreateServiceSchema, service } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getServices = userAction.action(async () => {});

export const createService = proAction
  .schema(CreateServiceSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(service)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Service not created");
    }

    return data;
  });

export const updateService = proAction
  .schema(CreateServiceSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(service)
      .set(parsedInput)
      .where(eq(service.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Service not updated");
    }

    return data;
  });

export const deleteService = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(service)
      .where(eq(service.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Service not deleted");
    }
  });
