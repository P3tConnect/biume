import { z } from "zod";
import { bgJobs, CreateBgJobsSchema } from "../db/bgJobs";
import { db, ownerAction } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getBgJobs = ownerAction.handler(async () => {});

export const createBgJob = ownerAction
  .input(CreateBgJobsSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(bgJobs).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "BgJob not created");
    }

    return data;
  });

export const updateBgJob = ownerAction
  .input(CreateBgJobsSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(bgJobs)
      .set(input)
      .where(eq(bgJobs.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "BgJob not updated");
    }

    return data;
  });

export const deleteBgJob = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db.delete(bgJobs).where(eq(bgJobs.id, input)).execute();

    if (!data) {
      throw new ZSAError("ERROR", "BgJob not deleted");
    }
  });
