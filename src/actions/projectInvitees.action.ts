"use server";

import { z } from "zod";
import { CreateProjectInviteeSchema } from "../db";
import { proAction } from "../utils/action";

export async function getProjectInvitees() {}

export const createProjectInvitee = proAction(
  CreateProjectInviteeSchema,
  async (params, _) => {},
);

export const updateProjectInvitee = proAction(
  CreateProjectInviteeSchema,
  async (params, _) => {},
);

export const deleteProjectInvitee = proAction(
  z.string(),
  async (params, _) => {},
);
