import { z } from "zod";
import { CreateJobSchema } from "../db";
import { ownerAction, authedAction } from "../lib";

export const getJobs = authedAction.action(async () => {});

export const createJob = ownerAction
  .schema(CreateJobSchema)
  .action(async ({ parsedInput }) => {});

export const updateJob = ownerAction
  .schema(CreateJobSchema)
  .action(async ({ parsedInput }) => {});

export const deleteJob = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
