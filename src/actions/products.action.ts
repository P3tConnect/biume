"use server";

import { z } from "zod";
import { CreateProductSchema, product } from "../db/products";
import { ownerAction, db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getProduct = ownerAction.handler(async () => {});

export const createProduct = ownerAction
  .input(CreateProductSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(product).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "Product not created");
    }

    return data;
  });

export const updateProduct = ownerAction
  .input(CreateProductSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(product)
      .set(input)
      .where(eq(product.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Product not updated");
    }

    return data;
  });

export const deleteProduct = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(product)
      .where(eq(product.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Product not deleted");
    }
  });
