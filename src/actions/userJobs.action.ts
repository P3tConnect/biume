import { z } from "zod";
import { CreateJobSchema } from "../db";
import { ownerAction, authedAction } from "../lib/action";

export const getJobs = authedAction.handler(async () => {});

export const createJob = ownerAction
  .input(CreateJobSchema)
  .handler(async () => {});

export const updateJob = ownerAction
  .input(CreateJobSchema)
  .handler(async () => {});

export const deleteJob = ownerAction.input(z.string()).handler(async () => {});
