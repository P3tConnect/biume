"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateReportSchema } from "../db";

export async function getReports() {}

export const createReport = proAction(
  CreateReportSchema,
  async (params, _) => {},
);

export const updateReport = proAction(
  CreateReportSchema,
  async (params, _) => {},
);

export const deleteReport = proAction(z.string(), async (params, _) => {});
