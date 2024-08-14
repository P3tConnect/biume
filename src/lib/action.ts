import { currentUser } from "./current-user";
import { createServerAction, createServerActionProcedure, ZSAError } from "zsa";
import { db } from "./db";
import { company } from "../db";
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
    if (ctx.user.plan == "NONE") {
      return {
        user: ctx.user,
      };
    }

    throw new ZSAError(
      "NOT_AUTHORIZED",
      "You need to be registered as a client",
    );
  },
);

export const clientAction = clientProcedure.createServerAction();

const companyProcedure = createServerActionProcedure(authedProcedure).handler(
  async ({ ctx }) => {
    if (ctx.user.plan != "NONE") {
      const companyData = await db.query.company.findFirst({
        where: eq(company.ownerId, ctx.user.id),
      });

      if (!companyData) {
        throw new ZSAError("NOT_AUTHORIZED", "You must create a company");
      }

      return {
        user: ctx.user,
        company: companyData,
      };
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
