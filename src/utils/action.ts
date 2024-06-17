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

  return "An unexpected error occured";
};

export const userAction = createSafeActionClient({
  handleReturnedServerError: handleReturnedServerError,
  middleware: async () => {},
});
