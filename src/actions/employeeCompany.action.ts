"use server";

import { z } from "zod";
import { CreateEmployeeCompanySchema, employeeCompany } from "../db";
import { ActionError, proAction } from "../lib/action";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getEmployeesCompany = proAction.action(async () => {});

export const createEmployeeCompany = proAction
  .schema(CreateEmployeeCompanySchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(employeeCompany)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("EmployeeCompany not created");
    }

    return data;
  });

export const updateEmployeeCompany = proAction
  .schema(CreateEmployeeCompanySchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(employeeCompany)
      .set(parsedInput)
      .where(eq(employeeCompany.companyId, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("EmployeeCompany not updated");
    }

    return data;
  });

export const deleteEmployeeCompany = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
