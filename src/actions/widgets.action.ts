import { z } from "zod";
import { CreateWidgetsSchema } from "../db";
import { proAction } from "../lib";

export const getWidgets = proAction.action(async ({ ctx }) => {});

export const createWidget = proAction
  .schema(CreateWidgetsSchema)
  .action(async ({ ctx }) => {});

export const updateWidget = proAction
  .schema(CreateWidgetsSchema)
  .action(async ({ ctx }) => {});

export const deleteWidget = proAction
  .schema(z.string())
  .action(async ({ ctx }) => {});
