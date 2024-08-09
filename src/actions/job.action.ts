import { CreateJobSchema } from "../db";
import { db, proAction } from "../lib";

export const getJobs = proAction.action(async () => {});

export const createJob = proAction
  .schema(CreateJobSchema)
  .action(async () => {});

export const updateJob = proAction
  .schema(CreateJobSchema)
  .action(async () => {});

export const deleteJob = proAction.action(async () => {});
