"use server";
import { z } from "zod";
import { CreateUsersJobsSchema } from "../db";
import { ownerAction, authedAction } from "../lib";

export const getUsersJobs = authedAction.action(async () => {});

export const createUsersJob = ownerAction
  .schema(CreateUsersJobsSchema)
  .action(async () => {});

export const updateUsersJob = ownerAction
  .schema(CreateUsersJobsSchema)
  .action(async () => {});

export const deleteUsersJob = ownerAction
  .schema(z.string())
  .action(async () => {});
