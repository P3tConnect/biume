"use server";

import { z } from "zod";
import { CreateProSessionSchema } from "../db";
import { proAction } from "../lib/action";

export async function getProSessions() {}

export const createProSession = proAction
  .schema(CreateProSessionSchema)
  .action(async () => {});

export const updateProSession = proAction
  .schema(CreateProSessionSchema)
  .action(async () => {});

export const deleteProSession = proAction
  .schema(z.string())
  .action(async () => {});
