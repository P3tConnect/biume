"use server";

import { z } from "zod";
import { CreateProjectSchema } from "../db";
import { proAction } from "../utils/action";

export async function getProjects() {}

export const createProject = proAction(
  CreateProjectSchema,
  async (params, _) => {},
);

export const updateProject = proAction(
  CreateProjectSchema,
  async (params, _) => {},
);

export const deleteProject = proAction(z.string(), async (params, _) => {});
