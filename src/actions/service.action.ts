"use server";

import { z } from "zod";
import { proAction, userAction } from "../lib/action";
import { CreateServiceSchema } from "../db";

export const getServices = userAction.action(async () => {});

export const createService = proAction
  .schema(CreateServiceSchema)
  .action(async () => {});

export const updateService = proAction
  .schema(CreateServiceSchema)
  .action(async () => {});

export const deleteService = proAction
  .schema(z.string())
  .action(async () => {});
