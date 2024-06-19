"use server";

import { z } from "zod";
import { userAction } from "../utils/action";
import { CreateUserSchema } from "../db";

export async function getUsers() {}

export const createUser = userAction(CreateUserSchema, async (params, _) => {});

export const updateUser = userAction(CreateUserSchema, async (params, _) => {});

export const deleteUser = userAction(z.string(), async (params, _) => {});
