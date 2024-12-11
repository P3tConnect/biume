"use server";

import { z } from "zod";
import { CreateProjectInviteeSchema } from "../db";
import { ownerAction } from "../lib/action";

export const getProjectInvitees = ownerAction.handler(async () => {});

export const createProjectInvitee = ownerAction
  .input(CreateProjectInviteeSchema)
  .handler(async () => {});

export const updateProjectInvitee = ownerAction
  .input(CreateProjectInviteeSchema)
  .handler(async () => {});

export const deleteProjectInvitee = ownerAction
  .input(z.string())
  .handler(async () => {});
