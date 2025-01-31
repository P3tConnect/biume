import { auth } from "@/src/lib/auth";
import { Context, Middleware } from "./types";

export const requireAuth: Middleware = async (context: Context) => {
  const session = await auth.api.getSession({
    headers: await auth.api,
  });

  if (!session?.user) {
    throw new Error("Non authentifié");
  }

  context.user = {
    id: session.user.id,
    organizationId: session.user.organizationId,
    role: session.user.role,
  };
};

export const requireOwner: Middleware = async (context: Context) => {
  if (!context.user) {
    throw new Error("Non authentifié");
  }

  if (context.user.role !== "owner") {
    throw new Error("Accès non autorisé");
  }
};

export const requireMember: Middleware = async (context: Context) => {
  if (!context.user) {
    throw new Error("Non authentifié");
  }

  if (context.user.role !== "member") {
    throw new Error("Accès non autorisé");
  }
};

export const requireOrganization: Middleware = async (context: Context) => {
  if (!context.user?.organizationId) {
    throw new Error("Organisation requise");
  }
};

export function createValidator<T>(
  validator: (ctx: Context) => Promise<T>,
): Middleware {
  return async (context: Context) => {
    const result = await validator(context);
    context.meta = {
      ...context.meta,
      validation: result,
    };
  };
}
