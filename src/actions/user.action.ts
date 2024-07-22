"use server";

import { z } from "zod";
import { userAction } from "../lib/action";
import { CreateUserSchema } from "../db";

export async function getUsers() {}

export const createUser = userAction
  .schema(CreateUserSchema)
  .action(async () => {});

export const updateUser = userAction
  .schema(CreateUserSchema)
  .action(async () => {});

export const deleteUser = userAction.schema(z.string()).action(async () => {});
