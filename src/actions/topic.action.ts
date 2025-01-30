"use server";

import { z } from "zod";
import { authedAction, db } from "../lib";
import { CreateTopicSchema, topic } from "../db";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getTopics = authedAction.handler(async () => {});

export const createTopic = authedAction
  .input(CreateTopicSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(topic).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "Topic not created");
    }

    return data;
  });

export const updateTopic = authedAction
  .input(CreateTopicSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(topic)
      .set(input)
      .where(eq(topic.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Topic not updated");
    }

    return data;
  });

export const deleteTopic = authedAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(topic)
      .where(eq(topic.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Topic not deleted");
    }
  });
