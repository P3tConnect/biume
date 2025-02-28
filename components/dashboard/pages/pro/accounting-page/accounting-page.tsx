"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CircleDollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  PiggyBank,
  FileText,
  AlertCircle,
  BarChart3,
  Users,
  PawPrint,
  Stethoscope,
  ShoppingBag,
  Tag,
  Lightbulb,
  Download,
  Printer,
} from "lucide-react";
import AccountingHeader from "../../../shortcuts/pro/accounting-header";

// Interfaces pour les composants
interface RevenueWidgetProps {
  data: {
    totalRevenue: number;
    changePercent: number;
    monthlyData: number[];
  };
}

interface ProfitabilityWidgetProps {
  data: {
    revenue: number;
    revenueChangePercent: number;
    expenses: number;
    expensesChangePercent: number;
    profitMargin: number;
    profitMarginChange: number;
  };
}

interface Invoice {
  id: number;
  client: string;
  clientAvatar: string;
  amount: number;
  dueDate: string;
}

interface InvoicesWidgetProps {
  data: {
    unpaid: Invoice[];
    // Autres propriétés peuvent être ajoutées si nécessaire
  };
}

interface Species {
  name: string;
  percentage: number;
}

interface PatientInsightsWidgetProps {
  data: {
    patientCount: number;
    newPatients: number;
    retentionRate: number;
    regularPatients: number;
    topSpecies: Species[];
  };
}

interface TaxPreparationWidgetProps {
  data: {
    vat: number;
    socialCharges: number;
    incomeTax: number;
    nextDeadline: string;
    deadlineDescription: string;
  };
}

interface Service {
  name: string;
  profitability: number;
}

interface ProfitabilityByServiceWidgetProps {
  data: {
    services: Service[];
    mostProfitable: Service;
    leastProfitable: Service;
  };
}

// Composants avec leurs interfaces
const ConsultationRevenueWidget = ({ data }: RevenueWidgetProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Revenus par consultation</CardTitle>
        <Stethoscope className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data.totalRevenue} €</div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span className={data.changePercent > 0 ? "text-emerald-500" : "text-rose-500"}>
            {data.changePercent > 0 ? "+" : ""}{data.changePercent}%
          </span>
          <span>depuis le mois dernier</span>
        </div>
        <div className="mt-4 h-[60px]">
          {/* Graphique simplifiée */}
          <div className="flex h-full items-end gap-1">
            {data.monthlyData.map((value: number, i: number) => (
              <div
                key={i}
                className="bg-primary/90 hover:bg-primary w-full rounded-sm"
                style={{ height: `${(value / Math.max(...data.monthlyData)) * 100}%` }}
                title={`${value} €`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TreatmentRevenueWidget = ({ data }: RevenueWidgetProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Revenus par traitement</CardTitle>
        <PawPrint className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data.totalRevenue} €</div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span className={data.changePercent > 0 ? "text-emerald-500" : "text-rose-500"}>
            {data.changePercent > 0 ? "+" : ""}{data.changePercent}%
          </span>
          <span>depuis le mois dernier</span>
        </div>
        <div className="mt-4 h-[60px]">
          {/* Graphique simplifiée */}
          <div className="flex h-full items-end gap-1">
            {data.monthlyData.map((value: number, i: number) => (
              <div
                key={i}
                className="bg-primary/90 hover:bg-primary w-full rounded-sm"
                style={{ height: `${(value / Math.max(...data.monthlyData)) * 100}%` }}
                title={`${value} €`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProductRevenueWidget = ({ data }: RevenueWidgetProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Ventes de produits</CardTitle>
        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data.totalRevenue} €</div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span className={data.changePercent > 0 ? "text-emerald-500" : "text-rose-500"}>
            {data.changePercent > 0 ? "+" : ""}{data.changePercent}%
          </span>
          <span>depuis le mois dernier</span>
        </div>
        <div className="mt-4 h-[60px]">
          {/* Graphique simplifiée */}
          <div className="flex h-full items-end gap-1">
            {data.monthlyData.map((value: number, i: number) => (
              <div
                key={i}
                className="bg-primary/90 hover:bg-primary w-full rounded-sm"
                style={{ height: `${(value / Math.max(...data.monthlyData)) * 100}%` }}
                title={`${value} €`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProfitabilityWidget = ({ data }: ProfitabilityWidgetProps) => {
  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Analyse de rentabilité</CardTitle>
        <BarChart3 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Revenus totaux</p>
            <p className="text-2xl font-bold">{data.revenue} €</p>
            <div className="flex items-center space-x-2 text-sm text-emerald-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>+{data.revenueChangePercent}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Dépenses totales</p>
            <p className="text-2xl font-bold">{data.expenses} €</p>
            <div className="flex items-center space-x-2 text-sm text-rose-500">
              <ArrowDownRight className="h-4 w-4" />
              <span>+{data.expensesChangePercent}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Marge brute</p>
            <p className="text-2xl font-bold">{data.profitMargin} %</p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span className={data.profitMarginChange > 0 ? "text-emerald-500" : "text-rose-500"}>
                {data.profitMarginChange > 0 ? "+" : ""}{data.profitMarginChange}%
              </span>
              <span>depuis le mois dernier</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const InvoicesWidget = ({ data }: InvoicesWidgetProps) => {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Factures</CardTitle>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8">
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
          <Button size="sm" variant="outline" className="h-8">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="unpaid">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="unpaid">Non payées</TabsTrigger>
            <TabsTrigger value="upcoming">À venir</TabsTrigger>
            <TabsTrigger value="recent">Récentes</TabsTrigger>
          </TabsList>

          <TabsContent value="unpaid" className="space-y-4">
            <div className="space-y-2">
              {data.unpaid.map((invoice: Invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={invoice.clientAvatar} alt={invoice.client} />
                      <AvatarFallback>{invoice.client.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{invoice.client}</p>
                      <p className="text-xs text-muted-foreground">
                        Échéance: {invoice.dueDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-bold">{invoice.amount} €</p>
                    <Button variant="outline" size="sm">Rappeler</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {/* Contenu similaire pour les factures à venir */}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            {/* Contenu similaire pour les factures récentes */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const PatientInsightsWidget = ({ data }: PatientInsightsWidgetProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Statistiques des patients</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium">Nombre de patients</p>
              <p className="text-sm font-medium">{data.patientCount}</p>
            </div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium">Nouveaux ce mois</p>
              <p className="text-sm font-medium text-emerald-500">+{data.newPatients}</p>
            </div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium">Taux de rétention</p>
              <p className="text-sm font-medium">{data.retentionRate}%</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Patients réguliers</p>
              <p className="text-sm font-medium">{data.regularPatients}%</p>
            </div>
          </div>

          <div className="pt-2 border-t">
            <p className="text-sm font-medium mb-2">Top espèces traitées</p>
            {data.topSpecies.map((species: Species, idx: number) => (
              <div key={idx} className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <PawPrint className="h-3 w-3 text-muted-foreground" />
                  <p className="text-sm">{species.name}</p>
                </div>
                <p className="text-sm">{species.percentage}%</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TaxPreparationWidget = ({ data }: TaxPreparationWidgetProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Préparation fiscale</CardTitle>
        <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm">TVA à payer (trimestre)</p>
            <p className="text-sm font-bold">{data.vat} €</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm">Charges sociales estimées</p>
            <p className="text-sm font-bold">{data.socialCharges} €</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm">Impôts sur le revenu (est.)</p>
            <p className="text-sm font-bold">{data.incomeTax} €</p>
          </div>
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Prochaine échéance</p>
              <p className="text-sm font-medium text-rose-500">{data.nextDeadline}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{data.deadlineDescription}</p>
          </div>
          <Button variant="outline" className="w-full">
            <FileText className="mr-2 h-4 w-4" />
            Exporter les données fiscales
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ProfitabilityByServiceWidget = ({ data }: ProfitabilityByServiceWidgetProps) => {
  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Rentabilité par service</CardTitle>
        <Tag className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.services.map((service: Service, idx: number) => (
            <div key={idx} className="grid grid-cols-5 items-center">
              <p className="text-sm font-medium col-span-2">{service.name}</p>
              <div className="col-span-2 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full ${service.profitability >= 50 ? 'bg-emerald-500' : service.profitability >= 30 ? 'bg-amber-500' : 'bg-rose-500'}`}
                  style={{ width: `${service.profitability}%` }}
                />
              </div>
              <p className="text-sm text-right">{service.profitability}%</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div>
            <p className="text-sm font-medium">Service le plus rentable</p>
            <p className="text-sm text-muted-foreground">{data.mostProfitable.name} ({data.mostProfitable.profitability}%)</p>
          </div>
          <div>
            <p className="text-sm font-medium">Service le moins rentable</p>
            <p className="text-sm text-muted-foreground">{data.leastProfitable.name} ({data.leastProfitable.profitability}%)</p>
          </div>
          <Button variant="outline" size="sm">
            <Lightbulb className="mr-2 h-4 w-4" />
            Conseils d&apos;optimisation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Type pour les données mockées
interface MockDataType {
  consultationRevenue: RevenueWidgetProps['data'];
  treatmentRevenue: RevenueWidgetProps['data'];
  productRevenue: RevenueWidgetProps['data'];
  profitability: ProfitabilityWidgetProps['data'];
  invoices: InvoicesWidgetProps['data'];
  patientInsights: PatientInsightsWidgetProps['data'];
  taxPreparation: TaxPreparationWidgetProps['data'];
  servicesProfitability: ProfitabilityByServiceWidgetProps['data'];
}

const AccountingPageComponent = () => {
  // Données fictives pour les nouveaux widgets
  const mockData: MockDataType = {
    consultationRevenue: {
      totalRevenue: 4850,
      changePercent: 12,
      monthlyData: [340, 390, 410, 480, 520, 540, 560, 580, 620, 680, 720, 750],
    },
    treatmentRevenue: {
      totalRevenue: 6250,
      changePercent: 8,
      monthlyData: [420, 450, 470, 510, 530, 550, 570, 590, 610, 650, 720, 780],
    },
    productRevenue: {
      totalRevenue: 2450,
      changePercent: -3,
      monthlyData: [210, 230, 250, 240, 220, 200, 190, 180, 170, 160, 190, 210],
    },
    profitability: {
      revenue: 13550,
      revenueChangePercent: 7,
      expenses: 7890,
      expensesChangePercent: 3,
      profitMargin: 42,
      profitMarginChange: 2,
    },
    invoices: {
      unpaid: [
        { id: 1, client: "Marie Dupont", clientAvatar: "", amount: 180, dueDate: "15/06/2024" },
        { id: 2, client: "Thomas Petit", clientAvatar: "", amount: 345, dueDate: "18/06/2024" },
        { id: 3, client: "Julie Martin", clientAvatar: "", amount: 560, dueDate: "22/06/2024" },
        { id: 4, client: "Pierre Simon", clientAvatar: "", amount: 290, dueDate: "25/06/2024" },
      ],
      // upcoming and recent would be similar
    },
    patientInsights: {
      patientCount: 312,
      newPatients: 28,
      retentionRate: 76,
      regularPatients: 58,
      topSpecies: [
        { name: "Chiens", percentage: 42 },
        { name: "Chats", percentage: 38 },
        { name: "NAC", percentage: 14 },
        { name: "Autres", percentage: 6 },
      ],
    },
    taxPreparation: {
      vat: 1850,
      socialCharges: 2320,
      incomeTax: 3480,
      nextDeadline: "15/07/2024",
      deadlineDescription: "Déclaration TVA du 2ème trimestre",
    },
    servicesProfitability: {
      services: [
        { name: "Consultations générales", profitability: 68 },
        { name: "Chirurgies", profitability: 72 },
        { name: "Vaccinations", profitability: 82 },
        { name: "Imagerie", profitability: 58 },
        { name: "Hospitalisations", profitability: 42 },
        { name: "Vente de médicaments", profitability: 34 },
        { name: "Vente d'aliments", profitability: 28 },
      ],
      mostProfitable: { name: "Vaccinations", profitability: 82 },
      leastProfitable: { name: "Vente d'aliments", profitability: 28 },
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <AccountingHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ConsultationRevenueWidget data={mockData.consultationRevenue} />
        <TreatmentRevenueWidget data={mockData.treatmentRevenue} />
        <ProductRevenueWidget data={mockData.productRevenue} />
      </div>

      <ProfitabilityWidget data={mockData.profitability} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InvoicesWidget data={mockData.invoices} />
        <PatientInsightsWidget data={mockData.patientInsights} />
        <TaxPreparationWidget data={mockData.taxPreparation} />
      </div>

      <ProfitabilityByServiceWidget data={mockData.servicesProfitability} />
    </div>
  );
};

export default AccountingPageComponent;
