"use server";

import { z } from "zod";
import { clientAction, ownerAction, db } from "../lib";
import { CreateServiceSchema, service } from "../db";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getServices = clientAction.handler(async () => {});

export const createService = ownerAction
  .input(CreateServiceSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(service).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "Service not created");
    }

    return data;
  });

export const updateService = ownerAction
  .input(CreateServiceSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(service)
      .set(input)
      .where(eq(service.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Service not updated");
    }

    return data;
  });

export const deleteService = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(service)
      .where(eq(service.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Service not deleted");
    }
  });
