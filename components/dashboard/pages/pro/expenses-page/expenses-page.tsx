"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  DollarSignIcon,
  FilterIcon,
  PieChartIcon,
  TagIcon,
  ArrowRight,
  PlusIcon,
} from "lucide-react";

// Mock data - Replace with real data from your backend
const mockExpenseData = [
  { month: "Jan", amount: 1200 },
  { month: "Feb", amount: 900 },
  { month: "Mar", amount: 1500 },
  { month: "Apr", amount: 800 },
  { month: "May", amount: 1100 },
  { month: "Jun", amount: 1300 },
];

const mockTransactions = [
  {
    id: 1,
    date: "2024-03-15",
    description: "Fournitures de bureau",
    category: "Fournitures",
    amount: 125.5,
  },
  {
    id: 2,
    date: "2024-03-14",
    description: "Abonnement logiciel",
    category: "Logiciel",
    amount: 49.99,
  },
  {
    id: 3,
    date: "2024-03-13",
    description: "Déjeuner client",
    category: "Repas",
    amount: 85.0,
  },
];

interface MetricsCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: number;
}

const MetricsCard = ({ title, value, icon: Icon, trend }: MetricsCardProps) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-sm">
        {trend > 0 ? (
          <ArrowUpIcon className="h-4 w-4 text-red-500 mr-1" />
        ) : (
          <ArrowDownIcon className="h-4 w-4 text-green-500 mr-1" />
        )}
        <span className={trend > 0 ? "text-red-500" : "text-green-500"}>
          {Math.abs(trend)}% par rapport au mois dernier
        </span>
      </div>
    )}
  </Card>
);

const ExpenseFilters = () => (
  <div className="flex gap-4 mb-6">
    <div className="flex-1">
      <Input placeholder="Rechercher des dépenses..." />
    </div>
    <Select defaultValue="all">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Catégorie" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Toutes les catégories</SelectItem>
        <SelectItem value="supplies">Fournitures</SelectItem>
        <SelectItem value="software">Logiciel</SelectItem>
        <SelectItem value="meals">Repas</SelectItem>
      </SelectContent>
    </Select>
    <Button variant="outline">
      <CalendarIcon className="h-4 w-4 mr-2" />
      Période
    </Button>
    <Button variant="outline">
      <FilterIcon className="h-4 w-4 mr-2" />
      Plus de filtres
    </Button>
  </div>
);

const ExpensesPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dépenses</h1>
          <p className="text-muted-foreground">
            Gérez et suivez vos dépenses professionnelles
          </p>
        </div>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Ajouter une dépense
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Dépenses totales"
          value="4 250€"
          icon={DollarSignIcon}
          trend={12}
        />
        <MetricsCard
          title="Moyenne journalière"
          value="142€"
          icon={PieChartIcon}
          trend={-5}
        />
        <MetricsCard
          title="Catégorie principale"
          value="Logiciel"
          icon={TagIcon}
          trend={8}
        />
        <MetricsCard
          title="Dépenses en attente"
          value="3"
          icon={CalendarIcon}
          trend={0}
        />
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Tendances des dépenses</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockExpenseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Transactions récentes</h2>
        <ExpenseFilters />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead className="text-right">Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell>
                  {format(new Date(transaction.date), "dd MMM yyyy")}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {transaction.category}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {transaction.amount.toFixed(2)}€
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ExpensesPage;
