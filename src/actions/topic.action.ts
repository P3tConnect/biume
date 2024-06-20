"use server";

import { z } from "zod";
import { userAction } from "../utils/action";
import { CreateTopicSchema } from "../db";

export async function getTopics() {}

export const createTopic = userAction(
  CreateTopicSchema,
  async (params, _) => {},
);

export const updateTopic = userAction(
  CreateTopicSchema,
  async (params, _) => {},
);

export const deleteTopic = userAction(z.string(), async (params, _) => {});
