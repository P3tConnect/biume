"use server";

import { z } from "zod";
import { CreateEmployeeCompanySchema } from "../db";
import { proAction } from "../utils/action";

export async function getEmployeesCompany() {}

export const createEmployeeCompany = proAction
  .schema(CreateEmployeeCompanySchema)
  .action(async ({ parsedInput }) => {});

export const updateEmployeeCompany = proAction
  .schema(CreateEmployeeCompanySchema)
  .action(async ({ parsedInput }) => {});

export const deleteEmployeeCompany = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
