"use server";

import { z } from "zod";
import { CreateProjectInviteeSchema } from "../db";
import { companyAction } from "../lib/action";

export const getProjectInvitees = companyAction.handler(async () => {});

export const createProjectInvitee = companyAction
  .input(CreateProjectInviteeSchema)
  .handler(async () => {});

export const updateProjectInvitee = companyAction
  .input(CreateProjectInviteeSchema)
  .handler(async () => {});

export const deleteProjectInvitee = companyAction
  .input(z.string())
  .handler(async () => {});
