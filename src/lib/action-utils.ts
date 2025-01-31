import { createSafeActionClient } from "next-safe-action";

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
}).use(async ({ next }) => {
  return next();
});
