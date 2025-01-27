"use server";

import { z } from "zod";
import { authedAction, db } from "../lib";
import { CreatePetSchema, pets } from "../db";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getPets = authedAction.handler(async () => {});

export const createPet = authedAction
  .input(CreatePetSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(pets).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "Pet not created");
    }

    return data;
  });

export const updatePet = authedAction
  .input(CreatePetSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(pets)
      .set(input)
      .where(eq(pets.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Pet not updated");
    }

    return data;
  });

export const deletePet = authedAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(pets)
      .where(eq(pets.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Pet not deleted");
    }
  });
