import { eq } from "drizzle-orm";
import { CreateJobSchema, job } from "../db";
import { db, ownerAction, ActionError } from "../lib";
import { z } from "zod";

export const getJobs = ownerAction.action(async () => {});

export const createJob = ownerAction
  .schema(CreateJobSchema)
  .action(async ({ parsedInput }) => {
    const data = await db.insert(job).values(parsedInput).returning().execute();

    if (!data) {
      throw new ActionError("Job not created");
    }

    return data;
  });

export const updateJob = ownerAction
  .schema(CreateJobSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(job)
      .set(parsedInput)
      .where(eq(job.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Job not updated");
    }

    return data;
  });

export const deleteJob = ownerAction
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
