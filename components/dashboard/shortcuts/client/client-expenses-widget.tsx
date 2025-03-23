"use client"

import { ChevronRight, Receipt, TrendingUp, Calendar, Tag, PawPrint } from "lucide-react"
import { useRouter } from "next/navigation"

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Credenza,
  CredenzaContent,
  CredenzaTrigger,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
} from "@/components/ui"
import { useSession } from "@/src/lib/auth-client"

// Types
type ExpenseSummary = {
  category: string
  amount: number
  icon: string
  change: number
}

// Données de test
const expensesSummary: ExpenseSummary[] = [
  {
    category: "Ce mois",
    amount: 1000,
    icon: "📅",
    change: 8.7,
  },
  {
    category: "Moyenne/animal",
    amount: 250,
    icon: "🐾",
    change: -2.3,
  },
  {
    category: "Prochain RDV",
    amount: 65,
    icon: "🏥",
    change: 0,
  },
]

// Données de test détaillées
const detailedExpenses = [
  {
    date: "2024-03-15",
    description: "Vaccins",
    amount: 150,
    animal: "Max (Berger Allemand)",
    category: "Soins préventifs",
  },
  {
    date: "2024-03-10",
    description: "Consultation urgence",
    amount: 85,
    animal: "Luna (Chat Siamois)",
    category: "Urgences",
  },
  {
    date: "2024-03-05",
    description: "Médicaments",
    amount: 45,
    animal: "Max (Berger Allemand)",
    category: "Traitement",
  },
]

const ClientExpensesWidget = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const userId = session?.user?.id

  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Receipt className="size-5" />
          Dépenses
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-sm">
          <Credenza>
            <CredenzaTrigger asChild>
              <div className="flex items-center">
                Détails
                <ChevronRight className="size-4 ml-1" />
              </div>
            </CredenzaTrigger>
            <CredenzaContent className="sm:max-w-[600px]">
              <CredenzaHeader className="border-b pb-4">
                <CredenzaTitle className="text-2xl font-bold">Détails des dépenses</CredenzaTitle>
              </CredenzaHeader>
              <CredenzaBody className="py-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-3 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/50 dark:to-blue-950/50 border shadow-sm">
                      <p className="text-lg font-semibold mb-1">Total du mois</p>
                      <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">280€</p>
                    </div>
                  </div>

                  <div className="divide-y divide-border">
                    {detailedExpenses.map((expense, index) => (
                      <div key={index} className="group p-4 hover:bg-accent/50 rounded-lg transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-semibold group-hover:text-primary transition-colors">
                                {expense.description}
                              </span>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                {expense.category}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="size-4" />
                                {expense.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <PawPrint className="size-4" />
                                {expense.animal}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-xl font-bold text-primary">{expense.amount}€</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-between items-center p-4 rounded-xl bg-accent/50">
                    <div className="flex items-center gap-2">
                      <Tag className="size-5" />
                      <span className="font-medium">Moyenne par visite</span>
                    </div>
                    <span className="text-lg font-bold">93.33€</span>
                  </div>
                </div>
              </CredenzaBody>
            </CredenzaContent>
          </Credenza>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {expensesSummary.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <p className="text-sm font-medium">{item.category}</p>
                  <p className="text-lg font-bold">{item.amount}€</p>
                </div>
              </div>
              {item.change !== 0 && (
                <div
                  className={`flex items-center gap-1 text-sm ${item.change > 0 ? "text-red-500" : "text-green-500"}`}
                >
                  <TrendingUp className={`size-4 ${item.change > 0 ? "" : "rotate-180"}`} />
                  <span>{Math.abs(item.change)}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ClientExpensesWidget
