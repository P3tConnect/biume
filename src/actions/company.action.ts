"use server";

import { z } from "zod";
import { CreateCompanySchema } from "../db";
import { proAction, userAction } from "../lib/action";

export const getCompanies = userAction.action(async () => {});

export const getCompanyById = userAction
  .schema(z.string())
  .action(async () => {});

export const createCompany = proAction
  .schema(CreateCompanySchema)
  .action(async ({ parsedInput }) => {});

export const updateCompany = proAction
  .schema(CreateCompanySchema)
  .action(async ({ parsedInput }) => {});

export const deleteCompany = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
