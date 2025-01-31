"use server";
import { z } from "zod";
import { address, CreateAddressSchema } from "../db";
import { db, ActionError, action } from "../lib";
import { eq } from "drizzle-orm";

export const getAddresses = action.action(async () => {});

export const createAddresses = action
  .schema(CreateAddressSchema)
  .action(async ({ parsedInput }) => {
    try {
      const data = await db
        .insert(address)
        .values(parsedInput)
        .returning()
        .execute();

      if (!data) {
        throw new ActionError("Address not created");
      }

      return data;
    } catch (err) {
      throw new ActionError(err as string);
    }
  });

export const updateAddress = action
  .schema(CreateAddressSchema)
  .action(async ({ parsedInput }) => {
    try {
      const data = await db
        .update(address)
        .set(parsedInput)
        .where(eq(address.id, parsedInput.id as string))
        .returning()
        .execute();

      if (!data) {
        throw new ActionError("Address not updated");
      }

      return data;
    } catch (err) {
      throw new ActionError(err as string);
    }
  });

export const deleteAddress = action
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(address)
      .where(eq(address.id, parsedInput))
      .execute();

    if (!data) {
      throw new ActionError("Address not deleted");
    }
  });
