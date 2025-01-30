"use server";

import { z } from "zod";
import { CreateNewsletterSchema, newsletter } from "../db";
import { authedAction, ownerAction, ActionError } from "../lib";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getNewsletters = authedAction.action(async () => {});
