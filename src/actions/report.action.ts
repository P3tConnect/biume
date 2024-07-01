"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateReportSchema } from "../db";

export async function getReports() {}

export const createReport = proAction
  .schema(CreateReportSchema)
  .action(async () => {});

export const updateReport = proAction
  .schema(CreateReportSchema)
  .action(async () => {});

export const deleteReport = proAction.schema(z.string()).action(async () => {});
