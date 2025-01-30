"use server";
import { z } from "zod";
import { category, CreateCategorySchema } from "../db";
import { authedAction, ownerAction, ActionError } from "../lib";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getCategories = authedAction.action(async () => {});

export const getCategoryById = authedAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});

export const createCategory = ownerAction
  .schema(CreateCategorySchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(category)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Category not created");
    }

    return data;
  });

export const updateCategory = ownerAction
  .schema(CreateCategorySchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(category)
      .set(parsedInput)
      .where(eq(category.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Category not updated");
    }

    return data;
  });

export const deleteCategory = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(category)
      .where(eq(category.id, parsedInput))
      .execute();

    if (!data) {
      throw new ActionError("Category not deleted");
    }
  });
