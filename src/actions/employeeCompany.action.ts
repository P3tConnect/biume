"use server";

import { z } from "zod";
import { CreateEmployeeCompanySchema } from "../db";
import { proAction } from "../lib/action";

export const getEmployeesCompany = proAction.action(async () => {});

export const createEmployeeCompany = proAction
  .schema(CreateEmployeeCompanySchema)
  .action(async ({ parsedInput }) => {});

export const updateEmployeeCompany = proAction
  .schema(CreateEmployeeCompanySchema)
  .action(async ({ parsedInput }) => {});

export const deleteEmployeeCompany = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
