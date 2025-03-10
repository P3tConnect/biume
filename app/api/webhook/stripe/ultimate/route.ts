import { NextRequest, NextResponse } from "next/server"
import { db, stripe } from "@/src/lib"

import Stripe from "stripe"
import { eq } from "drizzle-orm"
import { organization } from "@/src/db"
import { redirect } from "next/navigation"

export async function POST(req: NextRequest) {
  const body = await req.json()

  const stripeSignature = req.headers.get("stripe-signature")

  if (!stripeSignature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, stripeSignature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const checkoutSession = event.data.object as Stripe.Checkout.Session

    const customerId = checkoutSession.customer

    if (!customerId) {
      return NextResponse.json({ error: "Missing customerId" }, { status: 400 })
    }
    const [org] = await db.query.organization.findMany({
      where: eq(organization.customerStripeId, customerId.toString()),
    })

    if (!org) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    // TODO: Send email to the organization with resend

    await db
      .update(organization)
      .set({
        plan: "ULTIMATE",
      })
      .where(eq(organization.customerStripeId, customerId.toString()))

    redirect(`/dashboard/organization/${org.id}`)
  } else if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription

    const customerId = subscription.customer

    if (!customerId) {
      return NextResponse.json({ error: "Missing customerId" }, { status: 400 })
    }

    const [org] = await db.query.organization.findMany({
      where: eq(organization.customerStripeId, customerId.toString()),
    })

    if (!org) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    // TODO: Send email to the organization with resend

    await db
      .update(organization)
      .set({
        plan: "ULTIMATE",
      })
      .where(eq(organization.customerStripeId, customerId.toString()))

    return NextResponse.json({ message: "Organization updated" }, { status: 200 })
  } else if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription

    const customerId = subscription.customer

    if (!customerId) {
      return NextResponse.json({ error: "Missing customerId" }, { status: 400 })
    }

    // TODO: Send email to the organization with resend

    await db
      .update(organization)
      .set({
        plan: "NONE",
      })
      .where(eq(organization.customerStripeId, customerId.toString()))

    return NextResponse.json({ message: "Organization updated" }, { status: 200 })
  }

  return NextResponse.json({ message: "Event not handled" }, { status: 200 })
}
