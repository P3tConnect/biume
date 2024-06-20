"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateUserNewsletterSchema } from "../db";

export async function getUserNewsletters() {}

export const createUserNewsletter = proAction(
    CreateUserNewsletterSchema,
    async (params, _) => {},
);

export const updateUserNewsletter = proAction(
    CreateUserNewsletterSchema,
    async (params, _) => {},
);

export const deleteUserNewsletter = proAction(
    z.string(),
    async (params, _) => {},
);
