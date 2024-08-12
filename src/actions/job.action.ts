import { eq } from "drizzle-orm";
import { CreateJobSchema, job } from "../db";
import { ActionError, db, proAction } from "../lib";
import { z } from "zod";

export const getJobs = proAction.action(async () => {});

export const createJob = proAction
  .schema(CreateJobSchema)
  .action(async ({ parsedInput }) => {
    const data = await db.insert(job).values(parsedInput).returning().execute();

    if (!data) {
      throw new ActionError("Job not created");
    }

    return data;
  });

export const updateJob = proAction
  .schema(CreateJobSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(job)
      .set(parsedInput)
      .where(eq(job.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Job not updated");
    }

    return data;
  });

export const deleteJob = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(job)
      .where(eq(job.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Job not deleted");
    }
  });
