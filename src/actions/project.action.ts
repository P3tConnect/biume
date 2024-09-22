"use server";

import { z } from "zod";
import { CreateProjectSchema, project } from "../db";
import { ownerAction } from "../lib/action";
import { db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getProjects = ownerAction.handler(async () => {});

export const createProject = ownerAction
  .input(CreateProjectSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(project).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "Project not created");
    }

    return data;
  });

export const updateProject = ownerAction
  .input(CreateProjectSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(project)
      .set(input)
      .where(eq(project.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Project not updated");
    }

    return data;
  });

export const deleteProject = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(project)
      .where(eq(project.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Project not deleted");
    }
  });
