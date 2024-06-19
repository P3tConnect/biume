"use server";

import { z } from "zod";
import { CreateProductSchema } from "../db/products";
import { proAction } from "../utils/action";

export async function getProduct() {}

export const createProduct = proAction(
    CreateProductSchema,
    async (params, _) => {},
);

export const updateProduct = proAction(
    CreateProductSchema,
    async (params, _) => {},
);

export const deleteProduct = proAction(z.string(), async (params, _) => {});
