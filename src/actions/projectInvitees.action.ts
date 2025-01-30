"use server";

import { z } from "zod";
import { CreateProjectInviteeSchema } from "../db";
import { ownerAction } from "../lib";

export const getProjectInvitees = ownerAction.action(async () => {});

export const createProjectInvitee = ownerAction
  .schema(CreateProjectInviteeSchema)
  .action(async ({ parsedInput }) => {});

export const updateProjectInvitee = ownerAction
  .schema(CreateProjectInviteeSchema)
  .action(async ({ parsedInput }) => {});

export const deleteProjectInvitee = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
