import { z } from "zod";
import { CreateBgJobsSchema } from "../db/bgJobs";
import { proAction } from "../lib";

export const getBgJobs = proAction.action(async () => {});

export const createBgJob = proAction
  .schema(CreateBgJobsSchema)
  .action(async () => {});

export const updateBgJob = proAction
  .schema(CreateBgJobsSchema)
  .action(async () => {});

export const deleteBgJob = proAction.schema(z.string()).action(async () => {});
