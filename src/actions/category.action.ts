"use server";
import { z } from "zod";
import { category, CreateCategorySchema } from "../db";
import { clientAction, companyAction } from "../lib/action";
import { db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getCategories = clientAction.handler(async () => {});

export const getCategoryById = clientAction
  .input(z.string())
  .handler(async ({ input }) => {});

export const createCategory = companyAction
  .input(CreateCategorySchema)
  .handler(async ({ input, ctx }) => {
    const data = await db.insert(category).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "Category not created");
    }

    return data;
  });

export const updateCategory = companyAction
  .input(CreateCategorySchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(category)
      .set(input)
      .where(eq(category.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Category not updated");
    }

    return data;
  });

export const deleteCategory = companyAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(category)
      .where(eq(category.id, input))
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Category not deleted");
    }
  });
