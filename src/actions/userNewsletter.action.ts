"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateUserNewsletterSchema } from "../db";

export async function getUserNewsletters() {}

export const createUserNewsletter = proAction
  .schema(CreateUserNewsletterSchema)
  .action(async () => {});

export const updateUserNewsletter = proAction
  .schema(CreateUserNewsletterSchema)
  .action(async () => {});

export const deleteUserNewsletter = proAction
  .schema(z.string())
  .action(async () => {});
