import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";
import { db, stripe } from "@/src/lib";
import { organization } from "@/src/db";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json();
    const { priceId } = body;

    if (!priceId) {
      return NextResponse.json(
        { error: "ID de prix manquant" },
        { status: 400 },
      );
    }

    // Récupérer l'organisation active de l'utilisateur
    const activeOrg = await auth.api.getFullOrganization({
      headers: req.headers,
    });

    if (!activeOrg) {
      return NextResponse.json(
        { error: "Organisation non trouvée" },
        { status: 404 },
      );
    }

    const org = await db.query.organization.findFirst({
      where: eq(organization.id, activeOrg.id),
    });

    // Créer ou récupérer le client Stripe
    let stripeCustomerId = org?.stripeId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: session.user.email || undefined,
        metadata: {
          organizationId: activeOrg.id,
        },
      });
      stripeCustomerId = customer.id;

      // Mettre à jour l'organisation avec l'ID du client Stripe
      await db
        .update(organization)
        .set({ stripeId: customer.id })
        .where(eq(organization.id, activeOrg.id));
    }

    // Créer la session de paiement
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/organization/${activeOrg.id}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/organization/${activeOrg.id}?canceled=true`,
      metadata: {
        organizationId: activeOrg.id,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Erreur lors de la création de la session:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session" },
      { status: 500 },
    );
  }
}
