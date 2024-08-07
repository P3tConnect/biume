"use server";

import { z } from "zod";
import { userAction } from "../lib/action";
import { CreateTopicSchema } from "../db";

export const getTopics = userAction.action(async () => {});

export const createTopic = userAction
  .schema(CreateTopicSchema)
  .action(async () => {});

export const updateTopic = userAction
  .schema(CreateTopicSchema)
  .action(async () => {});

export const deleteTopic = userAction.schema(z.string()).action(async () => {});
