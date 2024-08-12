"use server";

import { z } from "zod";
import { CreateProjectSchema, project } from "../db";
import { ActionError, proAction } from "../lib/action";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getProjects = proAction.action(async () => {});

export const createProject = proAction
  .schema(CreateProjectSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(project)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Project not created");
    }

    return data;
  });

export const updateProject = proAction
  .schema(CreateProjectSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(project)
      .set(parsedInput)
      .where(eq(project.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Project not updated");
    }

    return data;
  });

export const deleteProject = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(project)
      .where(eq(project.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Project not deleted");
    }
  });
