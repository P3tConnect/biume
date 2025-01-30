import { createMiddleware, createSafeActionClient } from "next-safe-action";
import { authedMiddleware, ownerMiddleware } from "./action";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Action Error";
  }
}

const handleReturnedServerError = (error: Error) => {
  if (error instanceof ActionError) {
    return error.message;
  }
  return "An unexpected error occurred";
};

export const action = createSafeActionClient({
  handleServerError: handleReturnedServerError,
}).use(authedMiddleware);

export const authedAction = action.use(authedMiddleware);

export const ownerAction = authedAction.use(ownerMiddleware);
