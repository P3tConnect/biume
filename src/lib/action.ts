import { createSafeActionClient } from "next-safe-action";
// import { currentUser } from "./current-user";

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
  handleServerError: handleReturnedServerError,
});

export const userAction = action.use(async ({ next }) => {
  // const user = await currentUser();

  // if (!user) {
  //   throw new ActionError("You must be logged in !");
  // }

  return next({ ctx: undefined });
});

export const proAction = action.use(async ({ next }) => {
  // const user = await currentUser();

  // if (!user) {
  //   throw new ActionError("You must be logged in !");
  // }

  // if (user.plan != "NONE") {
  //   return next({ ctx: user });
  // }
  return next({ ctx: undefined });

  // throw new ActionError(
  //   "You need to subscribe to a plan to perform this action",
  // );
});

export const adminAction = action.use(async ({ next }) => {
  // const user = await currentUser();

  // if (!user) {
  //   throw new ActionError("You must be logged in !")
  // }
  return next({ ctx: undefined });
});
