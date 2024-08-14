"use server";
import { z } from "zod";
import { CreateUsersJobsSchema } from "../db";
import { companyAction, clientAction } from "../lib/action";

export const getUsersJobs = clientAction.handler(async () => {});

export const createUsersJob = companyAction
  .input(CreateUsersJobsSchema)
  .handler(async () => {});

export const updateUsersJob = companyAction
  .input(CreateUsersJobsSchema)
  .handler(async () => {});

export const deleteUsersJob = companyAction
  .input(z.string())
  .handler(async () => {});
