"use server";

import { z } from "zod";
import { ownerAction, clientAction } from "../lib/action";
import { CreateUserNewsletterSchema } from "../db";

export const getUserNewsletters = clientAction.handler(async () => {});

export const createUserNewsletter = ownerAction
  .input(CreateUserNewsletterSchema)
  .handler(async () => {});

export const updateUserNewsletter = ownerAction
  .input(CreateUserNewsletterSchema)
  .handler(async () => {});

export const deleteUserNewsletter = ownerAction
  .input(z.string())
  .handler(async () => {});
