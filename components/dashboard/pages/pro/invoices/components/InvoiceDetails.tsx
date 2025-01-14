"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Separator,
  ScrollArea,
} from "@/components/ui";
import { Invoice } from "../invoices-page";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Download, Mail, Printer } from "lucide-react";

interface InvoiceDetailsProps {
  invoice: Invoice;
}

const statusMap = {
  paid: { label: "Payée", variant: "default" as const },
  pending: { label: "En attente", variant: "secondary" as const },
  overdue: { label: "En retard", variant: "destructive" as const },
};

export const InvoiceDetails = ({ invoice }: InvoiceDetailsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Détails de la facture</h2>
        <p className="text-sm text-muted-foreground">
          {invoice.number} - {invoice.clientName}
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button variant="outline" className="gap-2">
          <Download className="size-4" />
          Télécharger PDF
        </Button>
        <Button variant="outline" className="gap-2">
          <Mail className="size-4" />
          Envoyer par email
        </Button>
      </div>

      <Separator />

      <ScrollArea className="h-screen gap-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Informations générales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Numéro de facture
                </p>
                <p className="font-medium">{invoice.number}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Date de création
                </p>
                <p className="font-medium">
                  {format(new Date(invoice.createdAt), "d MMMM yyyy", {
                    locale: fr,
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date d'échéance</p>
                <p className="font-medium">
                  {format(new Date(invoice.dueDate), "d MMMM yyyy", {
                    locale: fr,
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Statut</p>
                <Badge
                  variant={statusMap[invoice.status].variant}
                  className="mt-1 rounded-full"
                >
                  {statusMap[invoice.status].label}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informations client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Nom du client</p>
                <p className="font-medium">{invoice.clientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Montant total</p>
                <p className="text-2xl font-bold text-primary">
                  {invoice.amount}€
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Détails des prestations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <div className="grid grid-cols-12 gap-4 p-4 font-medium text-muted-foreground border-b">
                <div className="col-span-6">Description</div>
                <div className="col-span-2 text-right">Quantité</div>
                <div className="col-span-2 text-right">Prix unitaire</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              <div className="divide-y">
                <div className="grid grid-cols-12 gap-4 p-4">
                  <div className="col-span-6">
                    <p className="font-medium">Consultation standard</p>
                    <p className="text-sm text-muted-foreground">
                      Séance de 1 heure
                    </p>
                  </div>
                  <div className="col-span-2 text-right">1</div>
                  <div className="col-span-2 text-right">75€</div>
                  <div className="col-span-2 text-right font-medium">75€</div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4">
                  <div className="col-span-6">
                    <p className="font-medium">Traitement spécifique</p>
                    <p className="text-sm text-muted-foreground">
                      Thérapie ciblée
                    </p>
                  </div>
                  <div className="col-span-2 text-right">2</div>
                  <div className="col-span-2 text-right">150€</div>
                  <div className="col-span-2 text-right font-medium">300€</div>
                </div>
              </div>
              <div className="border-t p-4">
                <div className="flex justify-end space-y-2">
                  <div className="w-60 space-y-2">
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Sous-total</p>
                      <p className="font-medium">375€</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">TVA (20%)</p>
                      <p className="font-medium">75€</p>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <p>Total</p>
                      <p>{invoice.amount}€</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </ScrollArea>
    </div>
  );
};
