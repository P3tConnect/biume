import { NextRequest, NextResponse } from "next/server";
import { db, stripe } from "@/src/lib";
import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { transaction } from "@/src/db";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Gérer les événements de paiement
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const metadata = paymentIntent.metadata;

    if (!metadata?.transactionId) {
      return NextResponse.json(
        { error: "Missing transactionId in metadata" },
        { status: 400 },
      );
    }

    // TODO: Send email to the organization with resend

    // Mettre à jour le statut de la transaction dans la base de données
    await db
      .update(transaction)
      .set({
        status: "COMPLETED",
        updatedAt: new Date(),
      })
      .where(eq(transaction.id, metadata.transactionId));

    return NextResponse.json(
      { message: "Payment processed successfully" },
      { status: 200 },
    );
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const metadata = paymentIntent.metadata;

    if (!metadata?.transactionId) {
      return NextResponse.json(
        { error: "Missing transactionId in metadata" },
        { status: 400 },
      );
    }

    // TODO: Send email to the organization with resend

    // Mettre à jour le statut de la transaction en échec
    await db
      .update(transaction)
      .set({
        status: "FAILED",
        updatedAt: new Date(),
      })
      .where(eq(transaction.id, metadata.transactionId));

    return NextResponse.json({ message: "Payment failed" }, { status: 200 });
  }

  return NextResponse.json({ message: "Event received" }, { status: 200 });
}
