"use server";

import { z } from "zod";
import { CreateNewsletterSchema } from "../db";
import { proAction } from "../utils/action";

export async function getNewsletters() {}

export const createNewsletter = proAction(
    CreateNewsletterSchema,
    async (params, _) => {},
);

export const updateNewsletter = proAction(
    CreateNewsletterSchema,
    async (params, _) => {},
);

export const deleteNewsletter = proAction(z.string(), async (params, _) => {});
