import { z } from "zod";
import { bgJobs, CreateBgJobsSchema } from "../db/bgJobs";
import { db, ownerAction, ActionError } from "../lib";
import { eq } from "drizzle-orm";

export const getBgJobs = ownerAction.action(async () => {});

export const createBgJob = ownerAction
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

export const updateBgJob = ownerAction
  .schema(CreateBgJobsSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(bgJobs)
      .set(parsedInput)
      .where(eq(bgJobs.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("BgJob not updated");
    }

    return data;
  });

export const deleteBgJob = ownerAction
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
