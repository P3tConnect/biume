"use server";
import { z } from "zod";
import { CreateCompanyAddressSchema } from "../db/companyAddress";
import { proAction, userAction } from "../lib";

export const getCompanyAddress = () => {};

export const createCompanyAddress = proAction
  .schema(CreateCompanyAddressSchema)
  .action(async () => {});

export const updateCompanyAddress = proAction
  .schema(CreateCompanyAddressSchema)
  .action(async () => {});

export const deleteCompanyAddress = proAction
  .schema(z.string())
  .action(async () => {});
