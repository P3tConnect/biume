import { z } from "zod";
import { bgJobs, CreateBgJobsSchema } from "../db/bgJobs";
import { ActionError, db, proAction } from "../lib";
import { eq } from "drizzle-orm";

export const getBgJobs = proAction.action(async () => {});

export const createBgJob = proAction
  .schema(CreateBgJobsSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(bgJobs)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("BgJob not created");
    }

    return data;
  });

export const updateBgJob = proAction
  .schema(CreateBgJobsSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(bgJobs)
      .set(parsedInput)
      .where(eq(bgJobs.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("BgJob not updated");
    }

    return data;
  });

export const deleteBgJob = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(bgJobs)
      .where(eq(bgJobs.id, parsedInput))
      .execute();

    if (!data) {
      throw new ActionError("BgJob not deleted");
    }
  });
