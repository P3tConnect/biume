"use server";
import { z } from "zod";
import { CreateUsersJobsSchema } from "../db";
import { proAction, userAction } from "../lib/action";

export const getUsersJobs = userAction.action(async () => {});

export const createUsersJob = proAction
  .schema(CreateUsersJobsSchema)
  .action(async () => {});

export const updateUsersJob = proAction
  .schema(CreateUsersJobsSchema)
  .action(async () => {});

export const deleteUsersJob = proAction
  .schema(z.string())
  .action(async () => {});
