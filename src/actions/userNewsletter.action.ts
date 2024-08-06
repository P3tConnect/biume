"use server";

import { z } from "zod";
import { proAction, userAction } from "../lib/action";
import { CreateUserNewsletterSchema } from "../db";

export const getUserNewsletters = userAction.action(async () => {});

export const createUserNewsletter = proAction
  .schema(CreateUserNewsletterSchema)
  .action(async () => {});

export const updateUserNewsletter = proAction
  .schema(CreateUserNewsletterSchema)
  .action(async () => {});

export const deleteUserNewsletter = proAction
  .schema(z.string())
  .action(async () => {});
