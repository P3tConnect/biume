"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateServiceSchema } from "../db";

export async function getServices() {}

export const createService = proAction
  .schema(CreateServiceSchema)
  .action(async () => {});

export const updateService = proAction
  .schema(CreateServiceSchema)
  .action(async () => {});

export const deleteService = proAction
  .schema(z.string())
  .action(async () => {});
