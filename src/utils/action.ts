import { createSafeActionClient } from "next-safe-action";
import { currentUser } from "./current-user";

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

export const action = createSafeActionClient({
  handleReturnedServerError: handleReturnedServerError,
});

export const userAction = createSafeActionClient({
  handleReturnedServerError: handleReturnedServerError,
  middleware: async () => {
    // const user = await currentUser();
    // if (!user) {
    //   throw new ActionError("You must be logged in");
    // }
    // return { user };
  },
});

export const proAction = createSafeActionClient({
  handleReturnedServerError: handleReturnedServerError,
  middleware: async () => {
    // const user = await currentUser();
    // if (!user) {
    //   throw new ActionError("You must be logged in");
    // }
    // if (user.role != "CLIENT" && user.plan != "NONE") {
    //   return {
    //     user,
    //   };
    // }
    // throw new ActionError(
    //   "You must upgrade your plan or register you as profesionnal",
    // );
  },
});
