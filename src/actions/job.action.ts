import { eq } from "drizzle-orm";
import { CreateJobSchema, job } from "../db";
import { db, ownerAction } from "../lib";
import { z } from "zod";
import { ZSAError } from "zsa";

export const getJobs = ownerAction.handler(async () => {});

export const createJob = ownerAction
  .input(CreateJobSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(job).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "Job not created");
    }

    return data;
  });

export const updateJob = ownerAction
  .input(CreateJobSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(job)
      .set(input)
      .where(eq(job.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Job not updated");
    }

    return data;
  });

export const deleteJob = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(job)
      .where(eq(job.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Job not deleted");
    }
  });
