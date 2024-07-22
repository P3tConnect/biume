"use server";

import { z } from "zod";
import { CreateIntolerenceSchema } from "../db";
import { userAction } from "../lib/action";

export async function getIntolerences() {}

export const createIntolerence = userAction
  .schema(CreateIntolerenceSchema)
  .action(async ({ parsedInput }) => {});

export const updateIntolerence = userAction
  .schema(CreateIntolerenceSchema)
  .action(async ({ parsedInput }) => {});

export const deleteIntolerence = userAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
