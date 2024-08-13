import { currentUser } from "./current-user";
import { createServerActionProcedure, ZSAError } from "zsa";

const authedProcedure = createServerActionProcedure().handler(async () => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new ZSAError("NOT_AUTHORIZED", "You must be logged in !");
    }

    return {
      user,
    };
  } catch (err) {
    throw new ZSAError("NOT_AUTHORIZED", "You must be logged in !");
  }
});

export const authedAction = authedProcedure.createServerAction();

const companyProcedure = createServerActionProcedure(authedProcedure).handler(
  async ({ ctx }) => {
    if (ctx.user.plan != "NONE") {
      return ctx;
    }
    throw new ZSAError("NOT_AUTHORIZED", "You need to subscribe to a plan");
  },
);

export const companyAction = companyProcedure.createServerAction();

export const adminAction = createServerActionProcedure(authedProcedure).handler(
  async ({ ctx }) => {
    if (ctx.user.isAdmin) {
      return ctx;
    }

    throw new ZSAError("NOT_AUTHORIZED", "You need to be an admin");
  },
);
