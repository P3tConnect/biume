"use server";
import { z } from "zod";
import { CreatePetsDeseaseSchema } from "../db";
import { userAction } from "../lib";

export const getPetDeseases = userAction.action(async () => {});

export const createPetDesease = userAction
  .schema(CreatePetsDeseaseSchema)
  .action(async () => {});

export const updatePetDesease = userAction
  .schema(CreatePetsDeseaseSchema)
  .action(async () => {});

export const deletePetDesease = userAction
  .schema(z.string())
  .action(async () => {});
