"use server";
import { z } from "zod";
import { CreateCategorySchema } from "../db";
import { proAction, userAction } from "../lib/action";

export const getCategories = userAction.action(async () => {});

export const getCategoryById = userAction
  .schema(z.string())
  .action(async () => {});

export const createCategory = proAction
  .schema(CreateCategorySchema)
  .action(async () => {});

export const updateCategory = proAction
  .schema(CreateCategorySchema)
  .action(async () => {});

export const deleteCategory = proAction
  .schema(z.string())
  .action(async () => {});
