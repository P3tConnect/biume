"use server";

import { z } from "zod";
import { CreateProjectSchema } from "../db";
import { proAction } from "../lib/action";

export const getProjects = proAction.action(async () => {});

export const createProject = proAction
  .schema(CreateProjectSchema)
  .action(async () => {});

export const updateProject = proAction
  .schema(CreateProjectSchema)
  .action(async () => {});

export const deleteProject = proAction
  .schema(z.string())
  .action(async () => {});
