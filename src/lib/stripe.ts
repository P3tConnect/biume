import Stripe from "stripe";
import { safeConfig } from "./env";

export const stripe = new Stripe(safeConfig.STRIPE_SECRET_KEY, {
  apiVersion: "2025-01-27.acacia",
});
