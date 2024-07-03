"use server";

import { z } from "zod";
import { CreateCompanyDisponibilitiesSchema } from "../db";
import { proAction } from "../lib/action";

export async function getCompanyDisponibilities() {}

export const createCompanyDisponibilities = proAction
  .schema(CreateCompanyDisponibilitiesSchema)
  .action(async ({ parsedInput }) => {});

export const updateCompanyDisponibilities = proAction
  .schema(CreateCompanyDisponibilitiesSchema)
  .action(async ({ parsedInput }) => {});

export const deleteCompanyDisponibilities = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
