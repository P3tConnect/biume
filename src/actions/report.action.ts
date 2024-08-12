"use server";

import { z } from "zod";
import { ActionError, proAction, userAction } from "../lib/action";
import { CreateReportSchema, report } from "../db";
import { eq } from "drizzle-orm";
import { db } from "../lib";

export const getReports = userAction.action(async () => {});

export const createReport = proAction
  .schema(CreateReportSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(report)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Report not created");
    }

    return data;
  });

export const updateReport = proAction
  .schema(CreateReportSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(report)
      .set(parsedInput)
      .where(eq(report.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Report not updated");
    }

    return data;
  });

export const deleteReport = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(report)
      .where(eq(report.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Report not deleted");
    }
  });
