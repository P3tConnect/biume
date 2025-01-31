import { z } from "zod";
import { createSafeAction } from "@/src/lib/safe-action/create-safe-action";
import {
  requireAuth,
  requireOwner,
  createValidator,
} from "@/src/lib/safe-action/middlewares";
import { Context } from "@/src/lib/safe-action/types";

// Schéma de validation
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

// Type d'entrée basé sur le schéma
type InputType = z.infer<typeof schema>;

// Type de sortie
type OutputType = {
  id: string;
  name: string;
  email: string;
  organizationId: string;
};

// Validation personnalisée
const validateEmailDomain = async (ctx: Context) => {
  return ["example.com"];
};

// Handler de l'action
const handler = async (data: InputType, ctx: Context): Promise<OutputType> => {
  if (!ctx.user?.organizationId) {
    throw new Error("Organisation requise");
  }

  const allowedDomains = ctx.meta?.validation as string[];
  const emailDomain = data.email.split("@")[1];

  if (!allowedDomains.includes(emailDomain)) {
    throw new Error("Domaine email non autorisé");
  }

  // Simulation d'une opération de base de données
  return {
    id: "1",
    name: data.name,
    email: data.email,
    organizationId: ctx.user.organizationId,
  };
};

// Création de l'action sécurisée
export const createUser = createSafeAction(schema, handler, {
  middleware: [requireAuth, requireOwner, createValidator(validateEmailDomain)],
});
