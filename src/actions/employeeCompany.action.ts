"use server";

import { z } from "zod";
import { CreateEmployeeCompanySchema, employeeCompany } from "../db";
import { companyAction, db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getEmployeesCompany = companyAction.handler(async () => {});

export const createEmployeeCompany = companyAction
  .input(CreateEmployeeCompanySchema)
  .handler(async ({ input }) => {
    const data = await db
      .insert(employeeCompany)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "EmployeeCompany not created");
    }

    return data;
  });

export const updateEmployeeCompany = companyAction
  .input(z.string())
  .handler(async ({ input, ctx }) => {
    const data = await db
      .update(employeeCompany)
      .set({
        companyId: ctx.company.id,
        employeeId: input,
      })
      .where(
        eq(employeeCompany.companyId, ctx.company.id) &&
          eq(employeeCompany.employeeId, input),
      )
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "EmployeeCompany not updated");
    }

    return data;
  });

export const deleteEmployeeCompany = companyAction
  .input(z.string())
  .handler(async ({ input }) => {});
