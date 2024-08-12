"use server";

import { z } from "zod";
import { CreateProductSchema, product } from "../db/products";
import { ActionError, proAction } from "../lib/action";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getProduct = proAction.action(async () => {});

export const createProduct = proAction
  .schema(CreateProductSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(product)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Product not created");
    }

    return data;
  });

export const updateProduct = proAction
  .schema(CreateProductSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(product)
      .set(parsedInput)
      .where(eq(product.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Product not updated");
    }

    return data;
  });

export const deleteProduct = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(product)
      .where(eq(product.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Product not deleted");
    }
  });
