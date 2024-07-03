"use server";

import { z } from "zod";
import { CreateProductSchema } from "../db/products";
import { proAction } from "../utils/action";

export async function getProduct() {}

export const createProduct = proAction
  .schema(CreateProductSchema)
  .action(async () => {});

export const updateProduct = proAction
  .schema(CreateProductSchema)
  .action(async () => {});

export const deleteProduct = proAction
  .schema(z.string())
  .action(async () => {});
