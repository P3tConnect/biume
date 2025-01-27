"use server";
import { z } from "zod";
import { CreateUsersJobsSchema } from "../db";
import { ownerAction, authedAction } from "../lib/action";

export const getUsersJobs = authedAction.handler(async () => {});

export const createUsersJob = ownerAction
  .input(CreateUsersJobsSchema)
  .handler(async () => {});

export const updateUsersJob = ownerAction
  .input(CreateUsersJobsSchema)
  .handler(async () => {});

export const deleteUsersJob = ownerAction
  .input(z.string())
  .handler(async () => {});
