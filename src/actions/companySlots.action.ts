"use server";

import { z } from "zod";
import { CreateCompanyDisponibilitiesSchema } from "../db";
import { proAction } from "../utils/action";

export async function getCompanyDisponibilities() {}

export const createCompanyDisponibilities = proAction(
  CreateCompanyDisponibilitiesSchema,
  async (params, _) => {},
);

export const updateCompanyDisponibilities = proAction(
  CreateCompanyDisponibilitiesSchema,
  async (params, _) => {},
);

export const deleteCompanyDisponibilities = proAction(
  z.string(),
  async (params, _) => {},
);
