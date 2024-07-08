"use server";
import { z } from "zod";
import { CreateJobSchema } from "../db";
import { proAction } from "../lib";

export const getJobs = () => {};

export const createJob = proAction
  .schema(CreateJobSchema)
  .action(async () => {});

export const updateJob = proAction
  .schema(CreateJobSchema)
  .action(async () => {});

export const deleteJob = proAction.schema(z.string()).action(async () => {});
