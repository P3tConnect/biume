"use server";

import { z } from "zod";
import { userAction } from "../lib/action";
import { CreatePetSchema } from "../db";

export async function getPets() {}

export const createPet = userAction
  .schema(CreatePetSchema)
  .action(async () => {});

export const updatePet = userAction
  .schema(CreatePetSchema)
  .action(async () => {});

export const deletePet = userAction.schema(z.string()).action(async () => {});
