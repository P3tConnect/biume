"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useActionQuery, useActionMutation } from "@/src/hooks/action-hooks";
import {
  getBillingInfo,
  updateOrganizationPlan,
  createPaymentMethodUpdateSession,
  getInvoiceHistory,
} from "@/src/actions/stripe.action";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Check,
  Download,
  ExternalLink,
  CreditCard,
  Receipt,
  Package2,
} from "lucide-react";
import { cn } from "@/src/lib";
import { toast } from "sonner";
import { safeConfig } from "@/src/lib";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const plans = [
  {
    name: "Basic",
    description: "Pour les professionnels indépendants",
    price: "14.99",
    features: [
      "Gestion Client",
      "Facturation et devis",
      "Emploi du temps",
      "Compte rendus et observations",
      "Comptabilité",
      "Partage de dossier client",
      "Paiement en ligne",
      "Réservation client",
    ],
    priceId: safeConfig.STRIPE_BASIC_PLAN_ID,
  },
  {
    name: "Pro",
    description: "Pour les petites équipes",
    price: "24.99",
    features: [
      "Abonnement Basic +",
      "Notifications",
      "Rappels automatiques",
      "Délais de rétraction",
      "Echelons de remboursement",
      "Preview Biume AI",
      "Jusqu'à 5 employés",
    ],
    priceId: safeConfig.STRIPE_PRO_PLAN_ID,
  },
  {
    name: "Ultimate",
    description: "Pour les moyennes et grandes structures",
    price: "34.99",
    features: [
      "Abonnement Pro +",
      "Biume AI",
      "Rapports de performance",
      "Communication centralisée",
      "Jusqu'à 10 employés",
    ],
    priceId: safeConfig.STRIPE_ULTIMATE_PLAN_ID,
  },
];

export const BillingSection = () => {
  const params = useParams();
  const orgId = params.orgId as string;
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isInvoicesOpen, setIsInvoicesOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null);

  const { data: billingInfo, isLoading } = useActionQuery(
    getBillingInfo,
    { organizationId: orgId },
    "billing-info",
  );

  const { data: invoices, isLoading: isLoadingInvoices } = useActionQuery(
    getInvoiceHistory,
    { organizationId: orgId },
    "invoice-history",
    {
      enabled: isInvoicesOpen,
    },
  );

  const { mutateAsync: updatePaymentMethod } = useActionMutation(
    createPaymentMethodUpdateSession,
    {
      onSuccess: (url) => {
        if (url) {
          router.push(url);
        }
      },
      onError: () => {
        toast.error(
          "Une erreur est survenue lors de la mise à jour du moyen de paiement",
        );
      },
    },
  );

  const { mutateAsync } = useActionMutation(updateOrganizationPlan, {
    onSuccess: (data) => {
      router.push(data);
    },
    onError: () => {
      toast.error("Une erreur est survenue");
    },
  });

  const handleChangePlan = async (plan: string) => {
    await mutateAsync({
      organizationId: orgId,
      plan,
    });
  };

  const handleUpdatePaymentMethod = async () => {
    await updatePaymentMethod({
      organizationId: orgId,
    });
  };

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/10 pb-8 pt-6">
          <CardTitle className="text-2xl font-bold">
            Facturation & Abonnement
          </CardTitle>
          <CardDescription className="text-base">
            Gérez votre abonnement et vos informations de facturation
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-8">
            {/* Plan actuel */}
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-primary/10">
                    <Package2 className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Plan actuel</h3>
                    {isLoading ? (
                      <Skeleton className="mt-1 h-4 w-[120px]" />
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-primary">
                          {billingInfo?.currentPrice}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /mois
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <Button onClick={() => setIsOpen(true)}>Changer de plan</Button>
              </div>
              {!isLoading && (
                <p className="text-sm text-muted-foreground">
                  Vous êtes actuellement sur le plan{" "}
                  <span className="font-medium text-foreground">
                    {billingInfo?.currentPlan}
                  </span>
                </p>
              )}
            </div>

            <div className="h-px bg-border" />

            {/* Moyen de paiement */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-primary/10">
                  <CreditCard className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Moyen de paiement</h3>
                  {isLoading ? (
                    <Skeleton className="mt-1 h-4 w-[200px]" />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {billingInfo?.paymentMethod}
                    </p>
                  )}
                </div>
              </div>
              <Button variant="outline" onClick={handleUpdatePaymentMethod}>
                Mettre à jour
              </Button>
            </div>

            <div className="h-px bg-border" />

            {/* Historique de facturation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-primary/10">
                  <Receipt className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Factures</h3>
                  <p className="text-sm text-muted-foreground">
                    Consultez vos factures et paiements
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setIsInvoicesOpen(true)}>
                Voir les factures
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Credenza open={isOpen} onOpenChange={setIsOpen}>
        <VisuallyHidden>
          <CredenzaTitle>Changer de plan</CredenzaTitle>
        </VisuallyHidden>
        <CredenzaContent className="max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "relative cursor-pointer transition-all hover:shadow-lg rounded-2xl flex flex-col h-full",
                  selectedPlan === plan.name && "border-primary shadow-lg",
                  plan.name === "Pro" && "scale-105 border-primary",
                )}
                onClick={() => setSelectedPlan(plan.name)}
              >
                {plan.name === "Pro" && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-3 py-1 rounded-full text-primary-foreground text-sm font-medium">
                    Populaire
                  </div>
                )}
                <CredenzaHeader>
                  <CredenzaTitle>{plan.name}</CredenzaTitle>
                  <CredenzaDescription>{plan.description}</CredenzaDescription>
                </CredenzaHeader>
                <CardContent className="flex-1">
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}€</span>
                    <span className="text-muted-foreground">/mois</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button
                    className="w-full"
                    variant={plan.name === "Pro" ? "default" : "outline"}
                    onClick={() => handleChangePlan(plan.priceId)}
                  >
                    Sélectionner {plan.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CredenzaContent>
      </Credenza>

      <Credenza open={isInvoicesOpen} onOpenChange={setIsInvoicesOpen}>
        <CredenzaContent>
          <CredenzaHeader className="pb-6">
            <CredenzaTitle>Historique des factures</CredenzaTitle>
            <CredenzaDescription>
              Consultez et téléchargez vos factures des 12 derniers mois
            </CredenzaDescription>
          </CredenzaHeader>
          {isLoadingInvoices ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : invoices && invoices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.number}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                          {
                            "bg-green-50 text-green-700":
                              invoice.status === "paid",
                            "bg-yellow-50 text-yellow-700":
                              invoice.status === "open",
                            "bg-red-50 text-red-700":
                              invoice.status === "uncollectible",
                          },
                        )}
                      >
                        {invoice.status === "paid" && "Payée"}
                        {invoice.status === "open" && "En attente"}
                        {invoice.status === "uncollectible" && "Non payée"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {invoice.pdfUrl && (
                        <a
                          href={invoice.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                          <Download className="h-4 w-4" />
                          Télécharger
                        </a>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              Aucune facture disponible
            </div>
          )}
        </CredenzaContent>
      </Credenza>
    </>
  );
};
