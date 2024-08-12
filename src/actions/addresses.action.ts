"use server";
import { z } from "zod";
import { address, CreateAddressSchema } from "../db/addresses";
import { ActionError, db, userAction } from "../lib";
import { eq } from "drizzle-orm";

export const getAddresses = userAction.action(async () => {});

export const createAddresses = userAction
  .schema(CreateAddressSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(address)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Address not created");
    }

    return data;
  });

export const updateAddress = userAction
  .schema(CreateAddressSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(address)
      .set(parsedInput)
      .where(eq(address.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Address not updated");
    }

    return data;
  });

export const deleteAddress = userAction
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
