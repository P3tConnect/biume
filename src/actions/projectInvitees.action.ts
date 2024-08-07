"use server";

import { z } from "zod";
import { CreateProjectInviteeSchema } from "../db";
import { proAction } from "../lib/action";

export const getProjectInvitees = proAction.action(async () => {});

export const createProjectInvitee = proAction
  .schema(CreateProjectInviteeSchema)
  .action(async () => {});

export const updateProjectInvitee = proAction
  .schema(CreateProjectInviteeSchema)
  .action(async () => {});

export const deleteProjectInvitee = proAction
  .schema(z.string())
  .action(async () => {});
