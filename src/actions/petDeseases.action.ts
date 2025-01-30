"use server";
import { z } from "zod";
import { CreatePetsDeseaseSchema } from "../db";
import { authedAction } from "../lib";

export const getPetDeseases = authedAction.handler(async () => {});

export const createPetDesease = authedAction
  .input(CreatePetsDeseaseSchema)
  .handler(async () => {});

export const updatePetDesease = authedAction
  .input(CreatePetsDeseaseSchema)
  .handler(async () => {});

export const deletePetDesease = authedAction
  .input(z.string())
  .handler(async () => {});
