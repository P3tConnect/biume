"use server";

import { z } from "zod";
import { ownerAction, authedAction } from "../lib";
import { CreateUserNewsletterSchema } from "../db";

export const getUserNewsletters = authedAction.action(async () => {});

export const createUserNewsletter = ownerAction
  .schema(CreateUserNewsletterSchema)
  .action(async () => {});

export const updateUserNewsletter = ownerAction
  .schema(CreateUserNewsletterSchema)
  .action(async () => {});

export const deleteUserNewsletter = ownerAction
  .schema(z.string())
  .action(async () => {});
