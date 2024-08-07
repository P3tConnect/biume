"use server";

import { z } from "zod";
import { proAction, userAction } from "../lib/action";
import { CreateReportSchema } from "../db";

export const getReports = userAction.action(async () => {});

export const createReport = proAction
  .schema(CreateReportSchema)
  .action(async () => {});

export const updateReport = proAction
  .schema(CreateReportSchema)
  .action(async () => {});

export const deleteReport = proAction.schema(z.string()).action(async () => {});
