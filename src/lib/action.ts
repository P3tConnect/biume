import { ZSAError, createServerAction, createServerActionProcedure } from "zsa";

import { currentUser } from "./current-user";
import { db } from "./db";
import { eq } from "drizzle-orm";

export const action = createServerAction();

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

const clientProcedure = createServerActionProcedure(authedProcedure).handler(
  async ({ ctx }) => {
    if (ctx.user) {
      

      throw new ZSAError(
        "NOT_AUTHORIZED",
        "You need to be registered to perform this action",
      );
    }

    throw new ZSAError(
      "NOT_AUTHORIZED",
      "You need to be registered to perform this action",
    );
  },
);

export const clientAction = clientProcedure.createServerAction();

const memberProcedure = createServerActionProcedure(authedProcedure).handler(
  async ({ ctx }) => {
    if (ctx.user) {

    }

    throw new ZSAError(
      "NOT_AUTHORIZED",
      "You need to be in a company to perform this action",
    );
  },
);

export const memberAction = memberProcedure.createServerAction();

export const ownerProcedure = createServerActionProcedure(
  authedProcedure,
).handler(async ({ ctx }) => {
  if (ctx.user) {
    
  }

  throw new ZSAError(
    "NOT_AUTHORIZED",
    "You need to be registered to perform this action",
  );
});

export const ownerAction = ownerProcedure.createServerAction();
