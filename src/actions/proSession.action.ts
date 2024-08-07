"use server";

import { z } from "zod";
import { CreateProSessionSchema } from "../db";
import { proAction, userAction } from "../lib/action";

export const getProSessions = userAction.action(async () => {});

export const getProSessionById = proAction
  .schema(z.string())
  .action(async () => {});

export const getProSessionByCompany = proAction
  .schema(z.string())
  .action(async () => {});

export const createProSession = proAction
  .schema(CreateProSessionSchema)
  .action(async () => {});

export const updateProSession = proAction
  .schema(CreateProSessionSchema)
  .action(async () => {});

export const deleteProSession = proAction
  .schema(z.string())
  .action(async () => {});
