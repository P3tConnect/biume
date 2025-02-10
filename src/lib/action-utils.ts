import { z } from 'zod';
import { User, Organization } from './auth';

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Action Error';
  }
}

const handleReturnedServerError = (error: Error) => {
  if (error instanceof ActionError) {
    return error.message;
  }
  return 'An unexpected error occurred';
};
export type ServerActionContext = {
  user: User | null;
  organization: Organization | null;
  meta: Record<string, unknown> | null;
};

export type ActionResult<T> =
  | { data: T; error?: never }
  | { data?: never; error: string };

export function createServerAction<TSchema extends z.ZodType, TOutput>(
  schema: TSchema,
  handler: (
    input: z.infer<TSchema>,
    ctx: ServerActionContext
  ) => Promise<TOutput>,
  middlewares: ((ctx: ServerActionContext) => Promise<void>)[] = []
): (input: z.infer<TSchema>) => Promise<ActionResult<TOutput>> {
  return async (input: z.infer<TSchema>) => {
    try {
      // Initialize context
      const ctx: ServerActionContext = {
        meta: {},
        user: null,
        organization: null,
      };

      // Execute all middlewares in sequence
      for (const middleware of middlewares) {
        await middleware(ctx);
      }

      // Validate input
      const validatedInput = await schema.parseAsync(input);

      // Execute handler with validated input
      const result = await handler(validatedInput, ctx);

      return { data: result };
    } catch (e) {
      if (e instanceof z.ZodError) {
        return { error: e.errors[0].message };
      }
      if (e instanceof Error) {
        return { error: e.message };
      }
      return { error: 'An unexpected error occurred' };
    }
  };
}
