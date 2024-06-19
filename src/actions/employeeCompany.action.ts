"use server";

import { z } from "zod";
import { CreateEmployeeCompanySchema } from "../db";
import { proAction } from "../utils/action";

export async function getEmployeeCompany() {}

export async function getEmployeesOfACompany() {}

export const createEmployeeCompany = proAction(
    CreateEmployeeCompanySchema,
    async (params, _) => {},
);

export const updateEmployeeCompany = proAction(
    CreateEmployeeCompanySchema,
    async (params, _) => {},
);

export const deleteEmployeeCompany = proAction(
    z.string(),
    async (params, _) => {},
);
