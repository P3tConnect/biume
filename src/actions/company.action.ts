"use server";

import { z } from "zod";
import { CreateCompanySchema } from "../db";
import { proAction } from "../utils/action";

export async function getCompanies() {}

export async function getCompanyById() {}

export const createCompany = proAction(
    CreateCompanySchema,
    async (params, _) => {},
);

export const updateCompany = proAction(
    CreateCompanySchema,
    async (params, _) => {},
);

export const deleteCompany = proAction(z.string(), async (params, _) => {});
