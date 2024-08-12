"use server";
import { z } from "zod";
import { category, CreateCategorySchema } from "../db";
import { ActionError, proAction, userAction } from "../lib/action";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getCategories = userAction.action(async () => {});

export const getCategoryById = userAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});

export const createCategory = proAction
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

export const updateCategory = proAction
  .schema(CreateCategorySchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(category)
      .set(parsedInput)
      .where(eq(category.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Category not updated");
    }

    return data;
  });

export const deleteCategory = proAction
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
