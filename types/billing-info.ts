import Stripe from "stripe";

export type BillingInfo = {
  currentPlan: string;
  currentPrice: string;
  paymentMethod: string;
  subscriptionStatus: Stripe.Subscription.Status;
};
