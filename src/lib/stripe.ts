import Stripe from "stripe";
import { safeConfig } from "./env";

export const stripe = new Stripe(safeConfig.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia" as any,
});

