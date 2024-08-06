"use server";

import { z } from "zod";
import { CreateNewsletterSchema } from "../db";
import { proAction, userAction } from "../lib/action";

export const getNewsletters = userAction.action(async () => {});

export const createNewsletter = proAction
  .schema(CreateNewsletterSchema)
  .action(async () => {});

export const updateNewsletter = proAction
  .schema(CreateNewsletterSchema)
  .action(async () => {});

export const deleteNewsletter = proAction
  .schema(z.string())
  .action(async () => {});
