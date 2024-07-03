"use server";

import { z } from "zod";
import { userAction } from "../utils/action";
import { CreateTopicSchema } from "../db";

export async function getTopics() {}

export const createTopic = userAction
  .schema(CreateTopicSchema)
  .action(async () => {});

export const updateTopic = userAction
  .schema(CreateTopicSchema)
  .action(async () => {});

export const deleteTopic = userAction.schema(z.string()).action(async () => {});
