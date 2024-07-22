"use server";
import { z } from "zod";
import { CreateCategorySchema } from "../db";
import { proAction } from "../lib";

export const getCategories = () => {};

export const createCategory = proAction
  .schema(CreateCategorySchema)
  .action(async () => {});

export const updateCategory = proAction
  .schema(CreateCategorySchema)
  .action(async () => {});

export const deleteCategory = proAction
  .schema(z.string())
  .action(async () => {});
