"use server";

import { z } from "zod";
import { authedAction, ownerAction, db, ActionError } from "../lib";
import { CreateReportSchema, report } from "../db";
import { eq } from "drizzle-orm";

export const getReports = authedAction.action(async () => {});

export const createReport = ownerAction
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

export const updateReport = ownerAction
  .schema(CreateReportSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(report)
      .set(parsedInput)
      .where(eq(report.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Report not updated");
    }

    return data;
  });

export const deleteReport = ownerAction
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
