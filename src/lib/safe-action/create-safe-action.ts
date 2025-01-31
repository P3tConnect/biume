"use server";

import { z } from "zod";
import { ActionHandler, ActionOptions, ActionState, Context } from "./types";

export function createSafeAction<Input, Output>(
  schema: z.Schema<Input>,
  handler: ActionHandler<Input, Output>,
  options?: ActionOptions,
) {
  return async (data: Input): Promise<ActionState<Input, Output>> => {
    const context: Context = {};

    try {
      // Validation des données d'entrée
      const validatedData = await schema.parseAsync(data);

      // Exécution des middlewares
      if (options?.middleware) {
        for (const middleware of options.middleware) {
          await middleware(context);
        }
      }

      // Exécution du handler
      const result = await handler(validatedData, context);

      return { data: result };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { validation: error };
      }

      return {
        error:
          error instanceof Error ? error.message : "Une erreur est survenue",
      };
    }
  };
}
