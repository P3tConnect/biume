"use server";

import { z } from "zod";
import { authedAction, db, ActionError } from "../lib";
import { CreateTopicSchema, topic } from "../db";
import { eq } from "drizzle-orm";

export const getTopics = authedAction.action(async () => {});

export const createTopic = authedAction
  .schema(CreateTopicSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(topic)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Topic not created");
    }

    return data;
  });

export const updateTopic = authedAction
  .schema(CreateTopicSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(topic)
      .set(parsedInput)
      .where(eq(topic.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Topic not updated");
    }

    return data;
  });

export const deleteTopic = authedAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(topic)
      .where(eq(topic.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Topic not deleted");
    }
  });
