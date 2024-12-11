import Stripe from "stripe";
import { safeConfig } from "./env";

export const stripe = new Stripe(safeConfig.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia",
});
