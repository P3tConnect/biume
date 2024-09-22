"use server";
import { z } from "zod";
import { CreateUsersJobsSchema } from "../db";
import { ownerAction, clientAction } from "../lib/action";

export const getUsersJobs = clientAction.handler(async () => {});

export const createUsersJob = ownerAction
  .input(CreateUsersJobsSchema)
  .handler(async () => {});

export const updateUsersJob = ownerAction
  .input(CreateUsersJobsSchema)
  .handler(async () => {});

export const deleteUsersJob = ownerAction
  .input(z.string())
  .handler(async () => {});
