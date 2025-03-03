"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  PiggyBank,
  FileText,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  CircleDollarSign
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const AccountingHeader = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("juin-2024");

  // Données simulées pour les statistiques rapides
  const stats = {
    revenue: 13550,
    revenueChange: 7.2,
    expenses: 7890,
    expensesChange: 3.5,
    profit: 5660,
    profitChange: 12.8,
    unpaidInvoices: 4
  };

  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <CircleDollarSign className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Comptabilité
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Suivez vos finances et analysez votre rentabilité
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <Tabs defaultValue="month" className="w-fit">
              <TabsList>
                <TabsTrigger value="month">Mois</TabsTrigger>
                <TabsTrigger value="quarter">Trimestre</TabsTrigger>
                <TabsTrigger value="year">Année</TabsTrigger>
              </TabsList>
            </Tabs>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Juin 2024
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Période</h4>
                    <p className="text-sm text-muted-foreground">
                      Sélectionnez la période pour les données financières
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Select
                      value={selectedPeriod}
                      onValueChange={setSelectedPeriod}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une période" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="juin-2024">Juin 2024</SelectItem>
                        <SelectItem value="mai-2024">Mai 2024</SelectItem>
                        <SelectItem value="avril-2024">Avril 2024</SelectItem>
                        <SelectItem value="q2-2024">T2 2024</SelectItem>
                        <SelectItem value="q1-2024">T1 2024</SelectItem>
                        <SelectItem value="2024">Année 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtres
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Tous les services</DropdownMenuItem>
                <DropdownMenuItem>Consultations uniquement</DropdownMenuItem>
                <DropdownMenuItem>Traitements uniquement</DropdownMenuItem>
                <DropdownMenuItem>Produits uniquement</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button>
              <PiggyBank className="mr-2 h-4 w-4" />
              Nouvelle facture
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Exporter en PDF</DropdownMenuItem>
                <DropdownMenuItem>Exporter en CSV</DropdownMenuItem>
                <DropdownMenuItem>Envoyer par email</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Revenus du mois</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{stats.revenue} €</p>
              <Badge variant={stats.revenueChange > 0 ? "secondary" : "destructive"} className="flex items-center">
                {stats.revenueChange > 0 ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                {stats.revenueChange}%
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Dépenses du mois</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{stats.expenses} €</p>
              <Badge variant={stats.expensesChange < 0 ? "secondary" : "destructive"} className="flex items-center">
                {stats.expensesChange < 0 ? <ArrowDownRight className="mr-1 h-3 w-3" /> : <ArrowUpRight className="mr-1 h-3 w-3" />}
                {stats.expensesChange}%
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Profit net</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{stats.profit} €</p>
              <Badge variant={stats.profitChange > 0 ? "secondary" : "destructive"} className="flex items-center">
                {stats.profitChange > 0 ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                {stats.profitChange}%
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Factures en attente</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{stats.unpaidInvoices}</p>
              <Button variant="link" className="h-auto p-0 text-primary" size="sm">
                <FileText className="mr-1 h-3 w-3" />
                Voir toutes
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountingHeader; 