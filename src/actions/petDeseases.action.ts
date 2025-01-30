"use server";
import { z } from "zod";
import { CreatePetsDeseaseSchema } from "../db";
import { authedAction } from "../lib";

export const getPetDeseases = authedAction.action(async () => {});

export const createPetDesease = authedAction
  .schema(CreatePetsDeseaseSchema)
  .action(async ({ parsedInput }) => {});

export const updatePetDesease = authedAction
  .schema(CreatePetsDeseaseSchema)
  .action(async ({ parsedInput }) => {});

export const deletePetDesease = authedAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
