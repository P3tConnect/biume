import { z } from "zod";
import { CreateJobSchema } from "../db";
import { companyAction, clientAction } from "../lib/action";

export const getJobs = clientAction.handler(async () => {});

export const createJob = companyAction
  .input(CreateJobSchema)
  .handler(async () => {});

export const updateJob = companyAction
  .input(CreateJobSchema)
  .handler(async () => {});

export const deleteJob = companyAction
  .input(z.string())
  .handler(async () => {});
