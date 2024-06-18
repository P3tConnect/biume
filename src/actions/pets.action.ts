"use server";

import { z } from "zod";
import { userAction } from "../utils/action";
import { CreatePetSchema } from "../db";

export async function getPets() {}

export const createPet = userAction(CreatePetSchema, async (params, _) => {});

export const updatePet = userAction(CreatePetSchema, async (params, _) => {});

export const deletePet = userAction(z.string(), async (params, _) => {});
