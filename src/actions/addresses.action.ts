"use server";
import { z } from "zod";
import { address, CreateAddressSchema } from "../db/addresses";
import { db, clientAction } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getAddresses = clientAction.handler(async () => {});

export const createAddresses = clientAction
  .input(CreateAddressSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(address).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "Address not created");
    }

    return data;
  });

export const updateAddress = clientAction
  .input(CreateAddressSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(address)
      .set(input)
      .where(eq(address.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Address not updated");
    }

    return data;
  });

export const deleteAddress = clientAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(address)
      .where(eq(address.id, input))
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Address not deleted");
    }
  });
