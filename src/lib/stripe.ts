import Stripe from "stripe";
import { safeConfig } from "./env";

export const stripe = new Stripe(safeConfig.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-09-30.acacia",
});
