import { z } from "zod";

export type ActionState<Input, Output> = {
  data?: Output;
  error?: string;
  validation?: z.ZodError;
};

export type Context = {
  user?: {
    id: string;
    organizationId?: string;
    role?: string;
  };
  meta?: Record<string, unknown>;
};

export type Middleware = (context: Context) => Promise<void>;

export type ActionHandler<Input, Output> = (
  data: Input,
  ctx: Context,
) => Promise<Output>;

export interface ActionOptions {
  middleware?: Middleware[];
}
