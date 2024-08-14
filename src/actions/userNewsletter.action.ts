"use server";

import { z } from "zod";
import { companyAction, clientAction } from "../lib/action";
import { CreateUserNewsletterSchema } from "../db";

export const getUserNewsletters = clientAction.handler(async () => {});

export const createUserNewsletter = companyAction
  .input(CreateUserNewsletterSchema)
  .handler(async () => {});

export const updateUserNewsletter = companyAction
  .input(CreateUserNewsletterSchema)
  .handler(async () => {});

export const deleteUserNewsletter = companyAction
  .input(z.string())
  .handler(async () => {});
