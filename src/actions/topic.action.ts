"use server";

import { z } from "zod";
import { ActionError, userAction } from "../lib/action";
import { CreateTopicSchema, topic } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getTopics = userAction.action(async () => {});

export const createTopic = userAction
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

export const updateTopic = userAction
  .schema(CreateTopicSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(topic)
      .set(parsedInput)
      .where(eq(topic.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Topic not updated");
    }

    return data;
  });

export const deleteTopic = userAction
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
