"use server";

import { z } from "zod";
import { CreateProjectSchema } from "../db";
import { proAction } from "../utils/action";

export async function getProjects() {}

export const createProject = proAction
  .schema(CreateProjectSchema)
  .action(async () => {});

export const updateProject = proAction
  .schema(CreateProjectSchema)
  .action(async () => {});

export const deleteProject = proAction
  .schema(z.string())
  .action(async () => {});
