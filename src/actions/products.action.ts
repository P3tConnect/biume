"use server";

import { z } from "zod";
import { CreateProductSchema } from "../db/products";
import { proAction } from "../lib/action";

export const getProduct = proAction.action(async () => {});

export const createProduct = proAction
  .schema(CreateProductSchema)
  .action(async () => {});

export const updateProduct = proAction
  .schema(CreateProductSchema)
  .action(async () => {});

export const deleteProduct = proAction
  .schema(z.string())
  .action(async () => {});
