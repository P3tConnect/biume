"use server";

import { z } from "zod";
import { CreateCompanySchema } from "../db";
import { proAction } from "../utils/action";

export async function getCompanies() {}

export async function getCompanyById() {}

export const createCompany = proAction
  .schema(CreateCompanySchema)
  .action(async ({ parsedInput }) => {});

export const updateCompany = proAction
  .schema(CreateCompanySchema)
  .action(async ({ parsedInput }) => {});

export const deleteCompany = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
