import { z } from "zod";
import { CreateJobSchema } from "../db";
import { proAction, userAction } from "../lib/action";

export const getJobs = userAction.action(async () => {});

export const createJob = proAction
  .schema(CreateJobSchema)
  .action(async () => {});

export const updateJob = proAction
  .schema(CreateJobSchema)
  .action(async () => {});

export const deleteJob = proAction.schema(z.string()).action(async () => {});
