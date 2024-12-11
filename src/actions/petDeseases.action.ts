"use server";
import { z } from "zod";
import { CreatePetsDeseaseSchema } from "../db";
import { clientAction } from "../lib";

export const getPetDeseases = clientAction.handler(async () => {});

export const createPetDesease = clientAction
  .input(CreatePetsDeseaseSchema)
  .handler(async () => {});

export const updatePetDesease = clientAction
  .input(CreatePetsDeseaseSchema)
  .handler(async () => {});

export const deletePetDesease = clientAction
  .input(z.string())
  .handler(async () => {});
