"use server";

import { z } from "zod";
import { clientAction, ownerAction, db } from "../lib";
import { CreateReportSchema, report } from "../db";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getReports = clientAction.handler(async () => {});

export const createReport = ownerAction
  .input(CreateReportSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(report).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "Report not created");
    }

    return data;
  });

export const updateReport = ownerAction
  .input(CreateReportSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(report)
      .set(input)
      .where(eq(report.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Report not updated");
    }

    return data;
  });

export const deleteReport = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(report)
      .where(eq(report.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Report not deleted");
    }
  });
