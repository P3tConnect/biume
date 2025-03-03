"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Receipt, Download } from "lucide-react";
import { ActionResult, cn } from "@/src/lib";
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
import { StripeInvoice } from "@/types/stripe-invoice";

export const BillingInvoicesSection = ({
  invoices,
}: {
  invoices: ActionResult<StripeInvoice[]> | undefined;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
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
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Voir les factures
        </Button>
      </div>

      <Credenza open={isOpen} onOpenChange={setIsOpen}>
        <CredenzaContent>
          <CredenzaHeader className="pb-6">
            <CredenzaTitle>Historique des factures</CredenzaTitle>
            <CredenzaDescription>
              Consultez et téléchargez vos factures des 12 derniers mois
            </CredenzaDescription>
          </CredenzaHeader>
          {invoices?.data && invoices?.data.length > 0 ? (
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
                {invoices?.data?.map((invoice) => (
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
