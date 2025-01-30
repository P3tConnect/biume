"use server";
import { z } from "zod";
import { address, CreateAddressSchema } from "../db";
import { db, authedAction, ActionError } from "../lib";
import { eq } from "drizzle-orm";

export const getAddresses = authedAction.action(async () => {});

export const createAddresses = authedAction
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

export const updateAddress = authedAction
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

export const deleteAddress = authedAction
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
